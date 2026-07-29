/**
 * Acatha SIGNUM API v4 — abstraction layer for DTE invoice generation.
 *
 * Confirmed auth flow:
 *   1. cognito/login → IdToken
 *   2. login/mailCheckout → validate token
 *   3. login/autenticar → company list + company token
 *   4. sessions/deactivateAll → clear old sessions
 *   5. sessions/store → register UUID session
 *
 * DTE flow:
 *   1. clientes/clientes/ingresar → create/update client
 *   2. autorizacion/extraer → get sequential number
 *   3. ventas/sv/ingresar → create sale/invoice
 *   4. facturacion-electronica/consumidor-final → send to Hacienda
 *   5. ventas/registerAuth → register Hacienda response
 *   6. generales/pdfGenerate → generate PDF
 *   7. ventas/obtenerRide → download PDF
 */

import { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.38.0';

// ── Environment ──────────────────────────────────────────────────────
const env = (key: string): string => {
  const v = Deno.env.get(key);
  if (!v) throw new Error(`Missing env var: ${key}`);
  return v;
};

// ── Result type ──────────────────────────────────────────────────────
export type Result<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

// ── Acatha session ───────────────────────────────────────────────────
export interface AcathaSession {
  token: string;         // IdToken from Cognito
  companyToken: string;  // Company authorization token
  sessionId: string;     // Self-generated UUID registered via sessions/store
  companyId: string;     // Company code (e.g. "1202")
  companyRuc: string;    // Company tax ID
  companyNrc: string;    // Company NRC
  companyName: string;   // Company commercial name
  localCode: string;     // Establishment/local code
}

// ── Internal helpers ─────────────────────────────────────────────────

function acathaUrl(path: string): string {
  const base = env('ACATHA_BASE_URL'); // https://dev.acatha.com
  return `${base}/amfphp/Services/SIGNUM/API/v4${path}`;
}

function haciendaUrl(path: string): string {
  const base = env('ACATHA_HACIENDA_URL'); // https://dev.acatha.com:3000/md-sv
  return `${base}/${path}`;
}

function baseHeaders(): Record<string, string> {
  return {
    'client-id': env('ACATHA_CLIENT_ID'),
    'secret-key': env('ACATHA_SECRET_KEY'),
    'Content-Type': 'application/json',
  };
}

/** Headers for authenticated API calls (after session is established) */
function sessionHeaders(session: AcathaSession): Record<string, string> {
  return {
    ...baseHeaders(),
    'x-csrf-token': session.token,
    'authorization': session.companyToken,
    'Session-ID': session.sessionId,
  };
}

// ── 1. Authentication ────────────────────────────────────────────────

/**
 * Full Acatha auth flow with token caching.
 *
 * Flow: cognito/login → mailCheckout → autenticar → deactivateAll → sessions/store
 */
export async function acathaLogin(
  supabase: SupabaseClient,
): Promise<Result<AcathaSession>> {
  // Check cache first
  const { data: cached } = await supabase
    .from('acatha_sessions')
    .select('token, session_id, company_id, expires_at')
    .gt('expires_at', new Date().toISOString())
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (cached) {
    console.log('Using cached Acatha session');
    // session_id stores: companyToken|sessionUUID|ruc|nrc|companyName|localCode
    const parts = (cached.session_id || '').split('|');
    return {
      ok: true,
      data: {
        token: cached.token,
        companyToken: parts[0] || '',
        sessionId: parts[1] || '',
        companyId: cached.company_id,
        companyRuc: parts[2] || '',
        companyNrc: parts[3] || '',
        companyName: parts[4] || '',
        localCode: parts[5] || '',
      },
    };
  }

  try {
    // Step 1: Cognito login
    const loginRes = await fetch(acathaUrl('/cognito/login'), {
      method: 'POST',
      headers: baseHeaders(),
      body: JSON.stringify({
        AuthParameters: {
          user: env('ACATHA_USER'),
          pass: env('ACATHA_PASSWORD'),
        },
      }),
    });
    const loginData = await loginRes.json();

    if (loginData.error || !loginData.auto?.token?.AuthenticationResult?.IdToken) {
      return { ok: false, error: `Cognito login failed: ${loginData.message || 'unknown error'}` };
    }
    const idToken: string = loginData.auto.token.AuthenticationResult.IdToken;

    // Step 2: Validate token
    const checkRes = await fetch(acathaUrl('/login/mailCheckout'), {
      headers: { ...baseHeaders(), 'x-csrf-token': idToken },
    });
    const checkData = await checkRes.json();
    if (checkData.error) {
      return { ok: false, error: `Token validation failed: ${checkData.message || 'unknown error'}` };
    }

    // Step 3: Authenticate and get companies
    const authRes = await fetch(acathaUrl('/login/autenticar'), {
      method: 'POST',
      headers: { ...baseHeaders(), 'x-csrf-token': idToken },
    });
    const authData = await authRes.json();
    if (authData.error) {
      return { ok: false, error: `Autenticar failed: ${authData.message || 'unknown error'}` };
    }

    const company = authData.auto?.empresas?.[0];
    if (!company) {
      return { ok: false, error: 'No company found in autenticar response' };
    }

    const companyToken = company.token || '';
    const companyId = company.codigo?.toString() || '';
    const companyRuc = company.ruc || '';
    const companyNrc = company.nrc || '';
    const companyName = company.comercial || company.nombre || '';
    const localCode = company.locales?.[0]?.codigo?.toString() || '';
    const authHeadersObj = { ...baseHeaders(), 'x-csrf-token': idToken, 'authorization': companyToken };

    // Step 4: Deactivate old sessions
    await fetch(acathaUrl('/sessions/deactivateAll?dispositivo=pc'), {
      method: 'DELETE',
      headers: authHeadersObj,
    });

    // Step 5: Register new session with self-generated UUID
    const sessionUUID = crypto.randomUUID();
    const storeRes = await fetch(acathaUrl('/sessions/store'), {
      method: 'POST',
      headers: authHeadersObj,
      body: JSON.stringify({
        infoRegistro: {
          dispositivo: 'pc',
          identificadorSesion: sessionUUID,
          empresa: parseInt(companyId),
          ip: '0.0.0.0',
          navegador: 'Pinklights-API',
          sistemaOperativo: 'Linux',
        },
      }),
    });
    const storeData = await storeRes.json();
    if (storeData.error) {
      return { ok: false, error: `Session store failed: ${storeData.message || 'unknown error'}` };
    }

    console.log(`Acatha auth complete: company=${companyName}, id=${companyId}, session=${sessionUUID}`);

    // Cache the session (IdToken valid 24h, cache for 12h)
    const expiresAt = new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString();
    const sessionData = [companyToken, sessionUUID, companyRuc, companyNrc, companyName, localCode].join('|');
    await supabase.from('acatha_sessions').insert({
      token: idToken,
      session_id: sessionData,
      company_id: companyId,
      expires_at: expiresAt,
    });

    // Clean up expired sessions
    await supabase
      .from('acatha_sessions')
      .delete()
      .lt('expires_at', new Date().toISOString());

    return {
      ok: true,
      data: { token: idToken, companyToken, sessionId: sessionUUID, companyId, companyRuc, companyNrc, companyName, localCode },
    };
  } catch (err) {
    return { ok: false, error: `Acatha login error: ${err instanceof Error ? err.message : String(err)}` };
  }
}

// ── 2. Client management ────────────────────────────────────────────

/**
 * Create or look up a client (receptor) in Acatha.
 * Endpoint: POST /clientes/clientes/ingresar (codigo: 0 for new)
 * Search:   GET  /clientes/clientes/listar
 */
export async function getOrCreateClient(
  session: AcathaSession,
  customerName: string,
  customerEmail: string,
): Promise<Result<{ clientId: string }>> {
  try {
    const headers = sessionHeaders(session);

    // Search for existing client by email
    const searchRes = await fetch(
      acathaUrl(`/clientes/clientes/listar?identificacion=&nombre=${encodeURIComponent(customerEmail)}&isPaged=true&page=1&limit=5`),
      { headers },
    );
    const searchData = await searchRes.json();

    if (!searchData.error && searchData.auto) {
      const clients = Array.isArray(searchData.auto) ? searchData.auto : [];
      const existing = clients.find((c: any) => c.email === customerEmail);
      if (existing) {
        console.log(`[Acatha] Found existing client: ${existing.codigo}`);
        return { ok: true, data: { clientId: existing.codigo.toString() } };
      }
    }

    // Create new client (codigo: 0 = new)
    const createRes = await fetch(acathaUrl('/clientes/clientes/ingresar'), {
      method: 'POST',
      headers,
      body: JSON.stringify({
        infoRegistro: {
          codigo: 0,
          nombre: customerName,
          comercial: customerName,
          email: customerEmail,
          identificacion: '',
          tipoIdentificacion: '',
          direccion: '',
          telefono: '',
        },
      }),
    });
    const createData = await createRes.json();

    if (createData.error) {
      return { ok: false, error: `Client creation failed: ${createData.message || JSON.stringify(createData)}` };
    }

    const clientId = createData.auto?.codigo?.toString() || createData.auto?.toString() || '';
    console.log(`[Acatha] Created client: ${clientId}`);
    return { ok: true, data: { clientId } };
  } catch (err) {
    return { ok: false, error: `Client error: ${err instanceof Error ? err.message : String(err)}` };
  }
}

// ── 3. DTE (Invoice) creation ────────────────────────────────────────

interface DTEItem {
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface DTERequest {
  clientId: string;
  customerName: string;
  customerEmail: string;
  items: DTEItem[];
  totalAmount: number;
}

/**
 * Create a DTE (Consumidor Final invoice) in Acatha and send to Hacienda.
 *
 * Steps:
 *   1. Get sequential number (autorizacion/extraer)
 *   2. Create sale (ventas/sv/ingresar)
 *   3. Send to Hacienda (facturacion-electronica/consumidor-final)
 *   4. Register auth (ventas/registerAuth)
 *   5. Generate PDF (generales/pdfGenerate)
 */
export async function createDTE(
  session: AcathaSession,
  request: DTERequest,
): Promise<Result<{
  dteId: string;
  dteNumber: string;
  controlNumber: string;
  generationCode: string;
  pdfUrl: string | null;
  rawResponse: Record<string, unknown>;
}>> {
  try {
    const headers = sessionHeaders(session);
    const invoiceUUID = crypto.randomUUID();
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toTimeString().split(' ')[0];

    // Step 1: Get sequential authorization
    const seqRes = await fetch(
      acathaUrl(`/autorizacion/extraer?equipo=${encodeURIComponent(env('ACATHA_USER'))}`),
      { headers },
    );
    const seqData = await seqRes.json();

    if (seqData.error) {
      return { ok: false, error: `Sequential number failed: ${seqData.message || 'unknown'}` };
    }

    const seq = seqData.auto || {};
    const ptoEmision = seq.ptoemision || 'M001';
    const establecimiento = seq.establecimiento || 'P001';
    const numActual = seq.numActual || 1;
    const secuencial = String(numActual).padStart(15, '0');
    const controlNumber = `DTE-01-${ptoEmision}${establecimiento}-${secuencial}`;

    // Step 2: Create sale
    const saleBody = {
      identificador: invoiceUUID,
      tipodoc: '01', // Consumidor Final
      tipo_emision: 1, // Electronic
      local: session.localCode,
      ambiente: '00', // 00 = test, 01 = production
      emisor: {
        nit: session.companyRuc,
        nrc: session.companyNrc,
        nombre: session.companyName,
      },
      comprador: {
        nombre: request.customerName,
        correo: request.customerEmail,
      },
      items: request.items.map((item, i) => ({
        numItem: i + 1,
        tipoItem: 2, // Service
        descripcion: item.description,
        cantidad: item.quantity,
        precioUni: item.unitPrice,
        ventaGravada: item.totalPrice,
        codigo: '',
        uniMedida: 99, // Other
      })),
      totales: {
        totalGravada: request.totalAmount,
        subTotalVentas: request.totalAmount,
        montoTotalOperacion: request.totalAmount,
        totalPagar: request.totalAmount,
      },
      formaPago: [{
        codigo: '01', // Cash/electronic
        montoPago: request.totalAmount,
      }],
      numeroControl: controlNumber,
      codigoGeneracion: invoiceUUID,
    };

    const saleRes = await fetch(acathaUrl('/ventas/sv/ingresar'), {
      method: 'POST',
      headers,
      body: JSON.stringify(saleBody),
    });
    const saleData = await saleRes.json();

    if (saleData.error) {
      return { ok: false, error: `Sale creation failed: ${saleData.message || JSON.stringify(saleData)}` };
    }

    const dteId = saleData.auto?.codigo?.toString() || saleData.auto?.id?.toString() || invoiceUUID;

    // Step 3: Send to Hacienda (test environment)
    let selloRecibido = '';
    try {
      const haciendaRes = await fetch(haciendaUrl('facturacion-electronica/consumidor-final'), {
        method: 'POST',
        headers,
        body: JSON.stringify(saleBody),
      });
      const haciendaData = await haciendaRes.json();
      selloRecibido = haciendaData.selloRecibido || '';
      console.log(`[Acatha] Hacienda response: sello=${selloRecibido ? 'yes' : 'no'}`);
    } catch (hErr) {
      console.error('[Acatha] Hacienda submission failed (non-fatal):', hErr);
    }

    // Step 4: Register authorization if we got a sello
    if (selloRecibido) {
      try {
        await fetch(acathaUrl('/ventas/registerAuth'), {
          method: 'POST',
          headers,
          body: JSON.stringify({
            codigo: dteId,
            selloRecibido,
            codigoGeneracion: invoiceUUID,
          }),
        });
      } catch (raErr) {
        console.error('[Acatha] registerAuth failed (non-fatal):', raErr);
      }
    }

    // Step 5: Generate PDF
    let pdfUrl: string | null = null;
    try {
      await fetch(acathaUrl('/generales/pdfGenerate'), {
        method: 'POST',
        headers,
        body: JSON.stringify({
          codigo: dteId,
          template: 'SVRideFactura',
        }),
      });

      // Get the PDF/JSON file URLs
      const filesRes = await fetch(
        acathaUrl(`/ventas/impresion?codigo=${dteId}`),
        { headers },
      );
      const filesData = await filesRes.json();
      if (!filesData.error && filesData.auto) {
        pdfUrl = filesData.auto.pdf || filesData.auto.urlPdf || null;
        if (pdfUrl && !pdfUrl.startsWith('http')) {
          pdfUrl = `${env('ACATHA_BASE_URL')}${pdfUrl}`;
        }
      }
    } catch (pdfErr) {
      console.error('[Acatha] PDF generation failed (non-fatal):', pdfErr);
    }

    return {
      ok: true,
      data: {
        dteId,
        dteNumber: controlNumber,
        controlNumber,
        generationCode: invoiceUUID,
        pdfUrl,
        rawResponse: saleData,
      },
    };
  } catch (err) {
    return { ok: false, error: `DTE creation error: ${err instanceof Error ? err.message : String(err)}` };
  }
}

// ── 4. PDF retrieval ─────────────────────────────────────────────────

/**
 * Download the PDF for a DTE from Acatha.
 * Endpoint: GET /ventas/obtenerRide?codigo={dteId}
 */
export async function getDTEPdf(
  session: AcathaSession,
  dteId: string,
): Promise<Result<{ pdfBytes: Uint8Array; contentType: string }>> {
  try {
    const headers = sessionHeaders(session);

    const res = await fetch(acathaUrl(`/ventas/obtenerRide?codigo=${dteId}`), {
      headers,
    });

    if (!res.ok) {
      return { ok: false, error: `PDF download failed: HTTP ${res.status}` };
    }

    const contentType = res.headers.get('content-type') || 'application/pdf';
    const pdfBytes = new Uint8Array(await res.arrayBuffer());

    return { ok: true, data: { pdfBytes, contentType } };
  } catch (err) {
    return { ok: false, error: `PDF download error: ${err instanceof Error ? err.message : String(err)}` };
  }
}

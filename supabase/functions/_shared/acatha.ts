/**
 * Acatha SIGNUM API v4 — abstraction layer for DTE invoice generation.
 *
 * Auth flow: cognito/login → mailCheckout → autenticar → select company
 * DTE flow:  create/lookup client → create DTE (venta) → retrieve PDF
 *
 * All Acatha-specific request/response shapes are isolated here so the
 * rest of the codebase only deals with our own types.
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

// ── Acatha session (cached token) ────────────────────────────────────
export interface AcathaSession {
  token: string;        // IdToken from Cognito
  companyToken: string;  // Company authorization token
  sessionId: string;     // PHPSESSID from autenticar
  companyId: string;     // Company code
}

// ── Internal helpers ─────────────────────────────────────────────────

function acathaUrl(path: string): string {
  const base = env('ACATHA_BASE_URL'); // e.g. https://devsv.elsalvador.acatha.io
  return `${base}/amfphp/Services/SIGNUM/API/v4${path}`;
}

function authHeaders(): Record<string, string> {
  return {
    'client-id': env('ACATHA_CLIENT_ID'),
    'secret-key': env('ACATHA_SECRET_KEY'),
    'Content-Type': 'application/json',
  };
}

// ── 1. Authentication ────────────────────────────────────────────────

/**
 * Full Acatha auth flow with token caching.
 * Reuses a cached token if it hasn't expired yet (50-minute window).
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
    const [companyToken, phpSessionId] = (cached.session_id || '').split('|');
    return {
      ok: true,
      data: {
        token: cached.token,
        companyToken,
        sessionId: phpSessionId || '',
        companyId: cached.company_id,
      },
    };
  }

  try {
    // Step 1: Cognito login → get IdToken
    const loginRes = await fetch(acathaUrl('/cognito/login'), {
      method: 'POST',
      headers: authHeaders(),
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
      method: 'GET',
      headers: { ...authHeaders(), 'x-csrf-token': idToken },
    });
    const checkData = await checkRes.json();

    if (checkData.error) {
      return { ok: false, error: `Token validation failed: ${checkData.message || 'unknown error'}` };
    }

    // Step 3: Authenticate and get companies (capture PHPSESSID from response)
    const authRes = await fetch(acathaUrl('/login/autenticar'), {
      method: 'POST',
      headers: { ...authHeaders(), 'x-csrf-token': idToken },
    });
    const setCookie = authRes.headers.get('set-cookie') || '';
    const phpSessionMatch = setCookie.match(/PHPSESSID=([^;]+)/);
    const phpSessionId = phpSessionMatch ? phpSessionMatch[1] : '';
    const authData = await authRes.json();

    if (authData.error) {
      return { ok: false, error: `Autenticar failed: ${authData.message || 'unknown error'}` };
    }

    // Step 4: Select company from the empresas list
    const empresas = authData.auto?.empresas || [];
    const company = empresas[0];
    const companyId = company?.codigo?.toString() || '';
    const companyToken = company?.token || '';

    console.log(`Acatha auth: company=${company?.nombre}, id=${companyId}, phpSession=${phpSessionId ? 'yes' : 'no'}`);

    // Cache the session (IdToken valid for 24h, cache for 12h to be safe)
    const expiresAt = new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString();
    await supabase.from('acatha_sessions').insert({
      token: idToken,
      session_id: `${companyToken}|${phpSessionId}`,
      company_id: companyId,
      expires_at: expiresAt,
    });

    // Clean up old sessions
    await supabase
      .from('acatha_sessions')
      .delete()
      .lt('expires_at', new Date().toISOString());

    return {
      ok: true,
      data: { token: idToken, companyToken, sessionId: phpSessionId, companyId },
    };
  } catch (err) {
    return { ok: false, error: `Acatha login error: ${err instanceof Error ? err.message : String(err)}` };
  }
}

// ── 2. Client management ────────────────────────────────────────────

/**
 * Create or look up a client (receptor) in Acatha for the invoice.
 *
 * TODO: Confirm exact endpoint and required fields when API access works.
 * The Swagger spec shows client-related endpoints but the exact DTE
 * client registration endpoint needs verification.
 */
export async function getOrCreateClient(
  session: AcathaSession,
  customerName: string,
  customerEmail: string,
): Promise<Result<{ clientId: string }>> {
  try {
    const headers = {
      ...authHeaders(),
      'x-csrf-token': session.token,
      'authorization': session.companyToken,
      'Session-ID': session.sessionId,
      'Cookie': `PHPSESSID=${session.sessionId}`,
    };

    // TODO: Replace with actual Acatha client lookup/create endpoint
    // Expected flow:
    // 1. Search for existing client by email
    // 2. If not found, create new client
    // For now, return a placeholder that will be replaced when API is confirmed

    console.log(`[Acatha] Would create/lookup client: ${customerName} (${customerEmail})`);

    // Placeholder — will be replaced with actual API call
    return {
      ok: true,
      data: { clientId: 'pending-api-confirmation' },
    };
  } catch (err) {
    return { ok: false, error: `Client creation error: ${err instanceof Error ? err.message : String(err)}` };
  }
}

// ── 3. DTE (Invoice) creation ────────────────────────────────────────

interface DTEItem {
  description: string;
  quantity: number;
  unitPrice: number; // in dollars
  totalPrice: number;
}

interface DTERequest {
  clientId: string;
  customerName: string;
  customerEmail: string;
  items: DTEItem[];
  totalAmount: number; // in dollars
}

/**
 * Build the DTE request body for Acatha.
 *
 * TODO: This is the most critical function to update once the exact
 * Acatha DTE endpoint and body schema are confirmed. The structure
 * below is based on the documentation navigation (Ingresar Venta DTE)
 * and common DTE patterns for El Salvador.
 */
function buildDTEBody(req: DTERequest): Record<string, unknown> {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0]; // YYYY-MM-DD

  // TODO: Replace this entire body with the confirmed Acatha schema
  return {
    infoRegistro: {
      fecha: dateStr,
      clienteCodigo: req.clientId,
      // DTE type: 01 = Factura (Consumer Invoice)
      tipoDte: '01',
      condicionOperacion: 1, // 1 = Contado (cash)
      items: req.items.map((item, i) => ({
        numero: i + 1,
        descripcion: item.description,
        cantidad: item.quantity,
        precioUnitario: item.unitPrice,
        ventaGravada: item.totalPrice,
      })),
      resumen: {
        totalGravada: req.totalAmount,
        subTotalVentas: req.totalAmount,
        montoTotalOperacion: req.totalAmount,
        totalPagar: req.totalAmount,
      },
      receptor: {
        nombre: req.customerName,
        correo: req.customerEmail,
      },
    },
  };
}

/**
 * Create a DTE (electronic tax document / invoice) in Acatha.
 *
 * TODO: Confirm the exact POST endpoint. The documentation references
 * "Ingresar Venta (DTE)" but the Swagger spec only shows /ordenes/save.
 * Likely a separate endpoint or a different Swagger spec for DTE operations.
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
    const headers = {
      ...authHeaders(),
      'x-csrf-token': session.token,
      'authorization': session.companyToken,
      'Session-ID': session.sessionId,
      'Cookie': `PHPSESSID=${session.sessionId}`,
    };

    const body = buildDTEBody(request);

    console.log('[Acatha] Creating DTE with body:', JSON.stringify(body));

    // TODO: Replace with actual DTE creation endpoint
    // Expected: POST /amfphp/Services/SIGNUM/API/v4/ventas/save (or similar)
    const res = await fetch(acathaUrl('/ventas/save'), {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (data.error) {
      return { ok: false, error: `DTE creation failed: ${data.message || JSON.stringify(data)}` };
    }

    // TODO: Map actual response fields once confirmed
    return {
      ok: true,
      data: {
        dteId: data.auto?.codigo?.toString() || data.auto?.id?.toString() || '',
        dteNumber: data.auto?.numeroDte || '',
        controlNumber: data.auto?.numeroControl || '',
        generationCode: data.auto?.codigoGeneracion || '',
        pdfUrl: data.auto?.pdfUrl || null,
        rawResponse: data,
      },
    };
  } catch (err) {
    return { ok: false, error: `DTE creation error: ${err instanceof Error ? err.message : String(err)}` };
  }
}

// ── 4. PDF retrieval ─────────────────────────────────────────────────

/**
 * Retrieve the PDF for a DTE from Acatha.
 *
 * TODO: Confirm the exact endpoint for PDF download.
 * May be something like /ventas/pdf?codigo={dteId} or similar.
 */
export async function getDTEPdf(
  session: AcathaSession,
  dteId: string,
): Promise<Result<{ pdfBytes: Uint8Array; contentType: string }>> {
  try {
    const headers = {
      ...authHeaders(),
      'x-csrf-token': session.token,
      'authorization': session.companyToken,
      'Session-ID': session.sessionId,
      'Cookie': `PHPSESSID=${session.sessionId}`,
    };

    // TODO: Replace with actual PDF endpoint
    const res = await fetch(acathaUrl(`/ventas/pdf?codigo=${dteId}`), {
      method: 'GET',
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

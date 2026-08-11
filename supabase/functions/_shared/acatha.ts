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

// Optional counterpart to env(). Note that `env(key) || fallback` does NOT work
// as a default: env() throws before the || is ever evaluated.
const optEnv = (key: string, fallback: string): string =>
  Deno.env.get(key) || fallback;

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
 * For Consumidor Final (tipo 01), we use "CLIENTES VARIOS" (generic consumer).
 * No client creation needed. The comprador block uses tipo_identificacion: "12".
 */
export function getGenericConsumer(): { tipo_identificacion: string; identificacion: string; nombres: string } {
  return {
    tipo_identificacion: '12',
    identificacion: '9999999999999',
    nombres: 'CLIENTES VARIOS',
  };
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
 * Create a DTE (Consumidor Final invoice) in Acatha, submit to Hacienda, generate PDF.
 *
 * Confirmed flow:
 *   1. Create sale via ventas/sv/ingresar (Acatha-format JSON)
 *   2. Submit to Hacienda via facturacion-electronica/consumidor-final (MH-format dteJson)
 *   3. Register Hacienda response via ventas/registerAuth
 *   4. Generate PDF via generales/pdfGenerate (reportSV format)
 *   5. Get PDF URL via ventas/impresion
 */
export async function createDTE(
  session: AcathaSession,
  request: DTERequest,
): Promise<Result<{
  dteId: string;
  dteNumber: string;
  controlNumber: string;
  generationCode: string;
  selloRecibido: string;
  pdfUrl: string | null;
  rawResponse: Record<string, unknown>;
}>> {
  try {
    const headers = sessionHeaders(session);
    const generationCode = crypto.randomUUID().toUpperCase();
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toTimeString().split(' ')[0];
    const dateFormatted = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;

    // Consumidor Final: IVA is INCLUDED in the price
    // Formula: ivaItem = ventaGravada * 13 / 113
    const ivaAmount = Math.round(request.totalAmount * 13 / 113 * 100) / 100;
    const totalPagar = request.totalAmount; // Price already includes IVA

    const consumer = getGenericConsumer();

    // Use a test item code that exists in Acatha inventory
    const itemCode = optEnv('ACATHA_ITEM_CODE', '000006');

    // ── Step 1: Create sale in Acatha ──
    const saleBody = {
      identificador: generationCode,
      tipodoc: '01',
      tipo_emision: '1',
      local: {
        codigo: parseInt(session.localCode),
        nombre: 'Principal',
        clase: '0', descuento: 100, estado: 1,
      },
      pventa: env('ACATHA_USER'),
      fecha_emision: dateFormatted,
      emisor: {
        ruc: session.companyRuc,
        razon_social: session.companyName,
        nombre_comercial: session.companyName,
        contribuyente_especial: '',
        direccion: '',
        obligado_contabilidad: true,
        establecimiento: {
          punto_emision: '001',
          codigo: session.localCode,
          direccion: '',
        },
      },
      comprador: {
        tipo_identificacion: consumer.tipo_identificacion,
        identificacion: consumer.identificacion,
        nombres: consumer.nombres,
        razon_social: '', direccion: 'N/A',
        email: request.customerEmail || '', telefono: 'S/T', ciudad: '',
      },
      informacion_adicional: {
        Cliente: request.customerName,
        Enviado_a: request.customerEmail || '',
        Direccion: 'N/A', Telefono: 'S/T',
      },
      totales: {
        total_sin_impuestos: request.totalAmount,
        importe_total: totalPagar,
        propina: 0, descuento: 0, descuento_adicional: 0,
        impuestos: [{ codigo: 2, codigo_porcentaje: '3', descuento_adicional: 0, base_imponible: request.totalAmount, valor: ivaAmount }],
        retenerRenta: 0, retenerIva: 0,
        subtotal: request.totalAmount, subtotal12: request.totalAmount,
        subtotal0: 0, noSujeto: 0, subtotal5: 0, totalExenta: 0,
        totalGravada: totalPagar,
      },
      observaciones: request.items[0]?.description || 'Pinklights Purchase',
      moneda: 'USD',
      formaPago: { value: 6, label: 'EFECTIVO' },
      // Acatha's own sale-environment flag, distinct from the MH `ambiente`
      // below and using a different code set. Left as-is by default.
      ambiente: optEnv('ACATHA_AMBIENTE_VENTA', '1'),
      items: request.items.map((item, i) => ({
        codigo_auxiliar: itemCode,
        codigo_principal: itemCode,
        precio_unitario: item.unitPrice,
        cantidad: item.quantity,
        precio_total_sin_impuestos: item.totalPrice,
        descripcion: item.description,
        descuento_porcentaje: 0, descuento_valor: 0,
        detalles_adicionales: {},
        impuestos: [{ codigo: 2, tarifa: '13', codigo_porcentaje: 3, base_imponible: item.totalPrice, valor: Math.round(item.totalPrice * 13 / 113 * 100) / 100 }],
      })),
      cuotas: [], tiposPagos: [], clienteNombreAlterno: '',
      pagos: [{ total: totalPagar, medio: 'EFECTIVO', id_medio: '6' }],
      vendedor: { codigo: null }, sucursal: null,
    };

    console.log('[Acatha] Creating sale...');
    const saleRes = await fetch(acathaUrl('/ventas/sv/ingresar'), {
      method: 'POST', headers, body: JSON.stringify(saleBody),
    });
    const saleData = await saleRes.json();

    if (saleData.error) {
      return { ok: false, error: `Sale creation failed: ${saleData.message || JSON.stringify(saleData)}` };
    }

    const comprobante = saleData.auto?.comprobante?.toString() || '';
    const autorizacion = saleData.auto?.autorizacion || '';
    const ptoEmision = saleData.auto?.puntoEmision || '001';
    const establecimiento = saleData.auto?.establecimiento || '001';
    const numero = saleData.auto?.numero || '000000000000001';
    const controlNumber = `DTE-01-M${establecimiento.padStart(3, '0')}P${ptoEmision.padStart(3, '0')}-${numero}`;

    console.log(`[Acatha] Sale created: comprobante=${comprobante}, control=${controlNumber}`);

    // ── Step 2: Submit to Hacienda ──
    let selloRecibido = '';
    const codActividad = optEnv('ACATHA_COD_ACTIVIDAD', '62010');
    try {
      const dteJson = {
        identificacion: {
          // Ministerio de Hacienda environment: '00' = pruebas, '01' = produccion.
          // Defaults to pruebas so production emission is an explicit opt-in.
          version: 1, ambiente: optEnv('ACATHA_AMBIENTE', '00'), tipoDte: '01',
          numeroControl: controlNumber, codigoGeneracion: generationCode,
          tipoModelo: 1, tipoOperacion: 1,
          tipoContingencia: null, motivoContin: null,
          fecEmi: dateStr, horEmi: timeStr, tipoMoneda: 'USD',
        },
        documentoRelacionado: null,
        // Emitter identity must match what is registered with Hacienda. Every
        // field is overridable so moving to production is a secrets change
        // rather than a code change.
        emisor: {
          nit: session.companyRuc, nrc: session.companyNrc,
          nombre: session.companyName, codActividad,
          descActividad: optEnv('ACATHA_EMISOR_DESC_ACTIVIDAD', 'Servicios'),
          nombreComercial: session.companyName,
          tipoEstablecimiento: '01',
          direccion: {
            departamento: optEnv('ACATHA_EMISOR_DEPARTAMENTO', '07'),
            municipio: optEnv('ACATHA_EMISOR_MUNICIPIO', '01'),
            complemento: optEnv('ACATHA_EMISOR_DIRECCION', 'SONSONATE'),
          },
          telefono: optEnv('ACATHA_EMISOR_TELEFONO', ''),
          correo: env('ACATHA_USER'),
          codEstableMH: null, codEstable: null, codPuntoVentaMH: null, codPuntoVenta: null,
        },
        receptor: null,
        otrosDocumentos: null, ventaTercero: null,
        cuerpoDocumento: request.items.map((item, i) => ({
          numItem: i + 1, tipoItem: 2, numeroDocumento: null,
          codigo: itemCode, codTributo: null,
          descripcion: item.description, cantidad: item.quantity, uniMedida: 99,
          precioUni: item.unitPrice, montoDescu: 0,
          ventaNoSuj: 0, ventaExenta: 0, ventaGravada: item.totalPrice,
          tributos: null, psv: 0, noGravado: 0,
          ivaItem: Math.round(item.totalPrice * 13 / 113 * 100) / 100,
        })),
        resumen: {
          totalNoSuj: 0, totalExenta: 0, totalGravada: request.totalAmount,
          subTotalVentas: request.totalAmount, descuNoSuj: 0, descuExenta: 0,
          descuGravada: 0, porcentajeDescuento: 0, totalDescu: 0, tributos: null,
          subTotal: request.totalAmount, ivaRete1: 0, reteRenta: 0,
          montoTotalOperacion: totalPagar, totalNoGravado: 0,
          totalPagar: totalPagar, totalLetras: '', totalIva: ivaAmount,
          saldoFavor: 0, condicionOperacion: 1,
          pagos: [{ codigo: '01', montoPago: totalPagar, referencia: '', plazo: null, periodo: null }],
          numPagoElectronico: null,
        },
        extension: null, apendice: null,
      };

      const haciendaRes = await fetch(haciendaUrl('facturacion-electronica/consumidor-final'), {
        method: 'POST', headers,
        body: JSON.stringify({
          cliente: { ref: optEnv('ACATHA_COMPANY_UUID', '') },
          idEnvio: 1,
          consumidorFinal: { nit: session.companyRuc, activo: true, dteJson },
        }),
      });
      const haciendaData = await haciendaRes.json();
      const msg = haciendaData.body?.message || haciendaData;
      selloRecibido = msg.selloRecibido || haciendaData.selloRecibido || '';
      console.log(`[Acatha] Hacienda: estado=${msg.estado || '?'}, sello=${selloRecibido ? 'yes' : 'no'}`);
    } catch (hErr) {
      console.error('[Acatha] Hacienda failed (non-fatal):', hErr);
    }

    // ── Step 3: Register Hacienda authorization ──
    if (selloRecibido) {
      try {
        await fetch(acathaUrl('/ventas/registerAuth'), {
          method: 'POST', headers,
          body: JSON.stringify({ identificador: generationCode, selloRecibido, fhProcesamiento: new Date().toISOString() }),
        });
      } catch (raErr) {
        console.error('[Acatha] registerAuth failed (non-fatal):', raErr);
      }
    }

    // ── Step 4: Generate PDF (works even without Hacienda stamp) ──
    let pdfUrl: string | null = null;
    try {
      const pdfBody = {
        identificador: generationCode,
        reportSV: {
          jsonHacienda: {
            idEnvio: 1,
            consumidorFinal: { nit: session.companyRuc, activo: true, dteJson: {} },
          },
          pdfHacienda: {
            local: { codigo: parseInt(session.localCode), nombre: 'Principal', direccion: '', telefono: '' },
            template: 'SVRideFactura',
            reportData: [{
              CodeGenerated: generationCode,
              ControlNumber: controlNumber,
              ReceiptStamp: selloRecibido || 'PENDING',
              TransactionType: 'FACTURA',
              Receiver: { Nit: '', EconomicActivity: '', Direction: 'N/A', Phone: 'S/T', Email: request.customerEmail || '', ComertialName: consumer.nombres, StablishmentType: '' },
              Transmitter: { Nit: session.companyRuc, Nrc: session.companyNrc, EconomicActivity: 'Servicios', Direction: '', Phone: '', Email: env('ACATHA_USER'), ComertialName: session.companyName, StablishmentType: '01', BusinessName: session.companyName },
              Establishment: establecimiento,
              EmissionPoint: ptoEmision,
              InvoiceDate: dateStr,
              Details: request.items.map((item, i) => ({
                Code: itemCode, Number: i + 1, Cant: item.quantity, Unite: 99,
                Name: item.description, UnitPrice: item.unitPrice,
                DiscountIte: 0, SaleUnSujet: 0, SaleExcent: 0, SaleSaved: item.totalPrice,
              })),
              Totals: {
                TotSales: request.totalAmount, Subtotal: request.totalAmount,
                IvaDetained: 0, RetenctionRent: 0,
                MountTotalOperation: totalPagar, TotalPay: totalPagar,
                IvaPorcentaje: [{ Porcentaje: 13, Valor: ivaAmount }],
              },
              ValueInLetters: '',
              ConditionOperation: 'Contado',
            }],
            fileName: selloRecibido || generationCode,
          },
        },
      };

      await fetch(acathaUrl('/generales/pdfGenerate'), {
        method: 'POST', headers, body: JSON.stringify(pdfBody),
      });

      // Get PDF URL
      const filesRes = await fetch(acathaUrl(`/ventas/impresion?claveacceso=${generationCode}`), { headers });
      const filesData = await filesRes.json();
      if (filesData.auto?.url) {
        pdfUrl = filesData.auto.url;
      } else if (filesData.auto?.pdf) {
        pdfUrl = `${env('ACATHA_BASE_URL')}${filesData.auto.pdf}`;
      }
      console.log(`[Acatha] PDF URL: ${pdfUrl || 'none'}`);
    } catch (pdfErr) {
      console.error('[Acatha] PDF generation failed (non-fatal):', pdfErr);
    }

    return {
      ok: true,
      data: {
        dteId: comprobante,
        dteNumber: controlNumber,
        controlNumber,
        generationCode,
        // Empty when Hacienda did not stamp the document. The sale exists in
        // Acatha either way, but without a sello it is not a valid DTE, so the
        // caller has to be able to tell the difference.
        selloRecibido,
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
 * Get the PDF URL for a DTE from Acatha.
 * Uses ventas/impresion to get the URL, then returns it.
 */
export async function getDTEPdf(
  session: AcathaSession,
  generationCode: string,
): Promise<Result<{ pdfUrl: string }>> {
  try {
    const headers = sessionHeaders(session);

    const filesRes = await fetch(
      acathaUrl(`/ventas/impresion?claveacceso=${generationCode}`),
      { headers },
    );
    const filesData = await filesRes.json();

    if (filesData.auto?.url) {
      return { ok: true, data: { pdfUrl: filesData.auto.url } };
    }
    if (filesData.auto?.pdf) {
      return { ok: true, data: { pdfUrl: `${env('ACATHA_BASE_URL')}${filesData.auto.pdf}` } };
    }

    return { ok: false, error: 'PDF URL not found' };
  } catch (err) {
    return { ok: false, error: `PDF retrieval error: ${err instanceof Error ? err.message : String(err)}` };
  }
}

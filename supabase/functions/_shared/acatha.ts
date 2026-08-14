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

/**
 * Which Acatha credential set to use: 'dev' (default) or 'prod'.
 *
 * Production values live under ACATHA_PROD_*, so both environments coexist and
 * switching is a single variable rather than overwriting credentials in place.
 * Supabase secrets are write-only, so an in-place swap could not be undone
 * without asking Acatha to reissue the other set.
 *
 * Any ACATHA_PROD_* value that is not set falls back to its ACATHA_* twin, so
 * only the variables that genuinely differ need duplicating.
 */
const ACATHA_ENV = Deno.env.get('ACATHA_ENV') || 'dev';

function readVar(key: string): string | undefined {
  if (ACATHA_ENV === 'prod' && key.startsWith('ACATHA_')) {
    const prod = Deno.env.get(`ACATHA_PROD_${key.slice('ACATHA_'.length)}`);
    if (prod) return prod;
  }
  return Deno.env.get(key);
}

const env = (key: string): string => {
  const v = readVar(key);
  if (!v) throw new Error(`Missing env var: ${key} (ACATHA_ENV=${ACATHA_ENV})`);
  return v;
};

// Optional counterpart to env(). Note that `env(key) || fallback` does NOT work
// as a default: env() throws before the || is ever evaluated.
const optEnv = (key: string, fallback: string): string =>
  readVar(key) || fallback;

/**
 * Optional HTTP client carrying an extra CA certificate.
 *
 * dev.acatha.com:3000 serves only its leaf certificate and omits the Sectigo
 * intermediate, so Deno cannot build a chain to a trusted root and refuses the
 * connection. macOS and curl paper over this by fetching the intermediate via
 * AIA; Deno does not. Supplying the intermediate through ACATHA_CA_CERT
 * completes the chain. This still verifies the certificate fully, it is not a
 * bypass. Production (sv.acatha.io:3000) serves a complete chain and should
 * leave the variable unset.
 */
let haciendaClient: unknown;
let haciendaClientInit = false;

function getHaciendaClient(): unknown {
  if (haciendaClientInit) return haciendaClient;
  haciendaClientInit = true;

  const pem = Deno.env.get('ACATHA_CA_CERT');
  const create = (Deno as { createHttpClient?: (o: { caCerts: string[] }) => unknown })
    .createHttpClient;

  if (pem && typeof create === 'function') {
    try {
      haciendaClient = create({ caCerts: [pem] });
      console.log('[Acatha] Using supplemental CA certificate for Hacienda');
    } catch (err) {
      console.error('[Acatha] Could not build CA-pinned client:', err);
    }
  }
  return haciendaClient;
}

// ── Amount in words (resumen.totalLetras) ────────────────────────────

const UNIDADES = ['', 'UNO', 'DOS', 'TRES', 'CUATRO', 'CINCO', 'SEIS', 'SIETE', 'OCHO', 'NUEVE',
  'DIEZ', 'ONCE', 'DOCE', 'TRECE', 'CATORCE', 'QUINCE', 'DIECISEIS', 'DIECISIETE',
  'DIECIOCHO', 'DIECINUEVE', 'VEINTE'];
const DECENAS = ['', '', 'VEINTI', 'TREINTA', 'CUARENTA', 'CINCUENTA', 'SESENTA', 'SETENTA',
  'OCHENTA', 'NOVENTA'];
const CENTENAS = ['', 'CIENTO', 'DOSCIENTOS', 'TRESCIENTOS', 'CUATROCIENTOS', 'QUINIENTOS',
  'SEISCIENTOS', 'SETECIENTOS', 'OCHOCIENTOS', 'NOVECIENTOS'];

function centenasALetras(n: number): string {
  if (n === 0) return '';
  if (n === 100) return 'CIEN';
  const c = Math.floor(n / 100);
  const r = n % 100;
  const head = CENTENAS[c];
  if (r === 0) return head;
  let tail: string;
  if (r <= 20) tail = UNIDADES[r];
  else {
    const d = Math.floor(r / 10);
    const u = r % 10;
    tail = d === 2 ? `VEINTI${UNIDADES[u]}` : (u === 0 ? DECENAS[d] : `${DECENAS[d]} Y ${UNIDADES[u]}`);
  }
  return head ? `${head} ${tail}` : tail;
}

function enteroALetras(n: number): string {
  if (n === 0) return 'CERO';
  if (n < 1000) return centenasALetras(n);
  const miles = Math.floor(n / 1000);
  const resto = n % 1000;
  const prefix = miles === 1 ? 'MIL' : `${centenasALetras(miles)} MIL`;
  return resto === 0 ? prefix : `${prefix} ${centenasALetras(resto)}`;
}

/** Local fallback in the same shape Acatha returns: "CINCO 00/100 DOLARES". */
export function totalLetrasLocal(amount: number): string {
  const entero = Math.floor(amount);
  const centavos = Math.round((amount - entero) * 100);
  return `${enteroALetras(entero)} ${String(centavos).padStart(2, '0')}/100 DOLARES`;
}

/**
 * Amount in words for resumen.totalLetras, which Hacienda requires non-empty.
 *
 * Prefers Acatha's own converter so the wording matches what they expect, but
 * that endpoint duplicates the fraction ("CINCO 00/100 ES00/100 DOLARES"), so
 * the stray "ES<nn>/100" is stripped. Falls back to the local converter if the
 * call fails, since an empty value is an automatic rejection.
 */
async function totalEnLetras(session: AcathaSession, amount: number): Promise<string> {
  try {
    const res = await fetch(
      acathaUrl(`/integraciones/sv/numberToWords?cifra=${amount.toFixed(2)}`),
      { headers: sessionHeaders(session) },
    );
    const data = await res.json();
    const raw = typeof data.auto === 'string' ? data.auto : '';
    const cleaned = raw.replace(/\s*ES\d+\/100/g, '').replace(/\s+/g, ' ').trim();
    if (cleaned) return cleaned;
  } catch (err) {
    console.error('[Acatha] numberToWords failed, using local converter:', err);
  }
  return totalLetrasLocal(amount);
}

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
  companyName: string;      // Trade name (nombre comercial)
  companyLegalName: string; // Razon social as registered with Hacienda
  localCode: string;     // Establishment/local code
  // Emisor details Acatha already holds for the company. Reading them here beats
  // duplicating them into secrets, where they would silently go stale or, worse,
  // carry a dev value into production.
  companyUuid: string;   // `cliente.ref` on every Hacienda submission
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  // Acatha's own geography codes for the establishment. Kept so the MH
  // departamento/municipio can be resolved from the API rather than pinned in
  // secrets, once Acatha confirms which field maps to which MH catalog.
  localCityCode: string;      // locales[].ciucodigo, e.g. "505" = SAN SALVADOR
  localProvinceCode: string;  // locales[].provinciaCodigo, e.g. "73"
  // MH catalog codes for the establishment, resolved from ciudad/cargar at
  // login. Empty if the lookup failed, in which case the env fallbacks apply.
  emisorDepartamento: string;
  emisorMunicipio: string;
}

// ── Internal helpers ─────────────────────────────────────────────────

/**
 * The API path segment is case-sensitive and differs per environment:
 * dev.acatha.com serves /amfphp/Services/... (capital S) and sv.acatha.io
 * serves /amfphp/services/... (lowercase). The wrong casing returns an HTML
 * 404 rather than a JSON error, so it fails in a confusing way.
 */
export function acathaUrl(path: string): string {
  const base = env('ACATHA_BASE_URL'); // https://dev.acatha.com | https://sv.acatha.io
  const apiPath = optEnv('ACATHA_API_PATH', '/amfphp/Services/SIGNUM/API/v4');
  return `${base}${apiPath}${path}`;
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
export function sessionHeaders(session: AcathaSession): Record<string, string> {
  return {
    ...baseHeaders(),
    'x-csrf-token': session.token,
    'authorization': session.companyToken,
    'Session-ID': session.sessionId,
  };
}

/**
 * Resolve the MH departamento and municipio for an establishment.
 *
 * ciudad/cargar searches by name fragment, not by code, and returns both codes
 * per city: codigoProvinciaOrigen is the departamento and codigoOrigen the
 * municipio. Hacienda wants two characters, so single digits are padded.
 *
 * The name search is ambiguous on its own — "san sal" also matches SAN SALVADOR
 * CENTRO/ESTE/OESTE, which are different municipios sharing one departamento —
 * so the row is pinned by the establishment's own city code.
 */
async function resolveEmisorGeo(
  cityCode: string,
  cityName: string,
  countryCode: string,
  headers: Record<string, string>,
): Promise<{ departamento: string; municipio: string }> {
  const empty = { departamento: '', municipio: '' };
  if (!cityCode || !cityName) return empty;

  try {
    const url = acathaUrl(
      `/ciudad/cargar?page=1&limit=50&isPaged=true` +
      `&ciudad=${encodeURIComponent(cityName.trim())}` +
      `&paisCodigo=${encodeURIComponent(countryCode || '37')}`,
    );
    const data = await (await fetch(url, { headers })).json();
    const rows = data?.auto?.auto ?? data?.auto ?? [];
    const match = (Array.isArray(rows) ? rows : []).find(
      (r: { codigo?: number }) => String(r.codigo) === String(cityCode),
    );
    if (!match) {
      console.warn(`[Acatha] No city row matched code ${cityCode} for "${cityName}"`);
      return empty;
    }
    const pad = (v: unknown) => String(v ?? '').padStart(2, '0');
    return {
      departamento: pad(match.codigoProvinciaOrigen),
      municipio: pad(match.codigoOrigen),
    };
  } catch (err) {
    console.error('[Acatha] Geo lookup failed:', err);
    return empty;
  }
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
    // session_id holds JSON. Rows written before that change hold a pipe-joined
    // string, so fall back rather than break on a session cached mid-deploy.
    const raw = cached.session_id || '';
    let parsed: Record<string, string> | null = null;
    try { parsed = JSON.parse(raw); } catch { parsed = null; }
    const parts = raw.split('|');

    return {
      ok: true,
      data: {
        token: cached.token,
        companyToken: parsed?.companyToken ?? parts[0] ?? '',
        sessionId: parsed?.sessionUUID ?? parts[1] ?? '',
        companyId: cached.company_id,
        companyRuc: parsed?.companyRuc ?? parts[2] ?? '',
        companyNrc: parsed?.companyNrc ?? parts[3] ?? '',
        companyName: parsed?.companyName ?? parts[4] ?? '',
        companyLegalName: parsed?.companyLegalName ?? parsed?.companyName ?? parts[4] ?? '',
        localCode: parsed?.localCode ?? parts[5] ?? '',
        companyUuid: parsed?.companyUuid ?? '',
        companyAddress: parsed?.companyAddress ?? '',
        companyPhone: parsed?.companyPhone ?? '',
        companyEmail: parsed?.companyEmail ?? '',
        localCityCode: parsed?.localCityCode ?? '',
        localProvinceCode: parsed?.localProvinceCode ?? '',
        emisorDepartamento: parsed?.emisorDepartamento ?? '',
        emisorMunicipio: parsed?.emisorMunicipio ?? '',
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
    const companyLegalName = company.nombre || company.comercial || '';
    const localCode = company.locales?.[0]?.codigo?.toString() || '';
    const companyUuid = company.uuid || '';
    const companyAddress = company.direccion || company.locales?.[0]?.direccion || '';
    const companyPhone = company.telefono || company.locales?.[0]?.telefono || '';
    const companyEmail = company.email || '';
    const localCityCode = company.locales?.[0]?.ciucodigo?.toString() || '';
    const localProvinceCode = company.locales?.[0]?.provinciaCodigo?.toString() || '';
    const localCityName = company.locales?.[0]?.ciudad?.toString() || '';
    const localCountryCode = company.locales?.[0]?.paisCodigo?.toString() || '37';
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

    const geo = await resolveEmisorGeo(localCityCode, localCityName, localCountryCode, {
      ...baseHeaders(), 'x-csrf-token': idToken,
      authorization: companyToken, 'Session-ID': sessionUUID,
    });

    console.log(
      `Acatha auth complete: company=${companyName}, id=${companyId}, ` +
      `geo=${geo.departamento || '?'}/${geo.municipio || '?'}`,
    );

    // Cache the session (IdToken valid 24h, cache for 12h)
    const expiresAt = new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString();
    const sessionData = JSON.stringify({
      companyToken, sessionUUID, companyRuc, companyNrc, companyName, localCode,
      companyUuid, companyAddress, companyPhone, companyEmail,
      companyLegalName, localCityCode, localProvinceCode,
      emisorDepartamento: geo.departamento, emisorMunicipio: geo.municipio,
    });
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
  /**
   * Acatha catalog code (`barras`) for the line item. Each package has its own
   * item in production, so this comes from credit_packages rather than a single
   * global secret. Falls back to ACATHA_ITEM_CODE when absent.
   */
  itemCode?: string;
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
  trace: Array<Record<string, unknown>>;
  dteId: string;
  dteNumber: string;
  controlNumber: string;
  generationCode: string;
  selloRecibido: string;
  haciendaError: string;
  haciendaResponse: Record<string, unknown>;
  dteJson: Record<string, unknown>;
  pdfUrl: string | null;
  rawResponse: Record<string, unknown>;
}>> {
  // Every outbound call is recorded so a rejection can be handed to Acatha
  // verbatim instead of described. registerAuth and pdfGenerate are non-fatal,
  // which previously meant their failures were invisible.
  const trace: Array<Record<string, unknown>> = [];
  const record = (step: string, url: string, req: unknown, res: unknown) =>
    trace.push({ step, url, request: req, response: res });

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
    const itemCode = request.itemCode || optEnv('ACATHA_ITEM_CODE', '000006');

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
    record('1. ventas/sv/ingresar', acathaUrl('/ventas/sv/ingresar'), saleBody, saleData);

    if (saleData.error) {
      return { ok: false, error: `Sale creation failed: ${saleData.message || JSON.stringify(saleData)}` };
    }

    const comprobante = saleData.auto?.comprobante?.toString() || '';
    const autorizacion = saleData.auto?.autorizacion || '';
    const ptoEmision = saleData.auto?.puntoEmision || '001';
    const establecimiento = saleData.auto?.establecimiento || '001';
    const numero = saleData.auto?.numero || '000000000000001';
    // MH requires exactly 31 characters: "DTE-01-" + 8 (MxxxPyyy) + "-" + a
    // 15-digit sequence. Acatha returns the sequence unpadded, so pad it here or
    // Hacienda rejects with "El numero de control debe tener al menos 31 caracteres".
    const controlNumber =
      `DTE-01-M${establecimiento.padStart(3, '0')}P${ptoEmision.padStart(3, '0')}` +
      `-${String(numero).padStart(15, '0')}`;

    console.log(`[Acatha] Sale created: comprobante=${comprobante}, control=${controlNumber}`);

    // ── Step 2: Submit to Hacienda ──
    let selloRecibido = '';
    let haciendaError = '';
    let haciendaResponse: Record<string, unknown> = {};
    // Kept for the invoice record: this is the exact payload Hacienda received.
    let transmittedDte: Record<string, unknown> = {};
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
          // Hacienda registers the razon social; the trade name goes in
          // nombreComercial. Sending the trade name as `nombre` risks a mismatch
          // against the taxpayer record.
          nombre: session.companyLegalName || session.companyName, codActividad,
          descActividad: optEnv('ACATHA_EMISOR_DESC_ACTIVIDAD', 'Servicios'),
          nombreComercial: session.companyName,
          tipoEstablecimiento: '01',
          direccion: {
            departamento: session.emisorDepartamento || optEnv('ACATHA_EMISOR_DEPARTAMENTO', '07'),
            municipio: session.emisorMunicipio || optEnv('ACATHA_EMISOR_MUNICIPIO', '01'),
            complemento: session.companyAddress || optEnv('ACATHA_EMISOR_DIRECCION', 'SONSONATE'),
          },
          // Session first: these come from Acatha for the company we are actually
          // authenticated as, so they cannot go stale or carry a dev value into
          // production. Env is only a fallback for what the session lacks.
          telefono: session.companyPhone || optEnv('ACATHA_EMISOR_TELEFONO', ''),
          correo: session.companyEmail || env('ACATHA_USER'),
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
          totalPagar: totalPagar, totalLetras: await totalEnLetras(session, totalPagar),
          totalIva: ivaAmount,
          saldoFavor: 0, condicionOperacion: 1,
          pagos: [{ codigo: '01', montoPago: totalPagar, referencia: '', plazo: null, periodo: null }],
          numPagoElectronico: null,
        },
        extension: null, apendice: null,
      };
      transmittedDte = dteJson;

      const client = getHaciendaClient();
      const haciendaBody = {
        cliente: { ref: session.companyUuid || optEnv('ACATHA_COMPANY_UUID', '') },
        idEnvio: 1,
        consumidorFinal: { nit: session.companyRuc, activo: true, dteJson },
      };
      const haciendaRes = await fetch(haciendaUrl('facturacion-electronica/consumidor-final'), {
        method: 'POST', headers,
        body: JSON.stringify(haciendaBody),
        ...(client ? { client } : {}),
      } as RequestInit);
      const haciendaData = await haciendaRes.json();
      haciendaResponse = haciendaData;
      record('2. facturacion-electronica/consumidor-final',
        haciendaUrl('facturacion-electronica/consumidor-final'), haciendaBody, haciendaData);
      const msg = haciendaData.body?.message || haciendaData;
      selloRecibido = msg.selloRecibido || haciendaData.selloRecibido || '';
      console.log(`[Acatha] Hacienda: estado=${msg.estado || '?'}, sello=${selloRecibido ? 'yes' : 'no'}`);

      if (!selloRecibido) {
        // Hacienda rejects with the reason in descripcionMsg/observaciones.
        // Surface it: without this the caller only sees "no sello" and has no
        // way to find out which field the DTE was rejected for.
        const obs = Array.isArray(msg.observaciones)
          ? msg.observaciones.join('; ')
          : (msg.observaciones || '');
        haciendaError = [msg.estado, msg.descripcionMsg, obs]
          .filter(Boolean).join(' | ') || JSON.stringify(haciendaData).slice(0, 500);
        console.error(`[Acatha] Hacienda rejected: ${haciendaError}`);
      }
    } catch (hErr) {
      haciendaError = `Hacienda request failed: ${hErr instanceof Error ? hErr.message : String(hErr)}`;
      console.error('[Acatha]', haciendaError);
    }

    // ── Step 3: Register Hacienda authorization ──
    if (selloRecibido) {
      try {
        // Acatha's handler array_merges `extras`, so omitting it crashes the
        // endpoint with "array_merge(): Argument #2 must be of type array, null
        // given" (HTTP 500) no matter how correct the rest of the body is.
        // `claveacceso` is the pre-authorization access key from the sale;
        // registerAuth overwrites it with the sello once it succeeds.
        const tipoComprobante = optEnv('ACATHA_TIPO_DTE', '01');
        const raBody = {
          identificador: generationCode,
          tipoComprobante,
          authResponse: haciendaResponse,
          extras: { ...haciendaResponse, claveacceso: autorizacion, tipoComprobante },
          claveacceso: autorizacion,
        };
        const raRes = await fetch(acathaUrl('/ventas/registerAuth'), {
          method: 'POST', headers, body: JSON.stringify(raBody),
        });
        const raText = await raRes.text();
        let raData: unknown;
        try { raData = JSON.parse(raText); }
        catch { raData = { _nonJson: true, httpStatus: raRes.status, body: raText.slice(0, 800) }; }
        record('3. ventas/registerAuth', acathaUrl('/ventas/registerAuth'), raBody, raData);
        if ((raData as { error?: boolean })?.error) {
          console.error('[Acatha] registerAuth error:', (raData as { message?: string }).message);
        }
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

      const pdfRes = await fetch(acathaUrl('/generales/pdfGenerate'), {
        method: 'POST', headers, body: JSON.stringify(pdfBody),
      });
      const pdfData = await pdfRes.json().catch(() => ({ _nonJson: true }));
      record('4. generales/pdfGenerate', acathaUrl('/generales/pdfGenerate'), pdfBody, pdfData);
      if (pdfData?.error) console.error('[Acatha] pdfGenerate returned error:', pdfData.message);

      // Get PDF URL
      const filesRes = await fetch(acathaUrl(`/ventas/impresion?claveacceso=${generationCode}`), { headers });
      const filesData = await filesRes.json();
      record('5. ventas/impresion', acathaUrl(`/ventas/impresion?claveacceso=${generationCode}`), null, filesData);
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
        haciendaError,
        haciendaResponse,
        dteJson: transmittedDte,
        trace,
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

/**
 * TEMPORARY diagnostic function.
 *
 * Lists and creates items in the Acatha inventory so we can find or provision a
 * valid item code for DTE sales. Delete once ACATHA_ITEM_CODE is settled:
 *   supabase functions delete acatha-items
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.0'
import { acathaLogin } from '../_shared/acatha.ts'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const API_PATH = Deno.env.get('ACATHA_API_PATH') || '/amfphp/Services/SIGNUM/API/v4';
const apiUrl = (path: string) => `${Deno.env.get('ACATHA_BASE_URL')}${API_PATH}${path}`;

Deno.serve(async (req) => {
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  try {
    const body = await req.json().catch(() => ({}));
    const action = body.action || 'list';

    const login = await acathaLogin(supabase);
    if (!login.ok) {
      return Response.json({ error: `login failed: ${login.error}` }, { status: 502 });
    }
    const s = login.data;

    const headers: Record<string, string> = {
      'client-id': Deno.env.get('ACATHA_CLIENT_ID')!,
      'secret-key': Deno.env.get('ACATHA_SECRET_KEY')!,
      'Content-Type': 'application/json',
      'x-csrf-token': s.token,
      'authorization': s.companyToken,
      'Session-ID': s.sessionId,
    };

    const session = {
      localCode: s.localCode,
      companyId: s.companyId,
      companyName: s.companyName,
      companyRuc: s.companyRuc,
    };

    if (action === 'list') {
      const ident = body.identificacion || '9999999999999';
      const estab = body.establecimiento || s.localCode;
      const url = apiUrl(
        `/inventario/items/searchItemsLocalSimpleSale?local=${s.localCode}` +
        `&identificacion=${ident}&establecimiento=${estab}&isPaged=false&limit=200`,
      );
      const res = await fetch(url, { headers });
      const data = await res.json();
      return Response.json({ session, httpStatus: res.status, data });
    }

    if (action === 'tipoId') {
      const out: Record<string, string> = {};
      for (const t of ['SV', 'sv', '1', '2', '01', 'N', 'J', 'natural']) {
        const res = await fetch(apiUrl(`/cuenta/tipoId/listar?tipo=${t}`), { headers });
        out[`tipo=${t}`] = (await res.text()).slice(0, 500);
      }
      return Response.json({ session, out });
    }

    if (action === 'probeAuth') {
      // Run the full auth chain against an arbitrary host with arbitrary
      // client-id/secret-key, without touching stored secrets or the cached
      // session. Used to validate production credentials before switching over.
      const base = body.baseUrl || Deno.env.get('ACATHA_BASE_URL');
      const apiPath = body.apiPath || API_PATH;
      const url = (path: string) => `${base}${apiPath}${path}`;
      const h = {
        'client-id': body.clientId || Deno.env.get('ACATHA_CLIENT_ID'),
        'secret-key': body.secretKey || Deno.env.get('ACATHA_SECRET_KEY'),
        'Content-Type': 'application/json',
      };
      const steps: Record<string, unknown> = { base, clientId: h['client-id'] };

      const loginRes = await fetch(url('/cognito/login'), {
        method: 'POST', headers: h,
        body: JSON.stringify({ AuthParameters: {
          user: body.user || Deno.env.get('ACATHA_USER'),
          pass: body.pass || Deno.env.get('ACATHA_PASSWORD'),
        } }),
      });
      const loginData = await loginRes.json();
      const idToken = loginData.auto?.token?.AuthenticationResult?.IdToken;
      steps.cognitoLogin = idToken ? 'OK' : (loginData.message || JSON.stringify(loginData).slice(0, 300));
      if (!idToken) return Response.json({ steps }, { status: 502 });

      const authRes = await fetch(url('/login/autenticar'), {
        method: 'POST', headers: { ...h, 'x-csrf-token': idToken },
      });
      const authData = await authRes.json();
      steps.autenticar = authData.error ? (authData.message || 'error') : 'OK';
      steps.empresas = (authData.auto?.empresas ?? []).map((e: Record<string, unknown>) => ({
        codigo: e.codigo, ruc: e.ruc, nrc: e.nrc,
        nombre: e.nombre, comercial: e.comercial,
        locales: (e.locales ?? []).map((l: Record<string, unknown>) => ({ codigo: l.codigo, nombre: l.nombre })),
      }));
      return Response.json({ steps });
    }

    if (action === 'ventas') {
      const qs = body.query ?? `local=${s.localCode}&isPaged=false&limit=200`;
      const url = apiUrl(`/ventas/listar?${qs}`);
      const res = await fetch(url, { headers });
      const text = await res.text();
      let data: unknown;
      try { data = JSON.parse(text); } catch { data = { _nonJson: true, body: text.slice(0, 600) }; }
      return Response.json({ session, url, httpStatus: res.status, data });
    }

    if (action === 'units') {
      const res = await fetch(apiUrl('/inventario/unidades/listar'), { headers });
      return Response.json({ session, data: await res.json() });
    }

    if (action === 'numberToWords') {
      const v = body.valor ?? '5.00';
      const base = apiUrl('/integraciones/sv/numberToWords');
      const attempts: Record<string, string> = {};

      for (const key of ['Cifra', 'cifra', 'CIFRA', 'numero', 'valor', 'monto', 'cantidad']) {
        const r = await fetch(`${base}?${key}=${v}`, { headers });
        attempts[`GET ${key}`] = (await r.text()).slice(0, 160);
      }
      for (const key of ['Cifra', 'cifra']) {
        const r = await fetch(base, {
          method: 'POST', headers, body: JSON.stringify({ [key]: v }),
        });
        attempts[`POST ${key}`] = (await r.text()).slice(0, 160);
      }
      return Response.json({ session, attempts });
    }

    if (action === 'create') {
      const res = await fetch(apiUrl('/inventario/items/save'), {
        method: 'POST',
        headers,
        body: JSON.stringify(body.item),
      });
      const data = await res.json();
      return Response.json({ session, httpStatus: res.status, sent: body.item, data });
    }

    if (action === 'ccfTest') {
      // Comprobante de Credito Fiscal (tipoDte 03). Unlike Consumidor Final,
      // prices are IVA-EXCLUSIVE, items carry tributos:["20"] instead of
      // ivaItem, and a real taxpayer receptor is mandatory.
      const net = Number(body.net ?? 10);
      const iva = Math.round(net * 0.13 * 100) / 100;
      const total = Math.round((net + iva) * 100) / 100;

      const receptor = body.receptor ?? {
        nit: '06141901901524',
        nrc: '3260728',
        nombre: 'INGRID BEATRIZ RIVERA ORTIZ /RAZON SOCIAL',
        codActividad: '62090',
        descActividad: 'Otras actividades de tecnología de la información',
        nombreComercial: 'Ingrid Beatriz Rivera Ortiz',
        direccion: { departamento: '03', municipio: '03', complemento: 'SAN SALVADOR' },
        telefono: '+50332132166',
        correo: 'test@pink-lights.be',
      };

      const generationCode = crypto.randomUUID().toUpperCase();
      const now = new Date();
      const dateStr = now.toISOString().slice(0, 10);
      const timeStr = now.toISOString().slice(11, 19);

      const steps: Record<string, unknown> = { net, iva, total, receptor };

      // Step 1: register the sale in Acatha with tipodoc 03
      const saleBody: any = {
        identificador: generationCode,
        tipodoc: '03',
        tipo_emision: '1',
        local: { codigo: parseInt(s.localCode), nombre: 'Principal', clase: '0', descuento: 100, estado: 1 },
        pventa: Deno.env.get('ACATHA_USER'),
        fecha_emision: `${dateStr.slice(8, 10)}/${dateStr.slice(5, 7)}/${dateStr.slice(0, 4)}`,
        emisor: {
          ruc: s.companyRuc, razon_social: s.companyName, nombre_comercial: s.companyName,
          contribuyente_especial: '', direccion: '', obligado_contabilidad: true,
          establecimiento: { punto_emision: '001', codigo: s.localCode, direccion: '' },
        },
        comprador: {
          tipo_identificacion: '36',
          identificacion: receptor.nit,
          nombres: receptor.nombre,
          razon_social: receptor.nombre,
          direccion: receptor.direccion.complemento,
          email: receptor.correo, telefono: receptor.telefono, ciudad: '',
        },
        informacion_adicional: { Cliente: receptor.nombre, Enviado_a: receptor.correo },
        totales: {
          total_sin_impuestos: net, importe_total: total,
          propina: 0, descuento: 0, descuento_adicional: 0,
          impuestos: [{ codigo: 2, codigo_porcentaje: '3', descuento_adicional: 0, base_imponible: net, valor: iva }],
          retenerRenta: 0, retenerIva: 0,
          subtotal: net, subtotal12: net, subtotal0: 0, noSujeto: 0, subtotal5: 0,
          totalExenta: 0, totalGravada: net,
        },
        observaciones: 'Pinklights - CCF test',
        moneda: 'USD',
        formaPago: { value: 6, label: 'EFECTIVO' },
        ambiente: Deno.env.get('ACATHA_AMBIENTE_VENTA') || '1',
        items: [{
          codigo_auxiliar: Deno.env.get('ACATHA_ITEM_CODE') || '0001',
          codigo_principal: Deno.env.get('ACATHA_ITEM_CODE') || '0001',
          precio_unitario: net, cantidad: 1, precio_total_sin_impuestos: net,
          descripcion: 'Pinklights - visibility package (CCF test)',
          descuento_porcentaje: 0, descuento_valor: 0, detalles_adicionales: {},
          impuestos: [{ codigo: 2, tarifa: '13', codigo_porcentaje: 3, base_imponible: net, valor: iva }],
        }],
        cuotas: [], tiposPagos: [], clienteNombreAlterno: '',
        pagos: [{ total: total, medio: 'EFECTIVO', id_medio: '6' }],
        vendedor: { codigo: null }, sucursal: null,
      };

      // Acatha rejects unknown tipo_identificacion values with a generic
      // "No se encuentra el tipo de identificacion tributario", and the
      // cuenta/tipoId/listar catalog comes back empty, so probe the plausible
      // codes and keep the first the API accepts.
      const candidates: string[] = body.tipoIdent ? [body.tipoIdent] : ['36', '12', '13', '37', '02', '03'];
      const probe: Record<string, string> = {};
      let saleData: Record<string, unknown> | null = null;

      for (const t of candidates) {
        saleBody.comprador.tipo_identificacion = t;
        saleBody.identificador = crypto.randomUUID().toUpperCase();
        const r = await fetch(apiUrl('/ventas/sv/ingresar'), {
          method: 'POST', headers, body: JSON.stringify(saleBody),
        });
        const d = await r.json();
        probe[`tipo_identificacion=${t}`] = d.error ? String(d.message).slice(0, 120) : 'ACCEPTED';
        if (!d.error) { saleData = d; steps.tipoIdentUsed = t; break; }
      }
      steps.probe = probe;
      steps.sale = saleData;

      if (!saleData) return Response.json({ session, steps }, { status: 502 });

      const auto = (saleData as any).auto;
      const estab = (auto?.establecimiento || '001').toString();
      const pto = (auto?.puntoEmision || '001').toString();
      const numero = (auto?.numero || '1').toString();
      const controlNumber =
        `DTE-03-M${estab.padStart(3, '0')}P${pto.padStart(3, '0')}-${numero.padStart(15, '0')}`;
      steps.controlNumber = controlNumber;

      // totalLetras via Acatha's converter, stripping its duplicated fraction
      let totalLetras = '';
      try {
        const w = await fetch(apiUrl(`/integraciones/sv/numberToWords?cifra=${total.toFixed(2)}`), { headers });
        const wd = await w.json();
        totalLetras = String(wd.auto || '').replace(/\s*ES\d+\/100/g, '').replace(/\s+/g, ' ').trim();
      } catch { /* fall through */ }
      steps.totalLetras = totalLetras;

      const dteJson = {
        identificacion: {
          version: 3, ambiente: Deno.env.get('ACATHA_AMBIENTE') || '00', tipoDte: '03',
          numeroControl: controlNumber, codigoGeneracion: generationCode,
          tipoModelo: 1, tipoOperacion: 1, tipoContingencia: null, motivoContin: null,
          fecEmi: dateStr, horEmi: timeStr, tipoMoneda: 'USD',
        },
        documentoRelacionado: null,
        emisor: {
          nit: s.companyRuc, nrc: s.companyNrc, nombre: s.companyName,
          codActividad: Deno.env.get('ACATHA_COD_ACTIVIDAD') || '62020',
          descActividad: Deno.env.get('ACATHA_EMISOR_DESC_ACTIVIDAD') || 'Servicios',
          nombreComercial: s.companyName, tipoEstablecimiento: '01',
          direccion: {
            departamento: Deno.env.get('ACATHA_EMISOR_DEPARTAMENTO') || '07',
            municipio: Deno.env.get('ACATHA_EMISOR_MUNICIPIO') || '01',
            complemento: Deno.env.get('ACATHA_EMISOR_DIRECCION') || 'SONSONATE',
          },
          telefono: Deno.env.get('ACATHA_EMISOR_TELEFONO') || '2222-2222',
          correo: Deno.env.get('ACATHA_USER'),
          codEstableMH: null, codEstable: null, codPuntoVentaMH: null, codPuntoVenta: null,
        },
        receptor,
        otrosDocumentos: null, ventaTercero: null,
        cuerpoDocumento: [{
          numItem: 1, tipoItem: 2, numeroDocumento: null,
          codigo: Deno.env.get('ACATHA_ITEM_CODE') || '0001', codTributo: null,
          descripcion: 'Pinklights - visibility package (CCF test)',
          cantidad: 1, uniMedida: 99, precioUni: net, montoDescu: 0,
          ventaNoSuj: 0, ventaExenta: 0, ventaGravada: net,
          tributos: ['20'], psv: 0, noGravado: 0,
        }],
        resumen: {
          totalNoSuj: 0, totalExenta: 0, totalGravada: net,
          subTotalVentas: net, descuNoSuj: 0, descuExenta: 0, descuGravada: 0,
          porcentajeDescuento: 0, totalDescu: 0,
          tributos: [{ codigo: '20', descripcion: 'Impuesto al Valor Agregado 13%', valor: iva }],
          subTotal: net, ivaPerci1: 0, ivaRete1: 0, reteRenta: 0,
          montoTotalOperacion: total, totalNoGravado: 0, totalPagar: total,
          totalLetras, saldoFavor: 0, condicionOperacion: 1,
          pagos: [{ codigo: '01', montoPago: total, referencia: '', plazo: null, periodo: null }],
          numPagoElectronico: null,
        },
        extension: null, apendice: null,
      };
      steps.dteJson = dteJson;

      const client = (() => {
        const pem = Deno.env.get('ACATHA_CA_CERT');
        const mk = (Deno as { createHttpClient?: (o: { caCerts: string[] }) => unknown }).createHttpClient;
        return pem && typeof mk === 'function' ? mk({ caCerts: [pem] }) : undefined;
      })();

      const hRes = await fetch(
        `${Deno.env.get('ACATHA_HACIENDA_URL')}/facturacion-electronica/credito-fiscal`,
        {
          method: 'POST', headers,
          body: JSON.stringify({
            cliente: { ref: Deno.env.get('ACATHA_COMPANY_UUID') || '' },
            idEnvio: 1,
            comprobanteCreditoFiscal: { nit: s.companyRuc, activo: true, dteJson },
          }),
          ...(client ? { client } : {}),
        } as RequestInit,
      );
      steps.hacienda = await hRes.json();
      return Response.json({ session, steps });
    }

    if (action === 'tlsTest') {
      const target = body.url || `${Deno.env.get('ACATHA_HACIENDA_URL')}/facturacion-electronica/consumidor-final`;
      const result: Record<string, unknown> = {
        target,
        hasCreateHttpClient: typeof (Deno as { createHttpClient?: unknown }).createHttpClient === 'function',
      };

      try {
        const r = await fetch(target, { method: 'GET' });
        result.plainFetch = `HTTP ${r.status}`;
      } catch (e) {
        result.plainFetch = `FAILED: ${e instanceof Error ? e.message : String(e)}`;
      }

      if (body.caCert && result.hasCreateHttpClient) {
        try {
          const mk = (Deno as unknown as {
            createHttpClient: (o: { caCerts: string[] }) => unknown;
          }).createHttpClient;
          const client = mk({ caCerts: [body.caCert] });
          const r = await fetch(target, { method: 'GET', client } as RequestInit);
          result.customCaFetch = `HTTP ${r.status}`;
        } catch (e) {
          result.customCaFetch = `FAILED: ${e instanceof Error ? e.message : String(e)}`;
        }
      }

      return Response.json(result);
    }

    return Response.json({ error: `unknown action: ${action}` }, { status: 400 });
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
  }
});

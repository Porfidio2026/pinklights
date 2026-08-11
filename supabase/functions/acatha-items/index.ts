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

const apiUrl = (path: string) =>
  `${Deno.env.get('ACATHA_BASE_URL')}/amfphp/Services/SIGNUM/API/v4${path}`;

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

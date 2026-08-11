/**
 * TEMPORARY diagnostic for the DitoBanx integration.
 *
 * Creates a checkout session with a configurable customer name/email so the
 * provider's validation rules can be probed without editing create-payment.
 * No charge is made; it only opens a session.
 *
 * Delete when done:  supabase functions delete dito-test
 */

import md5 from 'https://esm.sh/js-md5@0.8.3'

const API = Deno.env.get('DITOBANX_API_URL')!;
const KEY = Deno.env.get('DITOBANX_MERCHANT_KEY')!;
const PASS = Deno.env.get('DITOBANX_MERCHANT_PASSWORD')!;
const SITE_URL = Deno.env.get('SITE_URL') || 'http://localhost:8080';

async function hash(order: string, amount: string, cur: string, desc: string) {
  const raw = (order + amount + cur + desc + PASS).toUpperCase();
  const buf = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(md5(raw)));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

Deno.serve(async (req) => {
  try {
    const body = await req.json().catch(() => ({}));
    const names: string[] = body.names ?? [body.name ?? 'Test User'];
    const email = body.email ?? 'test@pink-lights.be';
    const amount = body.amount ?? '5.00';
    const desc = body.description ?? 'Pinklights - 1 Day Visibility';
    const results: Record<string, unknown> = {};

    for (const name of names) {
      const order = `PLTEST-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
      const h = await hash(order, amount, 'USD', desc);
      const res = await fetch(`${API}/api/v1/session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          merchant_key: KEY,
          operation: 'purchase',
          methods: ['card'],
          order: { number: order, amount, currency: 'USD', description: desc },
          success_url: `${SITE_URL}/payment-success?order=${order}`,
          cancel_url: `${SITE_URL}/buy-credits`,
          customer: { name, email },
          hash: h,
        }),
      });
      const data = await res.json().catch(() => ({ _nonJson: true }));
      const errs = (data.errors ?? []).map((e: { error_message?: string }) => e.error_message);
      results[name] = {
        http: res.status,
        ok: res.ok && !data.error_code,
        errors: errs.length ? errs : undefined,
        checkoutUrl: data.redirect_url || data.checkout_url || undefined,
        sessionId: data.session_id || data.id || undefined,
      };
    }

    return Response.json({ apiHost: new URL(API).host, siteUrl: SITE_URL, results });
  } catch (err) {
    return Response.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
});

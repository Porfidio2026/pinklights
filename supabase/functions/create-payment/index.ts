import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.0'
import { corsHeaders } from '../_shared/cors.ts'
import md5 from 'https://esm.sh/js-md5@0.8.3'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const DITOBANX_API_URL = Deno.env.get('DITOBANX_API_URL')!;
const DITOBANX_MERCHANT_KEY = Deno.env.get('DITOBANX_MERCHANT_KEY')!;
const DITOBANX_MERCHANT_PASSWORD = Deno.env.get('DITOBANX_MERCHANT_PASSWORD')!;
const SITE_URL = Deno.env.get('SITE_URL') || 'http://localhost:8080';

// Packages come from public.credit_packages so a price change takes effect
// immediately. They used to be hardcoded here and again in BuyDayCredits.tsx,
// which meant editing two files and redeploying, with nothing keeping the two
// in step.

/**
 * DitoBanx rejects customer.name unless it is at least two whitespace-separated
 * words of two or more ASCII letters each: no digits, no accents, no initials.
 * Empirically "Karol", "A B", "tester02" and "Maria Jose Perez" with accents are
 * all refused, so names are transliterated and validated before sending.
 */
function sanitizeCustomerName(...candidates: (string | null | undefined)[]): string {
  for (const candidate of candidates) {
    if (!candidate) continue;
    const cleaned = candidate
      .normalize('NFD').replace(/[̀-ͯ]/g, '') // strip accents
      .replace(/[^A-Za-z\s'-]/g, ' ')                   // drop digits and symbols
      .split(/\s+/)
      .filter((w) => w.replace(/[^A-Za-z]/g, '').length >= 2)
      .join(' ')
      .trim();
    if (cleaned.split(' ').length >= 2) return cleaned;
  }
  // Better a valid generic name than a rejected checkout. The cardholder name is
  // captured by DitoBanx on their own payment page.
  return 'Pinklights Customer';
}

function generateOrderNumber(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `PL-${timestamp}-${random}`;
}

async function computeHash(
  orderNumber: string,
  amount: string,
  currency: string,
  description: string,
  merchantPassword: string
): Promise<string> {
  const raw = (orderNumber + amount + currency + description + merchantPassword).toUpperCase();
  const md5Hash = md5(raw);
  const sha1Buffer = await crypto.subtle.digest(
    'SHA-1',
    new TextEncoder().encode(md5Hash)
  );
  return Array.from(new Uint8Array(sha1Buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Authenticate user via JWT
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseAuth = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabaseAuth.auth.getUser(token);

    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse and validate request
    const { packageId } = await req.json() as { packageId: string };

    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const { data: pkgRow } = await supabaseAdmin
      .from('credit_packages')
      .select('id, days, amount_cents, currency, invoice_description')
      .eq('id', packageId)
      .eq('active', true)
      .maybeSingle();

    if (!pkgRow) {
      return new Response(
        JSON.stringify({ error: `Unknown or inactive package: ${packageId}` }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const pkg = {
      days: pkgRow.days,
      amount: (pkgRow.amount_cents / 100).toFixed(2),
      description: `Pinklights - ${pkgRow.invoice_description}`,
    };

    // Prefer the profile's real name; user_metadata.full_name is unset on every
    // account today, so the old email-prefix fallback was what DitoBanx rejected.
    const { data: profileRow } = await supabaseAdmin
      .from('profiles')
      .select('full_name')
      .eq('user_id', user.id)
      .maybeSingle();

    const customerName = sanitizeCustomerName(
      profileRow?.full_name,
      user.user_metadata?.full_name,
      user.email?.split('@')[0],
    );

    const orderNumber = generateOrderNumber();
    const currency = pkgRow.currency || 'USD';

    // Compute DitoBanx signature
    const hash = await computeHash(
      orderNumber,
      pkg.amount,
      currency,
      pkg.description,
      DITOBANX_MERCHANT_PASSWORD
    );

    // Create DitoBanx checkout session
    const ditobanxResponse = await fetch(`${DITOBANX_API_URL}/api/v1/session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        merchant_key: DITOBANX_MERCHANT_KEY,
        operation: 'purchase',
        methods: ['card'],
        order: {
          number: orderNumber,
          amount: pkg.amount,
          currency: currency,
          description: pkg.description,
        },
        success_url: `${SITE_URL}/payment-success?order=${orderNumber}`,
        cancel_url: `${SITE_URL}/buy-credits`,
        customer: {
          name: customerName,
          email: user.email || '',
        },
        hash: hash,
      }),
    });

    const ditobanxData = await ditobanxResponse.json();

    if (!ditobanxResponse.ok || ditobanxData.error_code) {
      console.error('DitoBanx session creation failed:', ditobanxData);
      return new Response(
        JSON.stringify({ error: 'Failed to create payment session', details: ditobanxData }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Record payment session in database (service role bypasses RLS)
    const { error: insertError } = await supabaseAdmin
      .from('payment_sessions')
      .insert({
        user_id: user.id,
        order_number: orderNumber,
        package_id: pkgRow.id,
        day_credits: pkg.days,
        amount_cents: Math.round(parseFloat(pkg.amount) * 100),
        currency: currency,
        status: 'pending',
        ditobanx_session_id: ditobanxData.session_id || ditobanxData.id || null,
      });

    if (insertError) {
      console.error('Failed to insert payment session:', insertError);
      return new Response(
        JSON.stringify({ error: 'Failed to record payment session' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        checkoutUrl: ditobanxData.redirect_url || ditobanxData.checkout_url,
        sessionId: ditobanxData.session_id || ditobanxData.id,
        orderNumber: orderNumber,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in create-payment:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.0'
import { corsHeaders } from '../_shared/cors.ts'
import md5 from 'https://esm.sh/js-md5@0.8.3'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const DITOBANX_API_URL = Deno.env.get('DITOBANX_API_URL')!;
const DITOBANX_MERCHANT_KEY = Deno.env.get('DITOBANX_MERCHANT_KEY')!;
const DITOBANX_MERCHANT_PASSWORD = Deno.env.get('DITOBANX_MERCHANT_PASSWORD')!;
const SITE_URL = Deno.env.get('SITE_URL') || 'http://localhost:8080';

// Package definitions (placeholder prices — adjust as needed)
const PACKAGES: Record<string, { days: number; amount: string; description: string }> = {
  '1day':  { days: 1,  amount: '5.00',  description: 'Pinklights - 1 Day Visibility' },
  '7day':  { days: 7,  amount: '25.00', description: 'Pinklights - 7 Days Visibility' },
  '30day': { days: 30, amount: '75.00', description: 'Pinklights - 30 Days Visibility' },
};

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
    const pkg = PACKAGES[packageId];

    if (!pkg) {
      return new Response(
        JSON.stringify({ error: 'Invalid package. Use: 1day, 7day, or 30day' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const orderNumber = generateOrderNumber();
    const currency = 'USD';

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
          name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Customer',
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
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const { error: insertError } = await supabase
      .from('payment_sessions')
      .insert({
        user_id: user.id,
        order_number: orderNumber,
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

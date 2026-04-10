import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.0'
import md5 from 'https://esm.sh/js-md5@0.8.3'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const DITOBANX_MERCHANT_PASSWORD = Deno.env.get('DITOBANX_MERCHANT_PASSWORD')!;

async function computeCallbackHash(
  paymentId: string,
  orderNumber: string,
  orderAmount: string,
  orderCurrency: string,
  orderDescription: string,
  merchantPassword: string
): Promise<string> {
  const raw = (paymentId + orderNumber + orderAmount + orderCurrency + orderDescription + merchantPassword).toUpperCase();
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
  // DitoBanx sends POST with application/x-www-form-urlencoded
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const body = await req.text();
    const params = new URLSearchParams(body);

    const paymentId = params.get('id') || '';
    const orderNumber = params.get('order_number') || '';
    const orderAmount = params.get('order_amount') || '';
    const orderCurrency = params.get('order_currency') || '';
    const orderDescription = params.get('order_description') || '';
    const callbackHash = params.get('hash') || '';
    const status = params.get('status') || '';
    const type = params.get('type') || '';

    console.log('Payment callback received:', {
      paymentId,
      orderNumber,
      status,
      type,
      orderAmount,
      orderCurrency,
    });

    // Validate callback signature
    const expectedHash = await computeCallbackHash(
      paymentId,
      orderNumber,
      orderAmount,
      orderCurrency,
      orderDescription,
      DITOBANX_MERCHANT_PASSWORD
    );

    if (callbackHash !== expectedHash) {
      console.error('Invalid callback signature', { expected: expectedHash, received: callbackHash });
      return new Response('Invalid signature', { status: 400 });
    }

    // Only process successful sale transactions
    // status=success + type=redirect means payment is NOT complete
    if (status !== 'success' || type !== 'sale') {
      console.log(`Ignoring callback: status=${status}, type=${type}`);
      return new Response('OK', { status: 200 });
    }

    // Use service role to bypass RLS
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Look up the payment session
    const { data: session, error: lookupError } = await supabase
      .from('payment_sessions')
      .select('*')
      .eq('order_number', orderNumber)
      .single();

    if (lookupError || !session) {
      console.error('Payment session not found:', orderNumber, lookupError);
      return new Response('Session not found', { status: 404 });
    }

    // Idempotency: skip if already completed
    if (session.status === 'completed') {
      console.log('Payment session already completed, skipping:', orderNumber);
      return new Response('OK', { status: 200 });
    }

    // Mark session as completed
    const { error: updateError } = await supabase
      .from('payment_sessions')
      .update({
        status: 'completed',
        ditobanx_payment_id: paymentId,
        completed_at: new Date().toISOString(),
      })
      .eq('id', session.id);

    if (updateError) {
      console.error('Failed to update payment session:', updateError);
      return new Response('Internal error', { status: 500 });
    }

    // Add day credits to user's balance
    const { data: existingCredits } = await supabase
      .from('credits')
      .select('balance')
      .eq('user_id', session.user_id)
      .maybeSingle();

    if (existingCredits) {
      const { error } = await supabase
        .from('credits')
        .update({
          balance: existingCredits.balance + session.day_credits,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', session.user_id);
      if (error) {
        console.error('Failed to update credits:', error);
        return new Response('Internal error', { status: 500 });
      }
    } else {
      const { error } = await supabase
        .from('credits')
        .insert({
          user_id: session.user_id,
          balance: session.day_credits,
        });
      if (error) {
        console.error('Failed to insert credits:', error);
        return new Response('Internal error', { status: 500 });
      }
    }

    // Record credit transaction
    const { error: txError } = await supabase
      .from('credit_transactions')
      .insert({
        user_id: session.user_id,
        amount: session.day_credits,
        type: 'purchase',
        description: `Purchased ${session.day_credits} day credit${session.day_credits > 1 ? 's' : ''} via DitoBanx`,
      });

    if (txError) {
      console.error('Failed to record credit transaction:', txError);
      // Non-fatal: credits were already added
    }

    console.log(`Successfully credited ${session.day_credits} day(s) to user ${session.user_id}`);
    return new Response('OK', { status: 200 });

  } catch (error) {
    console.error('Error in payment-callback:', error);
    return new Response('Internal error', { status: 500 });
  }
});

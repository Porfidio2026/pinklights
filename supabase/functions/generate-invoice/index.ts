import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.0'
import { acathaLogin, createDTE } from '../_shared/acatha.ts'
import { generateInvoicePdf } from '../_shared/invoice-pdf.ts'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  try {
    const { payment_session_id } = await req.json();

    if (!payment_session_id) {
      return new Response(
        JSON.stringify({ error: 'Missing payment_session_id' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }

    console.log('Generating invoice for payment session:', payment_session_id);

    // Look up payment session
    const { data: session, error: sessionError } = await supabase
      .from('payment_sessions')
      .select('*')
      .eq('id', payment_session_id)
      .single();

    if (sessionError || !session) {
      console.error('Payment session not found:', payment_session_id, sessionError);
      return new Response(
        JSON.stringify({ error: 'Payment session not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } },
      );
    }

    // Check if invoice already exists for this payment
    const { data: existingInvoice } = await supabase
      .from('invoices')
      .select('id, status')
      .eq('payment_session_id', payment_session_id)
      .maybeSingle();

    if (existingInvoice?.status === 'completed') {
      console.log('Invoice already completed for this payment:', existingInvoice.id);
      return new Response(
        JSON.stringify({ ok: true, invoice_id: existingInvoice.id }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      );
    }

    // Look up user profile for invoice details
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, location')
      .eq('user_id', session.user_id)
      .maybeSingle();

    // Look up user email
    const { data: { user } } = await supabase.auth.admin.getUserById(session.user_id);
    const userEmail = user?.email || '';
    const customerName = profile?.full_name || userEmail.split('@')[0] || 'Customer';

    // Build description
    const dayCredits = session.day_credits || 1;
    const description = `Pinklights - ${dayCredits} day credit${dayCredits > 1 ? 's' : ''} visibility package`;

    // Create or update invoice row as 'processing'
    let invoiceId: string;
    if (existingInvoice) {
      invoiceId = existingInvoice.id;
      await supabase
        .from('invoices')
        .update({
          status: 'processing',
          error_message: null,
          retry_count: (existingInvoice as any).retry_count ? (existingInvoice as any).retry_count + 1 : 1,
          updated_at: new Date().toISOString(),
        })
        .eq('id', invoiceId);
    } else {
      const { data: newInvoice, error: insertError } = await supabase
        .from('invoices')
        .insert({
          user_id: session.user_id,
          payment_session_id: payment_session_id,
          invoice_type: 'day_credits',
          amount_cents: session.amount_cents,
          currency: session.currency || 'USD',
          description,
          status: 'processing',
        })
        .select('id')
        .single();

      if (insertError || !newInvoice) {
        console.error('Failed to create invoice row:', insertError);
        return new Response(
          JSON.stringify({ error: 'Failed to create invoice record' }),
          { status: 500, headers: { 'Content-Type': 'application/json' } },
        );
      }
      invoiceId = newInvoice.id;
    }

    const amountDollars = session.amount_cents / 100;
    // Consumidor Final: IVA is INCLUDED in the price (formula: amount * 13 / 113)
    const ivaRate = 13;
    const ivaAmount = Math.round(amountDollars * 13 / 113 * 100) / 100;
    const totalPagar = amountDollars; // Price already includes IVA

    // ── Step 1: Create DTE in Acatha ──
    let dteNumber = '';
    let controlNumber = '';
    let generationCode = '';
    let selloRecibido = '';
    let dteId = '';
    let rawResponse: Record<string, unknown> = {};

    try {
      const loginResult = await acathaLogin(supabase);
      if (loginResult.ok) {
        const dteResult = await createDTE(loginResult.data, {
          clientId: '',
          customerName,
          customerEmail: userEmail,
          items: [{ description, quantity: 1, unitPrice: amountDollars, totalPrice: amountDollars }],
          totalAmount: amountDollars,
        });

        if (dteResult.ok) {
          dteId = dteResult.data.dteId;
          dteNumber = dteResult.data.dteNumber;
          controlNumber = dteResult.data.controlNumber;
          generationCode = dteResult.data.generationCode;
          rawResponse = dteResult.data.rawResponse;
          console.log(`Acatha DTE created: ${dteNumber}`);
        } else {
          console.error('Acatha DTE failed (non-fatal):', dteResult.error);
        }
      } else {
        console.error('Acatha login failed (non-fatal):', loginResult.error);
      }
    } catch (acathaErr) {
      console.error('Acatha integration failed (non-fatal):', acathaErr);
    }

    // Use fallback values if Acatha didn't work
    if (!generationCode) generationCode = crypto.randomUUID().toUpperCase();
    if (!dteNumber) dteNumber = `INV-${invoiceId.substring(0, 8).toUpperCase()}`;
    if (!controlNumber) controlNumber = dteNumber;

    // ── Step 2: Generate PDF and store in Supabase Storage ──
    const { pdfUrl } = await generateInvoicePdf(supabase, {
      invoiceId,
      dteNumber,
      controlNumber,
      generationCode,
      selloRecibido: selloRecibido || undefined,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      customerName,
      customerEmail: userEmail || undefined,
      items: [{ description, quantity: 1, unitPrice: amountDollars, total: amountDollars }],
      subtotal: amountDollars,
      ivaRate,
      ivaAmount,
      total: totalPagar,
      currency: session.currency || 'USD',
      companyName: 'Pinklights',
      companyRuc: '',
      companyNrc: '',
    });

    console.log(`PDF generated and stored: ${pdfUrl}`);

    // ── Step 3: Update invoice record ──
    await supabase
      .from('invoices')
      .update({
        status: 'completed',
        acatha_dte_id: dteId || null,
        dte_number: dteNumber,
        control_number: controlNumber,
        generation_code: generationCode,
        pdf_url: pdfUrl,
        json_dte: rawResponse,
        completed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', invoiceId);

    console.log(`Invoice ${invoiceId} completed (DTE: ${dteNumber}, PDF: ${pdfUrl})`);

    return new Response(
      JSON.stringify({ ok: true, invoice_id: invoiceId, dte_number: dteNumber, pdf_url: pdfUrl }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  } catch (error) {
    console.error('Error in generate-invoice:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Internal error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
});

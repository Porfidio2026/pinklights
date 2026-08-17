import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.0'
import { acathaLogin, createDTE } from '../_shared/acatha.ts'

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

    // Name the product from credit_packages so the DTE matches what was sold and
    // references the right Acatha catalog item. Older sessions predate package_id,
    // so fall back to describing it from the credit count.
    const dayCredits = session.day_credits || 1;
    const { data: pkg } = session.package_id
      ? await supabase
          .from('credit_packages')
          .select('invoice_description, acatha_item_code')
          .eq('id', session.package_id)
          .maybeSingle()
      : { data: null };

    const description = pkg?.invoice_description
      ?? `Pinklights - ${dayCredits} day credit${dayCredits > 1 ? 's' : ''} visibility package`;

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
    let acathaError = '';
    let acathaPdfUrl: string | null = null;

    try {
      const loginResult = await acathaLogin(supabase);
      if (loginResult.ok) {
        const dteResult = await createDTE(loginResult.data, {
          clientId: '',
          customerName,
          customerEmail: userEmail,
          items: [{ description, quantity: 1, unitPrice: amountDollars, totalPrice: amountDollars }],
          totalAmount: amountDollars,
          itemCode: pkg?.acatha_item_code ?? undefined,
        });

        if (dteResult.ok) {
          dteId = dteResult.data.dteId;
          dteNumber = dteResult.data.dteNumber;
          controlNumber = dteResult.data.controlNumber;
          generationCode = dteResult.data.generationCode;
          selloRecibido = dteResult.data.selloRecibido;
          acathaPdfUrl = dteResult.data.pdfUrl;
          // Store what Hacienda actually received, plus its reply. Required for
          // audit and the only way to reconstruct a rejected document.
          rawResponse = {
            dteJson: dteResult.data.dteJson,
            hacienda: dteResult.data.haciendaResponse,
            sale: dteResult.data.rawResponse,
            trace: dteResult.data.trace,
          };
          console.log(`Acatha DTE created: ${dteNumber}`);

          if (!selloRecibido) {
            acathaError = dteResult.data.haciendaError
              ? `Hacienda rejected the DTE: ${dteResult.data.haciendaError}`
              : 'Sale created in Acatha but Hacienda returned no sello; document is not a valid DTE';
            // Keep the raw Hacienda payload; the sale response is far less
            // useful than the rejection reason when debugging.
            // already captured above
          }
        } else {
          acathaError = dteResult.error;
        }
      } else {
        acathaError = `Acatha login failed: ${loginResult.error}`;
      }
    } catch (acathaErr) {
      acathaError = acathaErr instanceof Error ? acathaErr.message : String(acathaErr);
    }

    if (acathaError) console.error('Acatha integration problem:', acathaError);

    // A DTE is only fiscally valid once Hacienda stamps it. Anything short of
    // that is a failure, even though we still produce a PDF below so the
    // customer has a receipt and an admin can retry.
    const isValidDte = Boolean(dteNumber && selloRecibido);

    // Local placeholders so the PDF can still be rendered. The INV- prefix keeps
    // these visibly distinct from a real MH control number (DTE-01-...).
    if (!generationCode) generationCode = crypto.randomUUID().toUpperCase();
    if (!dteNumber) dteNumber = `INV-${invoiceId.substring(0, 8).toUpperCase()}`;
    if (!controlNumber) controlNumber = dteNumber;

    // ── Step 2: Store Acatha's RIDE ──
    //
    // We no longer draw our own invoice. That PDF was not a RIDE: it named
    // Pinklights as the emisor with empty NIT and NRC, when the legal emisor is
    // the Acatha company, and Hacienda prescribes what a RIDE must show.
    //
    // Acatha's document is copied into our bucket rather than linked directly,
    // so the customer's link keeps working if Acatha reorganises its file paths.
    // An invoice is a record people may need years later.
    let pdfUrl: string | null = acathaPdfUrl;

    if (acathaPdfUrl) {
      try {
        const res = await fetch(acathaPdfUrl);
        const contentType = res.headers.get('content-type') || '';

        if (res.ok && contentType.includes('pdf')) {
          const bytes = new Uint8Array(await res.arrayBuffer());
          const path = `invoices/${invoiceId}.pdf`;
          const { error: uploadError } = await supabase.storage
            .from('invoices')
            .upload(path, bytes, { contentType: 'application/pdf', upsert: true });

          if (uploadError) {
            console.error('Failed to store RIDE, linking Acatha directly:', uploadError.message);
          } else {
            pdfUrl = supabase.storage.from('invoices').getPublicUrl(path).data.publicUrl;
          }
        } else {
          console.error(`RIDE fetch returned ${res.status} ${contentType}; linking Acatha directly`);
        }
      } catch (err) {
        console.error('RIDE fetch failed, linking Acatha directly:', err);
      }
    }

    console.log(`Invoice PDF: ${pdfUrl ?? 'none'}`);

    // ── Step 3: Update invoice record ──
    await supabase
      .from('invoices')
      .update({
        status: isValidDte ? 'completed' : 'failed',
        error_message: acathaError || null,
        acatha_dte_id: dteId || null,
        dte_number: dteNumber,
        control_number: controlNumber,
        generation_code: generationCode,
        pdf_url: pdfUrl,
        json_dte: rawResponse,
        completed_at: isValidDte ? new Date().toISOString() : null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', invoiceId);

    if (isValidDte) {
      console.log(`Invoice ${invoiceId} completed (DTE: ${dteNumber}, PDF: ${pdfUrl})`);
    } else {
      console.error(`Invoice ${invoiceId} failed: ${acathaError}`);
    }

    return new Response(
      JSON.stringify({
        ok: isValidDte,
        invoice_id: invoiceId,
        dte_number: dteNumber,
        sello_recibido: selloRecibido || null,
        pdf_url: pdfUrl,
        error: acathaError || undefined,
      }),
      { status: isValidDte ? 200 : 502, headers: { 'Content-Type': 'application/json' } },
    );
  } catch (error) {
    console.error('Error in generate-invoice:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Internal error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
});

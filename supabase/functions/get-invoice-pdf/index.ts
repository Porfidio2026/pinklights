import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.0'
import { corsHeaders } from '../_shared/cors.ts'
import { acathaLogin, getDTEPdf } from '../_shared/acatha.ts'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Authenticate user
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const token = authHeader.replace('Bearer ', '');
    const supabaseAuth = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const { data: { user }, error: authError } = await supabaseAuth.auth.getUser(token);

    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    // Get invoice ID from request
    const { invoice_id } = await req.json();
    if (!invoice_id) {
      return new Response(
        JSON.stringify({ error: 'Missing invoice_id' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    // Look up invoice and verify ownership
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const { data: invoice, error: invoiceError } = await supabase
      .from('invoices')
      .select('*')
      .eq('id', invoice_id)
      .single();

    if (invoiceError || !invoice) {
      return new Response(
        JSON.stringify({ error: 'Invoice not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    // Check ownership (user owns invoice OR user is admin)
    const { data: isAdmin } = await supabase
      .from('admin_users')
      .select('user_id')
      .eq('user_id', user.id)
      .maybeSingle();

    if (invoice.user_id !== user.id && !isAdmin) {
      return new Response(
        JSON.stringify({ error: 'Forbidden' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    if (!invoice.acatha_dte_id) {
      return new Response(
        JSON.stringify({ error: 'Invoice has no DTE reference yet' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    // Login to Acatha and fetch PDF
    const loginResult = await acathaLogin(supabase);
    if (!loginResult.ok) {
      return new Response(
        JSON.stringify({ error: 'Failed to authenticate with invoicing service' }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const pdfResult = await getDTEPdf(loginResult.data, invoice.acatha_dte_id);
    if (!pdfResult.ok) {
      return new Response(
        JSON.stringify({ error: pdfResult.error }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    return new Response(pdfResult.data.pdfBytes, {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': pdfResult.data.contentType,
        'Content-Disposition': `attachment; filename="invoice-${invoice.dte_number || invoice.id}.pdf"`,
      },
    });
  } catch (error) {
    console.error('Error in get-invoice-pdf:', error);
    return new Response(
      JSON.stringify({ error: 'Internal error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }
});

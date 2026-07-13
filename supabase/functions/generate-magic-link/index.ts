import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.0'
import { corsHeaders } from '../_shared/cors.ts'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Authenticate caller via JWT
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verify caller is an admin
    const { data: adminUser, error: adminError } = await supabase
      .from('admin_users')
      .select('id')
      .eq('user_id', user.id)
      .maybeSingle();

    if (adminError || !adminUser) {
      return new Response(
        JSON.stringify({ error: 'Admin access required' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse request
    const { profileId } = await req.json() as { profileId: string };

    if (!profileId) {
      return new Response(
        JSON.stringify({ error: 'profileId is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Look up the profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id, phone_number, user_id, full_name')
      .eq('id', profileId)
      .single();

    if (profileError || !profile) {
      return new Response(
        JSON.stringify({ error: 'Profile not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (profile.user_id) {
      return new Response(
        JSON.stringify({ error: 'Profile already has an account linked' }),
        { status: 409, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!profile.phone_number) {
      return new Response(
        JSON.stringify({ error: 'Profile has no phone number' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate synthetic email from phone number
    const normalizedPhone = profile.phone_number.replace(/[^0-9]/g, '');
    const syntheticEmail = `${normalizedPhone}@pinklights.app`;

    // Create Supabase auth user
    const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
      email: syntheticEmail,
      email_confirm: true,
    });

    if (createError) {
      console.error('Failed to create auth user:', createError);
      return new Response(
        JSON.stringify({ error: 'Failed to create user account', details: createError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Link the auth user to the profile
    const { error: linkError } = await supabase
      .from('profiles')
      .update({ user_id: newUser.user.id })
      .eq('id', profileId);

    if (linkError) {
      console.error('Failed to link user to profile:', linkError);
      return new Response(
        JSON.stringify({ error: 'Failed to link account to profile' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate magic link
    const { data: linkData, error: linkGenError } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email: syntheticEmail,
    });

    if (linkGenError || !linkData) {
      console.error('Failed to generate magic link:', linkGenError);
      return new Response(
        JSON.stringify({ error: 'Failed to generate magic link' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        magicLinkUrl: linkData.properties.action_link,
        phone: profile.phone_number,
        name: profile.full_name,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Error in generate-magic-link:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

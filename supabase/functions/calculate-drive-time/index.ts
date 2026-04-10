
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.0'
import { corsHeaders } from '../_shared/cors.ts'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')!;
const GOOGLE_MAPS_API_KEY = Deno.env.get('VITE_GOOGLE_MAPS_API_KEY')!;

interface RequestBody {
  profileId: string;
  originLat: number;
  originLng: number;
  destLat: number;
  destLng: number;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // Parse request body
    const { profileId, originLat, originLng, destLat, destLng } = await req.json() as RequestBody;

    console.log('Received request:', {
      profileId,
      originLat,
      originLng,
      destLat,
      destLng
    });

    // Validate input parameters
    if (!profileId || !originLat || !originLng || !destLat || !destLng) {
      console.error('Missing required parameters');
      return new Response(
        JSON.stringify({ error: 'Missing required parameters' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Call Google Directions API
    const directionsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${originLat},${originLng}&destination=${destLat},${destLng}&key=${GOOGLE_MAPS_API_KEY}`;
    
    console.log('Calling Google Directions API...');
    const response = await fetch(directionsUrl);
    const data = await response.json();

    console.log('Google Directions API response:', data);

    if (data.status !== 'OK') {
      console.error('Google Directions API error:', data);
      throw new Error(`Failed to get directions: ${data.status}`);
    }

    // Extract duration in minutes
    const durationInSeconds = data.routes[0].legs[0].duration.value;
    const durationInMinutes = Math.round(durationInSeconds / 60);

    console.log(`Drive time calculated: ${durationInMinutes} minutes`);

    // Use the new update_drive_time function
    const { error: updateError } = await supabase.rpc('update_drive_time', {
      profile_id: profileId,
      drive_time: durationInMinutes
    });

    if (updateError) {
      console.error('Error updating drive time:', updateError);
      throw updateError;
    }

    // Return success response
    return new Response(
      JSON.stringify({ durationInMinutes }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );

  } catch (error) {
    console.error('Error in calculate-drive-time function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Internal server error',
        details: error
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});

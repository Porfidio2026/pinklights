
import { supabase } from '@/lib/supabase';
import { DayAvailability } from '@/components/availability/types';
import { expandTimeBlocksToHours } from '@/utils/timeUtils';

/**
 * Fetches a user's availabilities from the database
 */
export const fetchUserAvailabilities = async () => {
  // Get the current session
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    throw new Error('No active session');
  }

  // Get the user's profile ID
  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select('id')
    .eq('user_id', session.user.id)
    .single();

  if (profileError) throw profileError;

  // Fetch existing availabilities
  const { data: existingAvailabilities, error: availabilitiesError } = await supabase
    .from('availabilities')
    .select('day_of_week, hour')
    .eq('profile_id', profileData.id);

  if (availabilitiesError) throw availabilitiesError;

  return {
    profileId: profileData.id,
    availabilities: existingAvailabilities || []
  };
};

/**
 * Saves a user's availabilities to the database
 */
export const saveUserAvailabilities = async (availabilities: DayAvailability[]) => {
  // Get the current session
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error('No active session');

  // Get the user's profile ID
  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select('id')
    .eq('user_id', session.user.id)
    .single();

  if (profileError) throw profileError;

  // Delete all existing availabilities
  const { error: deleteError } = await supabase
    .from('availabilities')
    .delete()
    .eq('profile_id', profileData.id);

  if (deleteError) throw deleteError;

  // Convert time blocks to individual hours and insert
  const expandedAvailabilities = expandTimeBlocksToHours(availabilities);
  
  // Insert new availabilities
  const availabilitiesToInsert = expandedAvailabilities.flatMap(avail =>
    avail.hours.map(hour => ({
      profile_id: profileData.id,
      day_of_week: avail.day,
      hour
    }))
  );

  if (availabilitiesToInsert.length === 0) {
    return; // Nothing to insert
  }

  const { error: insertError } = await supabase
    .from('availabilities')
    .insert(availabilitiesToInsert);

  if (insertError) throw insertError;
};

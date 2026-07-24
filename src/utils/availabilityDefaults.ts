import { supabase } from '@/lib/supabase';

/**
 * Inserts 24/7 availability rows (7 days x 24 hours = 168 entries) for a
 * profile, but only if it doesn't already have any availability set.
 */
export async function insertDefaultAvailability(profileId: string): Promise<void> {
  // Check whether the profile already has availability entries
  const { data: existing, error: checkError } = await supabase
    .from('availabilities')
    .select('id')
    .eq('profile_id', profileId)
    .limit(1);

  if (checkError) {
    console.error('Error checking existing availability:', checkError);
    throw checkError;
  }

  if (existing && existing.length > 0) {
    // Profile already has availability – nothing to do
    return;
  }

  // Build 168 rows: days 0-6 x hours 0-23
  const rows: { profile_id: string; day_of_week: string; hour: string }[] = [];
  for (let day = 0; day <= 6; day++) {
    for (let hour = 0; hour <= 23; hour++) {
      rows.push({
        profile_id: profileId,
        day_of_week: String(day),
        hour: String(hour),
      });
    }
  }

  const { error: insertError } = await supabase
    .from('availabilities')
    .insert(rows);

  if (insertError) {
    console.error('Error inserting default availability:', insertError);
    throw insertError;
  }
}

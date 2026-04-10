
import { supabase } from '@/lib/supabase';
import { Profile } from '@/types/profile';
import { SearchCriteria } from '@/types/search';
import { Coordinates } from '@/components/location/types';

export const saveSearchCriteria = async (
  criteria: SearchCriteria,
  coordinates: Coordinates
) => {
  const { error } = await supabase.from('profile_searches').insert({
    location: criteria.location,
    latitude: coordinates.latitude,
    longitude: coordinates.longitude,
    max_distance: criteria.maxDistance,
    hair_colours: criteria.hairColour.length > 0 ? criteria.hairColour : null,
    breast_sizes: criteria.breastSize.length > 0 ? criteria.breastSize : null,
    min_age: criteria.ageRange[0],
    max_age: criteria.ageRange[1]
  });

  if (error) {
    console.error('Error saving search:', error);
  }
};

export const fetchNearbyProfiles = async (
  coordinates: Coordinates,
  maxDistance: number,
  criteria: SearchCriteria
) => {
  return await supabase
    .rpc('search_nearby_profiles', {
      search_lat: coordinates.latitude,
      search_lon: coordinates.longitude,
      max_distance_km: maxDistance,
      search_service_type: criteria.serviceType || null,
      search_gender: criteria.gender || null,
      hair_colours: criteria.hairColour.length > 0 ? criteria.hairColour : null,
      breast_sizes: criteria.breastSize.length > 0 ? criteria.breastSize : null,
      skin_tones: criteria.skinTone.length > 0 ? criteria.skinTone : null,
      body_types: criteria.bodyType.length > 0 ? criteria.bodyType : null,
      min_age: criteria.ageRange[0],
      max_age: criteria.ageRange[1]
    });
};

export const fetchProfilePictures = async (profileIds: string[]) => {
  return await supabase
    .from('profile_pictures')
    .select('id, picture_url, display_order, profile_id')
    .in('profile_id', profileIds)
    .order('display_order');
};

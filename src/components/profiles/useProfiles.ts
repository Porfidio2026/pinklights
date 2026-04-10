
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Profile } from './types';
import { UserLocation } from './useLocationTracking';
import { calculateHaversineDistance, estimateDriveTime } from './utils';

interface UseProfilesProps {
  providedProfiles?: Profile[];
  currentProfileId?: string;
  selectedService?: 'private' | 'outcall' | 'soft' | 'ropes';
  selectedGender?: 'Female' | 'Trans';
  userLocation: UserLocation | null;
  locationUpdateCounter: number;
}

export const useProfiles = ({
  providedProfiles,
  currentProfileId,
  selectedService,
  selectedGender,
  userLocation,
  locationUpdateCounter
}: UseProfilesProps) => {
  const [profilesWithDistance, setProfilesWithDistance] = useState<Profile[]>([]);
  const [hasCalculatedDistances, setHasCalculatedDistances] = useState(false);

  const { data: fetchedProfiles, isLoading, error, refetch } = useQuery({
    queryKey: ['related-profiles', currentProfileId, selectedService, selectedGender, userLocation, locationUpdateCounter],
    queryFn: async () => {
      if (providedProfiles) return providedProfiles;

      // Use the get_featured_profiles RPC function with service and gender filters
      const { data: featuredProfiles, error } = await supabase
        .rpc('get_featured_profiles', {
          search_service_type: selectedService?.toLowerCase() || null,
          search_gender: selectedGender || null,
          limit_count: 3
        });

      if (error) {
        console.error('Error fetching profiles:', error);
        return [];
      }

      // Get additional profile details for latitude and longitude
      const { data: profileDetails, error: detailsError } = await supabase
        .from('profiles')
        .select('id, latitude, longitude')
        .in('id', featuredProfiles.map(p => p.id));
        
      if (detailsError) {
        console.error('Error fetching profile details:', detailsError);
      }
      
      // Create a map of profile details by ID for quick lookups
      const profileDetailsMap = new Map();
      if (profileDetails) {
        profileDetails.forEach(detail => {
          profileDetailsMap.set(detail.id, detail);
        });
      }
      
      // Merge the profile details into the featured profiles
      const enhancedProfiles = featuredProfiles.map(profile => {
        const details = profileDetailsMap.get(profile.id) || {};
        return {
          ...profile,
          latitude: details.latitude,
          longitude: details.longitude
        };
      });

      const { data: pictures, error: picturesError } = await supabase
        .from('profile_pictures')
        .select('id, picture_url, display_order, profile_id')
        .in('profile_id', enhancedProfiles.map(p => p.id))
        .order('display_order');

      if (picturesError) {
        console.error('Error fetching profile pictures:', picturesError);
      }

      // If we have user location, calculate distances for each profile
      let profilesWithDistance = [...enhancedProfiles];
      
      if (userLocation) {
        // Calculate distance in kilometers using the Haversine formula
        profilesWithDistance = enhancedProfiles.map(profile => {
          if (profile.latitude && profile.longitude) {
            const distance = calculateHaversineDistance(
              userLocation.latitude,
              userLocation.longitude,
              profile.latitude,
              profile.longitude
            );
            
            // Estimate drive time
            const driveTime = estimateDriveTime(distance);
            
            return {
              ...profile,
              distance_km: distance,
              drive_minutes: driveTime
            };
          }
          return profile;
        });
      }

      // Combine profiles with their pictures
      return profilesWithDistance.map(profile => ({
        ...profile,
        profile_pictures: pictures?.filter(pic => pic.profile_id === profile.id) || []
      }));
    },
    enabled: !providedProfiles,
  });

  // Calculate distances for provided profiles when user location changes
  useEffect(() => {
    if (providedProfiles && userLocation) {
      const updatedProfiles = providedProfiles.map(profile => {
        if (profile.latitude && profile.longitude) {
          const distance = calculateHaversineDistance(
            userLocation.latitude,
            userLocation.longitude,
            profile.latitude,
            profile.longitude
          );
          
          // Estimate drive time
          const driveTime = estimateDriveTime(distance);
          
          return {
            ...profile,
            distance_km: distance,
            drive_minutes: driveTime
          };
        }
        return profile;
      });
      
      setProfilesWithDistance(updatedProfiles);
      setHasCalculatedDistances(true);
    } else {
      // Reset profilesWithDistance if no user location
      if (providedProfiles) {
        setProfilesWithDistance([]);
        setHasCalculatedDistances(false);
      }
    }
  }, [providedProfiles, userLocation, locationUpdateCounter]);

  // Effect to refetch when location changes
  useEffect(() => {
    if (locationUpdateCounter > 0 && !providedProfiles) {
      refetch();
    }
  }, [locationUpdateCounter, refetch, providedProfiles]);

  // Effect to update the hasCalculatedDistances state when fetchedProfiles have distances
  useEffect(() => {
    if (fetchedProfiles && fetchedProfiles.length > 0 && userLocation) {
      const hasDistances = fetchedProfiles.some(profile => 
        profile.distance_km !== undefined && profile.latitude && profile.longitude);
      setHasCalculatedDistances(hasDistances);
      
    }
  }, [fetchedProfiles, userLocation]);

  // Choose the right profiles to display
  const profiles = providedProfiles ? 
    (profilesWithDistance.length > 0 ? profilesWithDistance : providedProfiles) : 
    fetchedProfiles;

  return {
    profiles,
    isLoading,
    hasCalculatedDistances,
    error // Include the error property in the return value
  };
};

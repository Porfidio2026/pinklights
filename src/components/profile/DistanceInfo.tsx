
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import { useQuery } from '@tanstack/react-query';
import { ProfileLocation } from '@/components/search/ProfileLocation';
import { useLocationTracking } from '@/components/profiles/useLocationTracking';

interface DistanceInfoProps {
  profileId?: string;
  profileLatitude?: number;
  profileLongitude?: number;
  profileLocation?: string;
}

export const DistanceInfo = ({ 
  profileId,
  profileLatitude,
  profileLongitude,
  profileLocation
}: DistanceInfoProps) => {
  const { toast } = useToast();
  const [calculatedDistance, setCalculatedDistance] = useState<number | null>(null);
  const [calculatedDriveTime, setCalculatedDriveTime] = useState<number | null>(null);
  const { hasUserLocation, userLocation, locationUpdateCounter } = useLocationTracking();

  const { data: profile, refetch } = useQuery({
    queryKey: ['profile-distance', profileId, locationUpdateCounter],
    queryFn: async () => {
      if (!profileId) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('distance_km, drive_minutes, location')
        .eq('id', profileId)
        .maybeSingle();
        
      if (error) throw error;
      return data;
    },
    enabled: !!profileId,
    staleTime: 0, // Don't cache this query
    refetchOnMount: true,
    refetchOnWindowFocus: true
  });

  useEffect(() => {
    const calculateDistanceAndTime = async () => {
      if (!profileId || !profileLatitude || !profileLongitude) {
        return;
      }

      if (!userLocation) {
        return;
      }

      try {
        // Calculate distance in kilometers using the Haversine formula
        const R = 6371; // Earth's radius in kilometers
        const dLat = (profileLatitude - userLocation.latitude) * Math.PI / 180;
        const dLon = (profileLongitude - userLocation.longitude) * Math.PI / 180;
        const a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(userLocation.latitude * Math.PI / 180) * Math.cos(profileLatitude * Math.PI / 180) * 
          Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const distance = R * c;

        // Store locally for immediate display
        setCalculatedDistance(distance);

        // Update distance in database
        const { error: distanceError } = await supabase
          .from('profiles')
          .update({ distance_km: distance })
          .eq('id', profileId);

        if (distanceError) {
          console.error('Error updating distance:', distanceError);
          throw distanceError;
        }

        // Skip drive time API call if locations are very close (within ~10 meters)
        if (Math.abs(userLocation.latitude - profileLatitude) < 0.0001 &&
            Math.abs(userLocation.longitude - profileLongitude) < 0.0001) {
          const { error: updateError } = await supabase.rpc('update_drive_time', {
            profile_id: profileId,
            drive_time: 0
          });
            
          if (updateError) {
            console.error('Error updating drive time for same location:', updateError);
            throw updateError;
          }
          setCalculatedDriveTime(0);
          return;
        }

        // Call Edge Function to calculate drive time
        const { data, error } = await supabase.functions.invoke('calculate-drive-time', {
          body: {
            profileId,
            originLat: userLocation.latitude,
            originLng: userLocation.longitude,
            destLat: profileLatitude,
            destLng: profileLongitude
          }
        });

        if (error) {
          console.error('Edge function error:', error);
          throw new Error(error.message || 'Could not calculate drive time');
        }

        if (data?.durationInMinutes) {
          setCalculatedDriveTime(data.durationInMinutes);
        }

        // Finally, refetch the data to make sure we have the latest from the database
        await refetch();

      } catch (error) {
        console.error('Error in calculateDistanceAndTime:', error);
        toast({
          title: "Error",
          description: error.message || "Failed to calculate distance and drive time",
          variant: "destructive",
        });
      }
    };

    if (hasUserLocation && userLocation) {
      calculateDistanceAndTime();
    }
  }, [profileId, profileLatitude, profileLongitude, userLocation, hasUserLocation, toast, refetch, locationUpdateCounter]);

  // Use values in this priority order:
  // 1. Local state (most up to date)
  // 2. Data from the database query
  const displayDistanceKm = calculatedDistance ?? profile?.distance_km;
  const displayDriveMinutes = calculatedDriveTime ?? profile?.drive_minutes;
  const displayLocation = profileLocation ?? profile?.location;

  return (
    <ProfileLocation
      hasUserLocation={hasUserLocation}
      distance_km={displayDistanceKm}
      drive_minutes={displayDriveMinutes}
      location={displayLocation}
      variant="card"
    />
  );
};

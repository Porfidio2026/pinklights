
import React, { useEffect } from 'react';
import { RelatedProfilesProps } from './profiles/types';
import { useLocationTracking } from './profiles/useLocationTracking';
import { useProfiles } from './profiles/useProfiles';
import { ProfilesList } from './profiles/ProfilesList';

export const RelatedProfiles: React.FC<RelatedProfilesProps> = ({ 
  profiles: providedProfiles, 
  linkToProfiles = false, 
  currentProfileId,
  selectedService,
  selectedGender
}) => {
  const { hasUserLocation, userLocation, locationUpdateCounter } = useLocationTracking();
  
  const { profiles, isLoading, hasCalculatedDistances, error } = useProfiles({
    providedProfiles,
    currentProfileId,
    selectedService,
    selectedGender,
    userLocation,
    locationUpdateCounter
  });

  // Log any errors
  useEffect(() => {
    if (error) {
      console.error('Error in RelatedProfiles:', error);
    }
  }, [error]);

  // If there's an error, throw it to be caught by the error boundary
  if (error) {
    throw error;
  }

  return (
    <ProfilesList 
      profiles={profiles || []} // Ensure profiles is always an array
      linkToProfiles={linkToProfiles}
      hasUserLocation={!!(hasUserLocation && hasCalculatedDistances)}
      isLoading={isLoading}
    />
  );
};

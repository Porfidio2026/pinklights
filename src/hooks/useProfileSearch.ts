
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { coordinatesService } from '@/components/location/coordinatesService';
import { useToast } from '@/components/ui/use-toast';
import { SearchCriteria } from '@/types/search';
import { Profile } from '@/types/profile';
import { saveSearchCriteria, fetchNearbyProfiles, fetchProfilePictures } from '@/utils/searchDatabase';

export const useProfileSearch = () => {
  const { toast } = useToast();
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria | null>(null);

  const { data: searchResults, isLoading, error } = useQuery({
    queryKey: ['profile-search', searchCriteria],
    queryFn: async () => {
      if (!searchCriteria) {
        return [];
      }

      try {
        // Get coordinates for the location
        const coordinates = await coordinatesService.checkCached(searchCriteria.location);
        
        if (!coordinates) {
          console.error('useProfileSearch: Could not determine coordinates');
          toast({
            title: "Error",
            description: "Could not determine location coordinates. Please try again.",
            variant: "destructive",
          });
          return [];
        }

        // Save search criteria
        await saveSearchCriteria(searchCriteria, coordinates);

        // Fetch nearby profiles with all filters applied at the database level
        const { data: nearbyProfiles, error: nearbyError } = await fetchNearbyProfiles(
          coordinates,
          searchCriteria.maxDistance,
          searchCriteria
        );

        if (nearbyError) {
          console.error('useProfileSearch: Error fetching nearby profiles:', nearbyError);
          toast({
            title: "Error",
            description: "Failed to fetch profiles. Please try again.",
            variant: "destructive",
          });
          throw nearbyError;
        }

        // Get profile pictures
        const { data: profilesWithPictures } = await fetchProfilePictures(
          (nearbyProfiles || []).map(p => p.id)
        );

        // Combine profiles with their pictures
        const finalResults = (nearbyProfiles || []).map(profile => ({
          ...profile,
          profile_pictures: profilesWithPictures?.filter(pic => pic.profile_id === profile.id) || []
        })) as Profile[];

        return finalResults;
      } catch (error) {
        console.error('useProfileSearch: Search error:', error);
        return [];
      }
    },
    enabled: !!searchCriteria,
    retry: 1
  });

  return {
    searchResults: Array.isArray(searchResults) ? searchResults : [],
    isLoading,
    error,
    setSearchCriteria,
  };
};

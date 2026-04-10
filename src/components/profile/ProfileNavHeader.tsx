
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { WhatsAppButton } from '@/components/profile/WhatsAppButton';
import { useNavigate, useLocation } from 'react-router-dom';

interface ProfileNavHeaderProps {
  profile: {
    id: string;
    full_name: string;
    age?: number;
    availability_status: string;
    phone_number?: string;
  };
}

export const ProfileNavHeader = ({ profile }: ProfileNavHeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBackToSearchResults = () => {
    // Check if we came from search results page
    const cameFromSearch = location.state?.fromSearch;
    
    if (cameFromSearch) {
      // Use the browser's history to go back
      navigate(-1);
    } else {
      // If not from search, go to step 3 of the index page
      navigate('/', { state: { startAtStep: 3 } });
    }
  };

  return (
    <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border py-4">
      <div className="container max-w-4xl">
        <div className="flex items-center justify-between relative">
          <Button 
            variant="ghost" 
            onClick={handleBackToSearchResults}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="hidden sm:inline">Back to results</span>
          </Button>
          
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <ProfileHeader
              fullName={profile.full_name}
              age={profile.age}
              availabilityStatus={profile.availability_status}
            />
          </div>

          <WhatsAppButton 
            phoneNumber={profile.phone_number}
            profileName={profile.full_name}
          />
        </div>
      </div>
    </div>
  );
};

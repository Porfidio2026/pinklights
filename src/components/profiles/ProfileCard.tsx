
import React from 'react';
import { Card, CardContent } from '../ui/card';
import { ProfilePictures } from '../profile/ProfilePictures';
import { Profile } from './types';
import { getAvailabilityStatusDisplay } from './utils';
import { ProfileLocation } from '../search/ProfileLocation';

interface ProfileCardProps {
  profile: Profile;
  hasUserLocation: boolean;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ profile, hasUserLocation }) => {
  const availability = getAvailabilityStatusDisplay(profile.availability_status);
  const defaultPicture = 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=60';
  
  // Determine if we actually have distance data for this profile
  const hasDistanceData = hasUserLocation && 
    typeof profile.distance_km === 'number' && 
    profile.distance_km > 0;
    
  const hasDriveTimeData = hasUserLocation && 
    typeof profile.drive_minutes === 'number' && 
    profile.drive_minutes > 0;
  
  return (
    <Card className="overflow-hidden group h-full">
      <div className="flex flex-col h-full">
        {/* Square image container */}
        <div className="relative aspect-square overflow-hidden">
          <ProfilePictures
            pictures={profile.profile_pictures}
            profileName={profile.full_name}
            defaultPictureUrl={defaultPicture}
            mainPictureUrl={profile.profile_picture_url}
            compact={true}
          />
        </div>
        
        {/* Info box below image */}
        <CardContent className="p-4 bg-card flex-grow">
          <div className="space-y-2">
            <div className="flex justify-between items-start">
              <h3 className="font-medium truncate flex-1">{profile.full_name}</h3>
              {profile.age && <span className="text-sm text-muted-foreground">{profile.age}</span>}
            </div>
            
            <p className={`text-sm ${availability.color}`}>
              {availability.text}
            </p>
            
            {/* Location Information */}
            <ProfileLocation
              hasUserLocation={hasDistanceData || hasDriveTimeData}
              distance_km={profile.distance_km}
              drive_minutes={profile.drive_minutes}
              location={profile.location}
              variant="compact"
            />
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

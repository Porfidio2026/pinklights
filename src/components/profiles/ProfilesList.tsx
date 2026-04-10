
import React from 'react';
import { Link } from 'react-router-dom';
import { Profile } from './types';
import { ProfileCard } from './ProfileCard';

interface ProfilesListProps {
  profiles?: Profile[];
  linkToProfiles?: boolean;
  hasUserLocation: boolean;
  isLoading?: boolean;
}

export const ProfilesList: React.FC<ProfilesListProps> = ({ 
  profiles, 
  linkToProfiles = false,
  hasUserLocation,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="overflow-hidden group animate-pulse">
            <div className="relative aspect-square bg-muted" />
            <div className="h-24 bg-card" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {profiles?.map((profile) => (
        linkToProfiles ? (
          <Link 
            key={profile.id} 
            to={`/profile/${profile.id}`} 
            className="block h-full"
          >
            <ProfileCard profile={profile} hasUserLocation={hasUserLocation} />
          </Link>
        ) : (
          <div key={profile.id} className="h-full">
            <ProfileCard profile={profile} hasUserLocation={hasUserLocation} />
          </div>
        )
      ))}
    </div>
  );
};

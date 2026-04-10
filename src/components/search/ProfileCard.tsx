
import React from 'react';
import { ProfilePictures } from '@/components/profile/ProfilePictures';
import { MapPin, Clock } from 'lucide-react';

interface Profile {
  id: string;
  full_name: string;
  age: number | null;
  availability_status: string;
  profile_pictures: Array<{
    id: string;
    picture_url: string;
    display_order: number;
  }>;
  distance_km?: number;
  drive_minutes?: number;
  location?: string | null;
}

interface ProfileCardProps {
  profile: Profile;
  hasUserLocation: boolean;
  onCardClick: (profileId: string) => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  hasUserLocation,
  onCardClick
}) => {
  const getAvailabilityStatusDisplay = (status: string) => {
    switch (status) {
      case 'available_now':
        return { text: 'Available now', color: 'text-emerald-400' };
      case 'available_later_today':
        return { text: 'Available later today', color: 'text-primary' };
      case 'available_tomorrow':
        return { text: 'Available tomorrow', color: 'text-primary' };
      default:
        return { text: 'Unavailable', color: 'text-muted-foreground' };
    }
  };

  const availability = getAvailabilityStatusDisplay(profile.availability_status);

  const extractCity = (fullLocation?: string | null): string => {
    if (!fullLocation) return '';
    const parts = fullLocation.split(',').map(part => part.trim());
    return parts.length > 1 ? parts[1] : parts[0];
  };

  const showDistance = hasUserLocation && typeof profile.distance_km === 'number' && profile.distance_km > 0;
  const showDriveTime = hasUserLocation && typeof profile.drive_minutes === 'number' && profile.drive_minutes > 0;
  const cityName = extractCity(profile.location);

  return (
    <div
      className="relative w-full h-[75vh] md:h-[70vh] rounded-2xl overflow-hidden cursor-pointer"
      onClick={() => onCardClick(profile.id)}
    >
      {/* Full-bleed photo */}
      <div className="absolute inset-0">
        <ProfilePictures
          pictures={profile.profile_pictures}
          profileName={profile.full_name}
          defaultPictureUrl="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=60"
          mainPictureUrl={profile.profile_pictures[0]?.picture_url}
        />
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

      {/* Content overlaid at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2">
        <div className="flex items-baseline gap-2">
          <h3 className="text-3xl font-bold text-white font-display">
            {profile.full_name}
          </h3>
          {profile.age && (
            <span className="text-2xl text-white/80">{profile.age}</span>
          )}
        </div>

        <p className={`text-sm font-medium ${availability.color}`}>
          {availability.text}
        </p>

        {/* Location info */}
        <div className="flex items-center gap-4 text-white/70 text-sm">
          {showDistance && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{Math.round(profile.distance_km! * 10) / 10} km</span>
            </div>
          )}
          {showDriveTime && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{profile.drive_minutes} min</span>
            </div>
          )}
          {!showDistance && !showDriveTime && cityName && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{cityName}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


import React from 'react';
import { MapPin, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { extractCity } from '@/utils/locationUtils';

interface ProfileLocationProps {
  hasUserLocation: boolean;
  distance_km?: number;
  drive_minutes?: number;
  location?: string | null;
  variant?: 'card' | 'grid' | 'compact';
}

export const ProfileLocation: React.FC<ProfileLocationProps> = ({
  hasUserLocation,
  distance_km,
  drive_minutes,
  location,
  variant = 'grid'
}) => {
  // Determine what location info to show - check for actual numeric values
  const showDistance = hasUserLocation && typeof distance_km === 'number' && distance_km > 0;
  const showDriveTime = hasUserLocation && typeof drive_minutes === 'number' && drive_minutes > 0;
  // City is always shown on tiles; distance/drive time are added on top when a
  // location has been shared, rather than replacing the city. Suppressed when
  // the profile has no usable location, so no empty pin is rendered.
  // extractCity returns an "Unknown location" placeholder rather than an empty
  // string, so gate on the raw location instead of the formatted result.
  const cityName = extractCity(location);
  const showCity = Boolean(location);

  // For profile card display (compact variant)
  if (variant === 'compact') {
    return (
      <div className="mt-2">
        {showDistance && (
          <div className="flex items-center text-sm text-muted-foreground gap-1">
            <MapPin className="h-3 w-3" />
            <span>{Math.round(distance_km * 10) / 10} km</span>
          </div>
        )}
        
        {showDriveTime && (
          <div className="flex items-center text-sm text-muted-foreground gap-1">
            <Clock className="h-3 w-3" />
            <span>{drive_minutes} min</span>
          </div>
        )}
        
        {showCity && (
          <div className="flex items-center text-sm text-muted-foreground gap-1">
            <MapPin className="h-3 w-3" />
            <span className="truncate">{cityName}</span>
          </div>
        )}
      </div>
    );
  }

  // For profile page display (card variant)
  if (variant === 'card') {
    if (!showDistance && !showDriveTime && !showCity) return null;
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {showDistance && (
          <Card className="p-4">
            <h3 className="text-lg font-medium mb-1">Distance</h3>
            <p className="text-3xl font-bold">{Math.round(distance_km * 10) / 10} km away</p>
          </Card>
        )}
        {showDriveTime && (
          <Card className="p-4">
            <h3 className="text-lg font-medium mb-1">Drive Time</h3>
            <p className="text-3xl font-bold">{drive_minutes} minutes</p>
          </Card>
        )}
        {showCity && !showDistance && !showDriveTime && (
          <Card className="p-4 col-span-full">
            <h3 className="text-lg font-medium mb-1">Location</h3>
            <p className="text-3xl font-bold">{extractCity(location)}</p>
          </Card>
        )}
      </div>
    );
  }

  // Default grid variant (for search results)
  return (
    <div className="grid grid-cols-2 gap-4">
      {showDistance && (
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-muted-foreground" />
          <span className="text-lg">{Math.round(distance_km * 10) / 10} km</span>
        </div>
      )}
      
      {showDriveTime && (
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-muted-foreground" />
          <span className="text-lg">{drive_minutes} min</span>
        </div>
      )}
      
      {showCity && (
        <div className="flex items-center gap-2 col-span-2">
          <MapPin className="h-5 w-5 text-muted-foreground" />
          <span className="text-lg">{extractCity(location)}</span>
        </div>
      )}
    </div>
  );
};

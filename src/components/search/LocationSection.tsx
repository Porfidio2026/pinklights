
import React from 'react';
import { Button } from '../ui/button';
import { MapPin } from 'lucide-react';
import { useToast } from '../ui/use-toast';
import { LocationAutocomplete } from '../LocationAutocomplete';

interface LocationSectionProps {
  location: string;
  onLocationChange: (value: string) => void;
}

export const LocationSection = ({ location, onLocationChange }: LocationSectionProps) => {
  const { toast } = useToast();

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await fetch(
              `https://api.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
            );
            const data = await response.json();
            const locationString = data.display_name;
            
            // First update the location string
            onLocationChange(locationString);
            
            // Store location in localStorage
            const locationData = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            };
            
            localStorage.setItem('userLocation', JSON.stringify(locationData));
            
            // Create a custom event that includes the location data
            const locationEvent = new CustomEvent('userLocationUpdated', {
              detail: locationData
            });
            
            // Dispatch the event
            window.dispatchEvent(locationEvent);

            toast({
              title: "Success",
              description: "Location retrieved successfully",
            });
          } catch (error) {
            console.error('Error fetching location details:', error);
            toast({
              title: "Error",
              description: "Failed to get location details",
              variant: "destructive",
            });
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          toast({
            title: "Error",
            description: "Location access denied",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Error",
        description: "Geolocation is not supported by your browser",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Location</label>
        <div className="flex gap-2">
          <LocationAutocomplete
            value={location}
            onChange={onLocationChange}
            placeholder="Enter location"
            className="flex-1"
          />
          <Button type="button" variant="outline" onClick={getUserLocation}>
            <MapPin className="w-4 h-4 mr-2" />
            Current Location
          </Button>
        </div>
      </div>
    </div>
  );
};

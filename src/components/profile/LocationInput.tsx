
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { LocationAutocomplete } from '@/components/LocationAutocomplete';
import { ProfileFormData } from '@/hooks/useProfileForm';
import { supabase } from '@/lib/supabase';

interface LocationInputProps {
  formData: ProfileFormData;
  setFormData: (data: ProfileFormData) => void;
}

export const LocationInput: React.FC<LocationInputProps> = ({ formData, setFormData }) => {
  const { toast } = useToast();

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            // First get address from coordinates using OpenStreetMap
            const response = await fetch(
              `https://api.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
            );
            const data = await response.json();
            const locationString = data.display_name;
            
            // Update form data with both location and coordinates
            setFormData({ 
              ...formData, 
              location: locationString,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
            
            // Cache the coordinates
            const { error: cacheError } = await supabase
              .from('cached_coordinates')
              .upsert({
                address: locationString,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              });

            if (cacheError) throw cacheError;
            
            toast({
              title: "Success",
              description: "Location retrieved successfully",
            });
          } catch (error) {
            console.error('Get location error:', error);
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
    <div className="space-y-2">
      <label>Location</label>
      <div className="flex gap-2">
        <LocationAutocomplete
          value={formData.location}
          onChange={(location) => setFormData({ ...formData, location })}
          required
        />
        <Button type="button" onClick={getUserLocation} variant="outline">
          <MapPin className="w-4 h-4 mr-2" />
          Use My Location
        </Button>
      </div>
    </div>
  );
};

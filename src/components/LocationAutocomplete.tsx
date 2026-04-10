
import React, { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { LocationAutocompleteProps } from "./location/types";
import { useGoogleMaps } from "./location/useGoogleMaps";
import { coordinatesService } from "./location/coordinatesService";
import { useToast } from "./ui/use-toast";

export const LocationAutocomplete = ({
  value,
  onChange,
  placeholder = "Enter location",
  className,
  required,
}: LocationAutocompleteProps) => {
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [localValue, setLocalValue] = useState(value);
  const isUpdatingRef = useRef(false);
  const userInputRef = useRef(false);

  // Only update local value when prop changes and we're not in the middle of an update
  useEffect(() => {
    if (!isUpdatingRef.current && value !== localValue && !userInputRef.current) {
      setLocalValue(value);
    }
  }, [value, localValue]);

  const { autocompleteRef, geocoderRef, isLoading } = useGoogleMaps(inputRef);

  useEffect(() => {
    if (!autocompleteRef.current || !window.google?.maps?.places) {
      return;
    }

    const listener = autocompleteRef.current.addListener(
      "place_changed",
      async () => {
        const place = autocompleteRef.current?.getPlace();
        if (!place?.formatted_address || !place.geometry?.location) {
          return;
        }

        isUpdatingRef.current = true;
        userInputRef.current = false;
        
        try {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();

          // Update local value first
          setLocalValue(place.formatted_address);
          // Then notify parent component with the Google-provided formatted address
          onChange(place.formatted_address);

          // Store location in localStorage
          localStorage.setItem('userLocation', JSON.stringify({
            latitude: lat,
            longitude: lng
          }));

          // Create a custom event that includes the location data
          const locationEvent = new CustomEvent('userLocationUpdated', {
            detail: { latitude: lat, longitude: lng }
          });
          
          // Dispatch the event
          window.dispatchEvent(locationEvent);

          await Promise.all([
            coordinatesService.cache(place.formatted_address, lat, lng),
            coordinatesService.updateUserProfile(place.formatted_address, lat, lng)
          ]);
          
          toast({
            title: "Location updated",
            description: "Your location has been successfully saved.",
          });
        } catch (error) {
          console.error('Failed to update location:', error);
          toast({
            title: "Error",
            description: "Failed to save your location. Please try again.",
            variant: "destructive",
          });
        } finally {
          isUpdatingRef.current = false;
        }
      }
    );

    return () => {
      if (autocompleteRef.current && window.google?.maps?.event) {
        window.google.maps.event.removeListener(listener);
      }
    };
  }, [onChange, toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    userInputRef.current = true;
    setLocalValue(newValue);
    
    if (!newValue.trim()) {
      onChange("");
      userInputRef.current = false;
    }
  };

  return (
    <Input
      ref={inputRef}
      type="text"
      value={localValue}
      onChange={handleInputChange}
      placeholder={placeholder}
      className={className}
      disabled={isLoading}
      required={required}
      autoComplete="off"
    />
  );
};

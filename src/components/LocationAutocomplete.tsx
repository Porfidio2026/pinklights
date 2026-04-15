import { useEffect, useRef } from "react";
import { LocationAutocompleteProps } from "./location/types";
import { useGoogleMapsPlaces } from "./location/useGoogleMaps";
import { coordinatesService } from "./location/coordinatesService";
import { useToast } from "./ui/use-toast";
import { cn } from "@/lib/utils";

type PlaceAutocompleteElement = HTMLElement & {
  value?: string;
  placeholder?: string;
};

type GmpSelectEvent = Event & {
  placePrediction: {
    toPlace: () => {
      fetchFields: (opts: { fields: string[] }) => Promise<void>;
      formattedAddress?: string;
      location?: { lat: () => number; lng: () => number };
    };
  };
};

export const LocationAutocomplete = ({
  value,
  onChange,
  placeholder = "Enter location",
  className,
  required,
}: LocationAutocompleteProps) => {
  const { toast } = useToast();
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<PlaceAutocompleteElement | null>(null);
  const onChangeRef = useRef(onChange);
  const { loaded, error } = useGoogleMapsPlaces();

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to initialize location autocomplete.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  useEffect(() => {
    if (!loaded || !containerRef.current || elementRef.current) return;

    const places = (window.google?.maps as unknown as {
      places?: { PlaceAutocompleteElement?: new (opts: Record<string, unknown>) => PlaceAutocompleteElement };
    })?.places;

    if (!places?.PlaceAutocompleteElement) {
      toast({
        title: "Error",
        description: "Places library did not expose PlaceAutocompleteElement.",
        variant: "destructive",
      });
      return;
    }

    const el = new places.PlaceAutocompleteElement({
      includedRegionCodes: ["be"],
    });
    el.placeholder = placeholder;
    if (value) el.value = value;

    const container = containerRef.current;
    container.appendChild(el);
    elementRef.current = el;

    const handleSelect = async (rawEvent: Event) => {
      const event = rawEvent as GmpSelectEvent;
      try {
        const place = event.placePrediction.toPlace();
        await place.fetchFields({
          fields: ["displayName", "formattedAddress", "location"],
        });

        const formattedAddress = place.formattedAddress;
        const lat = place.location?.lat();
        const lng = place.location?.lng();

        if (!formattedAddress || lat == null || lng == null) return;

        onChangeRef.current(formattedAddress);

        localStorage.setItem(
          "userLocation",
          JSON.stringify({ latitude: lat, longitude: lng }),
        );
        window.dispatchEvent(
          new CustomEvent("userLocationUpdated", {
            detail: { latitude: lat, longitude: lng },
          }),
        );

        await Promise.all([
          coordinatesService.cache(formattedAddress, lat, lng),
          coordinatesService.updateUserProfile(formattedAddress, lat, lng),
        ]);

        toast({
          title: "Location updated",
          description: "Your location has been successfully saved.",
        });
      } catch (err) {
        console.error("Failed to update location:", err);
        toast({
          title: "Error",
          description: "Failed to save your location. Please try again.",
          variant: "destructive",
        });
      }
    };

    el.addEventListener("gmp-select", handleSelect);

    return () => {
      el.removeEventListener("gmp-select", handleSelect);
      el.remove();
      elementRef.current = null;
    };
    // Only remount when the API loads for the first time.
    // onChange is read through a ref; value/placeholder are applied on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  return (
    <div
      ref={containerRef}
      className={cn("location-autocomplete", className)}
      data-required={required ? "true" : undefined}
    />
  );
};

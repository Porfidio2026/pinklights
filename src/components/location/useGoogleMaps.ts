
import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { useToast } from "../ui/use-toast";

export const useGoogleMaps = (inputRef: React.RefObject<HTMLInputElement>) => {
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const geocoderRef = useRef<google.maps.Geocoder | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const [apiLoaded, setApiLoaded] = useState(false);
  const initAttemptedRef = useRef(false);

  useEffect(() => {
    const initGoogleMaps = async () => {
      if (apiLoaded) return;
      if (initAttemptedRef.current) return;

      initAttemptedRef.current = true;

      try {
        setIsLoading(true);

        const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

        if (!apiKey) {
          throw new Error("Google Maps API key not found. Add VITE_GOOGLE_MAPS_API_KEY to your .env file.");
        }

        const loader = new Loader({
          apiKey,
          version: "weekly",
          libraries: ["places"],
        });

        await loader.load();
        setApiLoaded(true);

        if (!inputRef.current) {
          return;
        }

        geocoderRef.current = new google.maps.Geocoder();

        autocompleteRef.current = new google.maps.places.Autocomplete(
          inputRef.current,
          {
            types: ["address"],
            fields: [
              "formatted_address",
              "geometry",
              "name",
              "address_components",
            ],
            componentRestrictions: { country: ["be"] },
          }
        );

        // Prevent form submission on enter
        inputRef.current.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
          }
        });

      } catch (error: any) {
        console.error("Google Maps Error:", error);
        toast({
          title: "Error",
          description:
            error.message || "Failed to initialize location autocomplete.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    initGoogleMaps();
  }, [apiLoaded, inputRef, toast]);

  return { autocompleteRef, geocoderRef, isLoading };
};

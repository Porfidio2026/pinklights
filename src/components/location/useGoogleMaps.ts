import { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

let loaderPromise: Promise<void> | null = null;

const loadPlacesLibrary = (): Promise<void> => {
  if (loaderPromise) return loaderPromise;

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return Promise.reject(
      new Error("Missing VITE_GOOGLE_MAPS_API_KEY in environment."),
    );
  }

  const loader = new Loader({
    apiKey,
    version: "weekly",
    libraries: ["places"],
  });

  loaderPromise = loader.load().then(() => undefined);
  return loaderPromise;
};

export const useGoogleMapsPlaces = () => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    loadPlacesLibrary()
      .then(() => {
        if (!cancelled) setLoaded(true);
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error(String(err)));
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { loaded, error };
};

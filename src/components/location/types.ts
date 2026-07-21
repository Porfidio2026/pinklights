
export interface LocationAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onPlaceSelect?: (address: string, lat: number, lng: number) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
  /** When true, skip updating the logged-in user's profile (used for admin-created profiles). */
  skipProfileUpdate?: boolean;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface CachedCoordinates {
  latitude: number;
  longitude: number;
}


export interface LocationAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface CachedCoordinates {
  latitude: number;
  longitude: number;
}

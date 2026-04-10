
// Extract city from full location string
export const extractCity = (location?: string | null): string => {
  if (!location) return 'Unknown location';
  
  // Try to extract city from Google Maps formatted address
  // Common format: "Street Address, City, State/Province, Postal Code, Country"
  const parts = location.split(',').map(part => part.trim());
  
  // If we have multiple parts, the city is usually the second part
  // But for safety, we'll use the first part if there's only one
  return parts.length > 1 ? parts[1] : parts[0];
};

export const getAvailabilityStatusDisplay = (status: string) => {
  switch (status) {
    case 'available_now':
      return { text: 'Available now', color: 'text-emerald-400' };
    case 'available_later_today':
      return { text: 'Available later today', color: 'text-primary' };
    case 'available_tomorrow':
      return { text: 'Available tomorrow', color: 'text-primary/70' };
    default:
      return { text: 'Unavailable', color: 'text-muted-foreground' };
  }
};

// Calculate haversine distance between two points
export const calculateHaversineDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

// Estimate drive time based on distance
export const estimateDriveTime = (distanceKm: number): number => {
  // Rough estimate of drive time (30 km/h average speed in cities)
  return Math.round(distanceKm * 2); // 2 minutes per km is a rough estimate
};

/**
 * Extracts the city name from a Google Places formatted address string.
 *
 * Google Places addresses typically follow these formats:
 *   - "City, Country"                          -> City
 *   - "PostalCode City, Country"               -> City
 *   - "Street 123, PostalCode City, Country"   -> City
 *
 * The function picks the second-to-last comma-separated part and strips
 * any leading postal code digits.
 */
export function extractCity(location: string | null | undefined): string {
  if (!location) return 'Unknown location';

  const parts = location.split(',').map((s) => s.trim());

  if (parts.length >= 2) {
    // Take the second-to-last part (typically the city or "PostalCode City")
    const cityPart = parts[parts.length - 2];
    // Remove a leading postal code (e.g. "2000 Antwerp" -> "Antwerp")
    return cityPart.replace(/^\d+\s*/, '') || cityPart;
  }

  // Single-part address – return as-is
  return location;
}

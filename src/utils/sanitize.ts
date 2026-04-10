
/**
 * Strip HTML tags from user input to prevent XSS.
 * React already escapes JSX output, but this provides defense-in-depth
 * for data stored in the database.
 */
export function sanitizeText(input: string | null | undefined): string {
  if (!input) return '';
  return input.replace(/<[^>]*>/g, '').trim();
}

/**
 * Sanitize all string values in a flat object.
 */
export function sanitizeFormData<T extends Record<string, unknown>>(data: T): T {
  const sanitized = { ...data };
  for (const key in sanitized) {
    const value = sanitized[key];
    if (typeof value === 'string') {
      (sanitized as Record<string, unknown>)[key] = sanitizeText(value);
    }
  }
  return sanitized;
}

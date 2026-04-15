
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
// Pre-resize sanity cap. The client-side resize in imageResize.ts shrinks
// anything reasonable down to ~1200px JPEG before upload, so this only
// needs to block files large enough to crash the browser on decode.
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function validateImageFile(file: File): ValidationResult {
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type "${file.type}". Only JPEG, PNG, and WebP images are allowed.`,
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
    return {
      valid: false,
      error: `File is too large (${sizeMB}MB). Maximum size is 50MB.`,
    };
  }

  return { valid: true };
}

export function validateImageFiles(files: File[]): ValidationResult {
  for (const file of files) {
    const result = validateImageFile(file);
    if (!result.valid) return result;
  }
  return { valid: true };
}

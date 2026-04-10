import { describe, it, expect } from 'vitest';
import { validateImageFile, validateImageFiles } from '../imageValidation';

function createFile(name: string, size: number, type: string): File {
  const buffer = new ArrayBuffer(size);
  return new File([buffer], name, { type });
}

describe('validateImageFile', () => {
  it('accepts valid JPEG', () => {
    const file = createFile('photo.jpg', 1024, 'image/jpeg');
    expect(validateImageFile(file)).toEqual({ valid: true });
  });

  it('accepts valid PNG', () => {
    const file = createFile('photo.png', 1024, 'image/png');
    expect(validateImageFile(file)).toEqual({ valid: true });
  });

  it('accepts valid WebP', () => {
    const file = createFile('photo.webp', 1024, 'image/webp');
    expect(validateImageFile(file)).toEqual({ valid: true });
  });

  it('rejects GIF', () => {
    const file = createFile('photo.gif', 1024, 'image/gif');
    const result = validateImageFile(file);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('image/gif');
  });

  it('rejects files over 5MB', () => {
    const file = createFile('photo.jpg', 6 * 1024 * 1024, 'image/jpeg');
    const result = validateImageFile(file);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('too large');
  });

  it('accepts files exactly 5MB', () => {
    const file = createFile('photo.jpg', 5 * 1024 * 1024, 'image/jpeg');
    expect(validateImageFile(file)).toEqual({ valid: true });
  });
});

describe('validateImageFiles', () => {
  it('accepts array of valid files', () => {
    const files = [
      createFile('a.jpg', 1024, 'image/jpeg'),
      createFile('b.png', 1024, 'image/png'),
    ];
    expect(validateImageFiles(files)).toEqual({ valid: true });
  });

  it('rejects if any file is invalid', () => {
    const files = [
      createFile('a.jpg', 1024, 'image/jpeg'),
      createFile('b.gif', 1024, 'image/gif'),
    ];
    const result = validateImageFiles(files);
    expect(result.valid).toBe(false);
  });

  it('accepts empty array', () => {
    expect(validateImageFiles([])).toEqual({ valid: true });
  });
});

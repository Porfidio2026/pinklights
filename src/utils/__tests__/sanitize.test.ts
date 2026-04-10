import { describe, it, expect } from 'vitest';
import { sanitizeText, sanitizeFormData } from '../sanitize';

describe('sanitizeText', () => {
  it('returns empty string for null', () => {
    expect(sanitizeText(null)).toBe('');
  });

  it('returns empty string for undefined', () => {
    expect(sanitizeText(undefined)).toBe('');
  });

  it('returns empty string for empty string', () => {
    expect(sanitizeText('')).toBe('');
  });

  it('passes through clean text', () => {
    expect(sanitizeText('Hello world')).toBe('Hello world');
  });

  it('strips HTML tags', () => {
    expect(sanitizeText('Hello <b>world</b>')).toBe('Hello world');
  });

  it('strips script tags', () => {
    expect(sanitizeText('<script>alert("xss")</script>Safe text')).toBe('alert("xss")Safe text');
  });

  it('strips nested tags', () => {
    expect(sanitizeText('<div><p>Hello</p></div>')).toBe('Hello');
  });

  it('trims whitespace', () => {
    expect(sanitizeText('  hello  ')).toBe('hello');
  });
});

describe('sanitizeFormData', () => {
  it('sanitizes all string values', () => {
    const data = {
      name: '<b>John</b>',
      age: 25,
      bio: '<script>bad</script>Good bio',
    };
    const result = sanitizeFormData(data);
    expect(result.name).toBe('John');
    expect(result.age).toBe(25);
    expect(result.bio).toBe('badGood bio');
  });

  it('preserves non-string values', () => {
    const data = {
      count: 42,
      active: true,
      tags: null,
    };
    const result = sanitizeFormData(data);
    expect(result.count).toBe(42);
    expect(result.active).toBe(true);
    expect(result.tags).toBe(null);
  });
});

import { describe, it, expect } from 'vitest';
import {
  filterProfilesByHairColour,
  filterProfilesByBreastSize,
  filterProfilesBySkinTone,
  filterProfilesByBodyType,
  filterProfilesByAgeRange,
  applyAllFilters,
} from '../profileFilters';
import { Profile } from '@/types/profile';

const makeProfile = (overrides: Partial<Profile> = {}): Profile => ({
  id: '1',
  full_name: 'Test',
  age: 25,
  location: 'Brussels',
  availability_status: 'available',
  profile_picture_url: null,
  distance_km: 5,
  hair_colour: 'Blonde',
  breast_size: 'Medium',
  skin_tone: 'Light',
  body_type: 'Petite',
  profile_pictures: [],
  gender: 'Female',
  service_type: 'private',
  ...overrides,
});

const profiles: Profile[] = [
  makeProfile({ id: '1', hair_colour: 'Blonde', breast_size: 'Medium', skin_tone: 'Light', body_type: 'Petite', age: 22 }),
  makeProfile({ id: '2', hair_colour: 'Brunette', breast_size: 'Large', skin_tone: 'Dark', body_type: 'Athletic', age: 30 }),
  makeProfile({ id: '3', hair_colour: 'Red', breast_size: 'Small', skin_tone: 'Medium', body_type: 'Curvy', age: 45 }),
  makeProfile({ id: '4', hair_colour: null, breast_size: null, skin_tone: null, body_type: null, age: null }),
];

describe('filterProfilesByHairColour', () => {
  it('returns all profiles when filter is empty', () => {
    expect(filterProfilesByHairColour(profiles, [])).toHaveLength(4);
  });

  it('filters by single colour', () => {
    const result = filterProfilesByHairColour(profiles, ['Blonde']);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
  });

  it('filters by multiple colours', () => {
    const result = filterProfilesByHairColour(profiles, ['Blonde', 'Red']);
    expect(result).toHaveLength(2);
  });

  it('excludes profiles with null hair colour', () => {
    const result = filterProfilesByHairColour(profiles, ['Blonde', 'Brunette', 'Red']);
    expect(result).toHaveLength(3);
  });
});

describe('filterProfilesByBreastSize', () => {
  it('returns all when filter empty', () => {
    expect(filterProfilesByBreastSize(profiles, [])).toHaveLength(4);
  });

  it('filters correctly', () => {
    expect(filterProfilesByBreastSize(profiles, ['Large'])).toHaveLength(1);
  });
});

describe('filterProfilesBySkinTone', () => {
  it('returns all when filter empty', () => {
    expect(filterProfilesBySkinTone(profiles, [])).toHaveLength(4);
  });

  it('filters correctly', () => {
    expect(filterProfilesBySkinTone(profiles, ['Light', 'Dark'])).toHaveLength(2);
  });
});

describe('filterProfilesByBodyType', () => {
  it('returns all when filter empty', () => {
    expect(filterProfilesByBodyType(profiles, [])).toHaveLength(4);
  });

  it('filters correctly', () => {
    expect(filterProfilesByBodyType(profiles, ['Athletic'])).toHaveLength(1);
  });
});

describe('filterProfilesByAgeRange', () => {
  it('returns all for full range [18, 99]', () => {
    expect(filterProfilesByAgeRange(profiles, [18, 99])).toHaveLength(4);
  });

  it('filters by min age', () => {
    const result = filterProfilesByAgeRange(profiles, [28, 99]);
    expect(result).toHaveLength(2);
  });

  it('filters by max age', () => {
    const result = filterProfilesByAgeRange(profiles, [18, 30]);
    expect(result).toHaveLength(2);
  });

  it('excludes profiles with null age', () => {
    const result = filterProfilesByAgeRange(profiles, [20, 50]);
    expect(result).toHaveLength(3);
  });
});

describe('applyAllFilters', () => {
  it('applies all criteria together', () => {
    const criteria = {
      location: '',
      maxDistance: 100,
      hairColour: ['Blonde'],
      breastSize: [],
      skinTone: [],
      bodyType: [],
      ageRange: [18, 99] as [number, number],
    };
    const result = applyAllFilters(profiles, criteria);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
  });

  it('returns nothing when criteria exclude all', () => {
    const criteria = {
      location: '',
      maxDistance: 100,
      hairColour: ['Blonde'],
      breastSize: ['Large'],
      skinTone: [],
      bodyType: [],
      ageRange: [18, 99] as [number, number],
    };
    expect(applyAllFilters(profiles, criteria)).toHaveLength(0);
  });

  it('returns all when all filters are empty/default', () => {
    const criteria = {
      location: '',
      maxDistance: 100,
      hairColour: [],
      breastSize: [],
      skinTone: [],
      bodyType: [],
      ageRange: [18, 99] as [number, number],
    };
    expect(applyAllFilters(profiles, criteria)).toHaveLength(4);
  });
});

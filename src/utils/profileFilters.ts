
import { Profile } from '@/types/profile';
import { SearchCriteria } from '@/types/search';

export const filterProfilesByHairColour = (profiles: Profile[], hairColours: string[]) => {
  if (hairColours.length === 0) return profiles;
  return profiles.filter(
    profile => profile.hair_colour && hairColours.includes(profile.hair_colour)
  );
};

export const filterProfilesByBreastSize = (profiles: Profile[], breastSizes: string[]) => {
  if (breastSizes.length === 0) return profiles;
  return profiles.filter(
    profile => profile.breast_size && breastSizes.includes(profile.breast_size)
  );
};

export const filterProfilesBySkinTone = (profiles: Profile[], skinTones: string[]) => {
  if (skinTones.length === 0) return profiles;
  return profiles.filter(
    profile => profile.skin_tone && skinTones.includes(profile.skin_tone)
  );
};

export const filterProfilesByBodyType = (profiles: Profile[], bodyTypes: string[]) => {
  if (bodyTypes.length === 0) return profiles;
  return profiles.filter(
    profile => profile.body_type && bodyTypes.includes(profile.body_type)
  );
};

export const filterProfilesByAgeRange = (profiles: Profile[], [minAge, maxAge]: [number, number]) => {
  if (minAge <= 18 && maxAge >= 99) return profiles;
  return profiles.filter(
    profile => profile.age && 
    profile.age >= minAge && 
    profile.age <= maxAge
  );
};

export const applyAllFilters = (profiles: Profile[], criteria: SearchCriteria) => {
  let filteredProfiles = profiles;

  filteredProfiles = filterProfilesByHairColour(filteredProfiles, criteria.hairColour);
  filteredProfiles = filterProfilesByBreastSize(filteredProfiles, criteria.breastSize);
  filteredProfiles = filterProfilesBySkinTone(filteredProfiles, criteria.skinTone);
  filteredProfiles = filterProfilesByBodyType(filteredProfiles, criteria.bodyType);
  filteredProfiles = filterProfilesByAgeRange(filteredProfiles, criteria.ageRange);

  return filteredProfiles;
};

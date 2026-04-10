
import React, { useState } from 'react';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';
import { LocationSection } from './search/LocationSection';
import { DistanceSlider } from './search/DistanceSlider';
import { MultiSelectButtons } from './search/MultiSelectButtons';
import { AgeRangeSlider } from './search/AgeRangeSlider';

interface SearchCriteria {
  location: string;
  maxDistance: number;
  hairColour: string[];
  breastSize: string[];
  skinTone: string[];
  bodyType: string[];
  ageRange: [number, number];
}

interface SearchFormProps {
  onSearch: (criteria: SearchCriteria) => void;
  initialValues?: SearchCriteria;
}

const defaultCriteria: SearchCriteria = {
  location: '',
  maxDistance: 50,
  hairColour: [],
  breastSize: [],
  skinTone: [],
  bodyType: [],
  ageRange: [18, 99],
};

// Characteristic options
const hairColours = ["Blonde", "Dark", "Red", "Coloured"];
const breastSizes = ["Small", "Medium", "Big"];
const skinTones = ["Light", "Brown", "Dark"];
const bodyTypes = ["Petite", "Medium", "Large", "XL"];

export const SearchForm = ({ onSearch, initialValues }: SearchFormProps) => {
  const { toast } = useToast();
  const [criteria, setCriteria] = useState<SearchCriteria>(initialValues || defaultCriteria);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!criteria.location) {
      toast({
        title: "Error",
        description: "Please enter a location",
        variant: "destructive",
      });
      return;
    }
    onSearch(criteria);
  };

  return (
    <form onSubmit={handleSearch} className="space-y-5">
      <LocationSection
        location={criteria.location}
        onLocationChange={(value) => setCriteria({ ...criteria, location: value })}
      />

      <DistanceSlider
        maxDistance={criteria.maxDistance}
        onDistanceChange={(value) => setCriteria({ ...criteria, maxDistance: value })}
      />

      <MultiSelectButtons
        label="Hair Colour"
        options={hairColours}
        selectedOptions={criteria.hairColour}
        onChange={(value) => setCriteria({ ...criteria, hairColour: value })}
      />

      <MultiSelectButtons
        label="Breast Size"
        options={breastSizes}
        selectedOptions={criteria.breastSize}
        onChange={(value) => setCriteria({ ...criteria, breastSize: value })}
      />

      <MultiSelectButtons
        label="Skin Tone"
        options={skinTones}
        selectedOptions={criteria.skinTone}
        onChange={(value) => setCriteria({ ...criteria, skinTone: value })}
      />

      <MultiSelectButtons
        label="Body Type"
        options={bodyTypes}
        selectedOptions={criteria.bodyType}
        onChange={(value) => setCriteria({ ...criteria, bodyType: value })}
      />

      <AgeRangeSlider
        ageRange={criteria.ageRange}
        onAgeRangeChange={(range) => setCriteria({ ...criteria, ageRange: range })}
      />

      <Button type="submit" className="w-full gradient-pink text-white border-0 rounded-xl h-11 font-semibold hover:opacity-90 transition-opacity">
        Search Profiles
      </Button>
    </form>
  );
};


import React from 'react';
import { Slider } from '../ui/slider';

interface AgeRangeSliderProps {
  ageRange: [number, number];
  onAgeRangeChange: (range: [number, number]) => void;
}

export const AgeRangeSlider = ({ ageRange, onAgeRangeChange }: AgeRangeSliderProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Age Range</label>
      <div className="pt-4">
        <Slider
          min={18}
          max={99}
          step={1}
          value={[ageRange[0], ageRange[1]]}
          onValueChange={(value) => onAgeRangeChange([value[0], value[1]])}
          className="my-4"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{ageRange[0]} years</span>
          <span>{ageRange[1]} years</span>
        </div>
      </div>
    </div>
  );
};

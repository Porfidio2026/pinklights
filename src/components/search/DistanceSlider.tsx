
import React from 'react';
import { Slider } from '../ui/slider';

interface DistanceSliderProps {
  maxDistance: number;
  onDistanceChange: (value: number) => void;
}

export const DistanceSlider = ({ maxDistance, onDistanceChange }: DistanceSliderProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Maximum Distance</label>
      <div className="pt-4">
        <Slider
          min={0}
          max={100}
          step={1}
          value={[maxDistance]}
          onValueChange={(value) => onDistanceChange(value[0])}
          className="my-4"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>0 km</span>
          <span>{maxDistance} km</span>
        </div>
      </div>
    </div>
  );
};


import React from 'react';
import { Button } from '../ui/button';

interface MultiSelectButtonsProps {
  label: string;
  options: string[];
  selectedOptions: string[];
  onChange: (newOptions: string[]) => void;
}

export const MultiSelectButtons = ({
  label,
  options,
  selectedOptions,
  onChange,
}: MultiSelectButtonsProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <Button
            key={option}
            type="button"
            variant={selectedOptions.includes(option) ? "default" : "outline"}
            onClick={() => {
              const newOptions = selectedOptions.includes(option)
                ? selectedOptions.filter((s) => s !== option)
                : [...selectedOptions, option];
              onChange(newOptions);
            }}
            className="text-sm"
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
};

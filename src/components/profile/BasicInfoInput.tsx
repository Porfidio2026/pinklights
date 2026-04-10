
import React from 'react';
import { Input } from "@/components/ui/input";
import { ProfileFormData } from '@/hooks/useProfileForm';

interface BasicInfoInputProps {
  formData: ProfileFormData;
  setFormData: (data: ProfileFormData) => void;
}

export const BasicInfoInput: React.FC<BasicInfoInputProps> = ({ formData, setFormData }) => {
  return (
    <>
      <div className="space-y-2">
        <label>Screen Name</label>
        <Input
          value={formData.full_name}
          onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <label>Age</label>
        <Input
          type="number"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          required
        />
      </div>
    </>
  );
};

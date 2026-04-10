
import React from 'react';
import { Input } from "@/components/ui/input";
import { ProfileFormData } from '@/hooks/useProfileForm';

interface ServiceAndGenderInputProps {
  formData: ProfileFormData;
  setFormData: (data: ProfileFormData) => void;
}

export const ServiceAndGenderInput: React.FC<ServiceAndGenderInputProps> = ({ formData, setFormData }) => {
  const serviceTypes = ["private", "outcall", "soft", "ropes"];
  const genderTypes = ["Female", "Trans"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label>Service Type</label>
        <Input
          value={formData.service_type}
          onChange={(e) => setFormData({ ...formData, service_type: e.target.value as ProfileFormData['service_type'] })}
          required
          list="serviceTypes"
          className="bg-background"
          placeholder="Select service type"
        />
        <datalist id="serviceTypes">
          {serviceTypes.map((type) => (
            <option key={type} value={type} />
          ))}
        </datalist>
      </div>

      <div className="space-y-2">
        <label>Gender</label>
        <Input
          value={formData.gender}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value as ProfileFormData['gender'] })}
          required
          list="genderTypes"
          className="bg-background"
          placeholder="Select gender"
        />
        <datalist id="genderTypes">
          {genderTypes.map((type) => (
            <option key={type} value={type} />
          ))}
        </datalist>
      </div>
    </div>
  );
};

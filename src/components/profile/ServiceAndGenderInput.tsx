
import React from 'react';
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
        <select
          value={formData.service_type}
          onChange={(e) => setFormData({ ...formData, service_type: e.target.value as ProfileFormData['service_type'] })}
          required
          className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {serviceTypes.map((type) => (
            <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label>Gender</label>
        <select
          value={formData.gender}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value as ProfileFormData['gender'] })}
          required
          className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {genderTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

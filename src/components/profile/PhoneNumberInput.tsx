
import React from 'react';
import { Input } from "@/components/ui/input";
import { ProfileFormData } from '@/hooks/useProfileForm';

interface PhoneNumberInputProps {
  formData: ProfileFormData;
  setFormData: (data: ProfileFormData) => void;
}

export const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({ formData, setFormData }) => {
  return (
    <div className="space-y-2">
      <label>WhatsApp Number</label>
      <Input
        type="tel"
        placeholder="+1234567890"
        value={formData.phone_number || ''}
        onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
      />
      <p className="text-sm text-muted-foreground">
        This number will be used for WhatsApp messages from potential dates
      </p>
    </div>
  );
};

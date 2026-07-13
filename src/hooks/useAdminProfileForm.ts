import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { sanitizeFormData } from '@/utils/sanitize';
import { ProfileFormData } from '@/hooks/useProfileForm';

export const useAdminProfileForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    full_name: '',
    age: '',
    about_me: '',
    location: '',
    hair_colour: '',
    breast_size: '',
    skin_tone: '',
    body_type: '',
    favorite_flower: '',
    gender: 'Female',
    service_type: 'private',
    phone_number: '',
  });

  const handleSubmit = async (): Promise<{ id: string } | null> => {
    setLoading(true);

    try {
      const profileData = sanitizeFormData({
        ...formData,
        payment_exempt: true,
        is_available: true,
        availability_status: 'available',
      });

      // Remove id if present (it's for edit mode in the regular form)
      const { id, profile_picture_url, ...insertData } = profileData as any;

      const { data: profile, error } = await supabase
        .from('profiles')
        .insert(insertData)
        .select('id')
        .single();

      if (error) throw error;

      return profile;
    } catch (error: any) {
      console.error('Admin profile create error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to create profile',
        variant: 'destructive',
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      full_name: '',
      age: '',
      about_me: '',
      location: '',
      hair_colour: '',
      breast_size: '',
      skin_tone: '',
      body_type: '',
      favorite_flower: '',
      gender: 'Female',
      service_type: 'private',
      phone_number: '',
    });
  };

  return {
    formData,
    setFormData,
    loading,
    handleSubmit,
    resetForm,
  };
};

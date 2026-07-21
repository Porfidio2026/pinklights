import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { sanitizeFormData } from '@/utils/sanitize';
import { ProfileFormData } from '@/hooks/useProfileForm';

const EMPTY_FORM: ProfileFormData = {
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
};

export const useAdminProfileForm = (editId?: string) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!!editId);
  const [formData, setFormData] = useState<ProfileFormData>({ ...EMPTY_FORM });

  const isEditMode = !!editId;

  // Load existing profile when editing
  useEffect(() => {
    if (!editId) return;

    const loadProfile = async () => {
      setInitialLoading(true);
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', editId)
          .single();

        if (error) throw error;
        if (!data) throw new Error('Profile not found');

        setFormData({
          id: data.id,
          full_name: data.full_name || '',
          age: data.age?.toString() || '',
          about_me: data.about_me || '',
          location: data.location || '',
          latitude: data.latitude ?? undefined,
          longitude: data.longitude ?? undefined,
          hair_colour: data.hair_colour || '',
          breast_size: data.breast_size || '',
          skin_tone: data.skin_tone || '',
          body_type: data.body_type || '',
          favorite_flower: data.favorite_flower || '',
          profile_picture_url: data.profile_picture_url || undefined,
          gender: data.gender || 'Female',
          service_type: data.service_type || 'private',
          phone_number: data.phone_number || '',
        });
      } catch (error: any) {
        console.error('Failed to load profile:', error);
        toast({
          title: 'Error',
          description: error.message || 'Failed to load profile',
          variant: 'destructive',
        });
      } finally {
        setInitialLoading(false);
      }
    };

    loadProfile();
  }, [editId, toast]);

  const handleSubmit = async (): Promise<{ id: string } | null> => {
    setLoading(true);

    try {
      const profileData = sanitizeFormData({
        ...formData,
        payment_exempt: true,
        is_available: true,
        availability_status: 'available',
      });

      // Remove fields that shouldn't be in the insert/update
      const { id, profile_picture_url, ...dataToSave } = profileData as any;

      if (isEditMode) {
        const { data: profile, error } = await supabase
          .from('profiles')
          .update(dataToSave)
          .eq('id', editId)
          .select('id')
          .single();

        if (error) throw error;
        return profile;
      } else {
        const { data: profile, error } = await supabase
          .from('profiles')
          .insert(dataToSave)
          .select('id')
          .single();

        if (error) throw error;
        return profile;
      }
    } catch (error: any) {
      console.error('Admin profile save error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to save profile',
        variant: 'destructive',
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ ...EMPTY_FORM });
  };

  return {
    formData,
    setFormData,
    loading,
    initialLoading,
    isEditMode,
    handleSubmit,
    resetForm,
  };
};

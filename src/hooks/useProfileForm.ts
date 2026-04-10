
import { useState } from 'react';
import { supabase, handleLogout } from '@/lib/supabase';
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';
import { sanitizeFormData } from '@/utils/sanitize';

export interface ProfileFormData {
  id?: string;
  full_name: string;
  age: string;
  about_me: string;
  location: string;
  latitude?: number;
  longitude?: number;
  hair_colour: string;
  breast_size: string;
  skin_tone: string;
  body_type: string;
  favorite_flower: string;
  profile_picture_url?: string;
  gender: 'Female' | 'Trans';
  service_type: 'private' | 'outcall' | 'soft' | 'ropes';
  phone_number?: string;
}

export const useProfileForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState('');
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
    profile_picture_url: '',
    gender: 'Female',
    service_type: 'private',
    phone_number: '',
  });

  const logoutUser = async () => {
    try {
      toast({
        title: "Logging out...",
        description: "Please wait while we log you out",
      });
      
      // Use the central logout function
      await handleLogout();
      
      // Note: The code below may not execute due to page redirect in handleLogout
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive",
      });
    }
  };

  const checkProfilePictures = async (userId: string) => {
    try {
      // Get the profile ID first
      const { data: profileData } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', userId)
        .single();
      
      if (!profileData) return false;
      
      // Check if user has uploaded any profile pictures
      const { data: pictures, error } = await supabase
        .from('profile_pictures')
        .select('id')
        .eq('profile_id', profileData.id)
        .limit(1);
      
      if (error) {
        console.error('Error checking profile pictures:', error);
        return false;
      }
      
      return pictures && pictures.length > 0;
    } catch (error) {
      console.error('Error checking profile pictures:', error);
      return false;
    }
  };

  const checkAvailabilities = async (userId: string) => {
    try {
      // Get the profile ID first
      const { data: profileData } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', userId)
        .single();
      
      if (!profileData) return false;
      
      // Check if user has set any availabilities
      const { data: availabilities, error } = await supabase
        .from('availabilities')
        .select('id')
        .eq('profile_id', profileData.id)
        .limit(1);
      
      if (error) {
        console.error('Error checking availabilities:', error);
        return false;
      }
      
      return availabilities && availabilities.length > 0;
    } catch (error) {
      console.error('Error checking availabilities:', error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session) throw new Error('Authentication required');

      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', session.user.id)
        .maybeSingle();

      const profileData = sanitizeFormData({
        ...formData,
        user_id: session.user.id,
        username: session.user.email?.split('@')[0],
      });

      let result;
      if (existingProfile) {
        result = await supabase
          .from('profiles')
          .update(profileData)
          .eq('user_id', session.user.id)
          .select()
          .maybeSingle();
      } else {
        result = await supabase
          .from('profiles')
          .insert(profileData)
          .select()
          .maybeSingle();
      }

      if (result.error) throw result.error;
      
      // Store the profile data in localStorage to persist through navigation
      if (result.data) {
        localStorage.setItem('profileData', JSON.stringify(result.data));
        return result.data;
      }
      
      return null;
    } catch (error) {
      console.error('Profile save error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to save profile",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    loading,
    location,
    setLocation,
    handleSubmit,
    handleLogout: logoutUser, // Rename the exported function to maintain API compatibility
    checkProfilePictures,
    checkAvailabilities
  };
};

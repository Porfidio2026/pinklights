import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { LogOut } from 'lucide-react';
import { LocationInput } from '@/components/profile/LocationInput';
import { AboutMeInput } from '@/components/profile/AboutMeInput';
import { BasicInfoInput } from '@/components/profile/BasicInfoInput';
import { CharacteristicsInput } from '@/components/profile/CharacteristicsInput';
import { ServiceAndGenderInput } from '@/components/profile/ServiceAndGenderInput';
import { PhoneNumberInput } from '@/components/profile/PhoneNumberInput';
import { useProfileForm } from '@/hooks/useProfileForm';

const CreateProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { 
    formData, 
    setFormData, 
    loading, 
    handleSubmit: onSubmit, 
    handleLogout,
    checkProfilePictures
  } = useProfileForm();

  useEffect(() => {
    let isSubscribed = true;

    const checkAuth = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error || !session) {
        toast({
          title: "Authentication required",
          description: "Please sign in to create your profile",
          variant: "destructive",
        });
        navigate('/auth');
        return;
      }

      if (!isSubscribed) return;

      // Load existing profile data if we're editing
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', session.user.id)
        .maybeSingle();

      if (existingProfile) {
        setFormData(existingProfile);
      } else {
        // Clear any stored data for new profiles
        localStorage.removeItem('profileData');
        // Initialize with empty values and required defaults
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
          gender: 'Female', // Add default value for gender
          service_type: 'private', // Add default value for service_type
          phone_number: '',
        });
      }
    };
    
    checkAuth();

    return () => {
      isSubscribed = false;
    };
  }, [navigate, toast, setFormData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const savedProfile = await onSubmit(e);
      if (savedProfile) {
        toast({
          title: "Success",
          description: "Profile saved successfully",
        });
        
        // Check if user has profile pictures
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          const hasPictures = await checkProfilePictures(session.user.id);
          
          // If no pictures, redirect to upload pictures page
          if (!hasPictures) {
            navigate('/upload-profile-picture');
          } else {
            // Otherwise redirect to homepage
            navigate('/home');
          }
        }
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: "Error",
        description: "Failed to save profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto relative">
        <Button 
          variant="secondary"
          onClick={handleLogout}
          className="absolute right-0 -top-2 flex items-center gap-2 text-secondary-foreground hover:text-secondary-foreground/90"
        >
          <LogOut className="w-4 h-4" />
          Log Out
        </Button>
        
        <Card className="p-6 mt-8">
          <h1 className="text-2xl font-bold mb-6">
            {formData.id ? 'Edit Your Profile' : 'Create Your Profile'}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <ServiceAndGenderInput formData={formData} setFormData={setFormData} />
            <BasicInfoInput formData={formData} setFormData={setFormData} />
            <PhoneNumberInput formData={formData} setFormData={setFormData} />
            <LocationInput formData={formData} setFormData={setFormData} />
            <AboutMeInput formData={formData} setFormData={setFormData} />
            <CharacteristicsInput formData={formData} setFormData={setFormData} />

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Saving...' : formData.id ? 'Save Changes' : 'Create Profile'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default CreateProfile;

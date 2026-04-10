
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import { ProfileNavHeader } from '@/components/profile/ProfileNavHeader';
import { ProfileContent } from '@/components/profile/ProfileContent';
import { ProfileLoading } from '@/components/profile/ProfileLoading';

const Profile = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile', id],
    queryFn: async () => {
      if (!id) {
        toast({
          title: "Error",
          description: "No profile ID provided",
          variant: "destructive",
        });
        navigate('/');
        return null;
      }

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select(`
          *,
          pictures:profile_pictures(
            id,
            picture_url,
            display_order
          )
        `)
        .eq('id', id)
        .maybeSingle();

      if (profileError) {
        console.error('Profile fetch error:', profileError);
        toast({
          title: "Error",
          description: "Failed to load profile",
          variant: "destructive",
        });
        throw profileError;
      }

      if (!profileData) {
        toast({
          title: "Not Found",
          description: "This profile does not exist",
          variant: "destructive",
        });
        navigate('/');
        return null;
      }

      return profileData;
    },
    enabled: !!id,
    refetchOnWindowFocus: false,
    staleTime: 60000 // 1 minute
  });

  if (isLoading) {
    return <ProfileLoading />;
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <ProfileNavHeader profile={profile} />
      <ProfileContent profile={profile} />
    </div>
  );
};

export default Profile;

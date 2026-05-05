import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { UserPlus, Loader2, CheckCircle } from 'lucide-react';

interface ProfilePreview {
  id: string;
  full_name: string;
  location: string | null;
  profile_picture_url: string | null;
  user_id: string | null;
}

const ClaimProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<ProfilePreview | null>(null);
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      if (!id) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, location, profile_picture_url, user_id')
        .eq('id', id)
        .single();

      if (error || !data) {
        toast({ title: 'Profile not found', variant: 'destructive' });
        navigate('/');
        return;
      }

      setProfile(data);
      setLoading(false);

      // If already claimed, check if current user owns it
      if (data.user_id) {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user.id === data.user_id) {
          toast({ title: 'This is already your profile' });
          navigate('/home');
        }
      }
    };

    loadProfile();
  }, [id, navigate, toast]);

  useEffect(() => {
    // Listen for auth state changes — if user just signed up, auto-claim
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if ((event === 'SIGNED_IN' || event === 'SIGNED_UP') && session && profile && !profile.user_id) {
          await claimProfile(session.user.id);
        }
      }
    );
    return () => subscription.unsubscribe();
  }, [profile]);

  const claimProfile = async (userId: string) => {
    if (!profile || profile.user_id) return;
    setClaiming(true);

    const { error } = await supabase
      .from('profiles')
      .update({ user_id: userId })
      .eq('id', profile.id)
      .is('user_id', null);

    if (error) {
      toast({
        title: 'Could not claim profile',
        description: error.message,
        variant: 'destructive',
      });
      setClaiming(false);
      return;
    }

    toast({ title: 'Profile claimed!', description: 'You can now manage your profile.' });
    navigate('/home');
  };

  const handleSignUp = () => {
    // Store claim intent so we can pick it up after auth
    localStorage.setItem('claimProfileId', id || '');
    navigate('/auth');
  };

  const handleClaimIfLoggedIn = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      await claimProfile(session.user.id);
    } else {
      handleSignUp();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!profile) return null;

  if (profile.user_id) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="p-8 max-w-md text-center space-y-4">
          <CheckCircle className="h-12 w-12 text-emerald-400 mx-auto" />
          <h1 className="text-2xl font-bold">Profile Already Claimed</h1>
          <p className="text-muted-foreground">
            This profile has already been linked to an account. If this is yours, please log in.
          </p>
          <Button onClick={() => navigate('/auth')}>Log In</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="p-8 max-w-md space-y-6">
        <div className="text-center space-y-4">
          {profile.profile_picture_url && (
            <img
              src={profile.profile_picture_url}
              alt={profile.full_name || ''}
              className="w-24 h-24 rounded-full object-cover mx-auto"
            />
          )}
          <div>
            <h1 className="text-2xl font-bold">{profile.full_name}</h1>
            {profile.location && (
              <p className="text-muted-foreground">{profile.location}</p>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-center text-sm text-muted-foreground">
            Your profile has been created on Pinklights. Create an account to manage it — set your availability, update photos, and control visibility.
          </p>
          <Button
            onClick={handleClaimIfLoggedIn}
            disabled={claiming}
            className="w-full gradient-pink text-white border-0 rounded-xl h-12 font-semibold"
          >
            {claiming ? (
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
            ) : (
              <UserPlus className="h-5 w-5 mr-2" />
            )}
            Create Account & Claim Profile
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ClaimProfile;


import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { supabase, setupSessionTimeout } from '@/lib/supabase';

const checkExistingAccount = async (userType: 'profile' | 'partner', userId: string) => {
  if (userType === 'partner') {
    const { data: partner } = await supabase
      .from('partners')
      .select('id')
      .eq('user_id', userId)
      .maybeSingle();
    return partner ? { type: 'partner', exists: true } : { type: 'partner', exists: false };
  } else {
    const { data: profile } = await supabase
      .from('profiles')
      .select('id')
      .eq('user_id', userId)
      .maybeSingle();
    return profile ? { type: 'profile', exists: true } : { type: 'profile', exists: false };
  }
};

const handleNavigation = (
  userType: 'profile' | 'partner',
  accountExists: { type: string; exists: boolean },
  navigate: ReturnType<typeof useNavigate>,
  toast: ReturnType<typeof useToast>['toast']
) => {
  if (accountExists.type === 'partner') {
    if (accountExists.exists) {
      toast({
        title: "Welcome back, Partner!",
        description: "You've successfully signed in",
      });
      navigate('/partner-dashboard');
    } else {
      toast({
        title: "Welcome, Partner!",
        description: "Let's set up your partner account",
      });
      navigate('/create-partner');
    }
  } else {
    if (accountExists.exists) {
      toast({
        title: "Welcome back!",
        description: "You've successfully signed in",
      });
      navigate('/home');
    } else {
      toast({
        title: "Welcome!",
        description: "Let's set up your profile",
      });
      navigate('/create-profile');
    }
  }
};

export const useAuthRedirect = (userType: 'profile' | 'partner') => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setupSessionTimeout();

        const accountExists = await checkExistingAccount(userType, session.user.id);
        handleNavigation(userType, accountExists, navigate, toast);
      }
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        setupSessionTimeout();

        if (session) {
          const accountExists = await checkExistingAccount(userType, session.user.id);
          handleNavigation(userType, accountExists, navigate, toast);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast, userType]);
};

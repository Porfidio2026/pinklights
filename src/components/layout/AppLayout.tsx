
import React, { useState, useEffect } from 'react';
import Header from '../navigation/Header';
import BottomNav from '../navigation/BottomNav';
import { useIsMobile } from '@/hooks/use-mobile';
import { supabase } from '@/lib/supabase';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const isMobile = useIsMobile();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<'regular' | 'partner' | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);

      if (session) {
        const { data: partnerData } = await supabase
          .from('partners')
          .select('id')
          .eq('user_id', session.user.id)
          .maybeSingle();

        setUserType(partnerData ? 'partner' : 'regular');
      } else {
        setUserType(null);
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkAuth();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className={isMobile && isAuthenticated ? 'pb-20' : ''}>
        {children}
      </main>
      <BottomNav userType={userType} isAuthenticated={isAuthenticated} />
    </div>
  );
};

export default AppLayout;

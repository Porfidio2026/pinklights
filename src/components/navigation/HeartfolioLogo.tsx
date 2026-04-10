
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase, setupSessionTimeout } from '@/lib/supabase';

export const HeartfolioLogo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setIsAuthenticated(!!session);
        
        if (session) {
          setupSessionTimeout();
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogoClick = () => {
    if (isLoading) return;

    if (isAuthenticated) {
      navigate('/home');
    } else {
      const serviceTypeStored = localStorage.getItem('selectedService');
      const genderTypeStored = localStorage.getItem('selectedGender');

      if (serviceTypeStored && genderTypeStored) {
        navigate('/', { state: { startAtStep: 3 } });
      } else {
        navigate('/');
      }
    }
  };

  return (
    <button 
      onClick={handleLogoClick} 
      className="flex items-center gap-2"
      type="button"
    >
      <img 
        src="/lovable-uploads/737ebfb2-027b-48ad-bff0-23b3eebd1979.png"
        alt="Pinklights Logo"
        className="h-8 w-auto"
      />
      <span className="text-xl font-bold font-display tracking-tight">
        <span className="text-gradient-pink">Pink</span><span className="text-foreground">lights</span>
      </span>
    </button>
  );
};

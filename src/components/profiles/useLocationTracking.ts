
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface UserLocation {
  latitude: number;
  longitude: number;
}

// Session timeout in milliseconds (30 minutes) - only for non-logged-in users
const SESSION_TIMEOUT = 30 * 60 * 1000;

export const useLocationTracking = () => {
  const [hasUserLocation, setHasUserLocation] = useState(false);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [locationUpdateCounter, setLocationUpdateCounter] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to clear location data - only used for non-logged-in users
  const clearLocationData = () => {
    localStorage.removeItem('userLocation');
    localStorage.removeItem('lastLocationActivity');
    setUserLocation(null);
    setHasUserLocation(false);
    setLocationUpdateCounter(prev => prev + 1);
    
    // Dispatch the userLocationCleared event
    window.dispatchEvent(new Event('userLocationCleared'));
  };

  useEffect(() => {
    // Check if user is authenticated
    const checkAuthStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };
    
    checkAuthStatus();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const checkUserLocation = () => {
      const storedLocation = localStorage.getItem('userLocation');
      const lastActivity = localStorage.getItem('lastLocationActivity');
      const currentTime = Date.now();
      
      // Check if session timeout has occurred - only for non-logged-in users
      if (!isAuthenticated && lastActivity && (currentTime - parseInt(lastActivity)) > SESSION_TIMEOUT) {
        clearLocationData();
        return;
      }
      
      if (storedLocation) {
        try {
          const parsedLocation = JSON.parse(storedLocation);
          setUserLocation(parsedLocation);
          setHasUserLocation(true);
          
          // Update last activity timestamp - only for non-logged-in users
          if (!isAuthenticated) {
            localStorage.setItem('lastLocationActivity', currentTime.toString());
          }
          
        } catch (e) {
          console.error('Error parsing stored location:', e);
          setHasUserLocation(false);
          setUserLocation(null);
        }
      } else {
        setHasUserLocation(false);
        setUserLocation(null);
      }
    };

    // Check on initial load
    checkUserLocation();

    // Set up storage event listener to detect changes in other tabs
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'userLocation') {
        checkUserLocation();
        setLocationUpdateCounter(prev => prev + 1);
      }
    };

    // Create a custom event listener for same-tab updates
    const handleCustomStorageChange = (event: Event) => {
      // Check if the event has detail data
      const customEvent = event as CustomEvent;
      if (customEvent.detail) {
        setUserLocation(customEvent.detail);
        setHasUserLocation(true);
        
        // Update last activity timestamp - only for non-logged-in users
        if (!isAuthenticated) {
          localStorage.setItem('lastLocationActivity', Date.now().toString());
        }
      } else {
        // If no detail data, fall back to localStorage
        checkUserLocation();
      }
      
      setLocationUpdateCounter(prev => prev + 1);
    };

    // Handle location cleared event
    const handleLocationCleared = () => {
      setUserLocation(null);
      setHasUserLocation(false);
      setLocationUpdateCounter(prev => prev + 1);
    };

    // Check for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        // On sign in, we don't clear location data anymore
      }
    });
    
    // Set up interval to check for session timeout - only for non-logged-in users
    const intervalId = setInterval(() => {
      if (!isAuthenticated) {
        const lastActivity = localStorage.getItem('lastLocationActivity');
        if (lastActivity && (Date.now() - parseInt(lastActivity)) > SESSION_TIMEOUT) {
          clearLocationData();
        }
      }
    }, 60000); // Check every minute

    // Set up activity tracking - only for non-logged-in users
    const updateActivity = () => {
      if (hasUserLocation && !isAuthenticated) {
        localStorage.setItem('lastLocationActivity', Date.now().toString());
      }
    };

    // Track user activity - only needed for non-logged-in users
    if (!isAuthenticated) {
      window.addEventListener('click', updateActivity);
      window.addEventListener('keypress', updateActivity);
      window.addEventListener('scroll', updateActivity);
      window.addEventListener('mousemove', updateActivity);
    }

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('userLocationUpdated', handleCustomStorageChange);
    window.addEventListener('userLocationCleared', handleLocationCleared);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userLocationUpdated', handleCustomStorageChange);
      window.removeEventListener('userLocationCleared', handleLocationCleared);
      
      if (!isAuthenticated) {
        window.removeEventListener('click', updateActivity);
        window.removeEventListener('keypress', updateActivity);
        window.removeEventListener('scroll', updateActivity);
        window.removeEventListener('mousemove', updateActivity);
      }
      
      subscription.unsubscribe();
      clearInterval(intervalId);
    };
  }, [hasUserLocation, isAuthenticated]);

  return {
    hasUserLocation,
    userLocation,
    locationUpdateCounter
  };
};

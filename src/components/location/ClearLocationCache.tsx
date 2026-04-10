
import React from 'react';
import { Button } from '../ui/button';
import { MapPin, Trash2 } from 'lucide-react';
import { useToast } from '../ui/use-toast';

export const ClearLocationCache = () => {
  const { toast } = useToast();

  const clearLocationCache = () => {
    try {
      // Remove location from localStorage
      localStorage.removeItem('userLocation');
      
      // Create and dispatch a custom event to notify components
      const clearEvent = new CustomEvent('userLocationCleared');
      window.dispatchEvent(clearEvent);
      
      toast({
        title: "Location Cache Cleared",
        description: "Your location data has been cleared successfully.",
      });
      
      // Force a reload to update all components
      window.location.reload();
    } catch (error) {
      console.error('Error clearing location cache:', error);
      toast({
        title: "Error",
        description: "Failed to clear location cache.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button 
      variant="destructive" 
      onClick={clearLocationCache}
      className="flex items-center gap-2"
    >
      <Trash2 className="h-4 w-4" />
      <span>Clear Location Cache</span>
    </Button>
  );
};

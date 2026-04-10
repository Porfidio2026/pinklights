
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { MapPin } from 'lucide-react';
import { LocationAutocomplete } from '@/components/LocationAutocomplete';

const Address = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('');
  
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Authentication required",
          description: "Please sign in to access this page",
          variant: "destructive",
        });
        navigate('/auth');
        return;
      }

      // Load existing address
      const { data: profile } = await supabase
        .from('profiles')
        .select('location')
        .eq('user_id', session.user.id)
        .single();

      if (profile?.location) {
        setAddress(profile.location);
      }
    };

    checkAuth();
  }, [navigate, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('No session');

      const { error } = await supabase
        .from('profiles')
        .update({ location: address })
        .eq('user_id', session.user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Address updated successfully",
      });
    } catch (error) {
      console.error('Error updating address:', error);
      toast({
        title: "Error",
        description: "Failed to update address",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            // First get the address from coordinates using OpenStreetMap
            const response = await fetch(
              `https://api.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
            );
            const data = await response.json();
            const locationString = data.display_name;
            setAddress(locationString);
            
            // Then update the profile with both address and coordinates
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) throw new Error('No session');

            const { error } = await supabase
              .from('profiles')
              .update({ 
                location: locationString,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              })
              .eq('user_id', session.user.id);

            if (error) throw error;
            
            toast({
              title: "Success",
              description: "Location retrieved and saved successfully",
            });
          } catch (error) {
            console.error('Get location error:', error);
            toast({
              title: "Error",
              description: "Failed to get or save location details",
              variant: "destructive",
            });
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          toast({
            title: "Error",
            description: "Location access denied",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Error",
        description: "Geolocation is not supported by your browser",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-6">Update Your Address</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Address</label>
              <div className="flex gap-2">
                <LocationAutocomplete
                  value={address}
                  onChange={setAddress}
                  placeholder="Enter your address"
                  className="flex-1"
                />
                <Button type="button" variant="outline" onClick={getCurrentLocation}>
                  <MapPin className="w-4 h-4 mr-2" />
                  Use My Location
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Saving...' : 'Save Address'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Address;

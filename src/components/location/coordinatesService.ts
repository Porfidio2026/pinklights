
import { supabase } from '@/lib/supabase';
import { CachedCoordinates } from './types';

export const coordinatesService = {
  checkCached: async (address: string): Promise<CachedCoordinates | null> => {
    try {
      const { data, error } = await supabase
        .from('cached_coordinates')
        .select('latitude, longitude')
        .eq('address', address)
        .single();

      if (error) {
        return null;
      }

      return data;
    } catch (error) {
      return null;
    }
  },

  cache: async (address: string, latitude: number, longitude: number): Promise<void> => {
    try {
      const { error } = await supabase
        .from('cached_coordinates')
        .upsert({ 
          address, 
          latitude, 
          longitude 
        }, {
          onConflict: 'address'
        });

      if (error) {
        console.error('Error caching coordinates:', error);
        throw error;
      }
      
    } catch (error) {
      console.error('Error caching coordinates:', error);
      throw error;
    }
  },

  updateUserProfile: async (address: string, latitude: number, longitude: number): Promise<void> => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        return;
      }

      const { error } = await supabase
        .from('profiles')
        .update({ 
          location: address,
          latitude,
          longitude
        })
        .eq('user_id', session.user.id);

      if (error) {
        console.error('Error updating profile:', error);
        throw error;
      }
      
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }
};

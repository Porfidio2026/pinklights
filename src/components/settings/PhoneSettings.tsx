
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/lib/supabase';
import { PhoneSettingsProps } from './types';

export const PhoneSettings = ({ phone, onSuccess }: PhoneSettingsProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [phoneValue, setPhoneValue] = useState(phone);

  const updatePhone = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('No session');

      const { error } = await supabase
        .from('profiles')
        .update({ phone_number: phoneValue })
        .eq('user_id', session.user.id);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Phone number updated successfully",
      });
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error updating phone:', error);
      toast({
        title: "Error",
        description: "Failed to update phone number",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={updatePhone} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Phone Number</label>
        <Input
          type="tel"
          value={phoneValue}
          onChange={(e) => setPhoneValue(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Updating...' : 'Update Phone'}
      </Button>
    </form>
  );
};

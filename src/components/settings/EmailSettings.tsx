
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/lib/supabase';
import { EmailSettingsProps } from './types';

export const EmailSettings = ({ email, onSuccess }: EmailSettingsProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [emailValue, setEmailValue] = useState(email);

  const updateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.updateUser({ email: emailValue });
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Email update request sent. Please check your inbox.",
      });
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error updating email:', error);
      toast({
        title: "Error",
        description: "Failed to update email",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={updateEmail} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Email Address</label>
        <Input
          type="email"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Updating...' : 'Update Email'}
      </Button>
    </form>
  );
};

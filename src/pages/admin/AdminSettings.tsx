import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { AlertTriangle, Eye } from 'lucide-react';

const AdminSettings = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: marketingMode = false, isLoading } = useQuery({
    queryKey: ['admin-settings', 'marketing_mode'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('app_settings')
        .select('value')
        .eq('key', 'marketing_mode')
        .single();

      if (error) throw error;
      return data?.value === 'true';
    },
  });

  const toggleMarketing = useMutation({
    mutationFn: async () => {
      const newValue = marketingMode ? 'false' : 'true';
      const { error } = await supabase
        .from('app_settings')
        .update({ value: newValue, updated_at: new Date().toISOString() })
        .eq('key', 'marketing_mode');

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-settings'] });
      toast({
        title: 'Settings updated',
        description: marketingMode
          ? 'Marketing mode disabled — only paid/exempt profiles are visible'
          : 'Marketing mode enabled — all profiles are now visible',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to update settings',
        variant: 'destructive',
      });
    },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>

      <Card className="p-6">
        <div className="flex items-start gap-4">
          <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Eye className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold mb-1">Marketing Mode</h2>
            <p className="text-sm text-muted-foreground mb-4">
              When enabled, <strong>all profiles</strong> are visible in search results regardless
              of payment status. Use this during launch or promotional periods to showcase the platform.
            </p>

            {marketingMode && (
              <div className="flex items-center gap-2 text-sm text-yellow-500 mb-4">
                <AlertTriangle className="h-4 w-4" />
                <span>Marketing mode is active — payment requirements are bypassed for all profiles</span>
              </div>
            )}

            <Button
              onClick={() => toggleMarketing.mutate()}
              disabled={isLoading || toggleMarketing.isPending}
              variant={marketingMode ? 'destructive' : 'default'}
            >
              {marketingMode ? 'Disable Marketing Mode' : 'Enable Marketing Mode'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdminSettings;

import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, XCircle } from 'lucide-react';

interface Report {
  id: string;
  reason: string;
  details: string | null;
  status: string;
  created_at: string;
  profile_id: string;
  profiles: { full_name: string } | null;
}

const AdminReports = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: reports = [], isLoading } = useQuery({
    queryKey: ['admin-reports'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reported_content')
        .select('id, reason, details, status, created_at, profile_id, profiles(full_name)')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;
      return (data ?? []) as Report[];
    },
  });

  const updateReport = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { data: { session } } = await supabase.auth.getSession();
      const { error } = await supabase
        .from('reported_content')
        .update({
          status,
          reviewed_by: session?.user.id,
          reviewed_at: new Date().toISOString(),
        })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-reports'] });
      toast({ title: 'Report updated' });
    },
  });

  const pendingReports = reports.filter((r) => r.status === 'pending');
  const resolvedReports = reports.filter((r) => r.status !== 'pending');

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Reports</h1>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Pending ({pendingReports.length})</h2>
        {isLoading ? (
          <div className="text-muted-foreground">Loading...</div>
        ) : pendingReports.length === 0 ? (
          <Card className="p-6 text-center text-muted-foreground">No pending reports</Card>
        ) : (
          <div className="space-y-3">
            {pendingReports.map((report) => (
              <Card key={report.id} className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{report.reason}</span>
                      <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">Pending</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Profile: {report.profiles?.full_name ?? report.profile_id}
                    </p>
                    {report.details && (
                      <p className="text-sm mt-2">{report.details}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {new Date(report.created_at).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateReport.mutate({ id: report.id, status: 'reviewed' })}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Reviewed
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => updateReport.mutate({ id: report.id, status: 'dismissed' })}
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Dismiss
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {resolvedReports.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Resolved ({resolvedReports.length})</h2>
          <div className="space-y-3">
            {resolvedReports.map((report) => (
              <Card key={report.id} className="p-4 opacity-60">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{report.reason}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      report.status === 'reviewed'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {report.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Profile: {report.profiles?.full_name ?? report.profile_id}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(report.created_at).toLocaleString()}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReports;

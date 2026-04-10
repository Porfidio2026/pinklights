import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Card } from '@/components/ui/card';
import { Users, Image, AlertTriangle, Star, Search, Handshake, Eye, ShieldCheck } from 'lucide-react';

interface KPI {
  label: string;
  value: number | string;
  icon: React.ElementType;
  color: string;
}

const AdminDashboard = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const [profiles, pictures, searches, partners, reports, featured, exempt, marketingMode] = await Promise.all([
        supabase.from('profiles').select('id', { count: 'exact', head: true }),
        supabase.from('profile_pictures').select('id', { count: 'exact', head: true }),
        supabase.from('profile_searches').select('id', { count: 'exact', head: true }),
        supabase.from('partners').select('id', { count: 'exact', head: true }),
        supabase.from('reported_content').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('is_featured', true),
        supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('payment_exempt', true),
        supabase.from('app_settings').select('value').eq('key', 'marketing_mode').single(),
      ]);

      return {
        totalProfiles: profiles.count ?? 0,
        totalPictures: pictures.count ?? 0,
        totalSearches: searches.count ?? 0,
        totalPartners: partners.count ?? 0,
        pendingReports: reports.count ?? 0,
        featuredProfiles: featured.count ?? 0,
        exemptProfiles: exempt.count ?? 0,
        marketingMode: marketingMode.data?.value === 'true',
      };
    },
  });

  const kpis: KPI[] = [
    { label: 'Total Profiles', value: stats?.totalProfiles ?? '...', icon: Users, color: 'text-primary' },
    { label: 'Profile Pictures', value: stats?.totalPictures ?? '...', icon: Image, color: 'text-emerald-400' },
    { label: 'Total Searches', value: stats?.totalSearches ?? '...', icon: Search, color: 'text-primary/70' },
    { label: 'Partners', value: stats?.totalPartners ?? '...', icon: Handshake, color: 'text-primary' },
    { label: 'Pending Reports', value: stats?.pendingReports ?? '...', icon: AlertTriangle, color: 'text-destructive' },
    { label: 'Featured Profiles', value: stats?.featuredProfiles ?? '...', icon: Star, color: 'text-primary' },
    { label: 'Payment Exempt', value: stats?.exemptProfiles ?? '...', icon: ShieldCheck, color: 'text-blue-400' },
    { label: 'Marketing Mode', value: stats?.marketingMode ? 'ON' : 'OFF', icon: Eye, color: stats?.marketingMode ? 'text-yellow-500' : 'text-muted-foreground' },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="p-6 flex items-center gap-4">
            <div className={`p-3 rounded-full bg-muted ${kpi.color}`}>
              <kpi.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{kpi.label}</p>
              <p className="text-2xl font-bold">{isLoading ? '...' : kpi.value}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;

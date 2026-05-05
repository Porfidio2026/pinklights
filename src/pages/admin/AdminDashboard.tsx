import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Card } from '@/components/ui/card';
import {
  Users, Image, AlertTriangle, Star, Search, Handshake,
  Eye, ShieldCheck, TrendingUp, CreditCard, Coins, UserPlus,
} from 'lucide-react';

const AdminDashboard = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-dashboard-stats'],
    queryFn: async () => {
      const now = new Date();
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();

      const [
        profiles,
        profilesWeek,
        profilesMonth,
        pictures,
        searches,
        searchesWeek,
        partners,
        pendingReports,
        featured,
        exempt,
        marketingMode,
        completedPayments,
        completedPaymentsMonth,
        allCredits,
        liveProfiles,
      ] = await Promise.all([
        supabase.from('profiles').select('id', { count: 'exact', head: true }),
        supabase.from('profiles').select('id', { count: 'exact', head: true }).gte('created_at', sevenDaysAgo),
        supabase.from('profiles').select('id', { count: 'exact', head: true }).gte('created_at', thirtyDaysAgo),
        supabase.from('profile_pictures').select('id', { count: 'exact', head: true }),
        supabase.from('profile_searches').select('id', { count: 'exact', head: true }),
        supabase.from('profile_searches').select('id', { count: 'exact', head: true }).gte('created_at', sevenDaysAgo),
        supabase.from('partners').select('id', { count: 'exact', head: true }),
        supabase.from('reported_content').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('is_featured', true),
        supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('payment_exempt', true),
        supabase.from('app_settings').select('value').eq('key', 'marketing_mode').single(),
        supabase.from('payment_sessions').select('amount_cents').eq('status', 'completed'),
        supabase.from('payment_sessions').select('amount_cents').eq('status', 'completed').gte('created_at', thirtyDaysAgo),
        supabase.from('credits').select('balance'),
        supabase.from('profiles').select('id', { count: 'exact', head: true }).gt('visibility_expires_at', now.toISOString()),
      ]);

      const totalRevenue = (completedPayments.data ?? []).reduce((sum, p) => sum + (p.amount_cents || 0), 0);
      const monthRevenue = (completedPaymentsMonth.data ?? []).reduce((sum, p) => sum + (p.amount_cents || 0), 0);
      const unusedCredits = (allCredits.data ?? []).reduce((sum, c) => sum + (c.balance || 0), 0);

      return {
        totalProfiles: profiles.count ?? 0,
        newProfilesWeek: profilesWeek.count ?? 0,
        newProfilesMonth: profilesMonth.count ?? 0,
        totalPictures: pictures.count ?? 0,
        totalSearches: searches.count ?? 0,
        searchesWeek: searchesWeek.count ?? 0,
        totalPartners: partners.count ?? 0,
        pendingReports: pendingReports.count ?? 0,
        featuredProfiles: featured.count ?? 0,
        exemptProfiles: exempt.count ?? 0,
        marketingMode: marketingMode.data?.value === 'true',
        totalRevenueCents: totalRevenue,
        monthRevenueCents: monthRevenue,
        unusedCredits,
        liveProfiles: liveProfiles.count ?? 0,
      };
    },
  });

  const formatCurrency = (cents: number) => `$${(cents / 100).toFixed(2)}`;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Business Metrics */}
      <div>
        <h2 className="text-lg font-semibold mb-3 text-muted-foreground">Business Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-5">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-emerald-500/10">
                <TrendingUp className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">{isLoading ? '...' : formatCurrency(stats?.totalRevenueCents ?? 0)}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Last 30 days: {isLoading ? '...' : formatCurrency(stats?.monthRevenueCents ?? 0)}
            </p>
          </Card>

          <Card className="p-5">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <Coins className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Unused Credits</p>
                <p className="text-2xl font-bold">{isLoading ? '...' : stats?.unusedCredits ?? 0}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Bought but not yet activated
            </p>
          </Card>

          <Card className="p-5">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-blue-500/10">
                <UserPlus className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">New Profiles</p>
                <p className="text-2xl font-bold">{isLoading ? '...' : stats?.newProfilesWeek ?? 0}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Last 7 days · {isLoading ? '...' : stats?.newProfilesMonth ?? 0} last 30 days
            </p>
          </Card>

          <Card className="p-5">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <Search className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Searches (visitors)</p>
                <p className="text-2xl font-bold">{isLoading ? '...' : stats?.totalSearches ?? 0}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Last 7 days: {isLoading ? '...' : stats?.searchesWeek ?? 0}
            </p>
          </Card>
        </div>
      </div>

      {/* Platform Status */}
      <div>
        <h2 className="text-lg font-semibold mb-3 text-muted-foreground">Platform Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-5 flex items-center gap-4">
            <div className="p-2 rounded-full bg-muted text-primary">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Profiles</p>
              <p className="text-2xl font-bold">{isLoading ? '...' : stats?.totalProfiles}</p>
            </div>
          </Card>

          <Card className="p-5 flex items-center gap-4">
            <div className="p-2 rounded-full bg-muted text-emerald-400">
              <Eye className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Live Now</p>
              <p className="text-2xl font-bold">{isLoading ? '...' : stats?.liveProfiles}</p>
            </div>
          </Card>

          <Card className="p-5 flex items-center gap-4">
            <div className="p-2 rounded-full bg-muted text-primary">
              <Image className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pictures Uploaded</p>
              <p className="text-2xl font-bold">{isLoading ? '...' : stats?.totalPictures}</p>
            </div>
          </Card>

          <Card className="p-5 flex items-center gap-4">
            <div className="p-2 rounded-full bg-muted text-primary">
              <Handshake className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Partners</p>
              <p className="text-2xl font-bold">{isLoading ? '...' : stats?.totalPartners}</p>
            </div>
          </Card>

          <Card className="p-5 flex items-center gap-4">
            <div className="p-2 rounded-full bg-muted text-destructive">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending Reports</p>
              <p className="text-2xl font-bold">{isLoading ? '...' : stats?.pendingReports}</p>
            </div>
          </Card>

          <Card className="p-5 flex items-center gap-4">
            <div className="p-2 rounded-full bg-muted text-primary">
              <Star className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Featured</p>
              <p className="text-2xl font-bold">{isLoading ? '...' : stats?.featuredProfiles}</p>
            </div>
          </Card>

          <Card className="p-5 flex items-center gap-4">
            <div className="p-2 rounded-full bg-muted text-blue-400">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Payment Exempt</p>
              <p className="text-2xl font-bold">{isLoading ? '...' : stats?.exemptProfiles}</p>
            </div>
          </Card>

          <Card className="p-5 flex items-center gap-4">
            <div className={`p-2 rounded-full bg-muted ${stats?.marketingMode ? 'text-yellow-500' : 'text-muted-foreground'}`}>
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Marketing Mode</p>
              <p className="text-2xl font-bold">{isLoading ? '...' : stats?.marketingMode ? 'ON' : 'OFF'}</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

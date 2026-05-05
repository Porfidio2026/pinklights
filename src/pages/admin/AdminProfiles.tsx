import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Ban, CheckCircle, Star, StarOff, Trash2, Search, ShieldCheck, ShieldOff, MessageCircle } from 'lucide-react';

interface Profile {
  id: string;
  full_name: string;
  location: string | null;
  gender: string | null;
  is_featured: boolean;
  is_banned: boolean;
  payment_exempt: boolean;
  visibility_expires_at: string | null;
  created_at: string;
  user_id: string | null;
  phone_number: string | null;
}

const SITE_URL = window.location.origin;

function getWhatsAppUrl(phone: string, profileId: string) {
  const cleaned = phone.replace(/[^0-9+]/g, '');
  const number = cleaned.startsWith('+') ? cleaned.substring(1) : cleaned;
  const claimUrl = `${SITE_URL}/claim-profile/${profileId}`;
  const message = `Hello! Your profile has been created on Pinklights. You can claim and manage it here: ${claimUrl}`;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

function getPaymentStatus(profile: Profile): { label: string; className: string } {
  if (profile.payment_exempt) {
    return { label: 'Exempt', className: 'bg-blue-500/20 text-blue-400' };
  }
  if (profile.visibility_expires_at && new Date(profile.visibility_expires_at) > new Date()) {
    const expiry = new Date(profile.visibility_expires_at);
    return {
      label: `Live until ${expiry.toLocaleDateString()}`,
      className: 'bg-emerald-500/20 text-emerald-400',
    };
  }
  return { label: 'Unpaid', className: 'bg-muted text-muted-foreground' };
}

const AdminProfiles = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');

  const { data: profiles = [], isLoading } = useQuery({
    queryKey: ['admin-profiles', search],
    queryFn: async () => {
      let query = supabase
        .from('profiles')
        .select('id, full_name, location, gender, is_featured, is_banned, payment_exempt, visibility_expires_at, created_at, user_id, phone_number')
        .order('created_at', { ascending: false })
        .limit(100);

      if (search) {
        query = query.ilike('full_name', `%${search}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return (data ?? []) as Profile[];
    },
  });

  const toggleBan = useMutation({
    mutationFn: async ({ id, isBanned }: { id: string; isBanned: boolean }) => {
      const { error } = await supabase
        .from('profiles')
        .update({ is_banned: !isBanned })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-profiles'] });
      toast({ title: 'Profile updated' });
    },
  });

  const toggleFeatured = useMutation({
    mutationFn: async ({ id, isFeatured }: { id: string; isFeatured: boolean }) => {
      const { error } = await supabase
        .from('profiles')
        .update({ is_featured: !isFeatured })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-profiles'] });
      toast({ title: 'Profile updated' });
    },
  });

  const togglePaymentExempt = useMutation({
    mutationFn: async ({ id, isExempt }: { id: string; isExempt: boolean }) => {
      const { error } = await supabase
        .from('profiles')
        .update({ payment_exempt: !isExempt })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-profiles'] });
      toast({ title: 'Payment exemption updated' });
    },
  });

  const deleteProfile = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-profiles'] });
      toast({ title: 'Profile deleted' });
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Profiles</h1>
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-8 text-muted-foreground">Loading profiles...</div>
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="text-left px-4 py-3 font-medium">Name</th>
                  <th className="text-left px-4 py-3 font-medium">Location</th>
                  <th className="text-left px-4 py-3 font-medium">Gender</th>
                  <th className="text-left px-4 py-3 font-medium">Status</th>
                  <th className="text-left px-4 py-3 font-medium">Payment</th>
                  <th className="text-left px-4 py-3 font-medium">Created</th>
                  <th className="text-right px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {profiles.map((profile) => {
                  const paymentStatus = getPaymentStatus(profile);
                  return (
                    <tr key={profile.id} className={profile.is_banned ? 'bg-destructive/10' : ''}>
                      <td className="px-4 py-3 font-medium">{profile.full_name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{profile.location || '-'}</td>
                      <td className="px-4 py-3 text-muted-foreground">{profile.gender || '-'}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          {profile.is_featured && (
                            <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">Featured</span>
                          )}
                          {profile.is_banned && (
                            <span className="text-xs bg-destructive/20 text-destructive px-2 py-0.5 rounded-full">Banned</span>
                          )}
                          {!profile.is_featured && !profile.is_banned && (
                            <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">Active</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${paymentStatus.className}`}>
                          {paymentStatus.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {new Date(profile.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-1">
                          {profile.phone_number && !profile.user_id && (
                            <Button
                              variant="ghost"
                              size="sm"
                              asChild
                              title="Send WhatsApp invite"
                            >
                              <a
                                href={getWhatsAppUrl(profile.phone_number, profile.id)}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <MessageCircle className="h-4 w-4 text-emerald-400" />
                              </a>
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => togglePaymentExempt.mutate({ id: profile.id, isExempt: profile.payment_exempt })}
                            title={profile.payment_exempt ? 'Remove payment exemption' : 'Exempt from payment'}
                          >
                            {profile.payment_exempt
                              ? <ShieldOff className="h-4 w-4 text-blue-400" />
                              : <ShieldCheck className="h-4 w-4" />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleFeatured.mutate({ id: profile.id, isFeatured: profile.is_featured })}
                            title={profile.is_featured ? 'Remove featured' : 'Feature profile'}
                          >
                            {profile.is_featured ? <StarOff className="h-4 w-4" /> : <Star className="h-4 w-4" />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleBan.mutate({ id: profile.id, isBanned: profile.is_banned })}
                            title={profile.is_banned ? 'Unban' : 'Ban'}
                          >
                            {profile.is_banned ? <CheckCircle className="h-4 w-4 text-emerald-400" /> : <Ban className="h-4 w-4 text-destructive" />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              if (confirm('Are you sure you want to delete this profile?')) {
                                deleteProfile.mutate(profile.id);
                              }
                            }}
                            title="Delete profile"
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {profiles.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">No profiles found</div>
          )}
        </Card>
      )}
    </div>
  );
};

export default AdminProfiles;

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';

interface UserProfile {
  id: string;
  user_id: string;
  full_name: string;
  location: string | null;
  gender: string | null;
  is_featured: boolean;
  is_banned: boolean;
  created_at: string;
}

interface Partner {
  id: string;
  user_id: string;
  company_name: string;
  contact_person: string | null;
  email: string | null;
  created_at: string;
}

const AdminUsers = () => {
  const { data: profiles = [], isLoading: profilesLoading } = useQuery({
    queryKey: ['admin-users-profiles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, user_id, full_name, location, gender, is_featured, is_banned, created_at')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data ?? []) as UserProfile[];
    },
  });

  const { data: partners = [], isLoading: partnersLoading } = useQuery({
    queryKey: ['admin-users-partners'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('partners')
        .select('id, user_id, company_name, contact_person, email, created_at')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data ?? []) as Partner[];
    },
  });

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Users Overview</h1>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Profiles ({profiles.length})</h2>
        {profilesLoading ? (
          <div className="text-muted-foreground">Loading...</div>
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
                    <th className="text-left px-4 py-3 font-medium">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {profiles.map((p) => (
                    <tr key={p.id}>
                      <td className="px-4 py-3">
                        <Link to={`/profile/${p.id}`} className="text-primary hover:underline font-medium">
                          {p.full_name}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{p.location || '-'}</td>
                      <td className="px-4 py-3 text-muted-foreground">{p.gender || '-'}</td>
                      <td className="px-4 py-3">
                        {p.is_banned ? (
                          <span className="text-xs bg-destructive/20 text-destructive px-2 py-0.5 rounded-full">Banned</span>
                        ) : p.is_featured ? (
                          <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">Featured</span>
                        ) : (
                          <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">Active</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {new Date(p.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Partners ({partners.length})</h2>
        {partnersLoading ? (
          <div className="text-muted-foreground">Loading...</div>
        ) : partners.length === 0 ? (
          <Card className="p-6 text-center text-muted-foreground">No partners registered</Card>
        ) : (
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted border-b border-border">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium">Company</th>
                    <th className="text-left px-4 py-3 font-medium">Contact</th>
                    <th className="text-left px-4 py-3 font-medium">Email</th>
                    <th className="text-left px-4 py-3 font-medium">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {partners.map((p) => (
                    <tr key={p.id}>
                      <td className="px-4 py-3 font-medium">{p.company_name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{p.contact_person || '-'}</td>
                      <td className="px-4 py-3 text-muted-foreground">{p.email || '-'}</td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {new Date(p.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;

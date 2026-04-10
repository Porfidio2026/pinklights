
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { AtSign, Phone, Key } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmailSettings } from '@/components/settings/EmailSettings';
import { PhoneSettings } from '@/components/settings/PhoneSettings';
import { PasswordSettings } from '@/components/settings/PasswordSettings';

const AccountSettings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const loadUserData = async () => {
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

      setEmail(session.user.email || '');

      const { data: profile } = await supabase
        .from('profiles')
        .select('phone_number')
        .eq('user_id', session.user.id)
        .single();

      if (profile?.phone_number) {
        setPhone(profile.phone_number);
      }
    };

    loadUserData();
  }, [navigate, toast]);

  // Function to handle redirects after settings changes
  const handleSettingsSaved = () => {
    toast({
      title: "Success",
      description: "Settings updated successfully",
    });
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
          
          <Tabs defaultValue="email" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="email" className="flex items-center gap-2">
                <AtSign className="w-4 h-4" />
                Email
              </TabsTrigger>
              <TabsTrigger value="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone
              </TabsTrigger>
              <TabsTrigger value="password" className="flex items-center gap-2">
                <Key className="w-4 h-4" />
                Password
              </TabsTrigger>
            </TabsList>

            <TabsContent value="email">
              <EmailSettings email={email} onSuccess={handleSettingsSaved} />
            </TabsContent>

            <TabsContent value="phone">
              <PhoneSettings phone={phone} onSuccess={handleSettingsSaved} />
            </TabsContent>

            <TabsContent value="password">
              <PasswordSettings onSuccess={handleSettingsSaved} />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default AccountSettings;

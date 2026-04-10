
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, setupSessionTimeout } from '@/lib/supabase';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { 
  FileEdit, 
  PlusCircle, 
  CreditCard, 
  Settings,
  LogOut
} from 'lucide-react';
import { handleLogout } from '@/lib/supabase';

const PartnerDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [partnerData, setPartnerData] = useState<any>(null);

  useEffect(() => {
    const checkPartner = async () => {
      // Check if user is logged in
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to continue",
          variant: "destructive",
        });
        navigate('/auth');
        return;
      }

      // Set up session timeout
      setupSessionTimeout();

      // Check if user has a partner account
      const { data: partner, error } = await supabase
        .from('partners')
        .select('*')
        .eq('user_id', session.user.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching partner data:', error);
        toast({
          title: "Error",
          description: "Failed to fetch partner data",
          variant: "destructive",
        });
        return;
      }

      if (!partner) {
        toast({
          title: "Partner Account Required",
          description: "Please complete your partner information first",
        });
        navigate('/create-partner');
        return;
      }

      setPartnerData(partner);
    };

    checkPartner();
  }, [navigate, toast]);

  const navButtons = [
    { icon: PlusCircle, text: 'Create New Ad', path: '/create-ad' },
    { icon: FileEdit, text: 'Edit Existing Ads', path: '/edit-ads' },
    { icon: CreditCard, text: 'Payment & Billing', path: '/partner-billing' },
    { icon: Settings, text: 'Account Settings', path: '/partner-account-settings' },
  ];

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header with welcome and logout */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary">
            {partnerData ? `Welcome, ${partnerData.company_name}` : 'Partner Dashboard'}
          </h1>
          <Button 
            variant="outline"
            className="flex items-center gap-2"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Main Navigation Buttons */}
        <div className="bg-card/80 backdrop-blur-xl rounded-lg p-6 border border-border">
          <h2 className="text-2xl font-bold mb-6 text-center">Manage Your Account</h2>
          <div className="grid grid-cols-2 gap-4">
            {navButtons.map((button) => (
              <Button 
                key={button.text}
                onClick={() => navigate(button.path)}
                className="flex flex-col h-24 py-2 w-full bg-primary hover:bg-primary/20 text-primary-foreground"
              >
                <button.icon className="h-6 w-6 mb-2" />
                <span>{button.text}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerDashboard;

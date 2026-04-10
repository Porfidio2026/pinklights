
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/lib/supabase';
import { Edit, TrendingUp, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Define the Ad type
interface Ad {
  id: string;
  title: string;
  description: string;
  destination_url: string;
  image_url: string;
  view_count: number;
  click_count: number;
  created_at: string;
}

const EditAds = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedAd, setSelectedAd] = useState<Ad | null>(null);

  useEffect(() => {
    const checkPartnerAndFetchAds = async () => {
      // Check if user is logged in
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to view your advertisements",
          variant: "destructive",
        });
        navigate('/auth');
        return;
      }

      // Get partner ID
      const { data: partner, error: partnerError } = await supabase
        .from('partners')
        .select('id')
        .eq('user_id', session.user.id)
        .single();

      if (partnerError || !partner) {
        toast({
          title: "Partner Account Required",
          description: "Please create a partner account first",
          variant: "destructive",
        });
        navigate('/create-partner');
        return;
      }

      // Fetch partner's ads
      try {
        const { data, error } = await supabase
          .from('partner_ads')
          .select('*')
          .eq('partner_id', partner.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setAds(data || []);
      } catch (error) {
        console.error('Error fetching ads:', error);
        toast({
          title: "Error",
          description: "Failed to load advertisements",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    checkPartnerAndFetchAds();
  }, [navigate, toast]);

  const handleBack = () => {
    navigate('/partner-dashboard');
  };

  const handleEditAd = (ad: Ad) => {
    setSelectedAd(ad);
    navigate(`/create-ad?edit=${ad.id}`);
  };

  const handleBoostAd = (ad: Ad) => {
    toast({
      title: "Coming Soon",
      description: "The boost feature will be available soon. Please check back later.",
    });
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <Button 
          variant="outline" 
          onClick={handleBack}
          className="mb-4"
        >
          Back to Dashboard
        </Button>

        <Card className="p-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Manage Your Advertisements</h1>
            <p className="text-muted-foreground">
              View and edit your existing advertisements
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : ads.length === 0 ? (
            <div className="text-center py-12">
              <p className="mb-4 text-muted-foreground">You don't have any advertisements yet.</p>
              <Button onClick={() => navigate('/create-ad')}>
                Create Your First Ad
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left">Title</th>
                    <th className="px-4 py-3 text-left">Creation Date</th>
                    <th className="px-4 py-3 text-center">Views</th>
                    <th className="px-4 py-3 text-center">Clicks</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {ads.map((ad) => (
                    <tr key={ad.id} className="border-b hover:bg-accent">
                      <td className="px-4 py-3">{ad.title}</td>
                      <td className="px-4 py-3">{format(new Date(ad.created_at), 'MMM d, yyyy')}</td>
                      <td className="px-4 py-3 text-center">{ad.view_count}</td>
                      <td className="px-4 py-3 text-center">{ad.click_count}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleEditAd(ad)}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleBoostAd(ad)}
                          >
                            <TrendingUp className="h-4 w-4 mr-1" />
                            Boost
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          <div className="mt-6 flex justify-center">
            <Button onClick={() => navigate('/create-ad')}>
              Create New Advertisement
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EditAds;

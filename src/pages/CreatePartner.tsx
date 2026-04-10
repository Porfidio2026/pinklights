
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { sanitizeText } from '@/utils/sanitize';
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2 } from 'lucide-react';

const CreatePartner = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phoneNumber: ''
  });

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Submit the form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Get current user
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Error",
          description: "You must be logged in to create a partner account",
          variant: "destructive"
        });
        navigate('/auth');
        return;
      }

      // Insert partner data
      const { data, error } = await supabase
        .from('partners')
        .insert({
          user_id: session.user.id,
          company_name: sanitizeText(formData.companyName),
          contact_person: sanitizeText(formData.contactPerson),
          email: formData.email || session.user.email,
          phone_number: formData.phoneNumber
        })
        .select();

      if (error) {
        console.error('Error creating partner:', error);
        toast({
          title: "Error",
          description: error.message || "Failed to create partner account",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Success!",
        description: "Your partner account has been created",
      });

      // Redirect to partner dashboard
      navigate('/partner-dashboard');

    } catch (error) {
      console.error('Exception creating partner:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-md mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary">Create Partner Account</h1>
          <p className="mt-2 text-muted-foreground">Complete your partner information</p>
        </div>

        <Card className="p-6 bg-card/80 backdrop-blur-xl border border-border">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  placeholder="Your company name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPerson">Contact Person</Label>
                <Input
                  id="contactPerson"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  required
                  placeholder="Full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email address"
                />
                <p className="text-xs text-muted-foreground">
                  If left empty, we'll use your account email
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Your phone number"
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Partner Account"
              )}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default CreatePartner;

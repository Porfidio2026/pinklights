
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { CreditCard } from 'lucide-react';

const PartnerBilling = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleBack = () => {
    navigate('/partner-dashboard');
  };

  const handleUpgrade = () => {
    toast({
      title: "Coming Soon",
      description: "Payment integration will be added in a future update",
    });
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <Button 
          variant="outline" 
          onClick={handleBack}
          className="mb-4"
        >
          Back to Dashboard
        </Button>

        <Card className="p-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-4">Partner Billing & Payments</h1>
            <p className="text-muted-foreground">
              Manage your subscription and payment methods
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-secondary/20 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Partner Subscription Plans</h2>
              <div className="space-y-4">
                <div className="p-4 border border-border rounded-lg bg-card">
                  <h3 className="font-medium text-lg mb-2">Basic Plan</h3>
                  <p className="text-muted-foreground mb-2">Perfect for small businesses</p>
                  <ul className="space-y-2 mb-4">
                    <li>• 1 advertisement spot</li>
                    <li>• Basic analytics</li>
                    <li>• Standard support</li>
                  </ul>
                  <p className="text-xl font-bold mb-2">$49.99 / month</p>
                  <Button onClick={handleUpgrade} className="w-full">Select Plan</Button>
                </div>

                <div className="p-4 border border-border rounded-lg bg-card">
                  <h3 className="font-medium text-lg mb-2">Premium Plan</h3>
                  <p className="text-muted-foreground mb-2">For growing businesses</p>
                  <ul className="space-y-2 mb-4">
                    <li>• 3 advertisement spots</li>
                    <li>• Advanced analytics</li>
                    <li>• Priority support</li>
                  </ul>
                  <p className="text-xl font-bold mb-2">$99.99 / month</p>
                  <Button onClick={handleUpgrade} className="w-full">Select Plan</Button>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button onClick={handleUpgrade} className="w-full md:w-auto" size="lg">
                <CreditCard className="w-4 h-4 mr-2" />
                Add Payment Method
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PartnerBilling;

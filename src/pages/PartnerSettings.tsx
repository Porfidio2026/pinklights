
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const PartnerSettings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleBack = () => {
    navigate('/partner-dashboard');
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
            <h1 className="text-2xl font-bold mb-4">Partner Account Settings</h1>
            <p className="text-muted-foreground">
              This feature will be implemented in future updates
            </p>
          </div>

          <div className="flex justify-center">
            <Button onClick={handleBack}>
              Return to Dashboard
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PartnerSettings;

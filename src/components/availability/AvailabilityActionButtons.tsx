
import React from 'react';
import { Button } from "@/components/ui/button";
import { Clock, X } from 'lucide-react';

interface AvailabilityActionButtonsProps {
  onMake24x7Available: () => void;
  onClearAllAvailability: () => void;
}

const AvailabilityActionButtons: React.FC<AvailabilityActionButtonsProps> = ({
  onMake24x7Available,
  onClearAllAvailability,
}) => {
  return (
    <div className="mb-6 flex flex-wrap gap-4">
      <Button 
        onClick={onMake24x7Available}
        variant="outline"
        className="flex items-center gap-2"
      >
        <Clock className="h-4 w-4" />
        Available 24/7
      </Button>
      <Button 
        onClick={onClearAllAvailability}
        variant="outline"
        className="flex items-center gap-2"
      >
        <X className="h-4 w-4" />
        Make Unavailable
      </Button>
    </div>
  );
};

export default AvailabilityActionButtons;

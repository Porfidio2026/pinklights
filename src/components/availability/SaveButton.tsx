
import React from 'react';
import { Button } from "@/components/ui/button";
import { Save } from 'lucide-react';

interface SaveButtonProps {
  loading: boolean;
  onSave: () => void;
}

const SaveButton: React.FC<SaveButtonProps> = ({ loading, onSave }) => {
  return (
    <div className="fixed bottom-8 right-8 z-10">
      <Button
        onClick={onSave}
        disabled={loading}
        size="lg"
        className="rounded-full px-6"
      >
        <Save className="h-5 w-5 mr-2" />
        {loading ? "Saving..." : "Save Availabilities"}
      </Button>
    </div>
  );
};

export default SaveButton;

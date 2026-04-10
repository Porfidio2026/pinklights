import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Flag } from 'lucide-react';
import { ReportDialog } from './ReportDialog';

interface ReportButtonProps {
  profileId: string;
}

export const ReportButton = ({ profileId }: ReportButtonProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="text-muted-foreground hover:text-destructive"
        onClick={() => setDialogOpen(true)}
      >
        <Flag className="h-4 w-4 mr-1" />
        Report
      </Button>
      <ReportDialog profileId={profileId} open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
};

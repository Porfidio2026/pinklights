
import React from 'react';
import { Button } from "@/components/ui/button";
import { Copy } from 'lucide-react';
import TimeBlocksList from './TimeBlocksList';
import { DayAvailability as DayAvailabilityType } from './types';

interface DayAvailabilityProps {
  dayAvail: DayAvailabilityType;
  dayIndex: number;
  previousDay: string | null;
  onAddTimeBlock: (dayIndex: number) => void;
  onRemoveTimeBlock: (dayIndex: number, blockIndex: number) => void;
  onUpdateTimeBlock: (dayIndex: number, blockIndex: number, field: 'start' | 'end', value: string) => void;
  onCopyFromPreviousDay: (dayIndex: number) => void;
}

const DayAvailability: React.FC<DayAvailabilityProps> = ({
  dayAvail,
  dayIndex,
  previousDay,
  onAddTimeBlock,
  onRemoveTimeBlock,
  onUpdateTimeBlock,
  onCopyFromPreviousDay,
}) => {
  return (
    <div className="border-b pb-4 last:border-b-0">
      <div className="flex items-center mb-3">
        <h2 className="text-lg font-semibold">{dayAvail.day}</h2>
        {previousDay && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onCopyFromPreviousDay(dayIndex)}
            className="ml-4 text-xs"
          >
            <Copy className="h-3 w-3 mr-1" />
            Copy from {previousDay}
          </Button>
        )}
      </div>
      
      <TimeBlocksList
        timeBlocks={dayAvail.timeBlocks}
        onAddBlock={() => onAddTimeBlock(dayIndex)}
        onRemoveBlock={(blockIndex) => onRemoveTimeBlock(dayIndex, blockIndex)}
        onUpdateBlock={(blockIndex, field, value) => 
          onUpdateTimeBlock(dayIndex, blockIndex, field, value)
        }
      />
    </div>
  );
};

export default DayAvailability;

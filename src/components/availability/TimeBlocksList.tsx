
import React from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle, X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TimeBlock } from './types';

// Generate hours for the dropdown (00:00 to 23:59)
const hoursOptions = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, '0');
  return `${hour}:00`;
});

interface TimeBlocksListProps {
  timeBlocks: TimeBlock[];
  onAddBlock: () => void;
  onRemoveBlock: (blockIndex: number) => void;
  onUpdateBlock: (blockIndex: number, field: 'start' | 'end', value: string) => void;
}

const TimeBlocksList: React.FC<TimeBlocksListProps> = ({
  timeBlocks,
  onAddBlock,
  onRemoveBlock,
  onUpdateBlock,
}) => {
  return (
    <div className="space-y-3">
      {timeBlocks.map((block, blockIndex) => (
        <div key={blockIndex} className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-20">
              <Select
                value={block.start}
                onValueChange={(value) => onUpdateBlock(blockIndex, 'start', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Start" />
                </SelectTrigger>
                <SelectContent>
                  {hoursOptions.map(hour => (
                    <SelectItem key={`start-${hour}`} value={hour}>
                      {hour}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <span>to</span>
            <div className="w-20">
              <Select
                value={block.end}
                onValueChange={(value) => onUpdateBlock(blockIndex, 'end', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="End" />
                </SelectTrigger>
                <SelectContent>
                  {hoursOptions.map(hour => (
                    <SelectItem key={`end-${hour}`} value={hour}>
                      {hour}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onRemoveBlock(blockIndex)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
      
      <Button
        variant="outline"
        size="sm"
        onClick={onAddBlock}
        className="mt-2"
      >
        <PlusCircle className="h-4 w-4 mr-1" />
        Add Time Block
      </Button>
    </div>
  );
};

export default TimeBlocksList;

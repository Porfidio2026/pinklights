
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';

interface NavigationBarProps {
  onPrevious: () => void;
  onNext: () => void;
  onChangeSearch: () => void;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  onPrevious,
  onNext,
  onChangeSearch
}) => {
  return (
    <div className="absolute top-4 left-0 right-0 z-20 flex justify-between items-center px-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => { e.stopPropagation(); onPrevious(); }}
        className="rounded-full bg-background/40 backdrop-blur-sm hover:bg-background/60 text-white h-10 w-10"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={(e) => { e.stopPropagation(); onChangeSearch(); }}
        className="rounded-full bg-background/40 backdrop-blur-sm hover:bg-background/60 text-white px-4"
      >
        <Search className="h-4 w-4 mr-2" />
        Search
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="rounded-full bg-background/40 backdrop-blur-sm hover:bg-background/60 text-white h-10 w-10"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );
};

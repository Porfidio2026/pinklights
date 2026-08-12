
import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { NavigationBar } from './NavigationBar';
import { ProfileCard } from './ProfileCard';
import { PageIndicator } from './PageIndicator';

interface SearchResultsCarouselProps {
  profiles: Array<{
    id: string;
    full_name: string;
    age: number | null;
    availability_status: string;
    profile_pictures: Array<{
      id: string;
      picture_url: string;
      display_order: number;
    }>;
    distance_km?: number;
    drive_minutes?: number;
    latitude?: number;
    longitude?: number;
    location?: string | null;
  }>;
  onChangeSearch: () => void;
}

// Minimum horizontal travel before a touch counts as a swipe rather than a tap.
const SWIPE_THRESHOLD_PX = 50;

export const SearchResultsCarousel = ({ profiles, onChangeSearch }: SearchResultsCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasUserLocation, setHasUserLocation] = useState(false);
  const navigate = useNavigate();
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const didSwipe = useRef(false);

  useEffect(() => {
    // Check if user has shared location
    const storedLocation = localStorage.getItem('userLocation');
    setHasUserLocation(!!storedLocation);
    
    // Force re-render when profiles change
    setCurrentIndex(0);
  }, [profiles]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % profiles.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + profiles.length) % profiles.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
    didSwipe.current = false;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;

    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;

    // Ignore taps and vertical scrolling; only a clear horizontal drag counts.
    if (Math.abs(dx) < SWIPE_THRESHOLD_PX || Math.abs(dx) <= Math.abs(dy)) return;

    didSwipe.current = true;
    if (dx > 0) {
      handleNext();
    } else {
      handlePrevious();
    }
  };

  const navigateToProfile = (profileId: string) => {
    // A swipe ends with a click on the card, which would otherwise open the
    // profile every time someone browses.
    if (didSwipe.current) {
      didSwipe.current = false;
      return;
    }
    navigate(`/profile/${profileId}`, { 
      state: { fromSearch: true }
    });
  };

  if (!profiles.length) {
    return (
      <Card className="p-6 text-center">
        <p>No profiles found matching your criteria.</p>
      </Card>
    );
  }

  const currentProfile = profiles[currentIndex];

  return (
    <div className="relative min-h-[70vh] md:min-h-[60vh]">
      <NavigationBar 
        onPrevious={handlePrevious}
        onNext={handleNext}
        onChangeSearch={onChangeSearch}
      />

      <div onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <ProfileCard 
          profile={currentProfile}
          hasUserLocation={hasUserLocation}
          onCardClick={navigateToProfile}
        />
      </div>

      <PageIndicator 
        total={profiles.length}
        current={currentIndex}
      />
    </div>
  );
};

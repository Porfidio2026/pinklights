
import React, { useState, useEffect } from 'react';
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

export const SearchResultsCarousel = ({ profiles, onChangeSearch }: SearchResultsCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasUserLocation, setHasUserLocation] = useState(false);
  const navigate = useNavigate();

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

  const navigateToProfile = (profileId: string) => {
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

      <ProfileCard 
        profile={currentProfile}
        hasUserLocation={hasUserLocation}
        onCardClick={navigateToProfile}
      />

      <PageIndicator 
        total={profiles.length}
        current={currentIndex}
      />
    </div>
  );
};

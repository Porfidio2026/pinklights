
import React from 'react';
import { Card } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ProfilePicture {
  id: string;
  picture_url: string;
}

interface ProfilePicturesProps {
  pictures: ProfilePicture[];
  profileName: string;
  defaultPictureUrl: string;
  mainPictureUrl?: string;
  compact?: boolean;
}

export const ProfilePictures = ({ 
  pictures, 
  profileName, 
  defaultPictureUrl, 
  mainPictureUrl,
  compact = false 
}: ProfilePicturesProps) => {
  const hasMultiplePictures = pictures && pictures.length > 1;
  const displayPictures = pictures && pictures.length > 0 ? pictures : [];

  const handleCarouselClick = (e: React.MouseEvent) => {
    if (e.target instanceof HTMLElement && e.target.closest('button')) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  if (!pictures || pictures.length === 0) {
    return (
      <div className="w-full h-full overflow-hidden">
        <img
          src={mainPictureUrl || defaultPictureUrl}
          alt={profileName}
          loading="lazy"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-hidden" onClick={handleCarouselClick}>
      <Carousel className="w-full h-full">
        <CarouselContent className="h-full">
          {displayPictures.map((picture, index) => (
            <CarouselItem key={picture.id} className="h-full">
              <img
                src={picture.picture_url}
                alt={`${profileName} - Photo ${index + 1}`}
                loading="lazy"
                className="w-full h-full object-cover rounded-lg"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {hasMultiplePictures && (
          <>
            <CarouselPrevious 
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10" 
            />
            <CarouselNext 
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10" 
            />
          </>
        )}
      </Carousel>
    </div>
  );
};

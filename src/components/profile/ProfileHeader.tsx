
import React from 'react';

interface ProfileHeaderProps {
  fullName: string;
  age?: number;
  availabilityStatus: string;
}

export const ProfileHeader = ({ fullName, age, availabilityStatus }: ProfileHeaderProps) => {
  const getAvailabilityStatusDisplay = (status: string) => {
    switch (status) {
      case 'available_now':
        return { text: 'Available now', color: 'text-emerald-400' };
      case 'available_later_today':
        return { text: 'Available later today', color: 'text-primary' };
      case 'available_tomorrow':
        return { text: 'Available tomorrow', color: 'text-primary/70' };
      default:
        return { text: 'Unavailable', color: 'text-muted-foreground' };
    }
  };

  const availability = getAvailabilityStatusDisplay(availabilityStatus);

  return (
    <div className="text-center space-y-1">
      <h1 className="text-2xl sm:text-3xl font-bold">
        {fullName}
        {age && <span className="ml-2">, {age}</span>}
      </h1>
      <p className={`text-sm sm:text-base ${availability.color}`}>
        {availability.text}
      </p>
    </div>
  );
};

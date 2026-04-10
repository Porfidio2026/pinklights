
import React from 'react';
import { Card } from "@/components/ui/card";
import { useAvailabilities } from '@/hooks/useAvailabilities';
import AvailabilityActionButtons from '@/components/availability/AvailabilityActionButtons';
import DayAvailability from '@/components/availability/DayAvailability';
import SaveButton from '@/components/availability/SaveButton';

const daysOfWeek = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday',
  'Friday', 'Saturday', 'Sunday'
];

const SetAvailabilities = () => {
  const {
    loading,
    availabilities,
    addTimeBlock,
    removeTimeBlock,
    updateTimeBlock,
    copyFromPreviousDay,
    make24x7Available,
    clearAllAvailability,
    handleSave,
  } = useAvailabilities();

  return (
    <div className="min-h-screen bg-background py-8 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-6">Set Your Availabilities</h1>
          
          <AvailabilityActionButtons
            onMake24x7Available={make24x7Available}
            onClearAllAvailability={clearAllAvailability}
          />
          
          <div className="space-y-6">
            {availabilities.map((dayAvail, dayIndex) => (
              <DayAvailability
                key={dayAvail.day}
                dayAvail={dayAvail}
                dayIndex={dayIndex}
                previousDay={dayIndex > 0 ? daysOfWeek[dayIndex - 1] : null}
                onAddTimeBlock={addTimeBlock}
                onRemoveTimeBlock={removeTimeBlock}
                onUpdateTimeBlock={updateTimeBlock}
                onCopyFromPreviousDay={copyFromPreviousDay}
              />
            ))}
          </div>
        </Card>
      </div>

      <SaveButton loading={loading} onSave={handleSave} />
    </div>
  );
};

export default SetAvailabilities;

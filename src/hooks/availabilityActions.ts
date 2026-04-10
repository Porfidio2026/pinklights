
import { DayAvailability } from '@/components/availability/types';

/**
 * Returns a function that adds a new time block to a specific day
 */
export const addTimeBlock = (
  setAvailabilities: React.Dispatch<React.SetStateAction<DayAvailability[]>>
) => (dayIndex: number) => {
  setAvailabilities(prev => prev.map((day, idx) => {
    if (idx === dayIndex) {
      return {
        ...day,
        timeBlocks: [...day.timeBlocks, { start: "09:00", end: "17:00" }]
      };
    }
    return day;
  }));
};

/**
 * Returns a function that removes a time block from a specific day
 */
export const removeTimeBlock = (
  setAvailabilities: React.Dispatch<React.SetStateAction<DayAvailability[]>>
) => (dayIndex: number, blockIndex: number) => {
  setAvailabilities(prev => prev.map((day, idx) => {
    if (idx === dayIndex) {
      const newTimeBlocks = [...day.timeBlocks];
      newTimeBlocks.splice(blockIndex, 1);
      return {
        ...day,
        timeBlocks: newTimeBlocks
      };
    }
    return day;
  }));
};

/**
 * Returns a function that updates a field in a time block
 */
export const updateTimeBlock = (
  setAvailabilities: React.Dispatch<React.SetStateAction<DayAvailability[]>>
) => (dayIndex: number, blockIndex: number, field: 'start' | 'end', value: string) => {
  setAvailabilities(prev => prev.map((day, idx) => {
    if (idx === dayIndex) {
      const newTimeBlocks = [...day.timeBlocks];
      newTimeBlocks[blockIndex] = {
        ...newTimeBlocks[blockIndex],
        [field]: value
      };
      return {
        ...day,
        timeBlocks: newTimeBlocks
      };
    }
    return day;
  }));
};

/**
 * Returns a function that copies time blocks from the previous day
 */
export const copyFromPreviousDay = (
  setAvailabilities: React.Dispatch<React.SetStateAction<DayAvailability[]>>
) => (dayIndex: number) => {
  if (dayIndex === 0) return; // Monday has no previous day
  
  setAvailabilities(prev => prev.map((day, idx) => {
    if (idx === dayIndex) {
      return {
        ...day,
        timeBlocks: [...prev[dayIndex - 1].timeBlocks]
      };
    }
    return day;
  }));
};

/**
 * Returns a function that sets the user available 24/7
 */
export const make24x7Available = (
  setAvailabilities: React.Dispatch<React.SetStateAction<DayAvailability[]>>,
  daysOfWeek: string[]
) => () => {
  setAvailabilities(daysOfWeek.map(day => ({
    day,
    timeBlocks: [{ start: "00:00", end: "00:00" }] // 00:00 to 00:00 means the entire day
  })));
};

/**
 * Returns a function that clears all availability
 */
export const clearAllAvailability = (
  setAvailabilities: React.Dispatch<React.SetStateAction<DayAvailability[]>>,
  daysOfWeek: string[]
) => () => {
  setAvailabilities(daysOfWeek.map(day => ({
    day,
    timeBlocks: []
  })));
};

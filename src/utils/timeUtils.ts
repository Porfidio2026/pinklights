
import { DayAvailability } from '@/components/availability/types';

const daysOfWeek = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday',
  'Friday', 'Saturday', 'Sunday'
];

/**
 * Expands time blocks into individual hours
 */
export const expandTimeBlocksToHours = (availabilities: DayAvailability[]) => {
  // Expand all time blocks to individual hours
  const result: { day: string; hours: string[] }[] = [];
  
  availabilities.forEach(dayAvail => {
    const hoursForDay: string[] = [];
    
    dayAvail.timeBlocks.forEach(block => {
      let startHour = parseInt(block.start.split(':')[0]);
      const endHour = parseInt(block.end.split(':')[0]);
      
      // Handle the special case of 00:00 to 00:00 (full day)
      if (block.start === "00:00" && block.end === "00:00") {
        // Add all 24 hours
        for (let h = 0; h < 24; h++) {
          hoursForDay.push(`${h.toString().padStart(2, '0')}:00`);
        }
        return;
      }
      
      // Add hours from start to end
      while (startHour !== endHour) {
        hoursForDay.push(`${startHour.toString().padStart(2, '0')}:00`);
        startHour = (startHour + 1) % 24;
      }
    });
    
    result.push({ day: dayAvail.day, hours: hoursForDay });
  });
  
  return result;
};

/**
 * Converts database hour records to time blocks
 */
export const convertHoursToTimeBlocks = (availabilitiesByDay: Map<string, string[]>, days: string[]) => {
  return days.map(day => {
    const hours = availabilitiesByDay.get(day) || [];
    hours.sort();
    
    const timeBlocks: { start: string; end: string }[] = [];
    let startHour: string | null = null;
    let endHour: string | null = null;
    
    for (let i = 0; i < hours.length; i++) {
      const currentHour = hours[i];
      const hourNum = parseInt(currentHour.split(':')[0]);
      
      if (startHour === null) {
        startHour = currentHour;
        endHour = `${(hourNum + 1) % 24}:00`;
      } else {
        const expectedNext = `${(parseInt(endHour!.split(':')[0]))}:00`;
        
        if (currentHour === expectedNext) {
          // Continue the block
          endHour = `${(hourNum + 1) % 24}:00`;
        } else {
          // End the current block and start a new one
          timeBlocks.push({ start: startHour, end: endHour! });
          startHour = currentHour;
          endHour = `${(hourNum + 1) % 24}:00`;
        }
      }
    }
    
    // Add the last block if there is one
    if (startHour !== null && endHour !== null) {
      timeBlocks.push({ start: startHour, end: endHour });
    }
    
    return { day, timeBlocks };
  });
};

export const getInitialAvailabilities = () => {
  return daysOfWeek.map(day => ({ 
    day, 
    timeBlocks: []
  }));
};

export { daysOfWeek };

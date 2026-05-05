import { describe, it, expect } from 'vitest';
import {
  expandTimeBlocksToHours,
  convertHoursToTimeBlocks,
  getInitialAvailabilities,
  daysOfWeek,
} from '../timeUtils';
import { DayAvailability } from '@/components/availability/types';

describe('expandTimeBlocksToHours', () => {
  it('expands a simple time block', () => {
    const input: DayAvailability[] = [
      { day: 'Monday', timeBlocks: [{ start: '09:00', end: '12:00' }] },
    ];
    const result = expandTimeBlocksToHours(input);
    expect(result[0].day).toBe('Monday');
    expect(result[0].hours).toEqual(['09:00', '10:00', '11:00']);
  });

  it('handles full day (00:00 to 00:00)', () => {
    const input: DayAvailability[] = [
      { day: 'Tuesday', timeBlocks: [{ start: '00:00', end: '00:00' }] },
    ];
    const result = expandTimeBlocksToHours(input);
    expect(result[0].hours).toHaveLength(24);
    expect(result[0].hours[0]).toBe('00:00');
    expect(result[0].hours[23]).toBe('23:00');
  });

  it('handles overnight wrap (22:00 to 02:00)', () => {
    const input: DayAvailability[] = [
      { day: 'Friday', timeBlocks: [{ start: '22:00', end: '02:00' }] },
    ];
    const result = expandTimeBlocksToHours(input);
    expect(result[0].hours).toEqual(['22:00', '23:00', '00:00', '01:00']);
  });

  it('handles multiple blocks in one day', () => {
    const input: DayAvailability[] = [
      {
        day: 'Saturday',
        timeBlocks: [
          { start: '09:00', end: '12:00' },
          { start: '14:00', end: '16:00' },
        ],
      },
    ];
    const result = expandTimeBlocksToHours(input);
    expect(result[0].hours).toEqual(['09:00', '10:00', '11:00', '14:00', '15:00']);
  });

  it('handles empty time blocks', () => {
    const input: DayAvailability[] = [
      { day: 'Sunday', timeBlocks: [] },
    ];
    const result = expandTimeBlocksToHours(input);
    expect(result[0].hours).toEqual([]);
  });
});

describe('convertHoursToTimeBlocks', () => {
  it('converts consecutive hours to a single block', () => {
    const hours = new Map([['Monday', ['09:00', '10:00', '11:00']]]);
    const result = convertHoursToTimeBlocks(hours, ['Monday']);
    expect(result[0].timeBlocks).toEqual([{ start: '09:00', end: '12:00' }]);
  });

  it('splits non-consecutive hours into multiple blocks', () => {
    const hours = new Map([['Monday', ['09:00', '10:00', '14:00', '15:00']]]);
    const result = convertHoursToTimeBlocks(hours, ['Monday']);
    expect(result[0].timeBlocks).toEqual([
      { start: '09:00', end: '11:00' },
      { start: '14:00', end: '16:00' },
    ]);
  });

  it('handles a single hour', () => {
    const hours = new Map([['Monday', ['18:00']]]);
    const result = convertHoursToTimeBlocks(hours, ['Monday']);
    expect(result[0].timeBlocks).toEqual([{ start: '18:00', end: '19:00' }]);
  });

  it('handles day with no hours', () => {
    const hours = new Map<string, string[]>();
    const result = convertHoursToTimeBlocks(hours, ['Monday']);
    expect(result[0].timeBlocks).toEqual([]);
  });

  it('sorts hours before processing', () => {
    const hours = new Map([['Monday', ['11:00', '09:00', '10:00']]]);
    const result = convertHoursToTimeBlocks(hours, ['Monday']);
    expect(result[0].timeBlocks).toEqual([{ start: '09:00', end: '12:00' }]);
  });
});

describe('getInitialAvailabilities', () => {
  it('returns 7 days with empty time blocks', () => {
    const result = getInitialAvailabilities();
    expect(result).toHaveLength(7);
    result.forEach(day => {
      expect(day.timeBlocks).toEqual([]);
    });
  });

  it('starts with Monday', () => {
    const result = getInitialAvailabilities();
    expect(result[0].day).toBe('Monday');
    expect(result[6].day).toBe('Sunday');
  });
});

describe('daysOfWeek', () => {
  it('has 7 days starting Monday', () => {
    expect(daysOfWeek).toHaveLength(7);
    expect(daysOfWeek[0]).toBe('Monday');
    expect(daysOfWeek[6]).toBe('Sunday');
  });
});

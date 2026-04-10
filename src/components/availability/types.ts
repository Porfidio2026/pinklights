
export interface TimeBlock {
  start: string;
  end: string;
}

export interface DayAvailability {
  day: string;
  timeBlocks: TimeBlock[];
}


import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { DayAvailability } from '@/components/availability/types';
import { daysOfWeek, getInitialAvailabilities, convertHoursToTimeBlocks } from '@/utils/timeUtils';
import { fetchUserAvailabilities, saveUserAvailabilities } from '@/api/availabilityService';
import { 
  addTimeBlock, 
  removeTimeBlock, 
  updateTimeBlock, 
  copyFromPreviousDay,
  make24x7Available,
  clearAllAvailability
} from './availabilityActions';

export const useAvailabilities = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [availabilities, setAvailabilities] = useState<DayAvailability[]>(getInitialAvailabilities());

  useEffect(() => {
    const loadAvailabilities = async () => {
      try {
        const { availabilities: existingAvailabilities } = await fetchUserAvailabilities();

        // Group hours by day
        const availabilitiesByDay = new Map<string, string[]>();
        
        existingAvailabilities.forEach(a => {
          if (!availabilitiesByDay.has(a.day_of_week)) {
            availabilitiesByDay.set(a.day_of_week, []);
          }
          availabilitiesByDay.get(a.day_of_week)?.push(a.hour);
        });
        
        // Convert consecutive hours to time blocks
        const transformedAvailabilities = convertHoursToTimeBlocks(availabilitiesByDay, daysOfWeek);
        setAvailabilities(transformedAvailabilities);
      } catch (error) {
        console.error('Error fetching availabilities:', error);
        
        // Check if error is due to auth
        if (error instanceof Error && error.message === 'No active session') {
          toast({
            title: "Authentication required",
            description: "Please sign in to access this page",
            variant: "destructive",
          });
          navigate('/auth');
          return;
        }
        
        toast({
          title: "Error",
          description: "Failed to load availabilities",
          variant: "destructive",
        });
      }
    };

    loadAvailabilities();
  }, [navigate, toast]);

  const handleSave = async () => {
    setLoading(true);
    try {
      await saveUserAvailabilities(availabilities);
      
      toast({
        title: "Success",
        description: "Availabilities updated successfully",
      });
      
      // Always redirect to homepage after saving availabilities
      navigate('/home');
    } catch (error) {
      console.error('Error saving availabilities:', error);
      toast({
        title: "Error",
        description: "Failed to update availabilities",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    availabilities,
    addTimeBlock: addTimeBlock(setAvailabilities),
    removeTimeBlock: removeTimeBlock(setAvailabilities),
    updateTimeBlock: updateTimeBlock(setAvailabilities),
    copyFromPreviousDay: copyFromPreviousDay(setAvailabilities),
    make24x7Available: make24x7Available(setAvailabilities, daysOfWeek),
    clearAllAvailability: clearAllAvailability(setAvailabilities, daysOfWeek),
    handleSave,
  };
};

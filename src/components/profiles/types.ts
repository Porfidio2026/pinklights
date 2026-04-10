
import { Profile as BaseProfile } from '@/types/profile';

export interface Profile extends Omit<BaseProfile, 'distance_km'> {
  id: string;
  full_name: string;
  profile_picture_url: string | null;
  availability_status: string;
  location: string | null;
  age: number | null;
  profile_pictures: {
    id: string;
    picture_url: string;
    display_order: number;
  }[];
  distance_km?: number; // Optional in the extended Profile
  drive_minutes?: number;
  service_type: 'private' | 'outcall' | 'soft' | 'ropes'; // Now required
  gender: 'Female' | 'Trans'; // Now required
  latitude?: number;
  longitude?: number;
}

export interface RelatedProfilesProps {
  profiles?: Profile[];
  linkToProfiles?: boolean;
  currentProfileId?: string;
  selectedService?: 'private' | 'outcall' | 'soft' | 'ropes';
  selectedGender?: 'Female' | 'Trans';
}

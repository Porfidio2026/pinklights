
export interface Profile {
  id: string;
  full_name: string;
  age: number | null;
  location: string | null;
  availability_status: string;
  profile_picture_url: string | null;
  distance_km: number;
  hair_colour: string | null;
  breast_size: string | null;
  skin_tone: string | null;
  body_type: string | null;
  profile_pictures: {
    id: string;
    picture_url: string;
    display_order: number;
  }[];
  gender: 'Female' | 'Trans';
  service_type: 'private' | 'outcall' | 'soft' | 'ropes';
}


export interface SearchCriteria {
  location: string;
  maxDistance: number;
  hairColour: string[];
  breastSize: string[];
  skinTone: string[];
  bodyType: string[];
  ageRange: [number, number];
  serviceType?: 'private' | 'outcall' | 'soft' | 'ropes';
  gender?: 'Female' | 'Trans';
}

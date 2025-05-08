export interface Destination {
    id: number;
    name: string;
    description: string;
    activities: string[];
    photos: string[];
  }

  export interface Trip {
    id: number;
    name: string;
    description?: string;
    image?: string;
    startDate: string;
    endDate: string;
    participants: string[];
    destinations?: Destination[];
  }

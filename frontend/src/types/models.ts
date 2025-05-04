export interface Destination {
    id: number;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
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
    participant: string[];
    destinations?: Destination[];
  }

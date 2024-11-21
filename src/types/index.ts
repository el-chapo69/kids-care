export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  password?: string; // Only used during creation
}

export interface ChildrensHome {
  id: string;
  name: string;
  location: string;
  description: string;
  needs: string[];
  image: string;
  contactInfo: {
    phone: string;
    email: string;
  };
  visitationHours: string;
  donationCount: number;
  visitCount: number;
  reviews: Review[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Donation {
  id: string;
  userId: string;
  homeId: string;
  amount: number;
  date: string;
  items?: string[];
}

export interface Visit {
  id: string;
  userId: string;
  homeId: string;
  date: string;
  status: 'pending' | 'approved' | 'completed';
}
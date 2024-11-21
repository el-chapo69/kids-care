import React, { createContext, useContext, useState, useEffect } from 'react';
import { ChildrensHome, Donation, Visit, Review } from '../types';

interface DataContextType {
  homes: ChildrensHome[];
  donations: Donation[];
  visits: Visit[];
  addDonation: (donation: Omit<Donation, 'id' | 'date'>) => void;
  addVisit: (visit: Omit<Visit, 'id' | 'status'>) => void;
  addReview: (homeId: string, review: Omit<Review, 'id' | 'date'>) => void;
  addHome: (home: Omit<ChildrensHome, 'id' | 'donationCount' | 'visitCount' | 'reviews'>) => void;
  updateHome: (id: string, home: Partial<ChildrensHome>) => void;
  deleteHome: (id: string) => void;
}

const mockHomes: ChildrensHome[] = [
  {
    id: '1',
    name: "New Hope Children's Home",
    location: 'Nairobi, Kenya',
    description: 'A safe haven providing care, education, and support for orphaned children in Nairobi.',
    needs: ['School supplies', 'Clothing', 'Medical supplies', 'Food items'],
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3',
    contactInfo: {
      phone: '+254 20 123 4567',
      email: 'info@newhope.org',
    },
    visitationHours: 'Monday to Friday, 9:00 AM - 5:00 PM',
    donationCount: 45,
    visitCount: 12,
    reviews: [],
  },
  {
    id: '2',
    name: "Mombasa Children's Haven",
    location: 'Mombasa, Kenya',
    description: 'Providing shelter and care for vulnerable children in the coastal region.',
    needs: ['Educational materials', 'Toys', 'Bedding', 'Hygiene supplies'],
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3',
    contactInfo: {
      phone: '+254 41 234 5678',
      email: 'contact@mombasahaven.org',
    },
    visitationHours: 'Tuesday to Sunday, 10:00 AM - 4:00 PM',
    donationCount: 32,
    visitCount: 8,
    reviews: [],
  },
  {
    id: '3',
    name: 'Kisumu Care Center',
    location: 'Kisumu, Kenya',
    description: 'A loving home focused on education and development of orphaned children.',
    needs: ['Books', 'Sports equipment', 'Art supplies', 'Food'],
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?ixlib=rb-4.0.3',
    contactInfo: {
      phone: '+254 57 345 6789',
      email: 'info@kisumucare.org',
    },
    visitationHours: 'Monday to Saturday, 9:00 AM - 3:00 PM',
    donationCount: 28,
    visitCount: 15,
    reviews: [],
  },
  {
    id: '4',
    name: "Nakuru Children's Village",
    location: 'Nakuru, Kenya',
    description: 'Creating a nurturing environment for children to grow and thrive.',
    needs: ['Clothing', 'School fees', 'Medical care', 'Food supplies'],
    image: 'https://images.unsplash.com/photo-1491047956322-c134c6e0b165?ixlib=rb-4.0.3',
    contactInfo: {
      phone: '+254 51 456 7890',
      email: 'help@nakuruvillage.org',
    },
    visitationHours: 'Wednesday to Monday, 10:00 AM - 5:00 PM',
    donationCount: 37,
    visitCount: 10,
    reviews: [],
  },
  {
    id: '5',
    name: 'Eldoret Hope Center',
    location: 'Eldoret, Kenya',
    description: 'Supporting vulnerable children through education and comprehensive care.',
    needs: ['School uniforms', 'Books', 'Recreational items', 'Food'],
    image: 'https://images.unsplash.com/photo-1511949860663-92c5c57d48a7?ixlib=rb-4.0.3',
    contactInfo: {
      phone: '+254 53 567 8901',
      email: 'contact@eldorethope.org',
    },
    visitationHours: 'Monday to Friday, 8:00 AM - 4:00 PM',
    donationCount: 25,
    visitCount: 6,
    reviews: [],
  },
  {
    id: '6',
    name: "Thika Children's Sanctuary",
    location: 'Thika, Kenya',
    description: 'A safe space dedicated to nurturing and empowering orphaned children.',
    needs: ['Educational supplies', 'Clothing', 'Medical supplies', 'Food'],
    image: 'https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?ixlib=rb-4.0.3',
    contactInfo: {
      phone: '+254 67 678 9012',
      email: 'info@thikasanctuary.org',
    },
    visitationHours: 'Tuesday to Sunday, 9:00 AM - 5:00 PM',
    donationCount: 30,
    visitCount: 9,
    reviews: [],
  },
];

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [homes, setHomes] = useState<ChildrensHome[]>(mockHomes);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [visits, setVisits] = useState<Visit[]>([]);

  useEffect(() => {
    const storedDonations = localStorage.getItem('donations');
    const storedVisits = localStorage.getItem('visits');
    
    if (storedDonations) setDonations(JSON.parse(storedDonations));
    if (storedVisits) setVisits(JSON.parse(storedVisits));
  }, []);

  const addHome = (home: Omit<ChildrensHome, 'id' | 'donationCount' | 'visitCount' | 'reviews'>) => {
    const newHome: ChildrensHome = {
      ...home,
      id: Math.random().toString(36).substr(2, 9),
      donationCount: 0,
      visitCount: 0,
      reviews: [],
    };
    setHomes([...homes, newHome]);
  };

  const updateHome = (id: string, updates: Partial<ChildrensHome>) => {
    setHomes(homes.map(home => 
      home.id === id ? { ...home, ...updates } : home
    ));
  };

  const deleteHome = (id: string) => {
    setHomes(homes.filter(home => home.id !== id));
  };

  const addDonation = (donation: Omit<Donation, 'id' | 'date'>) => {
    const newDonation: Donation = {
      ...donation,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
    };
    setDonations([...donations, newDonation]);
    localStorage.setItem('donations', JSON.stringify([...donations, newDonation]));
    
    const home = homes.find(h => h.id === donation.homeId);
    if (home) {
      updateHome(home.id, { donationCount: home.donationCount + 1 });
    }
  };

  const addVisit = (visit: Omit<Visit, 'id' | 'status'>) => {
    const newVisit: Visit = {
      ...visit,
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending',
    };
    setVisits([...visits, newVisit]);
    localStorage.setItem('visits', JSON.stringify([...visits, newVisit]));
    
    const home = homes.find(h => h.id === visit.homeId);
    if (home) {
      updateHome(home.id, { visitCount: home.visitCount + 1 });
    }
  };

  const addReview = (homeId: string, review: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...review,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
    };
    
    const home = homes.find(h => h.id === homeId);
    if (home) {
      updateHome(homeId, { reviews: [...home.reviews, newReview] });
    }
  };

  return (
    <DataContext.Provider value={{ 
      homes, 
      donations, 
      visits, 
      addDonation, 
      addVisit, 
      addReview,
      addHome,
      updateHome,
      deleteHome
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
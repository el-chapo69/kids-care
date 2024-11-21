import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Search, MapPin, Users, Heart } from 'lucide-react';

export const HomesList: React.FC = () => {
  const { homes } = useData();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHomes = homes.filter(
    (home) =>
      home.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      home.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Children's Homes</h1>
        <div className="w-full max-w-xl relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHomes.map((home) => (
          <Link
            key={home.id}
            to={`/homes/${home.id}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative h-48">
              <img
                src={home.image}
                alt={home.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <h3 className="text-xl font-semibold text-white">{home.name}</h3>
                <div className="flex items-center text-white/90">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{home.location}</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 space-y-4">
              <p className="text-gray-600 line-clamp-2">{home.description}</p>
              
              <div className="flex justify-between text-sm text-gray-500">
                <div className="flex items-center">
                  <Heart className="h-4 w-4 mr-1" />
                  <span>{home.donationCount} donations</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{home.visitCount} visits</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredHomes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No children's homes found matching your search.</p>
        </div>
      )}
    </div>
  );
};
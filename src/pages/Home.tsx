import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, Calendar } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="space-y-16">
      <section className="relative h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3"
            alt="Children playing"
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center text-white">
          <h1 className="text-5xl font-bold mb-6">
            Make a Difference in a Child's Life
          </h1>
          <p className="text-xl mb-8">
            Support children's homes and orphanages through donations and visits.
            Every contribution matters.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/homes"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              View Children's Homes
            </Link>
            <Link
              to="/register"
              className="bg-white hover:bg-gray-100 text-gray-900 px-6 py-3 rounded-lg font-semibold transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How You Can Help</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <Heart className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Make a Donation</h3>
              <p className="text-gray-600">
                Support children's homes with monetary donations or essential items.
              </p>
            </div>
            <div className="text-center p-6">
              <Users className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Volunteer Your Time</h3>
              <p className="text-gray-600">
                Spend time with children and support the staff at various homes.
              </p>
            </div>
            <div className="text-center p-6">
              <Calendar className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Schedule Visits</h3>
              <p className="text-gray-600">
                Plan visits to children's homes to understand their needs better.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Impact Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">50+</div>
              <div className="text-gray-600">Children's Homes</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">1000+</div>
              <div className="text-gray-600">Children Supported</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">$500K+</div>
              <div className="text-gray-600">Donations Received</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">5000+</div>
              <div className="text-gray-600">Volunteer Hours</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
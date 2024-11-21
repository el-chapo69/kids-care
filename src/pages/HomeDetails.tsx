import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { MapPin, Phone, Mail, Clock, Heart, Calendar, Star } from 'lucide-react';

export const HomeDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { homes, addDonation, addVisit, addReview } = useData();
  const { user } = useAuth();
  const home = homes.find(h => h.id === id);

  const [donationAmount, setDonationAmount] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [activeTab, setActiveTab] = useState<'info' | 'donate' | 'visit' | 'reviews'>('info');

  if (!home) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Children's home not found.</p>
      </div>
    );
  }

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    addDonation({
      userId: user.id,
      homeId: home.id,
      amount: parseFloat(donationAmount),
    });
    setDonationAmount('');
    alert('Thank you for your donation!');
  };

  const handleVisit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    addVisit({
      userId: user.id,
      homeId: home.id,
      date: visitDate,
    });
    setVisitDate('');
    alert('Visit request submitted successfully!');
  };

  const handleReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    addReview(home.id, {
      userId: user.id,
      userName: user.name,
      rating,
      comment,
    });
    setRating(5);
    setComment('');
    alert('Thank you for your review!');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative h-96 rounded-xl overflow-hidden mb-8">
        <img
          src={home.image}
          alt={home.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
          <h1 className="text-4xl font-bold text-white mb-2">{home.name}</h1>
          <div className="flex items-center text-white/90">
            <MapPin className="h-5 w-5 mr-2" />
            <span>{home.location}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="border-b">
          <nav className="flex">
            {(['info', 'donate', 'visit', 'reviews'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === tab
                    ? 'border-b-2 border-indigo-500 text-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'info' && (
            <div className="space-y-6">
              <p className="text-gray-600">{home.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Contact Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <Phone className="h-5 w-5 mr-2" />
                      <span>{home.contactInfo.phone}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Mail className="h-5 w-5 mr-2" />
                      <span>{home.contactInfo.email}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-5 w-5 mr-2" />
                      <span>{home.visitationHours}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Current Needs</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {home.needs.map((need, index) => (
                      <li key={index}>{need}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'donate' && (
            <form onSubmit={handleDonate} className="space-y-6">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                  Donation Amount ($)
                </label>
                <input
                  type="number"
                  id="amount"
                  min="1"
                  step="0.01"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <Heart className="h-5 w-5 mr-2" />
                Make Donation
              </button>
            </form>
          )}

          {activeTab === 'visit' && (
            <form onSubmit={handleVisit} className="space-y-6">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                  Preferred Visit Date
                </label>
                <input
                  type="date"
                  id="date"
                  value={visitDate}
                  onChange={(e) => setVisitDate(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Schedule Visit
              </button>
            </form>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="space-y-4">
                {home.reviews.map((review) => (
                  <div key={review.id} className="border-b pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{review.userName}</span>
                      <div className="flex items-center">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>

              {user && (
                <form onSubmit={handleReview} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Rating
                    </label>
                    <div className="flex items-center mt-1">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setRating(value)}
                          className="p-1"
                        >
                          <Star
                            className={`h-6 w-6 ${
                              value <= rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                      Comment
                    </label>
                    <textarea
                      id="comment"
                      rows={3}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Submit Review
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
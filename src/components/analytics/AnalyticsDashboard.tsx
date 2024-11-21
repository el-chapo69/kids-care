import React from 'react';
import { DonationChart } from './DonationChart';
import { VisitChart } from './VisitChart';
import { useData } from '../../context/DataContext';
import { BarChart3, TrendingUp, Users, DollarSign, Calendar } from 'lucide-react';

export const AnalyticsDashboard: React.FC = () => {
  const { homes, donations, visits } = useData();

  const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0);
  const pendingVisits = visits.filter(v => v.status === 'pending').length;
  const totalVisits = visits.length;
  const avgDonationPerHome = totalDonations / homes.length;

  const stats = [
    {
      title: 'Total Donations',
      value: `$${totalDonations.toFixed(2)}`,
      icon: DollarSign,
      color: 'text-green-600',
      bg: 'bg-green-100',
    },
    {
      title: 'Average per Home',
      value: `$${avgDonationPerHome.toFixed(2)}`,
      icon: BarChart3,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
    },
    {
      title: 'Total Visits',
      value: totalVisits,
      icon: Users,
      color: 'text-purple-600',
      bg: 'bg-purple-100',
    },
    {
      title: 'Pending Visits',
      value: pendingVisits,
      icon: Calendar,
      color: 'text-orange-600',
      bg: 'bg-orange-100',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-semibold">{stat.value}</p>
              </div>
              <div className={`${stat.bg} p-3 rounded-full`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <DonationChart donations={donations} homes={homes} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <VisitChart visits={visits} />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Top Performing Homes</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Home
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Donations
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Visit Count
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance Score
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {homes
                .map(home => {
                  const homeDonations = donations
                    .filter(d => d.homeId === home.id)
                    .reduce((sum, d) => sum + d.amount, 0);
                  const homeVisits = visits.filter(v => v.homeId === home.id).length;
                  const score = (homeDonations / 1000) + (homeVisits * 10);
                  return { ...home, donations: homeDonations, visits: homeVisits, score };
                })
                .sort((a, b) => b.score - a.score)
                .slice(0, 5)
                .map((home, index) => (
                  <tr key={home.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {home.name}
                          </div>
                          <div className="text-sm text-gray-500">{home.location}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        ${home.donations.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{home.visits}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {home.score.toFixed(1)}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
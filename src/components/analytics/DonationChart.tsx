import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Donation, ChildrensHome } from '../../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DonationChartProps {
  donations: Donation[];
  homes: ChildrensHome[];
}

export const DonationChart: React.FC<DonationChartProps> = ({ donations, homes }) => {
  const donationsByHome = homes.map(home => {
    const homeDonations = donations.filter(d => d.homeId === home.id);
    return {
      name: home.name,
      total: homeDonations.reduce((sum, d) => sum + d.amount, 0),
    };
  }).sort((a, b) => b.total - a.total);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Donations by Children\'s Home',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount ($)',
        },
      },
    },
  };

  const data = {
    labels: donationsByHome.map(d => d.name),
    datasets: [
      {
        data: donationsByHome.map(d => d.total),
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        borderColor: 'rgb(99, 102, 241)',
        borderWidth: 1,
      },
    ],
  };

  return <Bar options={options} data={data} />;
};
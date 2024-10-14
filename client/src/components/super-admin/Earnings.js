import { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale, // for the x-axis
    LinearScale,   // for the y-axis
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
  
  // Register the required components
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const EarningsChart = () => {
  const [earningsData, setEarningsData] = useState([]);

  useEffect(() => {
    // Fetch the earnings data from the API
    const fetchEarnings = async () => {
      try {
        const response = await fetch(`${window.location.origin}/superadmin/view/earnings`); 
        const data = await response.json();
        setEarningsData(data); // Set the fetched data
      } catch (error) {
        console.error('Error fetching earnings:', error);
      }
    };

    fetchEarnings();
  }, []);

  // Prepare data for the chart
  const chartData = {
    labels: earningsData.map((item) => item.restaurant), // Restaurant names as labels
    datasets: [
      {
        label: 'Total Earnings',
        data: earningsData.map((item) => item.total_earnings), // Total earnings as data
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Total Earnings by Restaurant</h2>
      <Bar
        data={chartData}
        options={{
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Total Earnings',
              },
            },
            x: {
              title: {
                display: true,
                text: 'Restaurant',
              },
            },
          },
        }}
      />
    </div>
  );
};



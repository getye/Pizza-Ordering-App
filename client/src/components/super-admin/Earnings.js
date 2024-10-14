import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export const EarningsChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchEarningsData = async () => {
      try {
        const response = await fetch(`${window.location.origin}/superadmin/view/earnings`, {
            method: 'GET', 
            headers: {
              'Content-Type': 'application/json', 
            },
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
      
          const data = await response.json();  
          setData(data);
      } catch (error) {
        console.error('Error fetching earnings data:', error);
      }
    };

    fetchEarningsData();
  }, []);

  console.log("data: ", data)

  return (
    <Box sx={{ paddingLeft:32, paddingTop:5, width: '98%', height: 400 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="restaurant" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total_earnings" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};



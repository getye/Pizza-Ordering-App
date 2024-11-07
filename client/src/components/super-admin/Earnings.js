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
  Legend,
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
      
          const result = await response.json();  
          setData(result);
      } catch (error) {
        console.error('Error fetching earnings data:', error);
      }
    };

    fetchEarningsData();
  }, []);

  console.log("data: ", data)

  return (
    <Box sx={{ paddingTop:5,
      ml: {xs: '1%', sm: '10%', md: '15%', lg: '20%'},
      mr: {xs: '0%', sm: '3%', md: '5%', lg: '7%'},
      mb: {xs: 1, sm: 2, md: 3, lg: 4},
    }}>
      <ResponsiveContainer width="90%" height='vh'>
        <BarChart
          width='100%'
          height='100%'
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 2,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="restaurant" 
            tick={{ angle: -45, dy: 20, fontSize:{xs:8, sm:10, md:12} }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total_earnings" fill="#8884d8" barSize={40}/>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};



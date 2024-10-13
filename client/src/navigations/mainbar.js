import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LocalPizzaOutlinedIcon from '@mui/icons-material/LocalPizzaOutlined';
import SummarizeIcon from '@mui/icons-material/Summarize';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Divider, MenuItem, Link } from '@mui/material';
import { Profile } from './profile';
import pizza from '../assets/pizza.png';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';


import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import topLeft from '../assets/topLeftPizza.png';
import liftIcon from '../assets/packedPizza.jpg';




const drawerWidth = 240;

const Footer = () => (
  <Box 
    sx={{ 
      p: 1, 
      paddingLeft:32,
      textAlign: 'center', 
      backgroundColor: 'black', 
      color:'white',
      position: 'fixed', 
      zIndex: 1000,
      bottom: 0, 
      left: 0, 
      right: 0 
    }}
  >
    <Stack 
      direction="row" 
      spacing={2} 
      justifyContent="space-between" 
      alignItems="center" 
      sx={{ width: '100%', maxWidth: 'lg', mx: 'auto' }}
    >
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Typography variant="body2" color="white">
          © {new Date().getFullYear()} Pizza. All rights reserved.
        </Typography>
        <Link 
          href="/terms" 
          sx={{ 
            mx: 1, 
            color: 'white',  
            textDecoration: 'none',  
            fontWeight: 'bold',  
            '&:hover': {
              textDecoration: 'none',  
              color: 'secondary.main',  
            },
          }}>
          Terms and Conditions
        </Link>
      </Box>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Link href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <FacebookIcon />
        </Link>
        <Link href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
          <LinkedInIcon />
        </Link>
        <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <TwitterIcon />
        </Link>
        <Link href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
          <YouTubeIcon />
        </Link>
      </Box>
    </Stack>
  </Box>
);


export const MainBar = (props) => {
  const userRole = localStorage.getItem('userRole');
  const navigate = useNavigate();
  const { window } = props;


  const handleSignOut = () => {
    localStorage.clear();
    navigate('/')
  };

  
 
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', paddingBottom: '56px' }}>
      <CssBaseline />
      <AppBar position="fixed" gap={2} sx={{ width: 1, backgroundColor: 'white', color: 'black' }}>
        
          
          {(!userRole) ? (
            <Toolbar sx={{ justifyContent: 'space-between' }}>
              <img src={pizza} alt='Pizza' />
              <MenuItem onClick={() => navigate('/')}>Home</MenuItem>
              <MenuItem onClick={() => navigate('/orders')}>Orders</MenuItem>
              <MenuItem onClick={() => navigate('/contact')}>Who we are</MenuItem>
              <MenuItem
                onClick={() => navigate('/signup')}
                sx={{
                  bgcolor: '#FF6700',
                  color: 'white',
                  '&:hover': {
                    bgcolor: '#FF6700',
                    opacity: 0.9,
                  },
                }}>Register</MenuItem>
              <MenuItem onClick={() => navigate('/signin')}>Sign in</MenuItem>
            </Toolbar>
          ) : (
            
            <Toolbar sx={{ justifyContent: 'flex-end' }}>
              <Profile />
            </Toolbar>
          )}
        
      </AppBar>
  
      <Box sx={{ flexGrow: 1 }} />
          <Footer />
      </Box>
  );
};

MainBar.propTypes = {
  window: PropTypes.func,
};
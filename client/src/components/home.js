

import { Box, Button, Grid, IconButton, InputBase, Paper, Typography } from '@mui/material'; 
import SearchIcon from '@mui/icons-material/Search';
import home1 from '../assets/homeImage1.png'
import home2 from '../assets/homeImage2.png' 
import featured1 from '../assets/featured1.png'
import featured2 from '../assets/featured2.png'
import featured3 from '../assets/featured3.png'

import { useEffect } from 'react';
import Glide from '@glidejs/glide';
import '@glidejs/glide/dist/css/glide.core.min.css';
import '@glidejs/glide/dist/css/glide.theme.min.css';
  
export const Home =() =>{
  useEffect(() => {
    const glide = new Glide('.glide', {
      type: 'carousel',
      perView: 1,
      autoplay: 3000,
      pagination: {
        el: '.glide__bullets',
        clickable: true,
      },
    });
  
    glide.mount();
  
    return () => glide.destroy(); // Cleanup on unmount
  }, []);

return (
    <>
    <Grid 
        container 
        sx={{
            alignItems: 'center', 
            paddingTop: 2, 
            ml: {xs: '5%', sm: '10%', md: '15%', lg: '20%'},
            background: 'linear-gradient(to bottom, #FFFFFF, #F5D58E, #FFFFFF)',
        }}
        >
      <Grid item xs={10} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <Typography 
          variant= 'h1' 
          sx={{
            background: 'linear-gradient(to right, #FF8C00, #FFCBA4)', 
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: {lg:'6rem', md:'4rem', sm:'2rem', xs:'1rem'}, 
            fontWeight: 'bold',
          }}
        >
          Order us
        </Typography>
        <Typography>Order Pizzas with different toppings. Select toppings as you went. </Typography>
        <Typography sx={{paddingBottom:4}}>Serach Pizzas here.</Typography>
        <Paper
          component="form"
          sx={{ p: '13px 4px', borderRadius: 10, display: 'flex', alignItems: 'center', width:'60%' }}
        >
          <InputBase
            sx={{ ml: 3, flex: 1 }}
            placeholder="Search"
            inputProps={{ 'aria-label': 'search' }}
          />
          <IconButton 
            type="button" 
            sx={{
              bgcolor: '#FF8C00', 
              borderRadius: '50%', 
              display: 'flex', 
              justifyContent: 'center',
              alignItems: 'center',
              width: '40px', 
              height: '40px', 
              transition: 'background-color 0.3s', 
              '&:hover': {
                bgcolor: '#FF6F00', 
              },
            }}
            aria-label="search"
          >
            <SearchIcon sx={{ color: 'white' }} />
          </IconButton>
        </Paper>
      </Grid>

      <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'end' }}>
        <img src={home1} alt='Pizza' style={{maxWidth:'65%', maxHeight:'22vb'}}/>
        <img src={home2} alt='Pizza' style={{maxWidth:'80%', maxHeight:'80vb'}}/>
      </Grid>
    </Grid>
    <Box sx={{
      ml: {xs: '5%', sm: '10%', md: '15%', lg: '20%'},
      pb:{xs:4, sm:6, md:9, lg:13}}}>
        <Typography sx={{color:'gray', fontSize:{xs:'10px', sm:'12px', md:'16', lg:'22px'}}}>Featured Pizza</Typography>
        <Box sx={{ maxwidth: '60%', maxheight: '300px', display: 'flex', justifyContent: 'center' }}>
      <div className="glide">
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            <li className="glide__slide">
              <Grid container sx={{ bgcolor: '#3D3C3A', maxWidth: '100%', borderRadius: 10, paddingLeft: 5 }}>
                <Grid item xs={6} sx={{ paddingTop: 6 }}>
                  <Typography sx={{ pb:{xs:4, sm:6, md:9, lg:13}, color: 'white', 
                    fontSize:{xs:'10px', sm:'12px', md:'16', lg:'22px'}
                   }}>
                    Make Your First Order and Get
                    <Typography component="span" sx={{ color: '#FF8C00', paddingLeft: 2, 
                      fontSize:{xs:'10px', sm:'12px', md:'16', lg:'22px'}
                    }}>
                      50% Off
                    </Typography>
                  </Typography>
                  <Button sx={{ bgcolor: '#FF6F00', color: 'white' }}>
                    <Typography sx={{ textTransform: 'capitalize' }}>
                      Order Now
                    </Typography>
                  </Button>
                </Grid>
                <Grid item xs={6} sx={{ justifyContent: 'end' }}>
                  <img src={featured1} alt="Pizza" style={{ width: '100%', maxHeight: '35vh', borderRadius: '50px' }} />
                </Grid>
              </Grid>
            </li>
            <li className="glide__slide">
              <Grid container sx={{ bgcolor: '#4E5B31', maxWidth: '100%', borderRadius: 10, paddingLeft: 5 }}>
                <Grid item xs={6} sx={{ paddingTop: 6 }}>
                  <Typography  
                    sx={{ pb:{xs:4, sm:6, md:9, lg:13},
                    fontSize:{xs:'10px', sm:'12px', md:'16', lg:'22px'}, 
                    color: 'white' }}>
                    Make Your First Order and Get
                    <Typography component="span" 
                      sx={{ color: '#FF8C00', paddingLeft: 2,
                      fontSize:{xs:'10px', sm:'12px', md:'16', lg:'22px'}
                    }}>
                      50% Off
                    </Typography>
                  </Typography>
                  <Button sx={{ bgcolor: '#FF6F00', color: 'white' }}>
                    <Typography sx={{ textTransform: 'capitalize' }}>
                      Order Now
                    </Typography>
                  </Button>
                </Grid>
                <Grid item xs={6} sx={{ justifyContent: 'end' }}>
                  <img src={featured2} alt="Pizza" style={{ width: '100%', maxHeight: '35vh', borderRadius: '50px' }} />
                </Grid>
              </Grid>
            </li>
            <li className="glide__slide">
              <Grid container sx={{ bgcolor: '#438D80', maxWidth: '100%', borderRadius: 10, paddingLeft: 5 }}>
                <Grid item xs={6} sx={{ paddingTop: 6 }}>
                  <Typography sx={{ pb:{xs:4, sm:6, md:9, lg:13}, color: 'white',
                    fontSize:{xs:'10px', sm:'12px', md:'16', lg:'22px'}
                   }}>
                    Make Your First Order and Get
                    <Typography component="span" sx={{ color: '#FF8C00', paddingLeft: 2,
                      fontSize:{xs:'10px', sm:'12px', md:'16', lg:'22px'}
                     }}>
                      50% Off
                    </Typography>
                  </Typography>
                  <Button sx={{ bgcolor: '#FF6F00', color: 'white' }}>
                    <Typography sx={{ textTransform: 'capitalize' }}>
                      Order Now
                    </Typography>
                  </Button>
                </Grid>
                <Grid item xs={6} sx={{ justifyContent: 'end' }}>
                  <img src={featured3} alt="Pizza" style={{ width: '100%', maxHeight: '35vh', borderRadius: '50px' }} />
                </Grid>
              </Grid>
            </li>
          </ul>
        </div>
        <Box className="glide__bullets" data-glide-el="controls[nav]">
      {Array.from({ length: 3 }).map((_, index) => (
        <Button
          key={index}
          className="glide__bullet"
          data-glide-dir={`=${index}`}
          sx={{
            backgroundColor: '#FF8C00', // Orange color
            height: 10,
            width: 10,
            minWidth: 0, // This is important to make the Button keep its small size
            padding: 0,
            borderRadius: '50%',
            opacity: 0.5, // Initial opacity
            transition: 'opacity 0.3s ease',
            '&:hover': {
              opacity: 1, // Full opacity on hover
            },
            '&.glide__bullet--active': {
              opacity: 1, // Full opacity when active
            },
          }}
        />
      ))}
      </Box>
      </div>
    </Box>
    
    </Box>
    </>
    );
   }
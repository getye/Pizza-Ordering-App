

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
            pl: {xs: '1%', sm: '2%', md: '3%', lg: '5%'},
            background: 'linear-gradient(to bottom, #FFFFFF, #F5D58E, #FFFFFF)',
        }}
        >
      <Grid item xs={10} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <Typography 
          sx={{
            background: 'linear-gradient(to right, #FF8C00, #FFCBA4)', 
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: {xs: '1rem', sm: '2rem', md: '4rem', lg: '6rem'},
            fontWeight: 'bold',
          }}
        >
          Order us
        </Typography>
        <Typography 
          sx={{
            fontSize: {xs: '10px', sm: '12px', md: '14px', lg: '16px'},
          }}
        >Order Pizzas with different toppings. Select toppings as you went. </Typography>
        <Typography sx={{
           fontSize: {xs: '10px', sm: '12px', md: '14px', lg: '16px'},
           pb:{xs: 1, sm: 2, md: 3, lg: 4}
           }}>Serach Pizzas here.</Typography>
          <Paper
            component="form"
            sx={{
              p: { xs: '8px 2px', sm: '10px 3px', md: '12px 4px', lg: '13px 4px' }, 
              borderRadius: 10,
              display: 'flex',
              width: { xs: '90%', sm: '75%', md: '65%', lg: '60%' }, 
            }}
          >
            <InputBase
              sx={{
                ml: { xs: 1, sm: 2, md: 3, lg: 4}, 
                flex: 1,
                fontSize: { xs: '12px', sm: '14px', md: '16px', lg: '18px' } 
              }}
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
                width: { xs: '35px', sm: '38px', md: '40px', lg: '45px' }, 
                height: { xs: '35px', sm: '38px', md: '40px', lg: '45px' }, 
                transition: 'background-color 0.3s',
                '&:hover': {
                  bgcolor: '#FF6F00',
                },
              }}
              aria-label="search"
            >
              <SearchIcon sx={{ color: 'white', fontSize: { xs: '18px', sm: '20px', md: '24px', lg: '28px' } }} /> {/* Adjust icon size */}
            </IconButton>
          </Paper>

      </Grid>

      <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'end' }}>
        <img src={home1} alt='Pizza' style={{maxWidth:'65%', maxHeight:'100px'}}/>
        <img src={home1} alt='Pizza' style={{maxWidth:'65%', maxHeight:'100px', transform: 'rotate(180deg)', position: 'absolute', bottom: 0}}/>
        <img src={home2} alt='Pizza' style={{maxWidth:'80%', maxHeight:'80vb'}}/>
      </Grid>
    </Grid>
    <Box sx={{pl: { xs: 1, sm: 2, md: 4, lg: 8}, pt: { xs: 1, sm: 2, md: 3, lg: 4},}}>
        <Typography 
          sx={{
            color:'gray',
            fontSize: {xs: '12px', sm: '14px', md: '16px', lg: '18px'}
            }}>Featured Pizza</Typography>
        <Box sx={{ width: { xs: '99%', sm: '92%', md: '80%', lg: '60%'}, height: { xs: '150px', sm: '200px', md: '250px', lg: '300px'} , display: 'flex', justifyContent: 'center' }}>
      <div className="glide">
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            <li className="glide__slide">
              <Grid container sx={{ bgcolor: '#3D3C3A', maxWidth: '100%', borderRadius: 10, pl: { xs: 0, sm: 1, md: 2, lg: 3}, }}>
                <Grid item xs={6} sx={{ pt: { xs: 1, sm: 2, md: 4, lg: 6}, }}>
                  <Typography
                     sx={{ pb: { xs: 1, sm: 2, md: 3, lg: 4}, pl: { xs: 1, sm: 2, md: 3, lg: 4}, color: 'white',
                      fontSize: {xs: '12px', sm: '14px', md: '16px', lg: '18px'}
                     }}>
                    Make Your First Order and Get
                    <Typography component="span" sx={{ color: '#FF8C00', pl: { xs: 1, sm: 2, md: 3, lg: 4}, 
                      fontSize: {xs: '12px', sm: '14px', md: '16px', lg: '18px'}}}>
                      50% Off
                    </Typography>
                  </Typography>
                  <Button sx={{ bgcolor: '#FF6F00', color: 'white', borderRadius:2 }}>
                    <Typography sx={{ fontSize: {xs: '10px', sm: '12px', md: '14px', lg: '16px'}, textTransform: 'capitalize' }}>
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
              <Grid container sx={{ bgcolor: '#4E5B31', maxWidth: '100%', borderRadius: 10, pl: { xs: 0, sm: 1, md: 2, lg: 3}, }}>
                <Grid item xs={6} sx={{ pt: { xs: 1, sm: 2, md: 4, lg: 6}, }}>
                  <Typography sx={{ pb: { xs: 1, sm: 2, md: 3, lg: 4}, pl: { xs: 1, sm: 2, md: 3, lg: 4}, color: 'white',
                    fontSize: {xs: '12px', sm: '14px', md: '16px', lg: '18px'}
                  }}>
                    Make Your First Order and Get
                    <Typography component="span" sx={{ color: '#FF8C00', pl: { xs: 1, sm: 2, md: 3, lg: 4},
                      fontSize: {xs: '12px', sm: '14px', md: '16px', lg: '18px'}
                     }}>
                      50% Off
                    </Typography>
                  </Typography>
                  <Button sx={{ bgcolor: '#FF6F00', color: 'white', borderRadius:2 }}>
                    <Typography sx={{ fontSize: {xs: '10px', sm: '12px', md: '14px', lg: '16px'}, textTransform: 'capitalize' }}>
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
              <Grid container sx={{ bgcolor: '#438D80', maxWidth: '100%', borderRadius: 10, pl: { xs: 0, sm: 1, md: 2, lg: 3}, }}>
                <Grid item xs={6} sx={{ pt: { xs: 1, sm: 2, md: 4, lg: 6}}}>
                  <Typography sx={{ pb: { xs: 1, sm: 2, md: 3, lg: 4}, pl: { xs: 1, sm: 2, md: 3, lg: 4}, color: 'white', 
                      fontSize: {xs: '12px', sm: '14px', md: '16px', lg: '18px'}}}>
                    Make Your First Order and Get
                    <Typography component="span" sx={{ color: '#FF8C00', pl: { xs: 0, sm: 1, md: 2, lg: 3},
                      fontSize: {xs: '12px', sm: '14px', md: '16px', lg: '18px'}
                     }}>
                      50% Off
                    </Typography>
                  </Typography>
                  <Button sx={{ bgcolor: '#FF6F00', color: 'white', borderRadius:2 }}>
                    <Typography sx={{ fontSize: {xs: '10px', sm: '12px', md: '14px', lg: '16px'}, textTransform: 'capitalize' }}>
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
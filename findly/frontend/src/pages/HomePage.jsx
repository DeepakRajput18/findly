import { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Paper,
} from '@mui/material';
import {
  FindInPage as LostItemsIcon,
  EmojiObjects as FoundItemsIcon,
  Compare as MatchesIcon,
  Map as MapIcon,
} from '@mui/icons-material';
import AuthContext from '../context/AuthContext';

const HomePage = () => {
  const { user } = useContext(AuthContext);

  const features = [
    {
      title: 'Report Lost Items',
      description: 'Easily report your lost items with detailed information and location data.',
      icon: <LostItemsIcon sx={{ fontSize: 60, color: 'primary.main' }} />,
      link: '/report-lost-item',
      buttonText: 'Report Lost Item',
    },
    {
      title: 'Report Found Items',
      description: 'Help others by reporting items you\'ve found so they can be returned to their owners.',
      icon: <FoundItemsIcon sx={{ fontSize: 60, color: 'primary.main' }} />,
      link: '/report-found-item',
      buttonText: 'Report Found Item',
    },
    {
      title: 'AI-Powered Matching',
      description: 'Our advanced AI algorithms help match lost items with found items to increase recovery rates.',
      icon: <MatchesIcon sx={{ fontSize: 60, color: 'primary.main' }} />,
      link: '/matches',
      buttonText: 'View Matches',
    },
    {
      title: 'Interactive Map',
      description: 'View lost and found items on an interactive map to help locate items in your area.',
      icon: <MapIcon sx={{ fontSize: 60, color: 'primary.main' }} />,
      link: '/map',
      buttonText: 'Open Map',
    },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      {/* Hero Section */}
      <Paper
        sx={{
          position: 'relative',
          backgroundColor: '#2196f3',
          color: '#fff',
          mb: 4,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: 'url(https://source.unsplash.com/random?lost+found)',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(33, 150, 243, 0.7)',
          }}
        />
        <Grid container>
          <Grid item md={6}>
            <Box
              sx={{
                position: 'relative',
                p: { xs: 3, md: 6 },
                pr: { md: 0 },
                minHeight: 400,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                Lost Something? Found Something?
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                Findly helps connect people who have lost items with those who have found them.
                Our platform uses advanced technology to increase the chances of recovering lost items.
              </Typography>
              <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  component={Link}
                  to={user ? '/report-lost-item' : '/login'}
                  size="large"
                  sx={{ 
                    bgcolor: 'white', 
                    color: 'primary.main',
                    '&:hover': { 
                      bgcolor: 'rgba(255, 255, 255, 0.9)',
                    }
                  }}
                >
                  Report Lost Item
                </Button>
                <Button
                  variant="outlined"
                  component={Link}
                  to={user ? '/report-found-item' : '/login'}
                  size="large"
                  sx={{ 
                    bgcolor: 'white',
                    color: 'primary.main',
                    borderColor: 'white',
                    '&:hover': { 
                      bgcolor: 'rgba(255, 255, 255, 0.9)',
                      borderColor: 'white'
                    }
                  }}
                >
                  Report Found Item
                </Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Features Section */}
      <Box sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 6 }}>
          How Findly Works
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                  },
                }}
              >
                <Box
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  {feature.icon}
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h3" align="center">
                    {feature.title}
                  </Typography>
                  <Typography align="center">{feature.description}</Typography>
                </CardContent>
                <Box sx={{ p: 2 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    component={Link}
                    to={user ? feature.link : '/login'}
                  >
                    {feature.buttonText}
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Statistics Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 8, borderRadius: 2 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 6 }}>
          Helping People Recover Lost Items
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h2" color="primary" gutterBottom>
                1000+
              </Typography>
              <Typography variant="h6">Items Recovered</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h2" color="primary" gutterBottom>
                5000+
              </Typography>
              <Typography variant="h6">Active Users</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h2" color="primary" gutterBottom>
                75%
              </Typography>
              <Typography variant="h6">Recovery Rate</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          borderRadius: 2,
          mt: 8,
          mb: 4,
        }}
      >
        <Box maxWidth="md" sx={{ mx: 'auto', px: 3 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Ready to find what you've lost?
          </Typography>
          <Typography variant="h6" align="center" paragraph>
            Join thousands of users who have successfully recovered their lost items using Findly.
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              component={Link}
              to={user ? '/report-lost-item' : '/register'}
              size="large"
              sx={{ bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: 'grey.100' } }}
            >
              {user ? 'Report Lost Item' : 'Sign Up Now'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage; 
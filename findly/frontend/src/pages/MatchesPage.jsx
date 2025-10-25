import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
} from '@mui/material';
import { matchesApi } from '../services/api';
import { formatDate, getStatusColor } from '../utils/helpers';
import AuthContext from '../context/AuthContext';

const MatchesPage = () => {
  const { user } = useContext(AuthContext);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Mock data for now
        setTimeout(() => {
          const mockMatches = [
            {
              _id: '1',
              lost_item: {
                _id: 'l1',
                item_name: 'iPhone 13',
                category: 'Electronics',
                last_seen_location: 'Central Park',
                lost_date: new Date().toISOString(),
                image_url: 'https://via.placeholder.com/300x140?text=iPhone',
              },
              found_item: {
                _id: 'f1',
                item_name: 'iPhone found',
                category: 'Electronics',
                found_location: 'Central Park, near fountain',
                found_date: new Date().toISOString(),
                image_url: 'https://via.placeholder.com/300x140?text=iPhone+Found',
              },
              match_percentage: 95,
              status: 'Pending',
              created_at: new Date().toISOString(),
            },
            {
              _id: '2',
              lost_item: {
                _id: 'l2',
                item_name: 'Gold Ring',
                category: 'Jewelry',
                last_seen_location: 'Beach',
                lost_date: new Date().toISOString(),
                image_url: 'https://via.placeholder.com/300x140?text=Gold+Ring',
              },
              found_item: {
                _id: 'f2',
                item_name: 'Ring found',
                category: 'Jewelry',
                found_location: 'Beach area',
                found_date: new Date().toISOString(),
                image_url: 'https://via.placeholder.com/300x140?text=Ring+Found',
              },
              match_percentage: 87,
              status: 'Confirmed',
              created_at: new Date().toISOString(),
            },
            {
              _id: '3',
              lost_item: {
                _id: 'l3',
                item_name: 'Wallet',
                category: 'Wallets',
                last_seen_location: 'Coffee Shop',
                lost_date: new Date().toISOString(),
                image_url: 'https://via.placeholder.com/300x140?text=Wallet',
              },
              found_item: {
                _id: 'f3',
                item_name: 'Black Wallet',
                category: 'Wallets',
                found_location: 'Near Coffee Shop',
                found_date: new Date().toISOString(),
                image_url: 'https://via.placeholder.com/300x140?text=Wallet+Found',
              },
              match_percentage: 78,
              status: 'Rejected',
              created_at: new Date().toISOString(),
            },
          ];
          
          setMatches(mockMatches);
          setLoading(false);
        }, 1000);
        
        // In a real app, you would use:
        // const data = await matchesApi.getMyMatches();
        // setMatches(data);
        // setLoading(false);
      } catch (error) {
        console.error('Error fetching matches:', error);
        setError('Failed to fetch matches. Please try again later.');
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Filter matches based on tab
  const filteredMatches = matches.filter(match => {
    if (tabValue === 0) return true; // All matches
    if (tabValue === 1) return match.status === 'Pending';
    if (tabValue === 2) return match.status === 'Confirmed';
    if (tabValue === 3) return match.status === 'Rejected';
    return true;
  });

  // Redirect if not logged in
  if (!user) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="warning" sx={{ mb: 4 }}>
          You need to be logged in to view your matches.
        </Alert>
        <Button
          variant="contained"
          component={Link}
          to="/login"
          sx={{ mr: 2 }}
        >
          Login
        </Button>
        <Button
          variant="outlined"
          component={Link}
          to="/register"
        >
          Register
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Matches
      </Typography>
      
      <Paper elevation={3} sx={{ p: 2, mb: 4, borderRadius: 2 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="All Matches" />
          <Tab label="Pending" />
          <Tab label="Confirmed" />
          <Tab label="Rejected" />
        </Tabs>
      </Paper>
      
      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
          <CircularProgress />
        </Box>
      ) : filteredMatches.length === 0 ? (
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" gutterBottom>
            No matches found
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {tabValue === 0
              ? "You don't have any matches yet."
              : tabValue === 1
              ? "You don't have any pending matches."
              : tabValue === 2
              ? "You don't have any confirmed matches."
              : "You don't have any rejected matches."}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              component={Link}
              to="/lost-items"
              sx={{ mr: 2 }}
            >
              Browse Lost Items
            </Button>
            <Button
              variant="outlined"
              component={Link}
              to="/found-items"
            >
              Browse Found Items
            </Button>
          </Box>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {filteredMatches.map((match) => (
            <Grid item key={match._id} xs={12} md={6} lg={4}>
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
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" component="div">
                      Match #{match._id}
                    </Typography>
                    <Chip
                      label={match.status}
                      sx={{
                        backgroundColor: getStatusColor(match.status),
                        color: 'white',
                        fontWeight: 'bold',
                      }}
                    />
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    <Chip
                      label={`${match.match_percentage}% Match`}
                      color="primary"
                      sx={{ fontWeight: 'bold' }}
                    />
                  </Box>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Lost Item
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {match.lost_item.item_name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {match.lost_item.category}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Found Item
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {match.found_item.item_name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {match.found_item.category}
                      </Typography>
                    </Grid>
                  </Grid>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    Created on: {formatDate(match.created_at)}
                  </Typography>
                </CardContent>
                
                <CardActions sx={{ p: 2 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    component={Link}
                    to={`/matches/${match._id}`}
                  >
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default MatchesPage; 
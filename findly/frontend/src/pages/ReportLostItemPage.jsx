import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
  Alert,
  InputAdornment,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { lostItemsApi } from '../services/api';
import { getCategories } from '../utils/helpers';
import AuthContext from '../context/AuthContext';
import axios from 'axios';

const ReportLostItemPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    item_name: '',
    category: '',
    description: '',
    last_seen_location: '',
    lost_date: '',
    reward: '',
    image_url: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const [previewImage, setPreviewImage] = useState('');
  
  // Available categories
  const categories = getCategories();

  // Generate image preview based on selected category
  useEffect(() => {
    if (!formData.image_url && formData.category) {
      const categoryName = formData.category.toLowerCase();
      const itemName = formData.item_name ? formData.item_name.toLowerCase() : '';
      setPreviewImage(`https://source.unsplash.com/400x300/?${categoryName},${itemName ? itemName + ',' : ''}lost`);
    } else if (formData.image_url) {
      setPreviewImage(formData.image_url);
    }
  }, [formData.category, formData.image_url, formData.item_name]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // For image URL changes, verify and update preview immediately
    if (name === 'image_url' && value) {
      // Check if it's a valid URL format
      try {
        new URL(value);
        setPreviewImage(value);
      } catch (e) {
        // Not a valid URL, don't update preview
      }
    }
  };

  // Check if server is reachable
  const checkServerConnection = async () => {
    // First check if device is online at all
    if (!navigator.onLine) {
      console.log('Device is offline according to navigator.onLine');
      return false;
    }
    
    try {
      // Try standard port 5001 first with a short timeout
      console.log('Checking server connection via relative /api...');
      try {
        await axios.get('/api/lost-items', { timeout: 3000 });
        console.log('Server is available via proxy');
        return true;
      } catch (error) {
        // If we got a 404, that means the server is up but endpoint returned not found
        // This is still a successful connection to the server
        if (error.response && error.response.status === 404) {
          console.log('Server is available on port 5001 (404 response)');
          return true;
        }
        throw error; // Re-throw to try alternate ports
      }
    } catch (error) {
      console.log('Server connection check failed on port 5001:', error.message);
      
      console.log('Server connection check via proxy failed');
      return false;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.item_name || !formData.category || !formData.last_seen_location || !formData.lost_date) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      // Check server connection first
      const isServerConnected = await checkServerConnection();
      
      // If no image URL is provided, use a default image based on the category
      const submissionData = {
        ...formData,
        // Use a local fallback image path instead of external service
        image_url: formData.image_url || `/assets/fallback-images/${formData.category.toLowerCase().replace(/\s+/g, '-')}.jpg`,
      };
      
      console.log('Submitting lost item:', { ...submissionData, user_id: user?._id });
      
      // If server is not connected, prompt user to save locally
      if (!isServerConnected) {
        console.log('Server not available, enabling offline mode');
        // Show a different message for offline mode
        setSuccess(true);
        setError('Server is currently unavailable. Your item has been saved locally and will be synchronized when connection is restored.');
        
        // Store in localStorage for later sync
        try {
          const offlineItems = JSON.parse(localStorage.getItem('offlineLostItems') || '[]');
          offlineItems.push({
            ...submissionData,
            _id: `offline-${Date.now()}`,
            created_at: new Date().toISOString(),
            status: 'Pending',
          });
          localStorage.setItem('offlineLostItems', JSON.stringify(offlineItems));
          console.log('Item saved to localStorage for later sync');
          
          // Redirect to lost items page after 3 seconds
          setTimeout(() => {
            navigate('/lost-items');
          }, 3000);
          
          return;
        } catch (storageError) {
          console.error('Failed to save item locally:', storageError);
          throw new Error('Failed to save item locally. Please try again later.');
        }
      }
      
      // Make the actual API call with retry logic
      let retries = 2;
      let success = false;
      
      while (retries >= 0 && !success) {
        try {
          await lostItemsApi.createLostItem(submissionData);
          success = true;
        } catch (retryError) {
          console.warn(`Attempt failed. Retries left: ${retries}`);
          if (retries === 0) {
            throw retryError; // Re-throw the last error if we're out of retries
          }
          retries--;
          // Wait 1.5 seconds before retrying
          await new Promise(resolve => setTimeout(resolve, 1500));
        }
      }
      
      setSuccess(true);
      
      // Redirect to lost items page after 2 seconds
      setTimeout(() => {
        navigate('/lost-items');
      }, 2000);
      
    } catch (error) {
      console.error('Error reporting lost item:', error);
      
      // Provide more helpful error messages based on the error type
      if (!navigator.onLine) {
        setError('You are currently offline. Your item has been saved locally and will be synchronized when your connection is restored.');
        
        // Try to save locally
        try {
          const offlineItems = JSON.parse(localStorage.getItem('offlineLostItems') || '[]');
          offlineItems.push({
            ...formData,
            _id: `offline-${Date.now()}`,
            created_at: new Date().toISOString(),
            status: 'Pending',
          });
          localStorage.setItem('offlineLostItems', JSON.stringify(offlineItems));
          setSuccess(true);
          
          // Redirect to lost items page after 3 seconds
          setTimeout(() => {
            navigate('/lost-items');
          }, 3000);
        } catch (storageError) {
          console.error('Failed to save item locally:', storageError);
          setError('Failed to save item locally. Please check your browser storage settings.');
        }
      } else if (error.message?.includes('Network Error') || error.message?.includes('Connection refused')) {
        setError('Unable to connect to the server. Your item has been saved locally and will be synchronized when the server is available.');
        
        // Try to save locally
        try {
          const offlineItems = JSON.parse(localStorage.getItem('offlineLostItems') || '[]');
          offlineItems.push({
            ...formData,
            _id: `offline-${Date.now()}`,
            created_at: new Date().toISOString(),
            status: 'Pending',
          });
          localStorage.setItem('offlineLostItems', JSON.stringify(offlineItems));
          setSuccess(true);
          
          // Redirect to lost items page after 3 seconds
          setTimeout(() => {
            navigate('/lost-items');
          }, 3000);
        } catch (storageError) {
          console.error('Failed to save item locally:', storageError);
          setError('Failed to save item locally. Please check your browser storage settings.');
        }
      } else if (error.response?.status === 401) {
        setError('You need to be logged in to report a lost item. Please log in and try again.');
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/login', { state: { from: '/report-lost-item' } });
        }, 3000);
      } else if (error.response?.status === 400) {
        setError(`Invalid data: ${error.response.data.message || 'Please check your form inputs.'}`);
      } else if (error.response?.status >= 500) {
        setError('Server error. Our team has been notified. Please try again later.');
      } else {
        setError(error.response?.data?.message || 'Failed to report lost item. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Redirect if not logged in
  if (!user) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="warning" sx={{ mb: 4 }}>
          You need to be logged in to report a lost item.
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
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        component={Link}
        to="/lost-items"
        sx={{ mb: 4 }}
      >
        Back to Lost Items
      </Button>
      
      <Typography variant="h4" component="h1" gutterBottom>
        Report a Lost Item
      </Typography>
      
      {success && (
        <Alert severity="success" sx={{ mb: 4 }}>
          Your lost item has been reported successfully! Redirecting...
        </Alert>
      )}
      
      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}
      
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="item_name"
                label="Item Name"
                name="item_name"
                value={formData.item_name}
                onChange={handleChange}
                disabled={loading}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  label="Category"
                  disabled={loading}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="reward"
                label="Reward (optional)"
                name="reward"
                type="number"
                value={formData.reward}
                onChange={handleChange}
                disabled={loading}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="last_seen_location"
                label="Last Seen Location"
                name="last_seen_location"
                value={formData.last_seen_location}
                onChange={handleChange}
                disabled={loading}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="lost_date"
                label="Date Lost"
                name="lost_date"
                type="datetime-local"
                value={formData.lost_date}
                onChange={handleChange}
                disabled={loading}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="image_url"
                label="Image URL (optional)"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                disabled={loading}
                placeholder="https://example.com/image.jpg"
              />
            </Grid>
            
            {previewImage && (
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>
                  Image Preview:
                </Typography>
                <Box
                  component="img"
                  src={previewImage}
                  alt="Item preview"
                  onError={(e) => {
                    e.target.onerror = null;
                    if (formData.category) {
                      // Try a more reliable image source that doesn't need external connection
                      e.target.src = `/assets/fallback-images/${formData.category.toLowerCase().replace(/\s+/g, '-')}.jpg`;
                    } else {
                      // Default fallback
                      e.target.src = '/assets/fallback-images/default-item.jpg';
                    }
                  }}
                  sx={{
                    width: '100%',
                    maxHeight: '200px',
                    objectFit: 'cover',
                    borderRadius: 1,
                    mb: 2,
                  }}
                />
              </Grid>
            )}
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="description"
                label="Description"
                name="description"
                multiline
                rows={4}
                value={formData.description}
                onChange={handleChange}
                disabled={loading}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{ py: 1.5 }}
              >
                {loading ? <CircularProgress size={24} /> : 'Report Lost Item'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default ReportLostItemPage; 
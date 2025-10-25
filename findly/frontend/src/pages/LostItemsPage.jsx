import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Typography,
  Grid,
  Box,
  Button,
  TextField,
  InputAdornment,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
  Alert,
  Pagination,
  Fab,
  Paper,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';
import ItemCard from '../components/ItemCard';
import { lostItemsApi } from '../services/api';
import { getCategories } from '../utils/helpers';
import AuthContext from '../context/AuthContext';
import axios from 'axios';

const LostItemsPage = () => {
  const { user } = useContext(AuthContext);
  const [lostItems, setLostItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  // Available categories
  const categories = getCategories();

  // Available statuses
  const statuses = ['Lost', 'Found', 'Recovered'];

  // Check if server is reachable
  const checkServerConnection = async () => {
    // First check if device is online at all
    if (!navigator.onLine) {
      console.log('Device is offline according to navigator.onLine');
      return false;
    }
    
    try {
      // Try standard port 5001 first with a short timeout
      console.log('Checking server connection on port 5001...');
      try {
        await axios.get('http://localhost:5001/api/lost-items', { timeout: 3000 });
        console.log('Server is available on port 5001');
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
      
      // Try alternate port 5000
      try {
        console.log('Trying alternate port 5000...');
        try {
          await axios.get('http://localhost:5000/api/lost-items', { timeout: 3000 });
          console.log('Server is available on port 5000');
          return true;
        } catch (error) {
          // If we got a 404, that means the server is up but endpoint returned not found
          if (error.response && error.response.status === 404) {
            console.log('Server is available on port 5000 (404 response)');
            return true;
          }
          throw error; // Re-throw to try relative path
        }
      } catch (secondError) {
        console.log('Server connection check failed on both ports:', secondError.message);
        
        // Try a third attempt with a relative URL which will use the current host
        try {
          console.log('Trying relative API path...');
          try {
            await axios.get('/api/lost-items', { timeout: 3000 });
            console.log('Server is available via relative path');
            return true;
          } catch (error) {
            // If we got a 404, that means the server is up but endpoint returned not found
            if (error.response && error.response.status === 404) {
              console.log('Server is available via relative path (404 response)');
              return true;
            }
            throw error;
          }
        } catch (thirdError) {
          console.log('All server connection attempts failed');
          return false;
        }
      }
    }
  };

  // Generate mock data for fallback
  const generateMockData = () => {
    const mockData = [
      {
        _id: '1',
        item_name: 'iPhone 13',
        description: 'Lost my iPhone 13 at Central Park yesterday.',
        category: 'Electronics',
        last_seen_location: 'Central Park',
        lost_date: new Date().toISOString(),
        status: 'Lost',
        reward: 50,
        image_url: 'https://source.unsplash.com/400x300/?iphone,electronics',
        user_id: { name: 'John Doe' }
      },
      {
        _id: '2',
        item_name: 'Black Wallet',
        description: 'Lost my wallet at the coffee shop on Main Street.',
        category: 'Wallets',
        last_seen_location: 'Coffee Shop, Main Street',
        lost_date: new Date().toISOString(),
        status: 'Lost',
        reward: 20,
        image_url: 'https://source.unsplash.com/400x300/?wallet,money',
        user_id: { name: 'Jane Smith' }
      },
      {
        _id: '3',
        item_name: 'House Keys',
        description: 'Lost my house keys with a red keychain.',
        category: 'Keys',
        last_seen_location: 'Downtown Bus Stop',
        lost_date: new Date().toISOString(),
        status: 'Lost',
        reward: 0,
        image_url: 'https://source.unsplash.com/400x300/?keys,keychain',
        user_id: { name: 'Mike Johnson' }
      },
      {
        _id: '4',
        item_name: 'Gold Necklace',
        description: 'Lost my gold necklace with a heart pendant at the beach.',
        category: 'Jewelry',
        last_seen_location: 'City Beach',
        lost_date: new Date().toISOString(),
        status: 'Lost',
        reward: 100,
        image_url: 'https://source.unsplash.com/400x300/?necklace,jewelry',
        user_id: { name: 'Emily Wilson' }
      },
      {
        _id: '5',
        item_name: 'Laptop Bag',
        description: 'Black laptop bag with company logo lost in the park.',
        category: 'Bags',
        last_seen_location: 'City Park',
        lost_date: new Date().toISOString(),
        status: 'Lost',
        reward: 30,
        image_url: 'https://source.unsplash.com/400x300/?laptop,bag',
        user_id: { name: 'David Brown' }
      },
      {
        _id: '6',
        item_name: 'Prescription Glasses',
        description: 'Lost my reading glasses in blue case.',
        category: 'Other',
        last_seen_location: 'Public Library',
        lost_date: new Date().toISOString(),
        status: 'Lost',
        reward: 25,
        image_url: 'https://source.unsplash.com/400x300/?glasses,eyewear',
        user_id: { name: 'Sarah Johnson' }
      }
    ];
    return mockData;
  };

  // Fetch lost items
  const fetchLostItems = async () => {
    try {
      setLoading(true);
      setError(null);

      // First check if we're online
      const isOnline = navigator.onLine;
      if (!isOnline) {
        console.log('Device is offline, using mock data');
        const mockData = generateMockData();
        setLostItems(mockData);
        setFilteredItems(mockData);
        setError('You are currently offline. Showing sample data.');
        setLoading(false);
        return;
      }

      // Then check if the server is reachable
      const isServerConnected = await checkServerConnection();
      if (!isServerConnected) {
        console.log('Server is unreachable, using mock data');
        const mockData = generateMockData();
        setLostItems(mockData);
        setFilteredItems(mockData);
        setError('Unable to connect to the server. Showing sample data.');
        setLoading(false);
        return;
      }

      try {
        // Try to fetch from API with multiple retries handled in the API service
        console.log('Fetching lost items from API');
        const data = await lostItemsApi.getAllLostItems();
        
        // If data is empty array, use mock data with a note
        if (!data || data.length === 0) {
          console.log('No items returned from API, using mock data');
          const mockData = generateMockData();
          setLostItems(mockData);
          setFilteredItems(mockData);
          setError('No items found in the database. Showing sample data.');
          setLoading(false);
          return;
        }
        
        // Process the data
        const processedData = data.map(item => ({
          ...item,
          image_url: ensureValidImageUrl(item)
        }));
        
        setLostItems(processedData);
        setFilteredItems(processedData);
        // Clear any previous errors
        setError(null);
        
      } catch (apiError) {
        console.error('API error:', apiError);
        
        // Show different messages based on error type
        if (apiError.message?.includes('timeout') || apiError.code === 'ECONNABORTED') {
          setError('Request timed out. The server might be overloaded. Showing sample data.');
        } else if (apiError.message?.includes('Network Error') || apiError.code === 'ECONNREFUSED') {
          setError('Network error. The server might be down. Showing sample data.');
        } else if (apiError.response?.status === 401) {
          setError('Authentication error. Please log in again.');
        } else {
          setError('There was a problem fetching items. Showing sample data.');
        }
        
        // Use mock data as fallback
        const mockData = generateMockData();
        setLostItems(mockData);
        setFilteredItems(mockData);
      }
      
    } catch (error) {
      console.error('Unexpected error in fetch process:', error);
      setError('An unexpected error occurred. Showing sample data.');
      
      // Show mock data as ultimate fallback
      const mockData = generateMockData();
      setLostItems(mockData);
      setFilteredItems(mockData);
    } finally {
      setLoading(false);
    }
  };

  // Ensure image URL is valid
  const ensureValidImageUrl = (item) => {
    // If no image or invalid URL, try to use local fallback image
    if (!item.image_url || item.image_url.includes('undefined') || item.image_url === '') {
      const categoryName = item.category ? item.category.toLowerCase() : 'item';
      
      // Try local fallback first
      const localFallback = `/assets/fallback-images/${categoryName}.jpg`;
      
      // Fallback to external image if needed
      return localFallback || `https://source.unsplash.com/400x300/?${categoryName},lost`;
    }
    
    // If the URL is already a local path, use it
    if (item.image_url.startsWith('/')) {
      return item.image_url;
    }
    
    // For URLs that might be broken (like to external services), add error handling
    try {
      new URL(item.image_url);
      return item.image_url;
    } catch (e) {
      // If URL is invalid, use fallback
      return `/assets/fallback-images/default-item.jpg`;
    }
  };

  // Load items on component mount
  useEffect(() => {
    fetchLostItems();
  }, []);

  // Filter items when search term or filters change
  useEffect(() => {
    let result = [...lostItems];
    
    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        item =>
          item.item_name.toLowerCase().includes(term) ||
          (item.description && item.description.toLowerCase().includes(term)) ||
          (item.last_seen_location && item.last_seen_location.toLowerCase().includes(term))
      );
    }
    
    // Apply category filter
    if (categoryFilter) {
      result = result.filter(item => item.category === categoryFilter);
    }
    
    // Apply status filter
    if (statusFilter) {
      result = result.filter(item => item.status === statusFilter);
    }
    
    setFilteredItems(result);
    setPage(1); // Reset to first page when filters change
  }, [lostItems, searchTerm, categoryFilter, statusFilter]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('');
    setStatusFilter('');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Lost Items
        </Typography>
        {user && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            component={Link}
            to="/report-lost-item"
          >
            Report Lost Item
          </Button>
        )}
      </Box>

      {/* Search and Filters */}
      <Paper
        elevation={3}
        sx={{
          mb: 4,
          p: 3,
          borderRadius: 2,
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Search lost items"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Category</InputLabel>
              <Select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                label="Category"
              >
                <MenuItem value="">All Categories</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                label="Status"
              >
                <MenuItem value="">All Statuses</MenuItem>
                {statuses.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FilterIcon />}
              onClick={clearFilters}
              disabled={!searchTerm && !categoryFilter && !statusFilter}
            >
              Clear Filters
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Error message with retry button */}
      {error && (
        <Alert 
          severity="error" 
          sx={{ mb: 4 }}
          action={
            <Button color="inherit" size="small" onClick={fetchLostItems}>
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      )}

      {/* Loading indicator */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 8, flexGrow: 1 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Results count */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Showing {paginatedItems.length} of {filteredItems.length} items
            </Typography>
          </Box>

          {/* Items grid */}
          {filteredItems.length === 0 ? (
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 2,
                textAlign: 'center',
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '300px'
              }}
            >
              <Typography variant="h6" gutterBottom>
                No lost items found
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                {searchTerm || categoryFilter || statusFilter
                  ? 'Try adjusting your filters to see more results'
                  : 'Be the first to report a lost item'}
              </Typography>
              {user && (
                <Button
                  variant="contained"
                  component={Link}
                  to="/report-lost-item"
                  startIcon={<AddIcon />}
                >
                  Report Lost Item
                </Button>
              )}
            </Paper>
          ) : (
            <Grid container spacing={3} sx={{ flexGrow: 1 }}>
              {paginatedItems.map((item) => (
                <Grid item key={item._id} xs={12} sm={6} md={4} lg={3}>
                  <ItemCard item={item} type="lost" />
                </Grid>
              ))}
            </Grid>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
              />
            </Box>
          )}
        </>
      )}

      {/* Floating action button for mobile */}
      {user && (
        <Fab
          color="primary"
          aria-label="add"
          component={Link}
          to="/report-lost-item"
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            display: { sm: 'none' },
          }}
        >
          <AddIcon />
        </Fab>
      )}
    </Box>
  );
};

export default LostItemsPage; 
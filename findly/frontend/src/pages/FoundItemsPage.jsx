import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
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
import { foundItemsApi } from '../services/api';
import { getCategories } from '../utils/helpers';
import AuthContext from '../context/AuthContext';

const FoundItemsPage = () => {
  const { user } = useContext(AuthContext);
  const [foundItems, setFoundItems] = useState([]);
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
  const statuses = ['Found', 'Claimed', 'Unclaimed'];

  // Fetch found items
  useEffect(() => {
    const fetchFoundItems = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await foundItemsApi.getAllFoundItems();
        setFoundItems(data);
        setFilteredItems(data);
      } catch (error) {
        console.error('Error fetching found items:', error);
        setError('Failed to fetch found items. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchFoundItems();
  }, []);

  // Filter items when search term or filters change
  useEffect(() => {
    let result = [...foundItems];
    
    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        item =>
          item.item_name.toLowerCase().includes(term) ||
          (item.description && item.description.toLowerCase().includes(term)) ||
          (item.found_location && item.found_location.toLowerCase().includes(term))
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
  }, [foundItems, searchTerm, categoryFilter, statusFilter]);

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
          Found Items
        </Typography>
        {user && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            component={Link}
            to="/report-found-item"
          >
            Report Found Item
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
              label="Search found items"
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

      {/* Error message */}
      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
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
                No found items found
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                {searchTerm || categoryFilter || statusFilter
                  ? 'Try adjusting your filters to see more results'
                  : 'Be the first to report a found item'}
              </Typography>
              {user && (
                <Button
                  variant="contained"
                  component={Link}
                  to="/report-found-item"
                  startIcon={<AddIcon />}
                >
                  Report Found Item
                </Button>
              )}
            </Paper>
          ) : (
            <Grid container spacing={3} sx={{ flexGrow: 1 }}>
              {paginatedItems.map((item) => (
                <Grid item key={item._id} xs={12} sm={6} md={4} lg={3}>
                  <ItemCard item={item} type="found" />
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
          to="/report-found-item"
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

export default FoundItemsPage; 
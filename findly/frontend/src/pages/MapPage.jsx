import React from 'react';
import { useState, useCallback, useRef, useEffect } from 'react';
import {
  Typography,
  Box,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Alert,
  Grid,
} from '@mui/material';
import { Map as MapIcon, LocationOn } from '@mui/icons-material';

// Map container style (kept for future enablement)
const mapContainerStyle = {
  width: '100%',
  height: '600px',
  borderRadius: '8px',
};

// Center on India (kept for future enablement)
const center = { lat: 20.5937, lng: 78.9629 };

// Sample lost and found items with locations
const sampleItems = [
  { id: 1, type: 'lost', title: 'iPhone 13', description: 'Lost my iPhone 13 at Central Park.', category: 'Electronics', location: { lat: 28.6139, lng: 77.2090 }, date: new Date().toISOString(), image: 'https://via.placeholder.com/150?text=iPhone' },
  { id: 2, type: 'found', title: 'Black Wallet', description: 'Found a black wallet with ID cards.', category: 'Wallets', location: { lat: 19.0760, lng: 72.8777 }, date: new Date().toISOString(), image: 'https://via.placeholder.com/150?text=Wallet' },
  { id: 3, type: 'lost', title: 'Gold Necklace', description: 'Lost a gold necklace at the beach.', category: 'Jewelry', location: { lat: 12.9716, lng: 77.5946 }, date: new Date().toISOString(), image: 'https://via.placeholder.com/150?text=Necklace' },
  { id: 4, type: 'found', title: 'Car Keys', description: 'Found car keys at the shopping mall.', category: 'Keys', location: { lat: 17.3850, lng: 78.4867 }, date: new Date().toISOString(), image: 'https://via.placeholder.com/150?text=Keys' },
  { id: 5, type: 'lost', title: 'Laptop Bag', description: 'Lost my laptop bag at the train station.', category: 'Electronics', location: { lat: 22.5726, lng: 88.3639 }, date: new Date().toISOString(), image: 'https://via.placeholder.com/150?text=Laptop' },
];

const MapPage = () => {
  const [itemType, setItemType] = useState('all');
  const [category, setCategory] = useState('all');
  const [filteredItems, setFilteredItems] = useState(sampleItems);

  // Filter items based on selected filters
  useEffect(() => {
    let filtered = sampleItems;
    if (itemType !== 'all') filtered = filtered.filter(item => item.type === itemType);
    if (category !== 'all') filtered = filtered.filter(item => item.category === category);
    setFilteredItems(filtered);
  }, [itemType, category]);

  // Apply filters (same logic as effect for explicit user action)
  const handleApplyFilters = () => {
    let filtered = sampleItems;
    if (itemType !== 'all') filtered = filtered.filter(item => item.type === itemType);
    if (category !== 'all') filtered = filtered.filter(item => item.category === category);
    setFilteredItems(filtered);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Item Map
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel id="item-type-label">Item Type</InputLabel>
              <Select labelId="item-type-label" id="item-type" value={itemType} label="Item Type" onChange={(e) => setItemType(e.target.value)}>
                <MenuItem value="all">All Items</MenuItem>
                <MenuItem value="lost">Lost Items</MenuItem>
                <MenuItem value="found">Found Items</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel id="category-label">Category</InputLabel>
              <Select labelId="category-label" id="category" value={category} label="Category" onChange={(e) => setCategory(e.target.value)}>
                <MenuItem value="all">All Categories</MenuItem>
                <MenuItem value="Electronics">Electronics</MenuItem>
                <MenuItem value="Documents">Documents</MenuItem>
                <MenuItem value="Clothing">Clothing</MenuItem>
                <MenuItem value="Jewelry">Jewelry</MenuItem>
                <MenuItem value="Keys">Keys</MenuItem>
                <MenuItem value="Wallets">Wallets</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button variant="contained" fullWidth sx={{ height: '56px' }} onClick={handleApplyFilters}>
              Apply Filters
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Placeholder panel until a Google Maps API key is configured */}
      <Paper 
        elevation={3}
        sx={{ p: 4, borderRadius: 2, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', bgcolor: '#f5f5f5', minHeight: '500px' }}
      >
        <MapIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
        <Typography variant="h5" gutterBottom>
          Map Feature Coming Soon
        </Typography>
        <Typography variant="body1" align="center" sx={{ maxWidth: 600, mb: 3 }}>
          To enable the interactive map, add a Google Maps API key to your frontend .env as
          VITE_GOOGLE_MAPS_API_KEY=YOUR_KEY and refresh. Until then, this placeholder avoids
          console warnings and errors.
        </Typography>
        <Alert severity="info" sx={{ width: '100%', maxWidth: 600 }}>
          The map will display the locations of lost and found items, allowing you to filter by item type and category.
        </Alert>
      </Paper>

      <Box sx={{ mt: 2 }}>
        <Alert severity="info">
          <Typography variant="body2">
            <strong>Map Legend:</strong>
            <Box component="span" sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <LocationOn sx={{ color: 'red', mr: 1 }} /> Lost Items
            </Box>
            <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationOn sx={{ color: 'green', mr: 1 }} /> Found Items
            </Box>
          </Typography>
        </Alert>
      </Box>
    </Box>
  );
};

export default MapPage; 
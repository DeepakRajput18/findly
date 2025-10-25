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
  CircularProgress,
} from '@mui/material';
import { Map as MapIcon, LocationOn } from '@mui/icons-material';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';

// Map container style
const mapContainerStyle = {
  width: '100%',
  height: '600px',
  borderRadius: '8px',
};

// Center on India
const center = {
  lat: 20.5937,
  lng: 78.9629,
};

// Map options
const options = {
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: true,
  streetViewControl: false,
  fullscreenControl: true,
};

// Sample lost and found items with locations
const sampleItems = [
  {
    id: 1,
    type: 'lost',
    title: 'iPhone 13',
    description: 'Lost my iPhone 13 at Central Park.',
    category: 'Electronics',
    location: { lat: 28.6139, lng: 77.2090 }, // Delhi
    date: new Date().toISOString(),
    image: 'https://via.placeholder.com/150?text=iPhone',
  },
  {
    id: 2,
    type: 'found',
    title: 'Black Wallet',
    description: 'Found a black wallet with ID cards.',
    category: 'Wallets',
    location: { lat: 19.0760, lng: 72.8777 }, // Mumbai
    date: new Date().toISOString(),
    image: 'https://via.placeholder.com/150?text=Wallet',
  },
  {
    id: 3,
    type: 'lost',
    title: 'Gold Necklace',
    description: 'Lost a gold necklace at the beach.',
    category: 'Jewelry',
    location: { lat: 12.9716, lng: 77.5946 }, // Bangalore
    date: new Date().toISOString(),
    image: 'https://via.placeholder.com/150?text=Necklace',
  },
  {
    id: 4,
    type: 'found',
    title: 'Car Keys',
    description: 'Found car keys at the shopping mall.',
    category: 'Keys',
    location: { lat: 17.3850, lng: 78.4867 }, // Hyderabad
    date: new Date().toISOString(),
    image: 'https://via.placeholder.com/150?text=Keys',
  },
  {
    id: 5,
    type: 'lost',
    title: 'Laptop Bag',
    description: 'Lost my laptop bag at the train station.',
    category: 'Electronics',
    location: { lat: 22.5726, lng: 88.3639 }, // Kolkata
    date: new Date().toISOString(),
    image: 'https://via.placeholder.com/150?text=Laptop',
  },
];

const MapPage = () => {
  const [itemType, setItemType] = useState('all');
  const [category, setCategory] = useState('all');
  const [filteredItems, setFilteredItems] = useState(sampleItems);
  const [selectedItem, setSelectedItem] = useState(null);
  const mapRef = useRef();

  // Load the Google Maps script
  // Note: For a production app, you would need a valid API key
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "", // Empty key will cause the map to fail loading
    libraries: ["places"],
  });

  // Filter items based on selected filters
  useEffect(() => {
    let filtered = sampleItems;
    
    if (itemType !== 'all') {
      filtered = filtered.filter(item => item.type === itemType);
    }
    
    if (category !== 'all') {
      filtered = filtered.filter(item => item.category === category);
    }
    
    setFilteredItems(filtered);
  }, [itemType, category]);

  // Store map reference when map loads
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  // Apply filters
  const handleApplyFilters = () => {
    let filtered = sampleItems;
    
    if (itemType !== 'all') {
      filtered = filtered.filter(item => item.type === itemType);
    }
    
    if (category !== 'all') {
      filtered = filtered.filter(item => item.category === category);
    }
    
    setFilteredItems(filtered);
  };

  // Render map error
  if (loadError) {
    console.log("Google Maps loading error:", loadError);
  }

  // Render the main component
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
              <Select
                labelId="item-type-label"
                id="item-type"
                value={itemType}
                label="Item Type"
                onChange={(e) => setItemType(e.target.value)}
              >
                <MenuItem value="all">All Items</MenuItem>
                <MenuItem value="lost">Lost Items</MenuItem>
                <MenuItem value="found">Found Items</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                value={category}
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
              >
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
            <Button 
              variant="contained" 
              fullWidth
              sx={{ height: '56px' }}
              onClick={handleApplyFilters}
            >
              Apply Filters
            </Button>
          </Grid>
        </Grid>
      </Paper>
      
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          borderRadius: 2, 
          flexGrow: 1,
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: '#f5f5f5',
          minHeight: '500px'
        }}
      >
        {isLoaded && !loadError ? (
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={5}
            center={center}
            options={options}
            onLoad={onMapLoad}
          >
            {filteredItems.map((item) => (
              <Marker
                key={item.id}
                position={item.location}
                icon={{
                  url: item.type === 'lost' 
                    ? 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' 
                    : 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
                  scaledSize: new window.google.maps.Size(40, 40),
                }}
                onClick={() => setSelectedItem(item)}
              />
            ))}

            {selectedItem && (
              <InfoWindow
                position={selectedItem.location}
                onCloseClick={() => setSelectedItem(null)}
              >
                <Box sx={{ p: 1, maxWidth: 200 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {selectedItem.title}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {selectedItem.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {selectedItem.type === 'lost' ? 'Lost' : 'Found'} • {selectedItem.category}
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <img 
                      src={selectedItem.image} 
                      alt={selectedItem.title} 
                      style={{ width: '100%', height: 'auto', borderRadius: '4px' }} 
                    />
                  </Box>
                  <Button 
                    variant="contained" 
                    size="small" 
                    fullWidth 
                    sx={{ mt: 1 }}
                    onClick={() => {
                      // Navigate to item detail page
                      window.location.href = `/${selectedItem.type}-items/${selectedItem.id}`;
                    }}
                  >
                    View Details
                  </Button>
                </Box>
              </InfoWindow>
            )}
          </GoogleMap>
        ) : (
          <>
            <MapIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Map Feature Coming Soon
            </Typography>
            <Typography variant="body1" align="center" sx={{ maxWidth: 600, mb: 3 }}>
              We're working on integrating an interactive map to help you locate lost and found items in your area.
              This feature will be available in the next update.
            </Typography>
            <Alert severity="info" sx={{ width: '100%', maxWidth: 600 }}>
              The map will display the locations of lost and found items, allowing you to filter by item type, category, and date.
            </Alert>
          </>
        )}
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
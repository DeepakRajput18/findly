import axios from 'axios';

// Use environment variable for API URL, fallback to relative path or localhost
const API_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api`
  : (process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5001/api');

// Add request timeout
axios.defaults.timeout = 15000; // 15 seconds timeout

// Add response interceptor for better error handling
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('Request timed out:', error.config.url);
      throw new Error('Request timed out. Please try again.');
    }
    if (!error.response) {
      console.error('Network error:', error.config?.url || 'unknown endpoint');
      // Check if server might be on a different port (5000 vs 5001)
      if (error.config?.url?.includes('5001')) {
        console.warn('Trying alternate port 5000...');
        // Store original URL
        const originalUrl = error.config.url;
        // Try alternate port
        const alternateUrl = originalUrl.replace('5001', '5000');
        console.log('Attempting to connect to:', alternateUrl);
        // Return a retry with alternate port, but only try once
        if (!error.config.__isRetry) {
          error.config.__isRetry = true;
          return axios(Object.assign({}, error.config, { url: alternateUrl }));
        }
      }
      throw new Error('Network error. Please check your connection and try again.');
    }
    throw error;
  }
);

// Configure axios with default headers
axios.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Lost Items API
export const lostItemsApi = {
  // Get all lost items
  getAllLostItems: async () => {
    let retries = 2;
    
    while (retries >= 0) {
      try {
        console.log(`API: Attempting to fetch lost items (retries left: ${retries})`);
        const response = await axios.get(`${API_URL}/lost-items`, {
          timeout: 8000 // 8 second timeout for read operations
        });
        
        console.log('API: Successfully fetched lost items, count:', response.data.length);
        return response.data;
      } catch (error) {
        console.error(`API: Error fetching lost items (retries left: ${retries}):`, error.message);
        
        // Check for specific error types
        if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
          console.warn('API: Request timed out, retrying with longer timeout');
          
          if (retries > 0) {
            retries--;
            // Wait 1.5 seconds before retrying
            await new Promise(resolve => setTimeout(resolve, 1500));
            continue; // retry the request
          }
        }
        
        // Try alternate port if connection is refused
        if (error.code === 'ECONNREFUSED' && error.config?.url?.includes(':5001') && retries > 0) {
          console.warn('API: Connection refused on port 5001, trying port 5000');
          
          try {
            const altUrl = error.config.url.replace(':5001', ':5000');
            const altResponse = await axios.get(altUrl, { timeout: 8000 });
            return altResponse.data;
          } catch (innerError) {
            console.error('API: Alternate port also failed:', innerError.message);
          }
        }
        
        // If it's a 404 (No items found), return empty array
        if (error.response?.status === 404) {
          console.log('API: No items found (404), returning empty array');
          return []; 
        }
        
        // Generate mock data as fallback if all retries fail
        if (retries === 0) {
          console.warn('API: All retries failed, using mock data');
          // Return mock data array
          return [
            {
              _id: 'mock-1',
              item_name: 'Sample Lost Item',
              description: 'This is a sample lost item (cannot connect to API)',
              category: 'Electronics',
              last_seen_location: 'Sample Location',
              lost_date: new Date().toISOString(),
              status: 'Lost',
              image_url: '/assets/fallback-images/default-item.jpg'
            }
          ];
        }
        
        // Decrement retry count and retry after delay
        retries--;
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
    }
    
    // If we get here, all retries failed
    throw new Error('Failed to fetch lost items after multiple attempts');
  },
  
  // Get user's lost items
  getMyLostItems: async () => {
    const response = await axios.get(`${API_URL}/lost-items/user/myitems`);
    return response.data;
  },
  
  // Get lost item by ID
  getLostItemById: async (id) => {
    const response = await axios.get(`${API_URL}/lost-items/${id}`);
    return response.data;
  },
  
  // Create a new lost item
  createLostItem: async (lostItemData) => {
    // Ensure image URL is provided or set a default one
    const submissionData = {
      ...lostItemData,
      image_url: lostItemData.image_url || 
        `/assets/fallback-images/${lostItemData.category.toLowerCase().replace(/\s+/g, '-')}.jpg`
    };
    
    try {
      console.log('API: Creating lost item with data:', {
        ...submissionData,
        user_id: 'Set from auth token'
      });
      
      const response = await axios.post(`${API_URL}/lost-items`, submissionData, {
        // Add specific timeout for this request
        timeout: 20000, // 20 second timeout for create operations
        // Retry logic is handled at the component level
      });
      
      console.log('API: Lost item created successfully', response.data);
      return response.data;
    } catch (error) {
      console.error('API: Error creating lost item:', error.message);
      
      // Capture server connection issues
      if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
        throw new Error('Request timed out. The server may be busy. Please try again.');
      }
      
      if (!error.response) {
        // This is likely a network connection issue
        throw new Error('Network error. Please check your connection and try again.');
      }
      
      // For other types of errors, just rethrow
      throw error;
    }
  },
  
  // Update a lost item
  updateLostItem: async (id, lostItemData) => {
    const response = await axios.put(`${API_URL}/lost-items/${id}`, lostItemData);
    return response.data;
  },
  
  // Delete a lost item
  deleteLostItem: async (id) => {
    const response = await axios.delete(`${API_URL}/lost-items/${id}`);
    return response.data;
  },
};

// Found Items API
export const foundItemsApi = {
  // Get all found items
  getAllFoundItems: async () => {
    const response = await axios.get(`${API_URL}/found-items`);
    return response.data;
  },
  
  // Get user's found items
  getMyFoundItems: async () => {
    const response = await axios.get(`${API_URL}/found-items/user/myitems`);
    return response.data;
  },
  
  // Get found item by ID
  getFoundItemById: async (id) => {
    const response = await axios.get(`${API_URL}/found-items/${id}`);
    return response.data;
  },
  
  // Create a new found item
  createFoundItem: async (foundItemData) => {
    // Ensure image URL is provided or set a default one
    const submissionData = {
      ...foundItemData,
      image_url: foundItemData.image_url || 
        `/assets/fallback-images/${foundItemData.category.toLowerCase().replace(/\s+/g, '-')}.jpg`
    };
    
    try {
      console.log('API: Creating found item with data:', {
        ...submissionData,
        user_id: 'Set from auth token'
      });
      
      const response = await axios.post(`${API_URL}/found-items`, submissionData, {
        // Add specific timeout for this request
        timeout: 20000, // 20 second timeout for create operations
        // Retry logic is handled at the component level
      });
      
      console.log('API: Found item created successfully', response.data);
      return response.data;
    } catch (error) {
      console.error('API: Error creating found item:', error.message);
      
      // Capture server connection issues
      if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
        throw new Error('Request timed out. The server may be busy. Please try again.');
      }
      
      if (!error.response) {
        // This is likely a network connection issue
        throw new Error('Network error. Please check your connection and try again.');
      }
      
      // For other types of errors, just rethrow
      throw error;
    }
  },
  
  // Update a found item
  updateFoundItem: async (id, foundItemData) => {
    const response = await axios.put(`${API_URL}/found-items/${id}`, foundItemData);
    return response.data;
  },
  
  // Delete a found item
  deleteFoundItem: async (id) => {
    const response = await axios.delete(`${API_URL}/found-items/${id}`);
    return response.data;
  },
};

// Matches API
export const matchesApi = {
  // Get all matches
  getAllMatches: async () => {
    const response = await axios.get(`${API_URL}/matches`);
    return response.data;
  },
  
  // Get user's matches
  getMyMatches: async () => {
    const response = await axios.get(`${API_URL}/matches/mymatches`);
    return response.data;
  },
  
  // Get match by ID
  getMatchById: async (id) => {
    const response = await axios.get(`${API_URL}/matches/${id}`);
    return response.data;
  },
  
  // Create a new match
  createMatch: async (matchData) => {
    const response = await axios.post(`${API_URL}/matches`, matchData);
    return response.data;
  },
  
  // Update match status
  updateMatchStatus: async (id, statusData) => {
    const response = await axios.put(`${API_URL}/matches/${id}`, statusData);
    return response.data;
  },
};

// Messages API
export const messagesApi = {
  // Get all conversations
  getMyConversations: async () => {
    const response = await axios.get(`${API_URL}/messages`);
    return response.data;
  },
  
  // Get conversation with a specific user
  getConversation: async (userId) => {
    const response = await axios.get(`${API_URL}/messages/${userId}`);
    return response.data;
  },
  
  // Send a message
  sendMessage: async (messageData) => {
    const response = await axios.post(`${API_URL}/messages`, messageData);
    return response.data;
  },
};

// Notifications API
export const notificationsApi = {
  // Get user's notifications
  getMyNotifications: async () => {
    const response = await axios.get(`${API_URL}/notifications`);
    return response.data;
  },
  
  // Mark notification as read
  markAsRead: async (id) => {
    const response = await axios.put(`${API_URL}/notifications/${id}`, { read_status: true });
    return response.data;
  },
  
  // Mark all notifications as read
  markAllAsRead: async () => {
    const response = await axios.put(`${API_URL}/notifications/read-all`);
    return response.data;
  },
  
  // Delete notification
  deleteNotification: async (id) => {
    const response = await axios.delete(`${API_URL}/notifications/${id}`);
    return response.data;
  },
};

// Locations API
export const locationsApi = {
  // Get all locations for a specific item type
  getLocations: async (itemType) => {
    const response = await axios.get(`${API_URL}/locations/${itemType}`);
    return response.data;
  },
  
  // Get location for a specific item
  getItemLocation: async (itemType, itemId) => {
    const response = await axios.get(`${API_URL}/locations/${itemType}/${itemId}`);
    return response.data;
  },
  
  // Add or update location for an item
  addLocation: async (locationData) => {
    const response = await axios.post(`${API_URL}/locations`, locationData);
    return response.data;
  },
}; 
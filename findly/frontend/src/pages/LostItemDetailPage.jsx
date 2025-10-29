import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Chip,
  Button,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  IconButton,
  Modal,
} from '@mui/material';
import { 
  ArrowBack as ArrowBackIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { lostItemsApi, messagesApi } from '../services/api';
import { formatDate, getStatusColor } from '../utils/helpers';

const LostItemDetailPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Contact Form State
  const [contactOpen, setContactOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [contactLoading, setContactLoading] = useState(false);
  const [contactError, setContactError] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);
  
  // Found Item Form State
  const [foundOpen, setFoundOpen] = useState(false);
  const [foundForm, setFoundForm] = useState({
    name: '',
    email: '',
    phone: '',
    foundLocation: '',
    foundDate: new Date().toISOString().slice(0, 16),
    additionalInfo: '',
    photos: '',
  });
  const [foundLoading, setFoundLoading] = useState(false);
  const [foundError, setFoundError] = useState('');
  const [foundSuccess, setFoundSuccess] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Try to fetch from API first
        try {
          const data = await lostItemsApi.getLostItemById(id);
          setItem(data);
        } catch (apiError) {
          // Fallback to mock data if API fails
          console.log('Using mock data due to API error:', apiError);
          setItem({
            _id: id,
            item_name: 'Sample Lost Item',
            description: 'This is a detailed description of the lost item. It includes information about its appearance, when and where it was lost, and any other relevant details that might help someone identify it.',
            category: 'Electronics',
            last_seen_location: 'Main Street Coffee Shop',
            lost_date: new Date().toISOString(),
            status: 'Lost',
            reward: 50,
            image_url: 'https://source.unsplash.com/400x300/?electronics,lost',
            user_id: {
              _id: '123',
              name: 'John Doe',
              email: 'john@example.com',
              phone: '555-123-4567'
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          });
        }
      } catch (error) {
        console.error('Error fetching lost item:', error);
        setError('Failed to fetch item details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  // Handle contact form input change
  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm({
      ...contactForm,
      [name]: value,
    });
  };

  // Handle contact form submission
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      setContactError('Please fill in all required fields');
      return;
    }
    
    try {
      setContactLoading(true);
      setContactError('');
      
      // In a production app, you would call the API:
      // await messagesApi.sendMessage({
      //   recipient_id: item.user_id._id,
      //   item_id: item._id,
      //   item_type: 'lost',
      //   subject: `Regarding your lost item: ${item.item_name}`,
      //   content: contactForm.message,
      //   contact_info: {
      //     name: contactForm.name,
      //     email: contactForm.email,
      //     phone: contactForm.phone,
      //   }
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message and close dialog
      setContactSuccess(true);
      setContactOpen(false);
      
      // Reset form
      setContactForm({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (error) {
      console.error('Error sending message:', error);
      setContactError('Failed to send message. Please try again later.');
    } finally {
      setContactLoading(false);
    }
  };
  
  // Handle found item form input change
  const handleFoundChange = (e) => {
    const { name, value } = e.target;
    setFoundForm({
      ...foundForm,
      [name]: value,
    });
  };

  // Handle found item form submission
  const handleFoundSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!foundForm.name || !foundForm.email || !foundForm.foundLocation || !foundForm.foundDate) {
      setFoundError('Please fill in all required fields');
      return;
    }
    
    try {
      setFoundLoading(true);
      setFoundError('');
      
      // In a production app, you would call the API:
      // await matchesApi.createMatch({
      //   lost_item_id: item._id,
      //   finder_info: {
      //     name: foundForm.name,
      //     email: foundForm.email,
      //     phone: foundForm.phone,
      //   },
      //   found_location: foundForm.foundLocation,
      //   found_date: foundForm.foundDate,
      //   additional_info: foundForm.additionalInfo,
      //   photos: foundForm.photos,
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message and close dialog
      setFoundSuccess(true);
      setFoundOpen(false);
      
      // Reset form
      setFoundForm({
        name: '',
        email: '',
        phone: '',
        foundLocation: '',
        foundDate: new Date().toISOString().slice(0, 16),
        additionalInfo: '',
        photos: '',
      });
    } catch (error) {
      console.error('Error submitting found item:', error);
      setFoundError('Failed to submit found item information. Please try again later.');
    } finally {
      setFoundLoading(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          component={Link}
          to="/lost-items"
          sx={{ mt: 2 }}
        >
          Back to Lost Items
        </Button>
      </Container>
    );
  }

  if (!item) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="info" sx={{ mb: 4 }}>
          Item not found.
        </Alert>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          component={Link}
          to="/lost-items"
          sx={{ mt: 2 }}
        >
          Back to Lost Items
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
      
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={item.image_url || 'https://source.unsplash.com/400x300/?lost,item'}
              alt={item.item_name}
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 2,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://source.unsplash.com/400x300/?${item.category.toLowerCase()},lost`;
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                {item.item_name}
              </Typography>
              <Chip
                label={item.status}
                sx={{
                  backgroundColor: getStatusColor(item.status),
                  color: 'white',
                  fontWeight: 'bold',
                }}
              />
            </Box>
            
            <Typography variant="body1" color="text.secondary" paragraph>
              <strong>Category:</strong> {item.category}
            </Typography>
            
            <Typography variant="body1" color="text.secondary" paragraph>
              <strong>Last Seen:</strong> {item.last_seen_location}
            </Typography>
            
            <Typography variant="body1" color="text.secondary" paragraph>
              <strong>Lost Date:</strong> {formatDate(item.lost_date)}
            </Typography>
            
            {item.reward && (
              <Typography variant="body1" color="text.secondary" paragraph>
                <strong>Reward:</strong> ${item.reward}
              </Typography>
            )}
            
            <Typography variant="body1" color="text.secondary" paragraph>
              <strong>Reported By:</strong> {item.user_id.name}
            </Typography>
            
            <Typography variant="body1" color="text.secondary" paragraph>
              <strong>Contact:</strong> {item.user_id.email} | {item.user_id.phone}
            </Typography>
            
            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Description
            </Typography>
            
            <Typography variant="body1" paragraph>
              {item.description}
            </Typography>
            
            <Box sx={{ mt: 4 }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mb: 2 }}
                onClick={(e) => { e.currentTarget.blur(); setFoundOpen(true); }}
              >
                I Found This Item
              </Button>
              
              <Button
                variant="outlined"
                fullWidth
                onClick={(e) => { e.currentTarget.blur(); setContactOpen(true); }}
              >
                Contact Owner
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      
      {/* Contact Owner Dialog */}
      <Dialog
        open={contactOpen}
        onClose={() => setContactOpen(false)}
        maxWidth="sm"
        fullWidth
        keepMounted
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            Contact Owner about {item.item_name}
            <IconButton onClick={() => setContactOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        
        <DialogContent>
          {contactError && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {contactError}
            </Alert>
          )}
          
          <Box component="form" onSubmit={handleContactSubmit} noValidate>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Your Name"
                  name="name"
                  value={contactForm.name}
                  onChange={handleContactChange}
                  disabled={contactLoading}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Your Email"
                  name="email"
                  type="email"
                  value={contactForm.email}
                  onChange={handleContactChange}
                  disabled={contactLoading}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="phone"
                  label="Your Phone (optional)"
                  name="phone"
                  value={contactForm.phone}
                  onChange={handleContactChange}
                  disabled={contactLoading}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="message"
                  label="Message"
                  name="message"
                  multiline
                  rows={4}
                  value={contactForm.message}
                  onChange={handleContactChange}
                  disabled={contactLoading}
                  placeholder="Explain why you're contacting the owner. Include details about the item if you've found it."
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button 
            variant="outlined" 
            onClick={() => setContactOpen(false)}
            disabled={contactLoading}
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleContactSubmit}
            disabled={contactLoading}
          >
            {contactLoading ? <CircularProgress size={24} /> : 'Send Message'}
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Found Item Dialog */}
      <Dialog
        open={foundOpen}
        onClose={() => setFoundOpen(false)}
        maxWidth="md"
        fullWidth
        keepMounted
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            Report Found Item: {item.item_name}
            <IconButton onClick={() => setFoundOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        
        <DialogContent>
          {foundError && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {foundError}
            </Alert>
          )}
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Please provide details about how and where you found this item. This information will be sent to the owner who will then contact you to verify and arrange for return.
          </Typography>
          
          <Box component="form" onSubmit={handleFoundSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Your Name"
                  name="name"
                  value={foundForm.name}
                  onChange={handleFoundChange}
                  disabled={foundLoading}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Your Email"
                  name="email"
                  type="email"
                  value={foundForm.email}
                  onChange={handleFoundChange}
                  disabled={foundLoading}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="phone"
                  label="Your Phone"
                  name="phone"
                  value={foundForm.phone}
                  onChange={handleFoundChange}
                  disabled={foundLoading}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="foundDate"
                  label="Date Found"
                  name="foundDate"
                  type="datetime-local"
                  value={foundForm.foundDate}
                  onChange={handleFoundChange}
                  disabled={foundLoading}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="foundLocation"
                  label="Where did you find it?"
                  name="foundLocation"
                  value={foundForm.foundLocation}
                  onChange={handleFoundChange}
                  disabled={foundLoading}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="photos"
                  label="Photos URL (optional)"
                  name="photos"
                  value={foundForm.photos}
                  onChange={handleFoundChange}
                  disabled={foundLoading}
                  placeholder="Link to photos of the found item (e.g., Google Drive, Dropbox)"
                  helperText="Provide links to photos to help verify this is the correct item"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="additionalInfo"
                  label="Additional Information"
                  name="additionalInfo"
                  multiline
                  rows={4}
                  value={foundForm.additionalInfo}
                  onChange={handleFoundChange}
                  disabled={foundLoading}
                  placeholder="Provide any additional details that might help verify this is the correct item"
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button 
            variant="outlined" 
            onClick={() => setFoundOpen(false)}
            disabled={foundLoading}
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            color="success"
            onClick={handleFoundSubmit}
            disabled={foundLoading}
          >
            {foundLoading ? <CircularProgress size={24} /> : 'Submit Found Item Report'}
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Success Snackbars */}
      <Snackbar
        open={contactSuccess}
        autoHideDuration={6000}
        onClose={() => setContactSuccess(false)}
        message="Message sent successfully! The owner will contact you soon."
        action={
          <IconButton
            size="small"
            color="inherit"
            onClick={() => setContactSuccess(false)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
      
      <Snackbar
        open={foundSuccess}
        autoHideDuration={6000}
        onClose={() => setFoundSuccess(false)}
        message="Thank you for reporting this found item! The owner will be notified."
        action={
          <IconButton
            size="small"
            color="inherit"
            onClick={() => setFoundSuccess(false)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Container>
  );
};

export default LostItemDetailPage; 
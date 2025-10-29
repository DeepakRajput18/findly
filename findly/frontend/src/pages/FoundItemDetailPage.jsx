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
  DialogContentText,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { foundItemsApi } from '../services/api';
import { formatDate, getStatusColor } from '../utils/helpers';

const FoundItemDetailPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Claim form state
  const [openClaimDialog, setOpenClaimDialog] = useState(false);
  const [claimFormData, setClaimFormData] = useState({
    name: '',
    email: '',
    phone: '',
    proofOfOwnership: '',
    additionalDetails: '',
    preferredMethod: 'email'
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Contact form state
  const [openContactDialog, setOpenContactDialog] = useState(false);
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    preferredMethod: 'email'
  });
  const [contactFormErrors, setContactFormErrors] = useState({});
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactSubmitSuccess, setContactSubmitSuccess] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Mock data for now
        setTimeout(() => {
          setItem({
            _id: id,
            item_name: 'Sample Found Item',
            description: 'This is a detailed description of the found item. It includes information about its appearance, when and where it was found, and any other relevant details that might help someone identify it as their lost item.',
            category: 'Electronics',
            found_location: 'Central Park, near the fountain',
            found_date: new Date().toISOString(),
            status: 'Found',
            image_url: '/assets/fallback-images/electronics.jpg',
            user_id: {
              _id: '123',
              name: 'Jane Smith',
              email: 'jane@example.com',
              phone: '555-987-6543'
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          });
          setLoading(false);
        }, 1000);
        
        // In a real app, you would use:
        // const data = await foundItemsApi.getFoundItemById(id);
        // setItem(data);
        // setLoading(false);
      } catch (error) {
        console.error('Error fetching found item:', error);
        setError('Failed to fetch item details. Please try again later.');
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  // Handle opening claim dialog
  const handleOpenClaimDialog = () => {
    setOpenClaimDialog(true);
  };

  // Handle closing claim dialog
  const handleCloseClaimDialog = () => {
    setOpenClaimDialog(false);
    // Reset form data if dialog is closed without submission
    if (!submitSuccess) {
      setClaimFormData({
        name: '',
        email: '',
        phone: '',
        proofOfOwnership: '',
        additionalDetails: '',
        preferredMethod: 'email'
      });
      setFormErrors({});
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClaimFormData({
      ...claimFormData,
      [name]: value
    });
    
    // Clear validation error when field is edited
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    
    if (!claimFormData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!claimFormData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(claimFormData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!claimFormData.phone.trim()) {
      errors.phone = 'Phone number is required';
    }
    
    if (!claimFormData.proofOfOwnership.trim()) {
      errors.proofOfOwnership = 'Proof of ownership is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit the claim form
  const handleSubmitClaim = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setSubmitting(true);
      
      // In a real app, you would send the claim data to the server
      // await foundItemsApi.submitFoundItemClaim(id, claimFormData);
      
      // Mock successful API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitSuccess(true);
      
      // Close the dialog after a delay
      setTimeout(() => {
        setOpenClaimDialog(false);
        // Reset form state
        setClaimFormData({
          name: '',
          email: '',
          phone: '',
          proofOfOwnership: '',
          additionalDetails: '',
          preferredMethod: 'email'
        });
        setFormErrors({});
      }, 2000);
    } catch (error) {
      console.error('Error submitting claim:', error);
      setFormErrors({
        submit: 'Failed to submit claim. Please try again.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Handle snackbar close
  const handleSnackbarClose = () => {
    setSubmitSuccess(false);
  };

  // Contact Form Functionality
  // Handle opening contact dialog
  const handleOpenContactDialog = () => {
    setOpenContactDialog(true);
  };

  // Handle closing contact dialog
  const handleCloseContactDialog = () => {
    setOpenContactDialog(false);
    // Reset form data if dialog is closed without submission
    if (!contactSubmitSuccess) {
      setContactFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        preferredMethod: 'email'
      });
      setContactFormErrors({});
    }
  };

  // Handle contact form input changes
  const handleContactInputChange = (e) => {
    const { name, value } = e.target;
    setContactFormData({
      ...contactFormData,
      [name]: value
    });
    
    // Clear validation error when field is edited
    if (contactFormErrors[name]) {
      setContactFormErrors({
        ...contactFormErrors,
        [name]: null
      });
    }
  };

  // Validate contact form
  const validateContactForm = () => {
    const errors = {};
    
    if (!contactFormData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!contactFormData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(contactFormData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!contactFormData.phone.trim()) {
      errors.phone = 'Phone number is required';
    }
    
    if (!contactFormData.message.trim()) {
      errors.message = 'Message is required';
    }
    
    setContactFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit the contact form
  const handleSubmitContact = async (e) => {
    e.preventDefault();
    
    if (!validateContactForm()) {
      return;
    }
    
    try {
      setContactSubmitting(true);
      
      // In a real app, you would send the contact data to the server
      // await foundItemsApi.contactItemFinder(id, contactFormData);
      
      // Mock successful API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setContactSubmitSuccess(true);
      
      // Close the dialog after a delay
      setTimeout(() => {
        setOpenContactDialog(false);
        // Reset form state
        setContactFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          preferredMethod: 'email'
        });
        setContactFormErrors({});
      }, 2000);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setContactFormErrors({
        submit: 'Failed to send message. Please try again.'
      });
    } finally {
      setContactSubmitting(false);
    }
  };

  // Handle contact snackbar close
  const handleContactSnackbarClose = () => {
    setContactSubmitSuccess(false);
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
          to="/found-items"
          sx={{ mt: 2 }}
        >
          Back to Found Items
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
          to="/found-items"
          sx={{ mt: 2 }}
        >
          Back to Found Items
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
        to="/found-items"
        sx={{ mb: 4 }}
      >
        Back to Found Items
      </Button>
      
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={item.image_url || '/assets/fallback-images/default-item.jpg'}
              alt={item.item_name}
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 2,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
              onError={(e) => {
                e.target.onerror = null;
                const fallback = `/assets/fallback-images/${(item.category || 'default').toLowerCase().replace(/\s+/g, '-')}.jpg`;
                e.target.src = fallback;
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
              <strong>Found At:</strong> {item.found_location}
            </Typography>
            
            <Typography variant="body1" color="text.secondary" paragraph>
              <strong>Found Date:</strong> {formatDate(item.found_date)}
            </Typography>
            
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
                onClick={(e) => { e.currentTarget.blur(); handleOpenClaimDialog(); }}
              >
                This Is My Item
              </Button>
              
              <Button
                variant="outlined"
                fullWidth
                onClick={(e) => { e.currentTarget.blur(); handleOpenContactDialog(); }}
              >
                Contact Finder
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Claim Item Dialog */}
      <Dialog open={openClaimDialog} onClose={handleCloseClaimDialog} maxWidth="sm" fullWidth keepMounted>
        <DialogTitle>
          Claim "{item?.item_name}"
        </DialogTitle>
        <form onSubmit={handleSubmitClaim}>
          <DialogContent>
            <DialogContentText sx={{ mb: 3 }}>
              Please provide the following information to claim this item. The finder will be notified, and you'll be contacted to arrange returning the item.
            </DialogContentText>
            
            {formErrors.submit && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {formErrors.submit}
              </Alert>
            )}
            
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  label="Your Name"
                  variant="outlined"
                  fullWidth
                  required
                  value={claimFormData.name}
                  onChange={handleInputChange}
                  error={!!formErrors.name}
                  helperText={formErrors.name}
                  disabled={submitting}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  name="email"
                  label="Email Address"
                  variant="outlined"
                  type="email"
                  fullWidth
                  required
                  value={claimFormData.email}
                  onChange={handleInputChange}
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                  disabled={submitting}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  name="phone"
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  required
                  value={claimFormData.phone}
                  onChange={handleInputChange}
                  error={!!formErrors.phone}
                  helperText={formErrors.phone}
                  disabled={submitting}
                />
              </Grid>
              
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined" disabled={submitting}>
                  <InputLabel>Preferred Contact Method</InputLabel>
                  <Select
                    name="preferredMethod"
                    label="Preferred Contact Method"
                    value={claimFormData.preferredMethod}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="email">Email</MenuItem>
                    <MenuItem value="phone">Phone</MenuItem>
                    <MenuItem value="both">Both</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  name="proofOfOwnership"
                  label="Proof of Ownership"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={3}
                  required
                  placeholder="Please describe specific details about this item that would prove it belongs to you (e.g., serial number, unique marks, contents, etc.)"
                  value={claimFormData.proofOfOwnership}
                  onChange={handleInputChange}
                  error={!!formErrors.proofOfOwnership}
                  helperText={formErrors.proofOfOwnership}
                  disabled={submitting}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  name="additionalDetails"
                  label="Additional Details"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={2}
                  placeholder="Any additional information you'd like to share with the finder"
                  value={claimFormData.additionalDetails}
                  onChange={handleInputChange}
                  disabled={submitting}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button onClick={handleCloseClaimDialog} disabled={submitting}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Submit Claim'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      
      {/* Contact Finder Dialog */}
      <Dialog open={openContactDialog} onClose={handleCloseContactDialog} maxWidth="sm" fullWidth keepMounted>
        <DialogTitle>
          Contact Finder about "{item?.item_name}"
        </DialogTitle>
        <form onSubmit={handleSubmitContact}>
          <DialogContent>
            <DialogContentText sx={{ mb: 3 }}>
              Send a message to {item?.user_id.name}, who found this item. Please provide your contact information so they can get back to you.
            </DialogContentText>
            
            {contactFormErrors.submit && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {contactFormErrors.submit}
              </Alert>
            )}
            
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  label="Your Name"
                  variant="outlined"
                  fullWidth
                  required
                  value={contactFormData.name}
                  onChange={handleContactInputChange}
                  error={!!contactFormErrors.name}
                  helperText={contactFormErrors.name}
                  disabled={contactSubmitting}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  name="email"
                  label="Email Address"
                  variant="outlined"
                  type="email"
                  fullWidth
                  required
                  value={contactFormData.email}
                  onChange={handleContactInputChange}
                  error={!!contactFormErrors.email}
                  helperText={contactFormErrors.email}
                  disabled={contactSubmitting}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  name="phone"
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  required
                  value={contactFormData.phone}
                  onChange={handleContactInputChange}
                  error={!!contactFormErrors.phone}
                  helperText={contactFormErrors.phone}
                  disabled={contactSubmitting}
                />
              </Grid>
              
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined" disabled={contactSubmitting}>
                  <InputLabel>Preferred Contact Method</InputLabel>
                  <Select
                    name="preferredMethod"
                    label="Preferred Contact Method"
                    value={contactFormData.preferredMethod}
                    onChange={handleContactInputChange}
                  >
                    <MenuItem value="email">Email</MenuItem>
                    <MenuItem value="phone">Phone</MenuItem>
                    <MenuItem value="both">Both</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  name="message"
                  label="Message"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  required
                  placeholder="Write your message to the finder. If you believe this is your item, include details about it that only you would know."
                  value={contactFormData.message}
                  onChange={handleContactInputChange}
                  error={!!contactFormErrors.message}
                  helperText={contactFormErrors.message}
                  disabled={contactSubmitting}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button onClick={handleCloseContactDialog} disabled={contactSubmitting}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              disabled={contactSubmitting}
            >
              {contactSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      
      {/* Success Snackbars */}
      <Snackbar
        open={submitSuccess}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        message="Claim submitted successfully! The finder will be notified and will contact you soon."
      />
      
      <Snackbar
        open={contactSubmitSuccess}
        autoHideDuration={5000}
        onClose={handleContactSnackbarClose}
        message="Message sent successfully! The finder will get back to you soon."
      />
    </Container>
  );
};

export default FoundItemDetailPage; 
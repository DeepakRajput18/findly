import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Avatar,
  Grid,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Divider,
  IconButton,
} from '@mui/material';
import { Person as PersonIcon, PhotoCamera } from '@mui/icons-material';
import AuthContext from '../context/AuthContext';

const ProfilePage = () => {
  const { user, updateProfile, loading, error } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      // Populate form with user data
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
      });
      
      // Set the existing profile image if available
      if (user.profileImage) {
        console.log('User has profile image:', user.profileImage);
        // Don't set imagePreview here as it will override any selected file
      }
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      setImageFile(file);
      // Create a preview URL for the selected image
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      console.log('Image file selected:', file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.name || !formData.email) {
      setFormError('Name and email are required');
      return;
    }

    try {
      setIsSubmitting(true);
      setFormError('');
      setSuccess(false);
      
      // Create FormData to handle file upload
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('email', formData.email);
      submitData.append('phone', formData.phone);
      
      // Add image file if selected
      if (imageFile) {
        submitData.append('profileImage', imageFile);
        console.log('Adding image file to form data:', imageFile.name);
      }
      
      // Call the updateProfile function with the FormData
      const updatedUser = await updateProfile(submitData);
      console.log('Profile updated successfully:', updatedUser);
      setSuccess(true);
      
      // Important: Update the image preview with the new image from server
      if (updatedUser.profileImage) {
        console.log('Setting new profile image from server:', updatedUser.profileImage);
        
        // Clear the file input and set preview to force reload from server
        setImageFile(null);
        setImagePreview('');
        
        // Force reload the page after brief delay to refresh from server
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
      
    } catch (error) {
      console.error('Error updating profile:', error);
      setFormError(error.response?.data?.message || 'Profile update failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Profile
      </Typography>
      
      <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
          <Box sx={{ position: 'relative' }}>
            {console.log('Rendering profile image:', 
              imagePreview || (user.profileImage ? `http://localhost:5001${user.profileImage}` : 'no image'))}
            <Avatar
              sx={{ width: 100, height: 100, mb: 2, bgcolor: 'primary.main' }}
              src={imagePreview || (user.profileImage ? `http://localhost:5001${user.profileImage}` : '')}
              alt={user.name}
              imgProps={{
                onError: (e) => {
                  console.error('Error loading profile image');
                  e.target.src = ''; // Clear src on error to show fallback
                }
              }}
            >
              {!imagePreview && !user.profileImage && <PersonIcon sx={{ fontSize: 60 }} />}
            </Avatar>
            <IconButton 
              color="primary" 
              aria-label="upload picture" 
              component="label" 
              sx={{ 
                position: 'absolute', 
                bottom: 10, 
                right: -10,
                backgroundColor: 'white',
                '&:hover': { backgroundColor: '#f5f5f5' }
              }}
            >
              <input 
                hidden 
                accept="image/*" 
                type="file" 
                onChange={handleImageChange} 
              />
              <PhotoCamera />
            </IconButton>
          </Box>
          <Typography variant="h5" gutterBottom>
            {user.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Member since {new Date(user.createdAt || Date.now()).toLocaleDateString()}
          </Typography>
        </Box>
        
        <Divider sx={{ mb: 4 }} />
        
        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Profile updated successfully!
          </Alert>
        )}
        
        {(formError || error) && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {formError || error}
          </Alert>
        )}
        
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="phone"
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isSubmitting}
                sx={{ py: 1.5 }}
              >
                {isSubmitting ? <CircularProgress size={24} /> : 'Update Profile'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProfilePage; 
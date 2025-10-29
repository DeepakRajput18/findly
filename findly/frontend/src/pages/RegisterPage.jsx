import React from 'react';
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Grid,
  Divider,
  CircularProgress,
  Alert,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Switch,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  PersonAdd as PersonAddIcon,
  AdminPanelSettings as AdminIcon,
} from '@mui/icons-material';
import AuthContext from '../context/AuthContext';

const RegisterPage = () => {
  const { register, loading, error } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    isAdmin: false,
    adminSecretKey: '',
  });
  
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    adminSecretKey: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [termsError, setTermsError] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: '',
      });
    }
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  // Toggle password visibility
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Toggle confirm password visibility
  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Handle terms agreement
  const handleTermsChange = (e) => {
    setAgreeToTerms(e.target.checked);
    if (e.target.checked) {
      setTermsError('');
    }
  };

  // Validate form
  const validateForm = () => {
    let valid = true;
    const errors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      adminSecretKey: '',
    };
    
    // Name validation
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
      valid = false;
    }
    
    // Email validation
    if (!formData.email) {
      errors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
      valid = false;
    }
    
    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      valid = false;
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
      valid = false;
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      valid = false;
    }
    
    // Phone validation (optional)
    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      errors.phone = 'Please enter a valid phone number';
      valid = false;
    }
    
    // Admin secret key validation
    if (formData.isAdmin && !formData.adminSecretKey) {
      errors.adminSecretKey = 'Secret key is required for admin registration';
      valid = false;
    }
    
    // Terms agreement
    if (!agreeToTerms) {
      setTermsError('You must agree to the terms and conditions');
      valid = false;
    }
    
    setFormErrors(errors);
    return valid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setSubmitting(true);
      
      // Create registration data (omit confirmPassword)
      const registrationData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        isAdmin: formData.isAdmin,
        adminSecretKey: formData.adminSecretKey,
      };
      
      // Call register function from AuthContext
      await register(registrationData);
      
      // Redirect to login page after successful registration
      navigate('/login', { 
        state: { 
          message: 'Registration successful! Please log in with your new account.' 
        } 
      });
    } catch (error) {
      console.error('Registration error:', error);
      // Error is handled by AuthContext
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      flexGrow: 1,
      py: 4
    }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, width: '100%', maxWidth: 500 }}>
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Create an Account
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Join Findly to report and find lost items
          </Typography>
        </Box>
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Full Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={formData.name}
            onChange={handleChange}
            error={!!formErrors.name}
            helperText={formErrors.name}
            disabled={submitting || loading}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            error={!!formErrors.email}
            helperText={formErrors.email}
            disabled={submitting || loading}
          />
          
          <TextField
            margin="normal"
            fullWidth
            id="phone"
            label="Phone Number (Optional)"
            name="phone"
            autoComplete="tel"
            value={formData.phone}
            onChange={handleChange}
            error={!!formErrors.phone}
            helperText={formErrors.phone}
            disabled={submitting || loading}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            error={!!formErrors.password}
            helperText={formErrors.password}
            disabled={submitting || loading}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            autoComplete="new-password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!formErrors.confirmPassword}
            helperText={formErrors.confirmPassword}
            disabled={submitting || loading}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirm password visibility"
                    onClick={handleToggleConfirmPasswordVisibility}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          
          {/* Admin Registration Option */}
          <Box sx={{ mt: 2, mb: 1 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.isAdmin}
                  onChange={handleCheckboxChange}
                  name="isAdmin"
                  color="primary"
                  disabled={submitting || loading}
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AdminIcon color="primary" sx={{ mr: 1 }} />
                  <Typography>Register as Admin</Typography>
                </Box>
              }
            />
          </Box>
          
          {/* Admin Secret Key Field - only shown if isAdmin is true */}
          {formData.isAdmin && (
            <TextField
              margin="normal"
              required
              fullWidth
              name="adminSecretKey"
              label="Admin Secret Key"
              type="password"
              id="adminSecretKey"
              value={formData.adminSecretKey}
              onChange={handleChange}
              error={!!formErrors.adminSecretKey}
              helperText={formErrors.adminSecretKey || "Enter the admin secret key provided by system administrator"}
              disabled={submitting || loading}
            />
          )}
          
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={agreeToTerms}
                onChange={handleTermsChange}
                disabled={submitting || loading}
              />
            }
            label="I agree to the Terms and Conditions and Privacy Policy"
            sx={{ mt: 2 }}
          />
          
          {termsError && (
            <Typography variant="caption" color="error" sx={{ display: 'block', mt: 1 }}>
              {termsError}
            </Typography>
          )}
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            startIcon={!submitting && !loading && <PersonAddIcon />}
            sx={{ mt: 3, mb: 2, py: 1.5 }}
            disabled={submitting || loading}
          >
            {submitting || loading ? <CircularProgress size={24} /> : 'Sign Up'}
          </Button>
          
          <Grid container justifyContent="center">
            <Grid item>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Typography variant="body2" color="primary">
                  Already have an account? Sign In
                </Typography>
              </Link>
            </Grid>
          </Grid>
          
          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="text.secondary">
              OR
            </Typography>
          </Divider>
          
          <Link to="/lost-items" style={{ textDecoration: 'none', width: '100%' }}>
            <Button
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
            >
              Continue as Guest
            </Button>
          </Link>
        </Box>
      </Paper>
    </Box>
  );
};

export default RegisterPage; 
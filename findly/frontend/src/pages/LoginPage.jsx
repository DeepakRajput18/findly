import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
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
  FormControlLabel,
  Checkbox,
  Tooltip,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Login as LoginIcon,
  AdminPanelSettings as AdminIcon,
} from '@mui/icons-material';
import AuthContext from '../context/AuthContext';

const LoginPage = () => {
  const { login, loading, error } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the redirect path from location state or use home page as default
  const from = location.state?.from || '/';
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Auto-select admin login mode if trying to access admin paths
  useEffect(() => {
    if (from.startsWith('/admin')) {
      setIsAdmin(true);
    }
  }, [from]);

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

  // Toggle password visibility
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Toggle admin login mode
  const handleAdminToggle = (e) => {
    setIsAdmin(e.target.checked);
    console.log('Admin login mode:', e.target.checked);
    
    // If toggling to admin mode, prefill admin email
    if (e.target.checked) {
      setFormData({
        ...formData,
        email: 'admin@example.com'
      });
    }
  };

  // Validate form
  const validateForm = () => {
    let valid = true;
    const errors = {
      email: '',
      password: '',
    };
    
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
      
      // Call login function from AuthContext with isAdmin flag
      await login(formData.email, formData.password, isAdmin);
      
      // If admin login, always redirect to admin dashboard
      if (isAdmin) {
        navigate('/admin/dashboard', { replace: true });
      } else {
        // Otherwise redirect to the page user was trying to access or home
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error('Login error:', error);
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
            {isAdmin ? 'Admin Login' : 'Welcome Back'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {isAdmin ? 'Sign in to access admin controls' : 'Sign in to continue to Findly'}
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
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
            error={!!formErrors.email}
            helperText={formErrors.email}
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
            autoComplete="current-password"
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
          
          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Tooltip title="Login with admin credentials">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isAdmin}
                    onChange={handleAdminToggle}
                    icon={<AdminIcon color="disabled" />}
                    checkedIcon={<AdminIcon color="primary" />}
                    disabled={submitting || loading}
                    sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                  />
                }
                label={
                  <Typography 
                    color={isAdmin ? "primary" : "textSecondary"}
                    fontWeight={isAdmin ? "bold" : "normal"}
                  >
                    Login as Admin
                  </Typography>
                }
                sx={{ 
                  border: isAdmin ? 1 : 0, 
                  borderColor: 'primary.main',
                  borderRadius: 1,
                  px: 1,
                  py: 0.5
                }}
              />
            </Tooltip>
          </Box>
          
          {isAdmin && (
            <Alert severity="info" sx={{ mt: 2, mb: 2 }}>
              <Typography variant="body2">
                <strong>Admin Login Credentials:</strong>
                <br />
                Email: admin@example.com
                <br />
                Password: password123
                <br /><br />
                <strong>Important:</strong> Make sure "Login as Admin" checkbox is selected.
              </Typography>
            </Alert>
          )}
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color={isAdmin ? "secondary" : "primary"}
            startIcon={!submitting && !loading && (isAdmin ? <AdminIcon /> : <LoginIcon />)}
            sx={{ mt: 3, mb: 2, py: 1.5 }}
            disabled={submitting || loading}
          >
            {submitting || loading ? (
              <CircularProgress size={24} />
            ) : (
              isAdmin ? 'Log in as Administrator' : 'Log in'
            )}
          </Button>
          
          {!isAdmin && (
            <Grid container justifyContent="space-between">
              <Grid item>
                <Link to="/forgot-password-otp" style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" color="primary">
                    Forgot password?
                  </Typography>
                </Link>
              </Grid>
              <Grid item>
                <Link to="/register" style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" color="primary">
                    Don't have an account? Sign Up
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          )}
          
          {!isAdmin && (
            <>
              <Divider sx={{ my: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  OR
                </Typography>
              </Divider>
              
              <Button
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
              >
                Continue as Guest
              </Button>
            </>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage; 
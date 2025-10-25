import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Fade,
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Alert,
  Stack,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  ExitToApp as LogoutIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Home as HomeIcon,
  Login as LoginIcon,
} from '@mui/icons-material';
import AuthContext from '../context/AuthContext';

const LogoutPage = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [logoutSuccess, setLogoutSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [countdown, setCountdown] = useState(5);

  // Auto-redirect if user is not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Countdown timer for auto-redirect
  useEffect(() => {
    if (logoutSuccess && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (logoutSuccess && countdown === 0) {
      navigate('/');
    }
  }, [logoutSuccess, countdown, navigate]);

  const handleLogoutClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmLogout = async () => {
    try {
      setLoading(true);
      setError(null);
      setShowConfirmation(false);
      
      // Simulate a brief delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Perform logout
      logout();
      
      // Show success state
      setLogoutSuccess(true);
      
    } catch (err) {
      setError('Logout failed. Please try again.');
      console.error('Logout error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelLogout = () => {
    setShowConfirmation(false);
    navigate(-1); // Go back to previous page
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoToLogin = () => {
    navigate('/login');
  };

  // Don't render if user is not logged in
  if (!user) {
    return null;
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Fade in={true} timeout={800}>
        <Box>
          {/* Success State */}
          {logoutSuccess ? (
            <Slide direction="up" in={logoutSuccess} timeout={600}>
              <Card 
                elevation={8}
                sx={{ 
                  textAlign: 'center',
                  background: `linear-gradient(135deg, ${theme.palette.success.light}15, ${theme.palette.success.main}05)`,
                  border: `2px solid ${theme.palette.success.main}30`,
                }}
              >
                <CardContent sx={{ py: 6 }}>
                  <CheckCircleIcon 
                    sx={{ 
                      fontSize: 80, 
                      color: 'success.main',
                      mb: 3,
                      animation: 'pulse 2s infinite',
                      '@keyframes pulse': {
                        '0%': { transform: 'scale(1)' },
                        '50%': { transform: 'scale(1.1)' },
                        '100%': { transform: 'scale(1)' },
                      }
                    }} 
                  />
                  
                  <Typography variant="h4" gutterBottom color="success.main" fontWeight="bold">
                    Successfully Logged Out
                  </Typography>
                  
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    You have been securely logged out of your account. Thank you for using Findly!
                  </Typography>

                  <Alert severity="info" sx={{ mb: 4, textAlign: 'left' }}>
                    <Typography variant="body2">
                      Redirecting to home page in {countdown} seconds...
                    </Typography>
                  </Alert>

                  <Stack 
                    direction={isMobile ? 'column' : 'row'} 
                    spacing={2} 
                    justifyContent="center"
                  >
                    <Button
                      variant="contained"
                      startIcon={<HomeIcon />}
                      onClick={handleGoHome}
                      size="large"
                      sx={{ minWidth: 160 }}
                    >
                      Go to Home
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<LoginIcon />}
                      onClick={handleGoToLogin}
                      size="large"
                      sx={{ minWidth: 160 }}
                    >
                      Login Again
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Slide>
          ) : (
            /* Logout Confirmation State */
            <Card elevation={4}>
              <CardContent sx={{ py: 6 }}>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                  <LogoutIcon 
                    sx={{ 
                      fontSize: 80, 
                      color: 'warning.main',
                      mb: 2,
                      opacity: 0.8
                    }} 
                  />
                  
                  <Typography variant="h4" gutterBottom fontWeight="bold">
                    Logout Confirmation
                  </Typography>
                  
                  <Typography variant="body1" color="text.secondary">
                    Are you sure you want to logout?
                  </Typography>
                </Box>

                {/* User Info */}
                <Card 
                  variant="outlined" 
                  sx={{ 
                    mb: 4, 
                    p: 3,
                    backgroundColor: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: '50%',
                        backgroundColor: theme.palette.primary.main,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '1.2rem',
                      }}
                    >
                      {user.name?.charAt(0)?.toUpperCase() || 'U'}
                    </Box>
                    <Box>
                      <Typography variant="h6" fontWeight="medium">
                        {user.name || 'User'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {user.email}
                      </Typography>
                      {user.isAdmin && (
                        <Typography variant="caption" color="primary" fontWeight="bold">
                          Administrator
                        </Typography>
                      )}
                    </Box>
                  </Stack>
                </Card>

                {/* Warning Message */}
                <Alert severity="warning" sx={{ mb: 4 }}>
                  <Typography variant="body2">
                    <strong>Note:</strong> You will need to login again to access your account, 
                    matches, messages, and other protected features.
                  </Typography>
                </Alert>

                {/* Action Buttons */}
                <Stack 
                  direction={isMobile ? 'column' : 'row'} 
                  spacing={2} 
                  justifyContent="center"
                >
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<LogoutIcon />}
                    onClick={handleLogoutClick}
                    size="large"
                    sx={{ minWidth: 160 }}
                    disabled={loading}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Yes, Logout'}
                  </Button>
                  
                  <Button
                    variant="outlined"
                    onClick={handleCancelLogout}
                    size="large"
                    sx={{ minWidth: 160 }}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                </Stack>

                {/* Error Display */}
                {error && (
                  <Alert severity="error" sx={{ mt: 3 }}>
                    {error}
                  </Alert>
                )}
              </CardContent>
            </Card>
          )}
        </Box>
      </Fade>

      {/* Confirmation Dialog */}
      <Dialog
        open={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
          <WarningIcon sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
          <Typography variant="h5" fontWeight="bold">
            Confirm Logout
          </Typography>
        </DialogTitle>
        
        <DialogContent>
          <DialogContentText sx={{ textAlign: 'center', mb: 2 }}>
            <Typography variant="body1" gutterBottom>
              You are about to logout from your Findly account.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This action will end your current session and you'll need to login again 
              to access your account.
            </Typography>
          </DialogContentText>
          
          <Divider sx={{ my: 2 }} />
          
          <Box sx={{ p: 2, backgroundColor: theme.palette.background.default, borderRadius: 1 }}>
            <Typography variant="subtitle2" gutterBottom>
              Current Session:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • User: {user.name || 'Unknown'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Email: {user.email}
            </Typography>
            {user.isAdmin && (
              <Typography variant="body2" color="primary">
                • Role: Administrator
              </Typography>
            )}
          </Box>
        </DialogContent>
        
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button 
            onClick={() => setShowConfirmation(false)}
            disabled={loading}
            sx={{ minWidth: 100 }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmLogout}
            variant="contained"
            color="error"
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <LogoutIcon />}
            disabled={loading}
            sx={{ minWidth: 120 }}
          >
            {loading ? 'Logging out...' : 'Logout'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default LogoutPage;

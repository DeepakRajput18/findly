import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  Link
} from '@mui/material';
import { ArrowBack, Security } from '@mui/icons-material';
import axios from 'axios';

const VerifyOTPPage = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
      setPreviewUrl(location.state.previewUrl || '');
    } else {
      navigate('/forgot-password');
    }
  }, [location.state, navigate]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/users/auth/verify-otp', {
        email: email,
        otp: otp
      });

      setMessage(response.data.message);
      
      // Navigate to reset password page
      navigate('/reset-password', { 
        state: { 
          email: email,
          otp: otp,
          token: response.data.token 
        } 
      });
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Invalid OTP. Please try again.';
      
      // Handle specific error cases
      if (errorMessage.includes('expired')) {
        setError('OTP has expired. Please request a new one.');
        setTimeout(() => {
          navigate('/forgot-password');
        }, 2000);
      } else if (errorMessage.includes('Invalid')) {
        setError('Invalid OTP. Please check the code and try again.');
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await axios.post('/api/users/auth/forgot-password', {
        email: email
      });

      setMessage('OTP sent successfully!');
      setTimeLeft(300); // Reset timer
      setPreviewUrl(response.data.previewUrl || '');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate('/forgot-password')}
              sx={{ mr: 2 }}
            >
              Back
            </Button>
            <Typography component="h1" variant="h4" sx={{ flexGrow: 1, textAlign: 'center' }}>
              Verify OTP
            </Typography>
          </Box>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 2, textAlign: 'center' }}>
            We've sent a 6-digit OTP code to <strong>{email}</strong>
          </Typography>

          {timeLeft > 0 && (
            <Typography variant="body2" color="primary" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }}>
              Time remaining: {formatTime(timeLeft)}
            </Typography>
          )}

          {timeLeft === 0 && (
            <Alert severity="warning" sx={{ mb: 2 }}>
              OTP has expired. Please request a new one.
            </Alert>
          )}

          {previewUrl && (
            <Alert severity="info" sx={{ mb: 2 }}>
              <Typography variant="body2">
                For testing: <Link href={previewUrl} target="_blank" rel="noopener">View Email Preview</Link>
              </Typography>
            </Alert>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {message && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {message}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="otp"
              label="Enter 6-digit OTP"
              name="otp"
              autoComplete="off"
              autoFocus
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              InputProps={{
                startAdornment: <Security sx={{ mr: 1, color: 'action.active' }} />,
                inputProps: { 
                  maxLength: 6,
                  style: { textAlign: 'center', fontSize: '1.5rem', letterSpacing: '0.5rem' }
                }
              }}
              disabled={timeLeft === 0}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
              disabled={loading || otp.length !== 6 || timeLeft === 0}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Verify OTP'
              )}
            </Button>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Didn't receive the code?{' '}
                <Button
                  variant="text"
                  onClick={handleResendOTP}
                  disabled={loading}
                  sx={{ textTransform: 'none' }}
                >
                  Resend OTP
                </Button>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default VerifyOTPPage;

import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Link
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

const ForgotPasswordPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    method: 'email' // 'email' or 'sms'
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // 1: Request reset, 2: Enter code, 3: New password
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRequestReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const payload = {
        method: formData.method,
        ...(formData.method === 'email' ? { email: formData.email } : { phone: formData.phone })
      };

      const response = await axios.post('/api/users/forgot-password', payload);
      
      setMessage(response.data.message || 'Reset code sent successfully!');
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        method: formData.method,
        code: resetCode,
        ...(formData.method === 'email' ? { email: formData.email } : { phone: formData.phone })
      };

      const response = await axios.post('/api/users/verify-reset-code', payload);
      
      setMessage('Code verified successfully!');
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid reset code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      const payload = {
        method: formData.method,
        code: resetCode,
        newPassword: newPassword,
        ...(formData.method === 'email' ? { email: formData.email } : { phone: formData.phone })
      };

      const response = await axios.post('/api/users/reset-password', payload);
      
      setMessage('Password reset successfully! You can now login with your new password.');
      setStep(1);
      setFormData({ email: '', phone: '', method: 'email' });
      setResetCode('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <Box component="form" onSubmit={handleRequestReset} sx={{ mt: 2 }}>
      <Typography variant="h5" gutterBottom align="center">
        Forgot Password
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
        Enter your email or phone number to receive a reset code
      </Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel>Reset Method</InputLabel>
        <Select
          name="method"
          value={formData.method}
          onChange={handleInputChange}
          label="Reset Method"
        >
          <MenuItem value="email">Email</MenuItem>
          <MenuItem value="sms">SMS</MenuItem>
        </Select>
      </FormControl>

      {formData.method === 'email' ? (
        <TextField
          fullWidth
          name="email"
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          margin="normal"
          required
          autoComplete="email"
        />
      ) : (
        <TextField
          fullWidth
          name="phone"
          label="Phone Number"
          type="tel"
          value={formData.phone}
          onChange={handleInputChange}
          margin="normal"
          required
          placeholder="+1234567890"
        />
      )}

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Send Reset Code'}
      </Button>

      <Box textAlign="center">
        <Link component={RouterLink} to="/login" variant="body2">
          Back to Login
        </Link>
      </Box>
    </Box>
  );

  const renderStep2 = () => (
    <Box component="form" onSubmit={handleVerifyCode} sx={{ mt: 2 }}>
      <Typography variant="h5" gutterBottom align="center">
        Enter Reset Code
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
        We sent a {formData.method === 'email' ? '6-digit code to your email' : 'SMS code to your phone'}
      </Typography>

      <TextField
        fullWidth
        name="resetCode"
        label="Reset Code"
        value={resetCode}
        onChange={(e) => setResetCode(e.target.value)}
        margin="normal"
        required
        placeholder="Enter 6-digit code"
        inputProps={{ maxLength: 6 }}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={loading || resetCode.length !== 6}
      >
        {loading ? <CircularProgress size={24} /> : 'Verify Code'}
      </Button>

      <Box textAlign="center">
        <Button
          variant="text"
          onClick={() => setStep(1)}
          sx={{ mr: 2 }}
        >
          Back
        </Button>
        <Button
          variant="text"
          onClick={() => {
            setStep(1);
            setResetCode('');
          }}
        >
          Resend Code
        </Button>
      </Box>
    </Box>
  );

  const renderStep3 = () => (
    <Box component="form" onSubmit={handleResetPassword} sx={{ mt: 2 }}>
      <Typography variant="h5" gutterBottom align="center">
        Set New Password
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
        Enter your new password
      </Typography>

      <TextField
        fullWidth
        name="newPassword"
        label="New Password"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        margin="normal"
        required
        autoComplete="new-password"
      />

      <TextField
        fullWidth
        name="confirmPassword"
        label="Confirm New Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        margin="normal"
        required
        autoComplete="new-password"
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={loading || !newPassword || !confirmPassword}
      >
        {loading ? <CircularProgress size={24} /> : 'Reset Password'}
      </Button>

      <Box textAlign="center">
        <Button
          variant="text"
          onClick={() => setStep(2)}
        >
          Back
        </Button>
      </Box>
    </Box>
  );

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
          {message && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {message}
            </Alert>
          )}
          
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </Paper>
      </Box>
    </Container>
  );
};

export default ForgotPasswordPage;


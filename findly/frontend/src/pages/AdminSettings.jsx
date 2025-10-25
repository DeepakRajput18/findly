import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Divider,
  Alert,
  AlertTitle,
  Card,
  CardContent,
  CardHeader,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Tooltip,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
} from '@mui/material';
import {
  Save as SaveIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
  Info as InfoIcon,
  CloudUpload as UploadIcon,
  Email as EmailIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    // Site settings
    siteName: 'Findly',
    siteDescription: 'Lost and Found Platform',
    contactEmail: 'admin@findly.com',
    supportEmail: 'support@findly.com',
    
    // Feature toggles
    enableRegistration: true,
    enableGuestAccess: true,
    enableEmailNotifications: true,
    enableMapFeature: true,
    enableAIMatching: true,
    
    // Security settings
    maxLoginAttempts: 5,
    accountLockoutDuration: 30,
    sessionTimeout: 60,
    
    // Content moderation
    automaticModeration: true,
    moderationLevel: 'medium',
    
    // Backup settings
    backupFrequency: 'daily',
  });
  
  const [confirmReset, setConfirmReset] = useState(false);
  const [showRestartDialog, setShowRestartDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  
  // Handle settings change
  const handleSettingChange = (setting, value) => {
    setSettings({
      ...settings,
      [setting]: value,
    });
  };
  
  // Handle text field change
  const handleTextChange = (e) => {
    const { name, value } = e.target;
    handleSettingChange(name, value);
  };
  
  // Handle toggle change
  const handleToggleChange = (e) => {
    const { name, checked } = e.target;
    handleSettingChange(name, checked);
  };
  
  // Handle select change
  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    handleSettingChange(name, value);
  };
  
  // Handle reset confirmation
  const handleResetConfirm = () => {
    setConfirmReset(true);
  };
  
  // Handle reset cancel
  const handleResetCancel = () => {
    setConfirmReset(false);
  };
  
  // Handle restart system dialog
  const handleRestartOpen = () => {
    setShowRestartDialog(true);
  };
  
  const handleRestartClose = () => {
    setShowRestartDialog(false);
  };

  // Handle save changes
  const handleSaveChanges = (section) => {
    // In a real application, you would save to a database or API here
    // For now, we'll just show a success message
    setSnackbarMessage(`${section} settings saved successfully`);
    setSnackbarOpen(true);
  };

  // Handle close snackbar
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  // Handle reset all settings
  const handleResetAll = () => {
    // Reset settings to default values
    setSettings({
      siteName: 'Findly',
      siteDescription: 'Lost and Found Platform',
      contactEmail: 'admin@findly.com',
      supportEmail: 'support@findly.com',
      enableRegistration: true,
      enableGuestAccess: true,
      enableEmailNotifications: true,
      enableMapFeature: true,
      enableAIMatching: true,
      maxLoginAttempts: 5,
      accountLockoutDuration: 30,
      sessionTimeout: 60,
      automaticModeration: true,
      moderationLevel: 'medium',
      backupFrequency: 'daily',
    });

    setConfirmReset(false);
    setSnackbarMessage('All settings reset to default values');
    setSnackbarOpen(true);
  };

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          System Settings
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Configure and customize the Findly platform settings.
        </Typography>
      </Paper>

      <Grid container spacing={3}>
        {/* Site Settings */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 2, height: '100%' }}>
            <CardHeader title="Site Configuration" />
            <Divider />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Site Name"
                    name="siteName"
                    value={settings.siteName}
                    onChange={handleTextChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Site Description"
                    name="siteDescription"
                    value={settings.siteDescription}
                    onChange={handleTextChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Contact Email"
                    name="contactEmail"
                    value={settings.contactEmail}
                    onChange={handleTextChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Support Email"
                    name="supportEmail"
                    value={settings.supportEmail}
                    onChange={handleTextChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button 
                      variant="contained" 
                      startIcon={<SaveIcon />}
                      onClick={() => handleSaveChanges('Site configuration')}
                    >
                      Save Changes
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Feature Toggles */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 2, height: '100%' }}>
            <CardHeader title="Feature Settings" />
            <Divider />
            <CardContent>
              <List>
                <ListItem>
                  <ListItemText 
                    primary="Enable User Registration" 
                    secondary="Allow new users to register accounts"
                  />
                  <Switch
                    name="enableRegistration"
                    checked={settings.enableRegistration}
                    onChange={handleToggleChange}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Enable Guest Access" 
                    secondary="Allow limited access without login"
                  />
                  <Switch
                    name="enableGuestAccess"
                    checked={settings.enableGuestAccess}
                    onChange={handleToggleChange}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Email Notifications" 
                    secondary="Send automatic emails for important events"
                  />
                  <Switch
                    name="enableEmailNotifications"
                    checked={settings.enableEmailNotifications}
                    onChange={handleToggleChange}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Map Feature" 
                    secondary="Enable location-based searching"
                  />
                  <Switch
                    name="enableMapFeature"
                    checked={settings.enableMapFeature}
                    onChange={handleToggleChange}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="AI Matching" 
                    secondary="Enable AI-powered item matching suggestions"
                  />
                  <Switch
                    name="enableAIMatching"
                    checked={settings.enableAIMatching}
                    onChange={handleToggleChange}
                  />
                </ListItem>
              </List>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button 
                  variant="contained" 
                  startIcon={<SaveIcon />}
                  onClick={() => handleSaveChanges('Feature')}
                >
                  Save Changes
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Security Settings */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 2, height: '100%' }}>
            <CardHeader title="Security Settings" />
            <Divider />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Max Login Attempts"
                    name="maxLoginAttempts"
                    type="number"
                    value={settings.maxLoginAttempts}
                    onChange={handleTextChange}
                    InputProps={{ inputProps: { min: 1, max: 10 } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Account Lockout Duration (mins)"
                    name="accountLockoutDuration"
                    type="number"
                    value={settings.accountLockoutDuration}
                    onChange={handleTextChange}
                    InputProps={{ inputProps: { min: 5, max: 60 } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Session Timeout (mins)"
                    name="sessionTimeout"
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={handleTextChange}
                    InputProps={{ inputProps: { min: 15, max: 240 } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        name="automaticModeration"
                        checked={settings.automaticModeration}
                        onChange={handleToggleChange}
                      />
                    }
                    label="Automatic Content Moderation"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Moderation Level</InputLabel>
                    <Select
                      name="moderationLevel"
                      value={settings.moderationLevel}
                      onChange={handleSelectChange}
                      label="Moderation Level"
                    >
                      <MenuItem value="low">Low</MenuItem>
                      <MenuItem value="medium">Medium</MenuItem>
                      <MenuItem value="high">High</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button 
                      variant="contained" 
                      startIcon={<SaveIcon />}
                      onClick={() => handleSaveChanges('Security')}
                    >
                      Save Changes
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* System Maintenance */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 2, height: '100%' }}>
            <CardHeader 
              title="System Maintenance" 
              action={
                <Tooltip title="System operations that may affect platform availability">
                  <IconButton>
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              }
            />
            <Divider />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Database Backup Frequency</InputLabel>
                    <Select
                      name="backupFrequency"
                      value={settings.backupFrequency}
                      onChange={handleSelectChange}
                      label="Database Backup Frequency"
                    >
                      <MenuItem value="hourly">Hourly</MenuItem>
                      <MenuItem value="daily">Daily</MenuItem>
                      <MenuItem value="weekly">Weekly</MenuItem>
                      <MenuItem value="monthly">Monthly</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Alert severity="info">
                    <AlertTitle>System Information</AlertTitle>
                    Current version: <strong>1.2.0</strong><br />
                    Last backup: <strong>2023-03-16 04:00 AM</strong><br />
                    Server status: <strong>Online</strong>
                  </Alert>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Button 
                      variant="outlined" 
                      color="primary"
                      startIcon={<UploadIcon />}
                      onClick={() => {
                        setSnackbarMessage('Database backup started');
                        setSnackbarOpen(true);
                      }}
                    >
                      Backup Now
                    </Button>
                    <Button 
                      variant="outlined" 
                      color="secondary"
                      startIcon={<EmailIcon />}
                      onClick={() => {
                        setSnackbarMessage('Test emails sent successfully');
                        setSnackbarOpen(true);
                      }}
                    >
                      Test Emails
                    </Button>
                    <Button 
                      variant="outlined" 
                      color="warning"
                      startIcon={<RefreshIcon />}
                      onClick={handleRestartOpen}
                    >
                      Restart System
                    </Button>
                  </Box>
                </Grid>
                <Grid item xs={12} sx={{ mt: 2 }}>
                  {confirmReset ? (
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="subtitle1" color="error">
                        Are you sure? This will reset ALL settings to default.
                      </Typography>
                      <Box sx={{ mt: 1 }}>
                        <Button 
                          variant="contained" 
                          color="error" 
                          sx={{ mr: 1 }}
                          onClick={handleResetAll}
                        >
                          Yes, Reset All
                        </Button>
                        <Button 
                          variant="outlined"
                          onClick={handleResetCancel}
                        >
                          Cancel
                        </Button>
                      </Box>
                    </Box>
                  ) : (
                    <Button 
                      variant="outlined" 
                      color="error"
                      startIcon={<WarningIcon />}
                      fullWidth
                      onClick={handleResetConfirm}
                    >
                      Reset to Default Settings
                    </Button>
                  )}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Restart System Dialog */}
      <Dialog
        open={showRestartDialog}
        onClose={handleRestartClose}
      >
        <DialogTitle>Restart System?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Restarting the system will temporarily make the platform unavailable to all users. 
            Any unsaved data will be lost. This operation will take approximately 2-3 minutes.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRestartClose} color="primary">
            Cancel
          </Button>
          <Button 
            onClick={() => {
              handleRestartClose();
              setSnackbarMessage('System restart initiated. The platform will be temporarily unavailable.');
              setSnackbarOpen(true);
            }} 
            color="error" 
            autoFocus
          >
            Restart Now
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
};

export default AdminSettings; 
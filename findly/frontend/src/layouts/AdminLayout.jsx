import { useState, useContext, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Badge,
  useMediaQuery,
  Paper,
  Breadcrumbs,
  LinearProgress,
  Stack,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Snackbar,
  CircularProgress,
  Grid,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Dashboard as DashboardIcon,
  People as UsersIcon,
  Inventory as ItemsIcon,
  Flag as ReportsIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  ArrowBack as ArrowBackIcon,
  Notifications as NotificationsIcon,
  ExpandMore as ExpandMoreIcon,
  ChevronRight as ChevronRightIcon,
  HelpOutline as HelpIcon,
  PhotoCamera as CameraIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';
import AuthContext from '../context/AuthContext';

const AdminLayout = ({ toggleDarkMode, darkMode }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [drawerOpen, setDrawerOpen] = useState(!isMobile);
  const [loading, setLoading] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNotifications, setAnchorElNotifications] = useState(null);
  const [anchorElHelp, setAnchorElHelp] = useState(null);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Admin User',
    email: user?.email || 'admin@findly.com',
    role: 'Administrator',
    bio: 'Platform administrator responsible for system management and user support.',
    phone: '+1 (555) 123-4567',
    profileImage: user?.profileImage || ''
  });
  const [savingProfile, setSavingProfile] = useState(false);

  // Parse the current route for breadcrumbs
  const getPathParts = () => {
    const parts = location.pathname.split('/').filter(part => part !== '');
    return parts.map((part, index) => {
      const path = '/' + parts.slice(0, index + 1).join('/');
      return {
        name: part.charAt(0).toUpperCase() + part.slice(1),
        path
      };
    });
  };
  
  const pathParts = getPathParts();

  // Handle page transition loading effect
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    navigate('/logout');
  };
  
  const handleOpenNotifications = (event) => {
    setAnchorElNotifications(event.currentTarget);
  };
  
  const handleCloseNotifications = () => {
    setAnchorElNotifications(null);
  };
  
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  
  const handleHelpOpen = (event) => {
    setAnchorElHelp(event.currentTarget);
  };
  
  const handleHelpClose = () => {
    setAnchorElHelp(null);
  };
  
  const navigateToHome = () => {
    navigate('/');
  };

  // Handle profile dialog
  const handleOpenProfileDialog = () => {
    handleCloseUserMenu();
    setProfileDialogOpen(true);
  };

  const handleCloseProfileDialog = () => {
    setProfileDialogOpen(false);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  const handleSaveProfile = () => {
    setSavingProfile(true);
    // Simulate API call
    setTimeout(() => {
      setSavingProfile(false);
      handleCloseProfileDialog();
      setSnackbarMessage('Profile updated successfully');
      setSnackbarOpen(true);
    }, 1000);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const adminMenuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <DashboardIcon /> },
    { name: 'Users', path: '/admin/users', icon: <UsersIcon /> },
    { name: 'Items', path: '/admin/items', icon: <ItemsIcon /> },
    { name: 'Reports', path: '/admin/reports', icon: <ReportsIcon /> },
    { name: 'Settings', path: '/admin/settings', icon: <SettingsIcon /> },
  ];

  const drawerWidth = 240;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Admin AppBar */}
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: theme => theme.zIndex.drawer + 1,
          backgroundColor: 'primary.dark',
          boxShadow: 3
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/admin/dashboard"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            FINDLY ADMIN
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          {/* Back to Site button */}
          <Button
            variant="contained"
            size="small"
            startIcon={<ArrowBackIcon />}
            onClick={navigateToHome}
            sx={{ 
              mr: 2, 
              backgroundColor: 'rgba(255,255,255,0.2)',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.3)',
              }
            }}
          >
            Back to Site
          </Button>

          {/* Dark Mode toggle */}
          <Tooltip title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
            <IconButton sx={{ mr: 1 }} onClick={toggleDarkMode} color="inherit">
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>

          {/* Notifications */}
          <Tooltip title="Notifications">
            <IconButton
              size="large"
              color="inherit"
              onClick={handleOpenNotifications}
              sx={{ mr: 1 }}
            >
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorElNotifications}
            open={Boolean(anchorElNotifications)}
            onClose={handleCloseNotifications}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleCloseNotifications}>
              <Typography variant="body2">New user registration</Typography>
            </MenuItem>
            <MenuItem onClick={handleCloseNotifications}>
              <Typography variant="body2">New report submitted</Typography>
            </MenuItem>
            <MenuItem onClick={handleCloseNotifications}>
              <Typography variant="body2">System update available</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleCloseNotifications}>
              <Typography variant="body2" color="primary">View all notifications</Typography>
            </MenuItem>
          </Menu>

          {/* Help Menu */}
          <Tooltip title="Help">
            <IconButton
              size="large"
              color="inherit"
              onClick={handleHelpOpen}
              sx={{ mr: 1 }}
            >
              <HelpIcon />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorElHelp}
            open={Boolean(anchorElHelp)}
            onClose={handleHelpClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleHelpClose}>
              <Typography variant="body2">Admin Documentation</Typography>
            </MenuItem>
            <MenuItem onClick={handleHelpClose}>
              <Typography variant="body2">API Reference</Typography>
            </MenuItem>
            <MenuItem onClick={handleHelpClose}>
              <Typography variant="body2">Contact Support</Typography>
            </MenuItem>
          </Menu>

          {/* User Menu */}
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar 
                alt={profileData.name} 
                src={profileData.profileImage} 
                sx={{ 
                  bgcolor: 'primary.main',
                  border: '2px solid white'
                }}
              />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem>
              <ListItemText
                primary={profileData.name}
                secondary={profileData.email}
              />
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleOpenProfileDialog}>
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              <Typography textAlign="center">Profile</Typography>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <Typography textAlign="center">Logout</Typography>
            </MenuItem>
          </Menu>
        </Toolbar>
        
        {/* Loading Indicator */}
        {loading && (
          <LinearProgress 
            color="primary" 
            sx={{ 
              height: 3, 
              position: 'absolute', 
              bottom: 0, 
              width: '100%' 
            }}
          />
        )}
      </AppBar>

      {/* Admin Sidebar */}
      <Drawer
        variant={isMobile ? "temporary" : "persistent"}
        open={drawerOpen}
        onClose={isMobile ? handleDrawerToggle : undefined}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderRight: '1px solid rgba(0, 0, 0, 0.12)',
            boxShadow: 'none',
            mt: '64px', // AppBar height
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', height: '100%' }}>
          <List>
            {adminMenuItems.map((item) => (
              <ListItem
                button
                key={item.name}
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
                sx={{
                  borderRadius: '0 24px 24px 0',
                  mr: 1,
                  mb: 0.5,
                  color: location.pathname === item.path ? 'primary.main' : 'text.primary',
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(25, 118, 210, 0.12)',
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(25, 118, 210, 0.08)',
                  },
                }}
              >
                <ListItemIcon sx={{ color: location.pathname === item.path ? 'primary.main' : 'text.primary' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
                {location.pathname === item.path && (
                  <Box
                    sx={{
                      width: 4,
                      height: '60%',
                      backgroundColor: 'primary.main',
                      position: 'absolute',
                      left: 0,
                      borderRadius: '0 4px 4px 0',
                    }}
                  />
                )}
              </ListItem>
            ))}
          </List>
          
          <Box sx={{ position: 'absolute', bottom: 0, width: '100%', p: 2 }}>
            <Paper sx={{ p: 2, borderRadius: 2, bgcolor: 'background.paper' }}>
              <Typography variant="subtitle2" gutterBottom>
                Admin Session
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                You are logged in as an admin user with full privileges.
              </Typography>
              <Button 
                variant="outlined" 
                size="small" 
                color="error" 
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
                fullWidth
              >
                End Session
              </Button>
            </Paper>
          </Box>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ 
        flexGrow: 1, 
        p: 3, 
        mt: '64px',
        ml: isMobile ? 0 : (drawerOpen ? `${drawerWidth}px` : 0),
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      }}>
        {/* Breadcrumbs */}
        <Breadcrumbs 
          separator={<ChevronRightIcon fontSize="small" />} 
          sx={{ mb: 3 }}
        >
          <Link 
            to="/admin/dashboard" 
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
          >
            <DashboardIcon fontSize="small" sx={{ mr: 0.5 }} />
            <Typography color="text.primary">Admin</Typography>
          </Link>
          
          {pathParts.length > 1 && pathParts.slice(1).map((part, index) => (
            <Link
              key={part.path}
              to={part.path}
              style={{ 
                textDecoration: 'none',
                color: index === pathParts.length - 2 ? 'inherit' : theme.palette.text.primary
              }}
            >
              <Typography>
                {part.name}
              </Typography>
            </Link>
          ))}
        </Breadcrumbs>

        {/* Page Content */}
        <Outlet />
      </Box>

      {/* Profile Dialog */}
      <Dialog 
        open={profileDialogOpen} 
        onClose={handleCloseProfileDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Admin Profile</DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 3, mt: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar 
              src={profileData.profileImage} 
              alt={profileData.name}
              sx={{ width: 100, height: 100, mb: 2 }}
            />
            <Button
              variant="outlined"
              startIcon={<CameraIcon />}
              size="small"
            >
              Change Photo
            </Button>
          </Box>
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={profileData.name}
                onChange={handleProfileChange}
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={profileData.email}
                onChange={handleProfileChange}
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Role"
                name="role"
                value={profileData.role}
                onChange={handleProfileChange}
                margin="normal"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={profileData.phone}
                onChange={handleProfileChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Bio"
                name="bio"
                value={profileData.bio}
                onChange={handleProfileChange}
                margin="normal"
                multiline
                rows={3}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button 
            onClick={handleCloseProfileDialog} 
            color="inherit"
            startIcon={<CancelIcon />}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSaveProfile} 
            variant="contained" 
            color="primary"
            startIcon={savingProfile ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
            disabled={savingProfile}
          >
            {savingProfile ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
};

export default AdminLayout; 
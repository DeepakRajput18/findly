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
  Zoom,
  Slide,
  Fade,
  Chip,
  LinearProgress,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Mail as MailIcon,
  Home as HomeIcon,
  FindInPage as LostItemsIcon,
  EmojiObjects as FoundItemsIcon,
  Compare as MatchesIcon,
  Map as MapIcon,
  Person as ProfileIcon,
  ExitToApp as LogoutIcon,
  Login as LoginIcon,
  PersonAdd as RegisterIcon,
  Dashboard as DashboardIcon,
  Help as HelpIcon,
  Article as ArticleIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import AuthContext from '../context/AuthContext';
import Footer from '../components/Footer';
import Logo from '../components/Logo';

const MainLayout = ({ toggleDarkMode, darkMode }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width:900px)');
  
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState(3); // Mock notification count
  const [messages, setMessages] = useState(2); // Mock message count
  const [searchOpen, setSearchOpen] = useState(false);
  const [helpAnchorEl, setHelpAnchorEl] = useState(null);

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

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    navigate('/logout');
  };
  
  const handleHelpOpen = (event) => {
    setHelpAnchorEl(event.currentTarget);
  };
  
  const handleHelpClose = () => {
    setHelpAnchorEl(null);
  };

  const navItems = [
    { name: 'Home', path: '/', icon: <HomeIcon /> },
    { name: 'Lost Items', path: '/lost-items', icon: <LostItemsIcon /> },
    { name: 'Found Items', path: '/found-items', icon: <FoundItemsIcon /> },
    { name: 'Map', path: '/map', icon: <MapIcon /> },
  ];

  const authItems = user
    ? [
        { name: 'Profile', path: '/profile', icon: <ProfileIcon /> },
        { name: 'Matches', path: '/matches', icon: <MatchesIcon /> },
        { name: 'Messages', path: '/messages', icon: <MailIcon />, badge: messages },
        { name: 'Notifications', path: '/notifications', icon: <NotificationsIcon />, badge: notifications },
        { name: 'Logout', onClick: handleLogout, icon: <LogoutIcon /> },
      ]
    : [
        { name: 'Login', path: '/login', icon: <LoginIcon /> },
        { name: 'Register', path: '/register', icon: <RegisterIcon /> },
      ];
      
  const helpItems = [
    { name: 'How it Works', path: '/how-it-works', icon: <ArticleIcon /> },
    { name: 'Contact Support', path: '/contact', icon: <HelpIcon /> },
  ];

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Logo component={Link} to="/" />
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem
            button
            key={item.name}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              color: location.pathname === item.path ? 'primary.main' : 'text.primary',
              '&.Mui-selected': {
                backgroundColor: 'rgba(33, 150, 243, 0.1)',
              },
              '&:hover': {
                backgroundColor: 'rgba(33, 150, 243, 0.05)',
                transform: 'translateX(5px)',
                transition: 'transform 0.2s ease-in-out',
              },
              transition: 'transform 0.2s ease-in-out, background-color 0.2s ease',
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
                  height: '70%',
                  backgroundColor: 'primary.main',
                  position: 'absolute',
                  right: 0,
                  borderRadius: '4px 0 0 4px',
                }}
              />
            )}
          </ListItem>
        ))}
      </List>
      <Divider />
      {!user ? (
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, pl: 2 }}>
            Account
          </Typography>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
            startIcon={<LoginIcon />}
            sx={{ mb: 1 }}
          >
            Login
          </Button>
          <Button
            fullWidth
            variant="outlined"
            component={Link}
            to="/register"
            startIcon={<RegisterIcon />}
          >
            Register
          </Button>
        </Box>
      ) : (
        <List>
          <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
            <Avatar
              alt={user.name}
              src={user.profileImage ? `http://localhost:5001${user.profileImage}` : ''}
              sx={{ width: 40, height: 40, mr: 2 }}
            />
            <Box>
              <Typography variant="subtitle1">{user.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {user.email}
              </Typography>
            </Box>
          </Box>
          <Divider />
          {authItems.map((item) => (
            <ListItem
              button
              key={item.name}
              component={item.path ? Link : 'div'}
              to={item.path}
              onClick={item.onClick}
              selected={item.path && location.pathname === item.path}
              sx={{
                color: item.path && location.pathname === item.path ? 'primary.main' : 'text.primary',
                '&.Mui-selected': {
                  backgroundColor: 'rgba(33, 150, 243, 0.1)',
                },
                '&:hover': {
                  backgroundColor: 'rgba(33, 150, 243, 0.05)',
                  transform: 'translateX(5px)',
                  transition: 'transform 0.2s ease-in-out',
                },
                transition: 'transform 0.2s ease-in-out, background-color 0.2s ease',
              }}
            >
              <ListItemIcon sx={{ color: item.path && location.pathname === item.path ? 'primary.main' : 'text.primary' }}>
                {item.badge ? (
                  <Badge badgeContent={item.badge} color="error">
                    {item.icon}
                  </Badge>
                ) : (
                  item.icon
                )}
              </ListItemIcon>
              <ListItemText primary={item.name} />
              {item.path && location.pathname === item.path && (
                <Box
                  sx={{
                    width: 4,
                    height: '70%',
                    backgroundColor: 'primary.main',
                    position: 'absolute',
                    right: 0,
                    borderRadius: '4px 0 0 4px',
                  }}
                />
              )}
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="sticky" elevation={darkMode ? 2 : 0}>
        {loading && <LinearProgress color="secondary" sx={{ position: 'absolute', top: 0, left: 0, right: 0 }} />}
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Logo for larger screens */}
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                mr: 2,
              }}
            >
              <Logo component={Link} to="/" />
            </Box>
            
            {/* Mobile menu icon */}
            <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="menu"
                onClick={handleDrawerToggle}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>
            
            {/* Mobile logo */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'flex', md: 'none' },
                justifyContent: 'center',
              }}
            >
              <Logo component={Link} to="/" variant="small" />
            </Box>

            {/* Desktop navigation */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {navItems.map((item, index) => (
                <Zoom in={true} style={{ transitionDelay: `${100 + index * 50}ms` }} key={item.name}>
                  <Button
                    component={Link}
                    to={item.path}
                    sx={{
                      mx: 1,
                      my: 2,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      position: 'relative',
                      backgroundColor: location.pathname === item.path ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        transform: 'translateY(-3px)',
                        transition: 'transform 0.2s ease-in-out',
                      },
                      transition: 'transform 0.2s ease-in-out, background-color 0.3s ease',
                      overflow: 'hidden',
                      borderRadius: 1,
                      px: 2,
                    }}
                  >
                    <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                      {item.icon}
                    </Box>
                    {item.name}
                    {location.pathname === item.path && (
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          width: '100%',
                          height: 3,
                          bgcolor: 'secondary.main',
                        }}
                      />
                    )}
                  </Button>
                </Zoom>
              ))}
            </Box>

            {/* Help Menu */}
            <Tooltip title="Help & Resources">
              <IconButton
                onClick={handleHelpOpen}
                color="inherit"
                sx={{ 
                  mx: 0.5,
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'scale(1.1)' }
                }}
              >
                <HelpIcon />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={helpAnchorEl}
              open={Boolean(helpAnchorEl)}
              onClose={handleHelpClose}
              sx={{ mt: 1 }}
            >
              {helpItems.map((item) => (
                <MenuItem 
                  key={item.name} 
                  component={Link} 
                  to={item.path}
                  onClick={handleHelpClose}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    minWidth: 180,
                    '&:hover': {
                      backgroundColor: 'rgba(33, 150, 243, 0.08)',
                    }
                  }}
                >
                  {item.icon}
                  <Typography variant="body2">{item.name}</Typography>
                </MenuItem>
              ))}
            </Menu>

            {/* Search button */}
            <Tooltip title="Search">
              <IconButton 
                color="inherit"
                onClick={() => setSearchOpen(!searchOpen)}
                sx={{
                  mx: 0.5,
                  transition: 'transform 0.2s, background-color 0.3s',
                  backgroundColor: searchOpen ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                  '&:hover': { transform: 'scale(1.1)' }
                }}
              >
                <SearchIcon />
              </IconButton>
            </Tooltip>

            {/* Dark mode toggle */}
            <Tooltip title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
              <IconButton 
                sx={{ 
                  mx: 0.5,
                  transition: 'transform 0.3s, background-color 0.3s',
                  '&:hover': { transform: 'rotate(180deg)' }
                }} 
                onClick={toggleDarkMode} 
                color="inherit"
              >
                {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Tooltip>

            {/* Authentication section */}
            {user ? (
              <>
                {/* Notifications */}
                <Tooltip title="Notifications">
                  <IconButton
                    component={Link}
                    to="/notifications"
                    color="inherit"
                    sx={{ 
                      mx: 0.5,
                      transition: 'transform 0.2s',
                      '&:hover': { transform: 'scale(1.1)' }
                    }}
                  >
                    <Badge badgeContent={notifications} color="error">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>

                {/* Messages */}
                <Tooltip title="Messages">
                  <IconButton
                    component={Link}
                    to="/messages"
                    color="inherit"
                    sx={{ 
                      mx: 0.5,
                      transition: 'transform 0.2s',
                      '&:hover': { transform: 'scale(1.1)' }
                    }}
                  >
                    <Badge badgeContent={messages} color="error">
                      <MailIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>

                {/* User menu */}
                <Box sx={{ ml: 1 }}>
                  <Tooltip title="Account & Settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar 
                        alt={user.name}
                        src={user.profileImage ? `http://localhost:5001${user.profileImage}` : ''}
                        sx={{
                          transition: 'transform 0.3s',
                          '&:hover': { transform: 'scale(1.1)' },
                          border: '2px solid',
                          borderColor: 'primary.light',
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    sx={{ mt: 1 }}
                  >
                    <Box sx={{ px: 2, py: 1, minWidth: 200 }}>
                      <Typography variant="subtitle1">{user.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {user.email}
                      </Typography>
                    </Box>
                    <Divider />
                    {authItems.map((item) => (
                      <MenuItem
                        key={item.name}
                        onClick={item.onClick || (() => {
                          handleCloseUserMenu();
                          if (item.path) navigate(item.path);
                        })}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.5,
                          '&:hover': {
                            backgroundColor: item.name === 'Logout' 
                              ? 'rgba(244, 67, 54, 0.08)' 
                              : 'rgba(33, 150, 243, 0.08)',
                          }
                        }}
                      >
                        <Box color={item.name === 'Logout' ? 'error.main' : 'primary.main'}>
                          {item.badge ? (
                            <Badge badgeContent={item.badge} color="error">
                              {item.icon}
                            </Badge>
                          ) : (
                            item.icon
                          )}
                        </Box>
                        <Typography 
                          variant="body2" 
                          color={item.name === 'Logout' ? 'error.main' : 'inherit'}
                        >
                          {item.name}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              </>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Button
                  component={Link}
                  to="/login"
                  sx={{ 
                    mr: 1,
                    borderRadius: 2,
                    bgcolor: 'white',
                    color: 'primary.main',
                    transition: 'transform 0.2s, background-color 0.2s',
                    '&:hover': { 
                      transform: 'translateY(-3px)',
                      bgcolor: 'rgba(255, 255, 255, 0.9)',
                    },
                  }}
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  to="/register"
                  variant="contained"
                  sx={{ 
                    borderRadius: 2,
                    bgcolor: 'white',
                    color: 'primary.main',
                    transition: 'transform 0.2s, background-color 0.2s',
                    '&:hover': { 
                      transform: 'translateY(-3px)',
                      bgcolor: 'rgba(255, 255, 255, 0.9)',
                    },
                  }}
                >
                  Register
                </Button>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Drawer for mobile */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
      >
        {drawer}
      </Drawer>

      {/* Search bar (expandable) */}
      <Slide direction="down" in={searchOpen} mountOnEnter unmountOnExit>
        <Paper 
          elevation={4}
          sx={{ 
            position: 'absolute', 
            top: 64, 
            left: 0, 
            right: 0, 
            zIndex: 1000,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            borderTop: '1px solid',
            borderColor: 'divider',
            borderRadius: 0
          }}
        >
          <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
          <input
            placeholder="Search for lost and found items..."
            style={{ 
              border: 'none',
              outline: 'none',
              width: '100%',
              padding: '8px 0',
              background: 'transparent',
              color: 'inherit',
              fontSize: '1rem',
            }}
            autoFocus
          />
          <IconButton size="small" onClick={() => setSearchOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Paper>
      </Slide>

      {/* Page content */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          p: { xs: 2, sm: 4 },
        }}
      >
        <Fade in={!loading} timeout={500}>
          <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <Outlet />
          </Box>
        </Fade>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default MainLayout; 
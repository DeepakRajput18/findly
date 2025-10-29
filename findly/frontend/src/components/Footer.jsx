import React from 'react';
import { useState } from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Link, 
  IconButton, 
  TextField, 
  Button, 
  Divider, 
  Collapse, 
  useTheme,
  useMediaQuery,
  Paper,
  Snackbar,
  Alert,
  Tooltip,
  Zoom
} from '@mui/material';
import { 
  Facebook as FacebookIcon, 
  Twitter as TwitterIcon, 
  Instagram as InstagramIcon, 
  LinkedIn as LinkedInIcon, 
  Email as EmailIcon, 
  KeyboardArrowDown as ArrowDownIcon,
  KeyboardArrowUp as ArrowUpIcon,
  Send as SendIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Language as LanguageIcon,
  Favorite as HeartIcon
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const currentYear = new Date().getFullYear();
  
  const [expandedSections, setExpandedSections] = useState({
    about: !isMobile,
    explore: !isMobile,
    legal: !isMobile,
    contact: !isMobile,
  });
  
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState(null);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) setEmailError('');
  };
  
  const handleSubscribe = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!email) {
      setEmailError('Email is required');
      return;
    }
    
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      setEmailError('Invalid email address');
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      setSubscribeSuccess(true);
      setEmail('');
    }, 500);
  };
  
  const handleCloseSnackbar = () => {
    setSubscribeSuccess(false);
  };

  const footerLinks = {
    about: [
      { name: 'About Us', path: '/about' },
      { name: 'How It Works', path: '/how-it-works' },
      { name: 'Our Team', path: '/team' },
      { name: 'Testimonials', path: '/testimonials' },
      { name: 'Blog', path: '/blog' },
    ],
    explore: [
      { name: 'Lost Items', path: '/lost-items' },
      { name: 'Found Items', path: '/found-items' },
      { name: 'Report Lost Item', path: '/report-lost-item' },
      { name: 'Report Found Item', path: '/report-found-item' },
      { name: 'Interactive Map', path: '/map' },
    ],
    legal: [
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Cookie Policy', path: '/cookies' },
      { name: 'GDPR Compliance', path: '/gdpr' },
      { name: 'Accessibility', path: '/accessibility' },
    ],
    contact: [
      { name: 'Contact Support', path: '/contact' },
      { name: 'FAQ', path: '/faq' },
      { name: 'Partnerships', path: '/partnerships' },
      { name: 'Media Inquiries', path: '/media' },
      { name: 'Careers', path: '/careers' },
    ],
  };

  const socialLinks = [
    { name: 'Facebook', icon: FacebookIcon, color: '#1877F2', url: 'https://facebook.com' },
    { name: 'Twitter', icon: TwitterIcon, color: '#1DA1F2', url: 'https://twitter.com' },
    { name: 'Instagram', icon: InstagramIcon, color: '#E4405F', url: 'https://instagram.com' },
    { name: 'LinkedIn', icon: LinkedInIcon, color: '#0A66C2', url: 'https://linkedin.com' },
  ];

  return (
    <Box 
      sx={{ 
        bgcolor: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(232, 244, 253, 0.8)', 
        pt: 6, 
        pb: 3,
        mt: 6,
        borderTop: `1px solid ${theme.palette.divider}`,
        backdropFilter: 'blur(8px)',
        width: '100%'
      }}
      component="footer"
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* About Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                About Findly
              </Typography>
              {isMobile && (
                <IconButton size="small" onClick={() => toggleSection('about')}>
                  {expandedSections.about ? <ArrowUpIcon /> : <ArrowDownIcon />}
                </IconButton>
              )}
            </Box>
            
            <Collapse in={expandedSections.about}>
              <Typography variant="body2" paragraph>
                Findly is a modern platform that connects people who have lost items with those who have found them,
                utilizing advanced AI technology to make the matching process more efficient.
              </Typography>
              <Box sx={{ display: 'flex', mt: 2 }}>
                {socialLinks.map((social) => (
                  <Tooltip 
                    key={social.name} 
                    title={social.name} 
                    TransitionComponent={Zoom} 
                    arrow
                  >
                    <IconButton 
                      component="a" 
                      href={social.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onMouseEnter={() => setHoveredIcon(social.name)}
                      onMouseLeave={() => setHoveredIcon(null)}
                      sx={{ 
                        mr: 1, 
                        transition: 'transform 0.3s',
                        transform: hoveredIcon === social.name ? 'scale(1.2)' : 'scale(1)',
                        color: hoveredIcon === social.name ? social.color : 'inherit',
                      }}
                    >
                      <social.icon />
                    </IconButton>
                  </Tooltip>
                ))}
              </Box>
            </Collapse>
          </Grid>
          
          {/* Explore Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                Explore
              </Typography>
              {isMobile && (
                <IconButton size="small" onClick={() => toggleSection('explore')}>
                  {expandedSections.explore ? <ArrowUpIcon /> : <ArrowDownIcon />}
                </IconButton>
              )}
            </Box>
            
            <Collapse in={expandedSections.explore}>
              <Box component="nav">
                {footerLinks.explore.map((link) => (
                  <Box key={link.name} sx={{ mb: 1.5 }}>
                    <Link 
                      component={RouterLink} 
                      to={link.path}
                      underline="none"
                      sx={{ 
                        color: 'text.primary', 
                        '&:hover': { 
                          color: 'primary.main',
                          pl: 0.5,
                          transition: 'all 0.2s'
                        },
                        display: 'inline-block'
                      }}
                    >
                      {link.name}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Collapse>
          </Grid>
          
          {/* Legal Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                Legal
              </Typography>
              {isMobile && (
                <IconButton size="small" onClick={() => toggleSection('legal')}>
                  {expandedSections.legal ? <ArrowUpIcon /> : <ArrowDownIcon />}
                </IconButton>
              )}
            </Box>
            
            <Collapse in={expandedSections.legal}>
              <Box component="nav">
                {footerLinks.legal.map((link) => (
                  <Box key={link.name} sx={{ mb: 1.5 }}>
                    <Link 
                      component={RouterLink} 
                      to={link.path}
                      underline="none"
                      sx={{ 
                        color: 'text.primary', 
                        '&:hover': { 
                          color: 'primary.main',
                          pl: 0.5,
                          transition: 'all 0.2s'
                        },
                        display: 'inline-block'
                      }}
                    >
                      {link.name}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Collapse>
          </Grid>
          
          {/* Newsletter Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                Stay Updated
              </Typography>
              {isMobile && (
                <IconButton size="small" onClick={() => toggleSection('contact')}>
                  {expandedSections.contact ? <ArrowUpIcon /> : <ArrowDownIcon />}
                </IconButton>
              )}
            </Box>
            
            <Collapse in={expandedSections.contact}>
              <Typography variant="body2" paragraph>
                Subscribe to our newsletter to get updates on new features and success stories.
              </Typography>
              
              <Box component="form" onSubmit={handleSubscribe} sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Your Email"
                  variant="outlined"
                  value={email}
                  onChange={handleEmailChange}
                  error={!!emailError}
                  helperText={emailError}
                  sx={{ mb: 1 }}
                />
                <Button 
                  type="submit" 
                  variant="contained" 
                  color="primary" 
                  startIcon={<SendIcon />}
                  fullWidth
                  sx={{ 
                    borderRadius: 2,
                    py: 1,
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 3
                    }
                  }}
                >
                  Subscribe
                </Button>
              </Box>
              
              <Box sx={{ mt: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <PhoneIcon fontSize="small" color="primary" sx={{ mr: 1 }} />
                  <Typography variant="body2">+91 (917)398 5148</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <EmailIcon fontSize="small" color="primary" sx={{ mr: 1 }} />
                  <Typography variant="body2">vhmehta@findly.com</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocationIcon fontSize="small" color="primary" sx={{ mr: 1 }} />
                  <Typography variant="body2">INDIA, IN 10001,GUJARAT</Typography>
                </Box>
              </Box>
            </Collapse>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4, width: '100%' }} />
        
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          justifyContent: 'space-between',
          alignItems: { xs: 'center', sm: 'center' },
          gap: 2,
          width: '100%'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Logo variant="small" sx={{ mr: 1 }} />
            <Typography variant="body2" color="text.secondary">
              © {currentYear} Findly. All rights reserved.
            </Typography>
          </Box>
          
          <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
            Made with <HeartIcon sx={{ mx: 0.5, fontSize: 16, color: theme.palette.error.main }} /> by Vedant Mehta
          </Typography>
        </Box>
      </Container>
      
      <Snackbar open={subscribeSuccess} autoHideDuration={5000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Thank you for subscribing to our newsletter!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Footer; 
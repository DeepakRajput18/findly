import React from 'react';
import { Box, Container, Typography, Stepper, Step, StepLabel, StepContent, Paper, Button, Divider } from '@mui/material';
import {
  FindInPage as LostItemsIcon,
  EmojiObjects as FoundItemsIcon,
  Compare as MatchesIcon,
  Notifications as NotificationsIcon,
  Chat as ChatIcon,
  Search as SearchIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
  const steps = [
    {
      label: 'Report a Lost or Found Item',
      description: `Start by reporting your lost item with as many details as possible. Include photos, 
      a detailed description, and the approximate location where you lost it. The more information 
      you provide, the higher the chances of finding a match. Similarly, if you've found an item, 
      report it with details to help the owner identify it.`,
      icon: <LostItemsIcon />,
    },
    {
      label: 'AI-Powered Matching',
      description: `Our advanced AI algorithms analyze reported lost and found items to identify potential 
      matches based on descriptions, photos, location data, and other factors. The system continuously 
      scans for new matches as items are reported.`,
      icon: <MatchesIcon />,
    },
    {
      label: 'Notification of Potential Matches',
      description: `When the system identifies a potential match between a lost and found item, 
      both parties are notified. You'll receive a notification through the platform and 
      optionally via email, depending on your notification settings.`,
      icon: <NotificationsIcon />,
    },
    {
      label: 'Secure Communication',
      description: `Once a potential match is identified, you can communicate with the other party 
      through our secure messaging system. This allows you to discuss details and arrange for 
      the return of the item without sharing personal contact information until you're ready.`,
      icon: <ChatIcon />,
    },
    {
      label: 'Retrieve Your Item',
      description: `After confirming the match, you can arrange to meet in a safe public location 
      to retrieve the item. We recommend following our safety guidelines when meeting someone 
      to exchange an item.`,
      icon: <LocationIcon />,
    },
  ];

  const features = [
    {
      title: 'Advanced Search',
      description: 'Use our powerful search functionality to look for specific items that may have been found.',
      icon: <SearchIcon color="primary" sx={{ fontSize: 40 }} />,
    },
    {
      title: 'Interactive Map',
      description: 'View lost and found items on an interactive map to help locate items in your area.',
      icon: <LocationIcon color="primary" sx={{ fontSize: 40 }} />,
    },
    {
      title: 'AI Matching',
      description: 'Our system automatically matches lost items with found items using intelligent algorithms.',
      icon: <MatchesIcon color="primary" sx={{ fontSize: 40 }} />,
    },
  ];

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          How Findly Works
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" paragraph sx={{ mb: 6 }}>
          Our platform uses advanced technology to connect people who have lost items with those who have found them.
        </Typography>

        <Box sx={{ mb: 8 }}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            The Findly Process
          </Typography>
          <Stepper orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label} active={true}>
                <StepLabel icon={step.icon}>
                  <Typography variant="h6">{step.label}</Typography>
                </StepLabel>
                <StepContent>
                  <Typography>{step.description}</Typography>
                  {index < steps.length - 1 && (
                    <Box sx={{ mb: 2 }}>
                      <div>
                        <Button
                          variant="text"
                          sx={{ mt: 1, mr: 1 }}
                          size="small"
                          component={Link}
                          to={index === 0 ? "/report-lost-item" : "#"}
                        >
                          {index === 0 ? "Report an Item" : "Learn More"}
                        </Button>
                      </div>
                    </Box>
                  )}
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Box>

        <Divider sx={{ mb: 6 }} />

        <Box>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            Tips for Successful Recovery
          </Typography>
          <Box component="ul" sx={{ pl: 4 }}>
            <Typography component="li" paragraph>
              <strong>Act quickly</strong> - Report lost or found items as soon as possible to increase the chances of recovery.
            </Typography>
            <Typography component="li" paragraph>
              <strong>Be detailed</strong> - Provide as much information as possible, including photos, distinctive features, and precise location information.
            </Typography>
            <Typography component="li" paragraph>
              <strong>Check regularly</strong> - New items are reported daily, so check back regularly for potential matches.
            </Typography>
            <Typography component="li" paragraph>
              <strong>Be responsive</strong> - When notified of a potential match, respond promptly to increase the chances of successful recovery.
            </Typography>
            <Typography component="li" paragraph>
              <strong>Stay safe</strong> - Always meet in public places when retrieving items and consider bringing a friend if meeting someone new.
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Button 
            variant="contained" 
            color="primary" 
            size="large" 
            component={Link} 
            to="/report-lost-item"
            sx={{ mr: 2 }}
          >
            Report a Lost Item
          </Button>
          <Button 
            variant="outlined" 
            color="primary" 
            size="large" 
            component={Link} 
            to="/report-found-item"
          >
            Report a Found Item
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default HowItWorks; 
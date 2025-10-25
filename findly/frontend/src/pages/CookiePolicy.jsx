import { Box, Container, Typography, Paper, Divider, Button, List, ListItem, ListItemText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';

const CookiePolicy = () => {
  const cookieTypes = [
    {
      type: 'Essential Cookies',
      description: 'These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in, or filling in forms.',
      examples: ['Authentication cookies', 'Security cookies', 'Session management cookies'],
      duration: 'Session to 2 years'
    },
    {
      type: 'Performance Cookies',
      description: 'These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site.',
      examples: ['Google Analytics', 'Hotjar', 'Performance tracking cookies'],
      duration: '1 day to 2 years'
    },
    {
      type: 'Functional Cookies',
      description: 'These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.',
      examples: ['Language preference cookies', 'Location cookies', 'User preference cookies'],
      duration: 'Session to 1 year'
    },
    {
      type: 'Targeting Cookies',
      description: 'These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant advertisements on other sites.',
      examples: ['Social media cookies', 'Advertising cookies', 'Marketing cookies'],
      duration: '30 days to 2 years'
    }
  ];

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Cookie Policy
        </Typography>
        
        <Typography variant="subtitle1" paragraph color="text.secondary" align="center" sx={{ mb: 4 }}>
          Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </Typography>
        
        <Typography paragraph>
          This Cookie Policy explains what cookies are and how Findly ("we", "us", or "our") uses them on our website and applications.
          We encourage you to read this policy in order to understand what types of cookies we use, what information we collect using cookies,
          and how that information is used.
        </Typography>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
            1. What Are Cookies?
          </Typography>
          <Typography paragraph>
            Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used 
            to make websites work more efficiently and provide information to the owners of the site. Cookies can be "persistent" or "session" 
            cookies. Persistent cookies remain on your device when you go offline, while session cookies are deleted as soon as you close your web browser.
          </Typography>
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
            2. How We Use Cookies
          </Typography>
          <Typography paragraph>
            We use cookies for several reasons. Some cookies are required for technical reasons for our website to operate, and we refer to these 
            as "essential" cookies. Other cookies enable us to track and target the interests of our users to enhance the experience on our website 
            and applications. Third parties serve cookies through our website for advertising, analytics, and other purposes.
          </Typography>
          
          <TableContainer sx={{ mt: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Type of Cookie</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Purpose</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Examples</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Duration</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cookieTypes.map((cookie) => (
                  <TableRow key={cookie.type}>
                    <TableCell>{cookie.type}</TableCell>
                    <TableCell>{cookie.description}</TableCell>
                    <TableCell>{cookie.examples.join(', ')}</TableCell>
                    <TableCell>{cookie.duration}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
            3. Third-Party Cookies
          </Typography>
          <Typography paragraph>
            In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the Service, 
            deliver advertisements on and through the Service, and so on. These third-party services may use cookies, web beacons, 
            or other tracking technology to collect information about your use of our website.
          </Typography>
          <Typography paragraph>
            Some examples of third-party services we use include:
          </Typography>
          <List>
            <ListItem>
              <ListItemText 
                primary="Google Analytics" 
                secondary="We use Google Analytics to analyze the use of our website. Google Analytics gathers information about website use by means of cookies. The information gathered is used to create reports about the use of our website."
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Social Media Platforms" 
                secondary="We may have buttons and plugins from social media platforms like Facebook, Twitter, and Instagram on our website, which may set cookies that can identify you through their platforms."
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Payment Processors" 
                secondary="When you make a donation or purchase through our website, payment processors such as Stripe or PayPal may set cookies to remember your payment preferences."
              />
            </ListItem>
          </List>
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
            4. Managing Cookies
          </Typography>
          <Typography paragraph>
            Most web browsers allow you to control cookies through their settings preferences. Here's how you can manage cookies in major web browsers:
          </Typography>
          <List>
            <ListItem>
              <ListItemText 
                primary="Google Chrome" 
                secondary="Settings > Privacy and security > Cookies and other site data"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Mozilla Firefox" 
                secondary="Options > Privacy & Security > Cookies and Site Data"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Safari" 
                secondary="Preferences > Privacy > Cookies and website data"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Microsoft Edge" 
                secondary="Settings > Cookies and site permissions > Cookies and site data"
              />
            </ListItem>
          </List>
          <Typography paragraph>
            Please note that limiting or blocking cookies may impact your experience of our website, as some features may not function properly.
          </Typography>
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
            5. Cookie Consent
          </Typography>
          <Typography paragraph>
            When you first visit our website, you will be presented with a cookie banner that allows you to accept or decline non-essential cookies. 
            You can change your preferences at any time by clicking on the "Cookie Settings" link in the footer of our website.
          </Typography>
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
            6. Changes to This Cookie Policy
          </Typography>
          <Typography paragraph>
            We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page 
            and updating the "Last Updated" date at the top of this policy. You are advised to review this Cookie Policy periodically for any changes.
          </Typography>
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
            7. Contact Us
          </Typography>
          <Typography paragraph>
            If you have any questions about our Cookie Policy, please contact us at:
          </Typography>
          <Typography paragraph sx={{ ml: 2 }}>
            Email: <Link href="mailto:privacy@findly.com">privacy@findly.com</Link><br />
            Address: Findly Privacy Team, 123 Main Street, New York, NY 10001, USA
          </Typography>
        </Box>
        
        <Divider sx={{ my: 4 }} />
        
        <Box sx={{ textAlign: 'center' }}>
          <Button 
            component={Link} 
            to="/privacy" 
            variant="outlined" 
            color="primary"
            sx={{ mr: 2 }}
          >
            Privacy Policy
          </Button>
          <Button 
            component={Link} 
            to="/terms" 
            variant="outlined" 
            color="primary"
            sx={{ mr: 2 }}
          >
            Terms of Service
          </Button>
          <Button 
            component={Link} 
            to="/" 
            variant="contained" 
            color="primary"
          >
            Return to Home
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CookiePolicy; 
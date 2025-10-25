import { Box, Container, Typography, Paper, Divider, Button, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Privacy Policy
        </Typography>
        
        <Typography variant="subtitle1" paragraph color="text.secondary" align="center" sx={{ mb: 4 }}>
          Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </Typography>
        
        <Typography paragraph>
          At Findly, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains 
          how we collect, use, disclose, and safeguard your information when you use our website, services, and applications.
        </Typography>
        
        <Typography paragraph>
          Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the Service.
        </Typography>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
            1. Information We Collect
          </Typography>
          <Typography paragraph>
            We collect several types of information from and about users of our Service, including:
          </Typography>
          <List>
            <ListItem>
              <ListItemText 
                primary="Personal Identifiers" 
                secondary="Such as your name, email address, phone number, and postal address."
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Account Information" 
                secondary="Your username, password, account preferences, and profile information."
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Lost and Found Item Information" 
                secondary="Details about items you report as lost or found, including descriptions, photos, locations, and dates."
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Communications" 
                secondary="Messages, emails, and other communications between you and other users or Findly."
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Usage Data" 
                secondary="Information about how you use our Service, including your browsing patterns, clicked links, and feature usage."
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Technical Data" 
                secondary="IP address, browser type and version, device information, operating system, and other technology identifiers from the devices you use to access our Service."
              />
            </ListItem>
          </List>
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
            2. How We Collect Information
          </Typography>
          <Typography paragraph>
            We collect information through:
          </Typography>
          <List>
            <ListItem>
              <ListItemText 
                primary="Direct Interactions" 
                secondary="Information you provide when creating an account, reporting lost or found items, filling out forms, or communicating with us or other users."
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Automated Technologies" 
                secondary="As you navigate through our Service, we may use cookies, web beacons, and similar technologies to collect usage and technical data."
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Third Parties" 
                secondary="We may receive information about you from third-party partners, such as social media platforms if you choose to link your accounts."
              />
            </ListItem>
          </List>
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
            3. How We Use Your Information
          </Typography>
          <Typography paragraph>
            We use the information we collect to:
          </Typography>
          <List>
            <ListItem>
              <ListItemText 
                primary="Provide and Maintain the Service" 
                secondary="Create and manage your account, process your reports of lost or found items, and deliver the features of our Service."
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Match Lost and Found Items" 
                secondary="Use our algorithms to identify potential matches between reported lost and found items."
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Communicate with You" 
                secondary="Send notifications about matches, updates to our Service, and respond to your inquiries."
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Improve Our Service" 
                secondary="Analyze usage patterns, diagnose technical issues, and enhance user experience."
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Ensure Safety and Security" 
                secondary="Verify accounts, prevent fraud, and protect against misuse of our Service."
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Marketing and Advertising" 
                secondary="With your consent, provide personalized recommendations and promotional content."
              />
            </ListItem>
          </List>
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
            4. How We Share Your Information
          </Typography>
          <Typography paragraph>
            We may share your information with:
          </Typography>
          <List>
            <ListItem>
              <ListItemText 
                primary="Other Users" 
                secondary="When there is a potential match between a lost and found item, we share relevant contact information to facilitate the return of the item."
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Service Providers" 
                secondary="Third parties that perform services on our behalf, such as hosting, analytics, and customer service."
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Law Enforcement" 
                secondary="When required by law, court order, or to protect our rights, property, or safety."
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Business Partners" 
                secondary="With your consent, we may share information with partners for marketing or promotional purposes."
              />
            </ListItem>
          </List>
          <Typography paragraph>
            We do not sell your personal information to third parties.
          </Typography>
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
            5. Data Security
          </Typography>
          <Typography paragraph>
            We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, 
            disclosure, alteration, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, 
            and we cannot guarantee absolute security.
          </Typography>
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
            6. Your Rights and Choices
          </Typography>
          <Typography paragraph>
            Depending on your location, you may have certain rights regarding your personal information, including:
          </Typography>
          <List>
            <ListItem>
              <ListItemText 
                primary="Access" 
                secondary="You can request a copy of the personal information we hold about you."
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Correction" 
                secondary="You can request that we correct inaccurate or incomplete information."
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Deletion" 
                secondary="You can request that we delete your personal information in certain circumstances."
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Restriction" 
                secondary="You can request that we restrict the processing of your information."
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Data Portability" 
                secondary="You can request a copy of your information in a structured, commonly used, and machine-readable format."
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Objection" 
                secondary="You can object to our processing of your information for certain purposes."
              />
            </ListItem>
          </List>
          <Typography paragraph>
            To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
          </Typography>
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
            7. Children's Privacy
          </Typography>
          <Typography paragraph>
            Our Service is not intended for individuals under the age of 13. We do not knowingly collect personal information from children. 
            If you are a parent or guardian and believe that your child has provided us with personal information, please contact us immediately.
          </Typography>
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
            8. International Data Transfers
          </Typography>
          <Typography paragraph>
            We may transfer, store, and process your information in countries other than your own. When we do so, we ensure appropriate 
            safeguards are in place to protect your information and comply with applicable data protection laws.
          </Typography>
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
            9. Cookies and Similar Technologies
          </Typography>
          <Typography paragraph>
            We use cookies and similar tracking technologies to track activity on our Service and store certain information. You can instruct 
            your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not 
            be able to use some portions of our Service.
          </Typography>
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
            10. Changes to This Privacy Policy
          </Typography>
          <Typography paragraph>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page 
            and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
          </Typography>
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
            11. Contact Us
          </Typography>
          <Typography paragraph>
            If you have any questions about this Privacy Policy, please contact us at:
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

export default PrivacyPolicy; 
import { Box, Container, Typography, Paper, Divider, Button, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Terms of Service
        </Typography>
        
        <Typography variant="subtitle1" paragraph color="text.secondary" align="center" sx={{ mb: 4 }}>
          Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </Typography>
        
        <Typography paragraph>
          Welcome to Findly. These Terms of Service govern your use of our website, services, and applications 
          (collectively, the "Service"). By accessing or using the Service, you agree to be bound by these Terms.
        </Typography>
        
        <Typography paragraph>
          Please read these Terms carefully. If you do not agree with these Terms, you may not access or use the Service.
        </Typography>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
            1. Acceptance of Terms
          </Typography>
          <Typography paragraph>
            By registering for and/or using the Service in any manner, you agree to these Terms and all other operating 
            rules, policies, and procedures that may be published by Findly, which are incorporated by reference.
          </Typography>
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
            2. Eligibility
          </Typography>
          <Typography paragraph>
            You must be at least 13 years of age to use the Service. By using the Service, you represent and warrant 
            that you have the right, authority, and capacity to enter into these Terms and to abide by all of the terms 
            and conditions set forth herein.
          </Typography>
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
            3. Account Creation and Maintenance
          </Typography>
          <Typography paragraph>
            To use certain features of our Service, you must register for an account. You agree to provide accurate, 
            current, and complete information during the registration process and to update such information to keep it 
            accurate, current, and complete.
          </Typography>
          <Typography paragraph>
            You are responsible for maintaining the confidentiality of your account credentials and for all activities 
            that occur under your account. You agree to immediately notify Findly of any unauthorized use of your account 
            or any other breach of security.
          </Typography>
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
            4. User Content
          </Typography>
          <Typography paragraph>
            The Service allows you to submit content, including but not limited to photos, descriptions, locations, 
            and other information about lost or found items ("User Content"). You retain all rights in, and are solely 
            responsible for, the User Content you post to the Service.
          </Typography>
          <Typography paragraph>
            By submitting User Content to the Service, you grant Findly a worldwide, non-exclusive, royalty-free license 
            to use, reproduce, modify, adapt, publish, translate, distribute, and display such content in connection with 
            providing and promoting the Service.
          </Typography>
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
            5. Prohibited Conduct
          </Typography>
          <Typography paragraph>
            You agree not to engage in any of the following prohibited activities:
          </Typography>
          <List>
            <ListItem>
              <ListItemText 
                primary="Using the Service for any illegal purpose or in violation of any laws"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Posting false, misleading, or fraudulent content"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Impersonating any person or entity"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Harassing, threatening, or intimidating any other user"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Attempting to circumvent any security measures of the Service"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Using the Service to collect or harvest personal information about other users"
              />
            </ListItem>
          </List>
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
            6. Intellectual Property Rights
          </Typography>
          <Typography paragraph>
            The Service and its original content, features, and functionality are owned by Findly and are protected by 
            international copyright, trademark, patent, trade secret, and other intellectual property or proprietary 
            rights laws.
          </Typography>
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
            7. Privacy Policy
          </Typography>
          <Typography paragraph>
            Please refer to our Privacy Policy for information about how we collect, use, and disclose information about you.
          </Typography>
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
            8. Termination
          </Typography>
          <Typography paragraph>
            We may terminate or suspend your account and bar access to the Service immediately, without prior notice or 
            liability, for any reason whatsoever, including without limitation if you breach the Terms.
          </Typography>
          <Typography paragraph>
            All provisions of the Terms which by their nature should survive termination shall survive termination, 
            including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
          </Typography>
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
            9. Disclaimers
          </Typography>
          <Typography paragraph>
            THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. FINDLY EXPRESSLY DISCLAIMS ALL WARRANTIES OF 
            ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, 
            FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
          </Typography>
          <Typography paragraph>
            FINDLY MAKES NO WARRANTY THAT (I) THE SERVICE WILL MEET YOUR REQUIREMENTS, (II) THE SERVICE WILL BE 
            UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE, (III) THE RESULTS THAT MAY BE OBTAINED FROM THE USE OF THE 
            SERVICE WILL BE ACCURATE OR RELIABLE, OR (IV) THE QUALITY OF ANY PRODUCTS, SERVICES, INFORMATION, OR OTHER 
            MATERIAL PURCHASED OR OBTAINED BY YOU THROUGH THE SERVICE WILL MEET YOUR EXPECTATIONS.
          </Typography>
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
            10. Limitation of Liability
          </Typography>
          <Typography paragraph>
            IN NO EVENT SHALL FINDLY, ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES, BE LIABLE 
            FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, 
            LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM (I) YOUR ACCESS TO OR USE 
            OF OR INABILITY TO ACCESS OR USE THE SERVICE; (II) ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICE; 
            (III) ANY CONTENT OBTAINED FROM THE SERVICE; AND (IV) UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR 
            TRANSMISSIONS OR CONTENT, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), OR ANY OTHER 
            LEGAL THEORY, WHETHER OR NOT WE HAVE BEEN INFORMED OF THE POSSIBILITY OF SUCH DAMAGE.
          </Typography>
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
            11. Governing Law
          </Typography>
          <Typography paragraph>
            These Terms shall be governed by and defined following the laws of the United States. Findly and yourself 
            irrevocably consent that the courts of the United States shall have exclusive jurisdiction to resolve any 
            dispute which may arise in connection with these Terms.
          </Typography>
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
            12. Changes to Terms
          </Typography>
          <Typography paragraph>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is 
            material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a 
            material change will be determined at our sole discretion.
          </Typography>
          <Typography paragraph>
            By continuing to access or use our Service after any revisions become effective, you agree to be bound by the 
            revised terms. If you do not agree to the new terms, you are no longer authorized to use the Service.
          </Typography>
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
            13. Contact Us
          </Typography>
          <Typography paragraph>
            If you have any questions about these Terms, please contact us at:
          </Typography>
          <Typography paragraph sx={{ ml: 2 }}>
            Email: <Link href="mailto:legal@findly.com">legal@findly.com</Link><br />
            Address: Findly Legal Department, 123 Main Street, New York, NY 10001, USA
          </Typography>
        </Box>
        
        <Divider sx={{ my: 4 }} />
        
        <Box sx={{ textAlign: 'center' }}>
          <Typography paragraph>
            By using our Service, you acknowledge that you have read and understood these Terms of Service and agree to be bound by them.
          </Typography>
          <Button 
            component={Link} 
            to="/" 
            variant="contained" 
            color="primary"
            sx={{ mt: 2 }}
          >
            Return to Home
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default TermsOfService; 
import { Box, Container, Typography, Paper, Divider, Button, List, ListItem, ListItemText, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { Link } from 'react-router-dom';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

const GDPRCompliance = () => {
  const gdprRights = [
    {
      title: "Right to be Informed",
      description: "You have the right to know how your personal data is collected, used, and stored. Our Privacy Policy details the information we collect, how we use it, and who we share it with."
    },
    {
      title: "Right of Access",
      description: "You have the right to obtain confirmation that your data is being processed and to access your personal data. You can request a copy of the personal data we hold about you."
    },
    {
      title: "Right to Rectification",
      description: "You have the right to have inaccurate personal data corrected or completed if it is incomplete. You can update most of your information through your account settings or by contacting us."
    },
    {
      title: "Right to Erasure (Right to be Forgotten)",
      description: "You have the right to request the deletion of your personal data in certain circumstances, such as when the data is no longer necessary for the purposes for which it was collected."
    },
    {
      title: "Right to Restrict Processing",
      description: "You have the right to request the restriction or suppression of your personal data. When processing is restricted, we can still store your data but not use it."
    },
    {
      title: "Right to Data Portability",
      description: "You have the right to obtain and reuse your personal data for your own purposes across different services. You can request to receive your data in a structured, commonly used, and machine-readable format."
    },
    {
      title: "Right to Object",
      description: "You have the right to object to the processing of your personal data in certain circumstances, including processing for direct marketing purposes or processing based on legitimate interests."
    },
    {
      title: "Rights Related to Automated Decision Making and Profiling",
      description: "You have the right not to be subject to a decision based solely on automated processing, including profiling, which produces legal effects concerning you or significantly affects you."
    }
  ];

  const gdprMeasures = [
    {
      title: "Data Protection Officer",
      description: "We have appointed a Data Protection Officer (DPO) who is responsible for overseeing questions in relation to this GDPR Compliance Policy and our treatment of your personal information."
    },
    {
      title: "Data Protection Impact Assessments",
      description: "We conduct Data Protection Impact Assessments (DPIAs) for operations that may present higher risks to the rights and freedoms of data subjects."
    },
    {
      title: "Data Breach Procedures",
      description: "We have implemented procedures to detect, report, and investigate personal data breaches. In case of a breach that is likely to result in a risk to your rights and freedoms, we will notify you and the relevant supervisory authority within 72 hours."
    },
    {
      title: "Privacy by Design and Default",
      description: "We implement appropriate technical and organizational measures to ensure that, by default, only personal data that is necessary for each specific purpose is processed."
    },
    {
      title: "Records of Processing Activities",
      description: "We maintain records of our processing activities to demonstrate our compliance with GDPR requirements."
    },
    {
      title: "Data Processing Agreements",
      description: "We have data processing agreements in place with third-party service providers to ensure that your data is handled in accordance with GDPR requirements."
    }
  ];

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          GDPR Compliance
        </Typography>
        
        <Typography variant="subtitle1" paragraph color="text.secondary" align="center" sx={{ mb: 4 }}>
          Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </Typography>
        
        <Typography paragraph>
          At Findly, we are committed to ensuring the privacy and protection of your personal data in compliance with the General Data 
          Protection Regulation (GDPR). This GDPR Compliance Policy explains how we adhere to GDPR principles and outlines your rights 
          under this regulation.
        </Typography>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
            1. What is GDPR?
          </Typography>
          <Typography paragraph>
            The General Data Protection Regulation (GDPR) is a regulation in EU law on data protection and privacy for all individuals 
            within the European Union and the European Economic Area. It also addresses the export of personal data outside the EU and EEA areas.
          </Typography>
          <Typography paragraph>
            The GDPR aims to give control to individuals over their personal data and to simplify the regulatory environment for international 
            business by unifying the regulation within the EU.
          </Typography>
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
            2. How We Comply with GDPR
          </Typography>
          <Typography paragraph>
            We have implemented various measures to ensure compliance with GDPR principles:
          </Typography>
          <List>
            <ListItem>
              <ListItemText 
                primary="Lawfulness, Fairness, and Transparency" 
                secondary="We process personal data lawfully, fairly, and in a transparent manner."
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Purpose Limitation" 
                secondary="We collect personal data for specified, explicit, and legitimate purposes and do not process it in a manner incompatible with those purposes."
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Data Minimization" 
                secondary="We ensure that personal data we process is adequate, relevant, and limited to what is necessary for the purposes for which it is processed."
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Accuracy" 
                secondary="We take reasonable steps to ensure that personal data is accurate and, where necessary, kept up to date."
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Storage Limitation" 
                secondary="We keep personal data in a form which permits identification of data subjects for no longer than is necessary for the purposes for which it is processed."
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Integrity and Confidentiality" 
                secondary="We process personal data in a manner that ensures appropriate security, including protection against unauthorized or unlawful processing and against accidental loss, destruction, or damage."
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Accountability" 
                secondary="We are responsible for and can demonstrate compliance with the GDPR principles."
              />
            </ListItem>
          </List>
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
            3. Your Rights Under GDPR
          </Typography>
          <Typography paragraph>
            Under the GDPR, you have several rights regarding your personal data:
          </Typography>
          
          {gdprRights.map((right, index) => (
            <Accordion key={index} sx={{ mb: 1 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}a-content`}
                id={`panel${index}a-header`}
              >
                <Typography fontWeight="medium">{right.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{right.description}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
            4. Our GDPR Compliance Measures
          </Typography>
          <Typography paragraph>
            We have implemented the following measures to ensure GDPR compliance:
          </Typography>
          
          {gdprMeasures.map((measure, index) => (
            <Accordion key={index} sx={{ mb: 1 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-measure-${index}a-content`}
                id={`panel-measure-${index}a-header`}
              >
                <Typography fontWeight="medium">{measure.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{measure.description}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
            5. Data Transfer Outside the EU
          </Typography>
          <Typography paragraph>
            If we transfer your personal data outside the European Economic Area (EEA), we ensure a similar degree of protection 
            is afforded to it by implementing at least one of the following safeguards:
          </Typography>
          <List>
            <ListItem>
              <ListItemText 
                primary="Standard Contractual Clauses" 
                secondary="We use specific contracts approved by the European Commission that give personal data the same protection it has in Europe."
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Adequacy Decisions" 
                secondary="We transfer data to countries that have been deemed to provide an adequate level of protection for personal data by the European Commission."
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Binding Corporate Rules" 
                secondary="Where applicable, we use approved binding corporate rules for transfers within our corporate group."
              />
            </ListItem>
          </List>
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
            6. Exercising Your Rights
          </Typography>
          <Typography paragraph>
            To exercise any of your rights under the GDPR, please contact our Data Protection Officer using the contact details provided below. 
            We will respond to your request within one month. This period may be extended by up to two further months where necessary, taking 
            into account the complexity and number of requests.
          </Typography>
          <Typography paragraph>
            There is no fee for exercising your rights. However, we may charge a reasonable fee if your request is clearly unfounded, 
            repetitive, or excessive. Alternatively, we may refuse to comply with your request in these circumstances.
          </Typography>
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
            7. Data Protection Officer
          </Typography>
          <Typography paragraph>
            We have appointed a Data Protection Officer (DPO) who is responsible for overseeing questions in relation to this GDPR Compliance 
            Policy. If you have any questions about this policy or how we handle your personal information, please contact our DPO at:
          </Typography>
          <Typography paragraph sx={{ ml: 2 }}>
            Email: <Link href="mailto:dpo@findly.com">dpo@findly.com</Link><br />
            Address: Findly Data Protection Officer, 123 Main Street, New York, NY 10001, USA
          </Typography>
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
            8. Right to Complain
          </Typography>
          <Typography paragraph>
            You have the right to make a complaint at any time to the supervisory authority for data protection issues in your country. 
            We would, however, appreciate the chance to deal with your concerns before you approach the supervisory authority, so please 
            contact us in the first instance.
          </Typography>
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
            9. Changes to This GDPR Compliance Policy
          </Typography>
          <Typography paragraph>
            We may update our GDPR Compliance Policy from time to time. We will notify you of any changes by posting the new policy on 
            this page and updating the "Last Updated" date at the top. You are advised to review this policy periodically for any changes.
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
            to="/cookies" 
            variant="outlined" 
            color="primary"
            sx={{ mr: 2 }}
          >
            Cookie Policy
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

export default GDPRCompliance; 
import { Box, Container, Typography, Paper, Divider, Button, List, ListItem, ListItemText, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { Link } from 'react-router-dom';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

const Accessibility = () => {
  const accessibilityStandards = [
    {
      title: "WCAG 2.1 Compliance",
      description: "We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards. These guidelines explain how to make web content more accessible to people with disabilities."
    },
    {
      title: "Section 508",
      description: "We strive to comply with Section 508 of the Rehabilitation Act, which requires Federal agencies to make their electronic and information technology accessible to people with disabilities."
    },
    {
      title: "ADA Compliance",
      description: "We work to ensure our website adheres to the Americans with Disabilities Act (ADA) standards, making our digital content accessible to users with various disabilities."
    }
  ];

  const accessibilityFeatures = [
    {
      title: "Keyboard Navigation",
      description: "Our website is designed to be fully navigable using only a keyboard. All interactive elements, including links, buttons, and form controls, can be accessed and operated using keyboard shortcuts."
    },
    {
      title: "Screen Reader Compatibility",
      description: "We ensure our content is compatible with screen readers such as JAWS, NVDA, VoiceOver, and TalkBack. We use proper semantic HTML structure and provide text alternatives for non-text content."
    },
    {
      title: "Text Resizing",
      description: "Users can resize text up to 200% without loss of content or functionality. Our design uses relative font sizes and responsive layouts to accommodate text resizing."
    },
    {
      title: "Color Contrast",
      description: "We maintain a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text to ensure readability for users with low vision or color blindness."
    },
    {
      title: "Alternative Text for Images",
      description: "All informative images on our website include descriptive alternative text (alt text) to ensure that users who cannot see the images can still understand the content."
    },
    {
      title: "Clear Headings and Structure",
      description: "We use proper heading hierarchy and semantic markup to provide a clear structure for our content, making it easier for screen reader users to navigate."
    },
    {
      title: "Focus Indicators",
      description: "Visual focus indicators are provided for keyboard navigation, ensuring users can always see which element they are currently interacting with."
    },
    {
      title: "Form Labels and Instructions",
      description: "All form elements have associated labels and instructions, making forms easier to understand and use for everyone, including users with cognitive disabilities."
    }
  ];

  const inProgressImprovements = [
    {
      title: "Enhanced Keyboard Navigation",
      description: "We are working on improving keyboard shortcuts and navigation to make it even easier to use our site without a mouse."
    },
    {
      title: "Expanded Screen Reader Support",
      description: "We are continuously improving our ARIA attributes and semantic markup to provide better screen reader support."
    },
    {
      title: "Automated Accessibility Testing",
      description: "We are implementing automated testing tools to identify and fix accessibility issues more efficiently."
    },
    {
      title: "User Testing with People with Disabilities",
      description: "We are planning to conduct user testing sessions with people with various disabilities to better understand and address their needs."
    }
  ];

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Accessibility Statement
        </Typography>
        
        <Typography variant="subtitle1" paragraph color="text.secondary" align="center" sx={{ mb: 4 }}>
          Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </Typography>
        
        <Typography paragraph>
          At Findly, we are committed to ensuring digital accessibility for people of all abilities. We are continually improving the user experience 
          for everyone and applying the relevant accessibility standards to achieve this.
        </Typography>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
            1. Our Commitment
          </Typography>
          <Typography paragraph>
            We believe that the internet should be available and accessible to anyone and are committed to providing a website that is accessible to 
            the widest possible audience, regardless of circumstance and ability. We aim to adhere to the Web Content Accessibility Guidelines (WCAG) 2.1, 
            Level AA standards, which define requirements for designers and developers to improve accessibility for people with disabilities.
          </Typography>
          <Typography paragraph>
            We recognize that not all users have equal access to technology and information. Our goal is to create an inclusive experience that accommodates 
            the diverse needs of our user base, including those with visual, hearing, motor, or cognitive disabilities.
          </Typography>
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
            2. Accessibility Standards
          </Typography>
          <Typography paragraph>
            We strive to conform to the following accessibility standards:
          </Typography>
          
          {accessibilityStandards.map((standard, index) => (
            <Accordion key={index} sx={{ mb: 1 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}a-content`}
                id={`panel${index}a-header`}
              >
                <Typography fontWeight="medium">{standard.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{standard.description}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
            3. Accessibility Features
          </Typography>
          <Typography paragraph>
            Our website incorporates the following accessibility features:
          </Typography>
          
          {accessibilityFeatures.map((feature, index) => (
            <Accordion key={index} sx={{ mb: 1 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-feature-${index}a-content`}
                id={`panel-feature-${index}a-header`}
              >
                <Typography fontWeight="medium">{feature.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{feature.description}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
            4. Accessibility in Our Design Process
          </Typography>
          <Typography paragraph>
            We incorporate accessibility considerations throughout our design and development process:
          </Typography>
          <List>
            <ListItem>
              <ListItemText 
                primary="Planning" 
                secondary="We consider accessibility requirements from the beginning of each project."
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Design" 
                secondary="Our designers create interfaces with accessibility in mind, considering color contrast, font sizes, and navigation."
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Development" 
                secondary="Our developers use semantic HTML, ARIA attributes, and follow coding best practices for accessibility."
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Testing" 
                secondary="We perform both automated and manual accessibility testing before releasing new features."
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Continuous Improvement" 
                secondary="We regularly audit our website for accessibility issues and work to address them promptly."
              />
            </ListItem>
          </List>
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
            5. In-Progress Improvements
          </Typography>
          <Typography paragraph>
            We are continuously working to improve the accessibility of our website. Here are some initiatives currently in progress:
          </Typography>
          
          {inProgressImprovements.map((improvement, index) => (
            <Accordion key={index} sx={{ mb: 1 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-improvement-${index}a-content`}
                id={`panel-improvement-${index}a-header`}
              >
                <Typography fontWeight="medium">{improvement.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{improvement.description}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
            6. Assistive Technologies and Browsers
          </Typography>
          <Typography paragraph>
            We aim to support a wide range of assistive technologies and browsers. Our website is designed to work with:
          </Typography>
          <List>
            <ListItem>
              <ListItemText 
                primary="Screen Readers" 
                secondary="JAWS, NVDA, VoiceOver, and TalkBack"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Browsers" 
                secondary="Recent versions of Chrome, Firefox, Safari, and Edge"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Operating Systems" 
                secondary="Windows, macOS, iOS, and Android"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Input Methods" 
                secondary="Keyboard, mouse, touch, and voice"
              />
            </ListItem>
          </List>
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
            7. Known Limitations
          </Typography>
          <Typography paragraph>
            While we strive to ensure that our website is accessible to all, we acknowledge that there may be some limitations. We are actively working to address known issues, including:
          </Typography>
          <List>
            <ListItem>
              <ListItemText 
                primary="Complex Interactive Elements" 
                secondary="Some of our more complex interactive features may present challenges for certain assistive technologies. We are working to improve these."
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Third-Party Content" 
                secondary="Some third-party content or plugins may not meet the same accessibility standards as our website. We are working with our partners to address these issues."
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Legacy Content" 
                secondary="Older content may not fully comply with current accessibility standards. We are progressively updating this content."
              />
            </ListItem>
          </List>
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
            8. Feedback and Contact Information
          </Typography>
          <Typography paragraph>
            We welcome your feedback on the accessibility of our website. If you encounter any accessibility barriers or have suggestions for improvement, please contact us at:
          </Typography>
          <Typography paragraph sx={{ ml: 2 }}>
            Email: <Link href="mailto:accessibility@findly.com">accessibility@findly.com</Link><br />
            Phone: +1 (800) 123-4567<br />
            Address: Findly Accessibility Team, 123 Main Street, New York, NY 10001, USA
          </Typography>
          <Typography paragraph>
            We are committed to addressing accessibility issues and will respond to your feedback within 5 business days.
          </Typography>
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
            9. Changes to This Accessibility Statement
          </Typography>
          <Typography paragraph>
            We may update our Accessibility Statement from time to time. We will notify you of any changes by posting the new statement on this page and updating the "Last Updated" date at the top. You are advised to review this statement periodically for any changes.
          </Typography>
        </Box>
        
        <Divider sx={{ my: 4 }} />
        
        <Box sx={{ textAlign: 'center' }}>
          <Button 
            component={Link} 
            to="/contact" 
            variant="outlined" 
            color="primary"
            sx={{ mr: 2 }}
          >
            Contact Support
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

export default Accessibility; 
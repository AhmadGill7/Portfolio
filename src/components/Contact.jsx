import { Box, Typography, Container, Button } from '@mui/material';
import { Linkedin, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

const Contact = () => {
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  
  const handleContact = () => {
    console.log('Contact clicked');
    window.open("https://www.linkedin.com/in/ahmadgill/", "_blank", "noopener noreferrer");
  };

  return (
    <>
      <Helmet>
        <title>Muhammad Ahmad | Full-Stack & Web3 Developer</title>
        <meta name="description" content="Get in touch with Muhammad Ahmad, a Software Engineer and Full-Stack & Web3 Developer specializing in blockchain technologies and web development." />
      </Helmet>
      <Container maxWidth="lg" id="contact">
        <Box
          sx={{
            py: 3,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              fontFamily: 'Playfair Display',
              letterSpacing: '2px',
              background: 'linear-gradient(131deg, rgba(156,131,255,1) 42%, rgba(224,240,16,0.938813025210084) 70%, rgba(255,144,81,1) 75%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textFillColor: 'transparent', fontSize: { xs: '2rem', md: '3.5rem' },
              mb: { xs: 0.5, md: 1 }
            }}
          >
            Let&apos;s Connect
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              mb: 6,
              maxWidth: '600px',
              opacity: 0.8,
              fontSize: '1.1rem',
              lineHeight: 1.8
            }}
          >
            Have a project in mind? Let&apos;s work together to bring your ideas to life!
          </Typography>

          <Button
            onClick={handleContact}
            variant="contained"
            size="large"
            startIcon={<Linkedin size={20} style={{ color: 'inherit', marginBottom: '7px' }} />}
            endIcon={<ArrowRight 
              size={20} 
              style={{ 
                transform: isButtonHovered ? 'translateX(4px)' : 'translateX(0)',
                transition: 'transform 0.3s ease'
              }} 
            />}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
            sx={{
              borderRadius: 28,
              px: { xs: 3, md: 4 },
              py: 1.5,
              border: '1px solid #585858',
              backgroundColor: '#000000',
              color: '#ffffff',
              fontSize: { xs: '0.875rem', md: '1rem' },
              fontWeight: 500,
              textTransform: 'none',
              transition: 'all 0.3s ease-in-out',
              position: 'relative',
              overflow: 'hidden',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 20px rgba(255, 255, 255, 0.15)',
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(120deg, transparent, rgba(255,255,255,0.2), transparent)',
                transform: 'translateX(-100%)',
              },
              '&:hover::after': {
                transform: 'translateX(100%)',
                transition: 'transform 0.6s ease-in-out',
              }
            }}
          >
            Contact Me
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Contact;
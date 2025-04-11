import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const HeroSection = styled(Box)({
    backgroundColor: '#46342E',
    color: '#fff',
    position: 'relative',
    borderRadius: '24px',
    overflow: 'hidden',
    marginTop: '24px'
});

const PromoText = styled(Typography)({
    fontSize: '14px',
    marginBottom: '16px'
});

const HeroTitle = styled(Typography)({
    fontSize: '48px',
    fontWeight: 500,
    marginBottom: '32px',
    maxWidth: '600px'
});

const NavigationButton = styled(Button)({
    minWidth: '48px',
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#fff',
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.2)'
    }
});

const ContactButton = styled(Button)({
    backgroundColor: '#fff',
    color: '#46342E',
    padding: '12px 24px',
    borderRadius: '8px',
    textTransform: 'none',
    fontSize: '16px',
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.9)'
    }
});

const Hero = () => {
    return (
        <Container maxWidth="lg">
            <HeroSection>
                <Box sx={{ 
                    padding: '48px',
                    backgroundImage: 'url(/images/hero-furniture.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '500px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                    <PromoText>
                        Только до 15 апреля 3+1
                    </PromoText>
                    <HeroTitle variant="h1">
                        При покупке 3-х любых стульев 4-ый в подарок!
                    </HeroTitle>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <ContactButton variant="contained">
                            Связаться
                        </ContactButton>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <NavigationButton>
                                <ArrowBackIcon />
                            </NavigationButton>
                            <NavigationButton>
                                <ArrowForwardIcon />
                            </NavigationButton>
                        </Box>
                    </Box>
                </Box>
            </HeroSection>
        </Container>
    );
};

export default Hero; 
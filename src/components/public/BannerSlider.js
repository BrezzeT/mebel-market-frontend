import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    IconButton,
} from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const BannerSlider = ({ banners }) => {
    const [currentBanner, setCurrentBanner] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            nextBanner();
        }, 5000);

        return () => clearInterval(timer);
    }, [currentBanner]);

    const nextBanner = () => {
        if (!isTransitioning) {
            setIsTransitioning(true);
            setCurrentBanner((prev) => (prev + 1) % banners.length);
            setTimeout(() => setIsTransitioning(false), 500);
        }
    };

    const prevBanner = () => {
        if (!isTransitioning) {
            setIsTransitioning(true);
            setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
            setTimeout(() => setIsTransitioning(false), 500);
        }
    };

    return (
        <Box
            sx={{
                position: 'relative',
                height: { xs: '400px', md: '500px' },
                overflow: 'hidden',
                bgcolor: '#2C2C2C',
                borderRadius: '24px',
                mx: { xs: 2, md: 3 },
                my: { xs: 2, md: 3 },
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `url(${banners[currentBanner].image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transition: 'opacity 0.5s ease-in-out',
                    opacity: isTransitioning ? 0.5 : 1,
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(90deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)',
                }}
            />
            <Container
                maxWidth="lg"
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                <Box
                    sx={{
                        maxWidth: '600px',
                        color: 'white',
                        p: { xs: 3, md: 4 },
                        ml: { xs: 2, md: 4 }
                    }}
                >
                    <Typography
                        variant="overline"
                        sx={{
                            color: 'rgba(255, 255, 255, 0.8)',
                            mb: 1,
                            display: 'block'
                        }}
                    >
                        {banners[currentBanner].title}
                    </Typography>
                    <Typography
                        variant="h1"
                        sx={{
                            mb: 4,
                            color: '#FFFFFF'
                        }}
                    >
                        {banners[currentBanner].description}
                    </Typography>
                    <Button
                        variant="contained"
                        component={Link}
                        to={banners[currentBanner].link}
                        sx={{
                            bgcolor: 'white',
                            color: '#2C2C2C',
                            '&:hover': {
                                bgcolor: 'rgba(255, 255, 255, 0.9)',
                            }
                        }}
                    >
                        {banners[currentBanner].buttonText}
                    </Button>
                </Box>
            </Container>
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 24,
                    right: 24,
                    display: 'flex',
                    gap: 1
                }}
            >
                <IconButton 
                    onClick={prevBanner}
                    size="small"
                >
                    <ArrowBack fontSize="small" />
                </IconButton>
                <IconButton 
                    onClick={nextBanner}
                    size="small"
                >
                    <ArrowForward fontSize="small" />
                </IconButton>
            </Box>
        </Box>
    );
};

export default BannerSlider;
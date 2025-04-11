import React from 'react';
import { Box, Container, Typography, Grid, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import BannerSlider from './BannerSlider';

const banners = [
    {
        id: 1,
        title: 'Только до 15 апреля 3+1',
        description: 'При покупке 3-х любых стульев 4-ый в подарок!',
        image: '/images/banners/chairs-banner.jpg',
        buttonText: 'Связаться',
        link: '/contact'
    }
];

const categories = [
    {
        id: 'chairs',
        title: 'Стулья',
        image: '/images/categories/chairs.jpg',
        link: '/catalog/chairs'
    },
    {
        id: 'sofas',
        title: 'Диваны и кресла',
        image: '/images/categories/sofas.jpg',
        link: '/catalog/sofas'
    },
    {
        id: 'beds',
        title: 'Кровати',
        image: '/images/categories/beds.jpg',
        link: '/catalog/beds'
    },
    {
        id: 'poufs',
        title: 'Банкетки и пуфики',
        image: '/images/categories/poufs.jpg',
        link: '/catalog/poufs'
    },
    {
        id: 'tables',
        title: 'Столы',
        image: '/images/categories/tables.jpg',
        link: '/catalog/tables'
    }
];

const Home = () => {
    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#FDF6F2' }}>
            <BannerSlider banners={banners} />

            <Container 
                maxWidth="lg" 
                sx={{ 
                    py: { xs: 4, md: 6 },
                    px: { xs: 2, md: 3 }
                }}
            >
                <Typography
                    variant="h1"
                    sx={{
                        color: '#2C2C2C',
                        mb: 2
                    }}
                >
                    Фабрика дизайнерской мебели hochustul
                </Typography>
                <Typography
                    variant="h2"
                    sx={{
                        color: '#2C2C2C',
                        opacity: 0.8,
                        maxWidth: '800px',
                        mb: 6
                    }}
                >
                    Создаем необычные интерьерные решения для каждого
                </Typography>

                <Grid container spacing={3}>
                    {categories.map((category, index) => (
                        <Grid item 
                            xs={12} 
                            md={index < 3 ? 4 : 6} 
                            key={category.id}
                        >
                            <Box
                                sx={{
                                    position: 'relative',
                                    height: index < 3 ? 400 : 300,
                                    borderRadius: '24px',
                                    overflow: 'hidden',
                                    backgroundColor: '#E5E5E5'
                                }}
                            >
                                <Box
                                    component="img"
                                    src={category.image}
                                    alt={category.title}
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                />
                                <Button
                                    component={Link}
                                    to={category.link}
                                    variant="contained"
                                    endIcon={<span>→</span>}
                                    sx={{
                                        position: 'absolute',
                                        left: 24,
                                        bottom: 24,
                                        backgroundColor: '#FFFFFF',
                                        color: '#2C2C2C',
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 255, 255, 0.9)'
                                        }
                                    }}
                                >
                                    {category.title}
                                </Button>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Home;
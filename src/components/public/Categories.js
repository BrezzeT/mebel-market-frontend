import React from 'react';
import { Link } from 'react-router-dom';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent
} from '@mui/material';

const categories = [
    {
        id: 'chairs',
        title: 'Стулья',
        description: 'Комфортные стулья для вашего дома',
        color: '#FFE0B2'
    },
    {
        id: 'tables',
        title: 'Столы',
        description: 'Стильные столы для любого интерьера',
        color: '#B2DFDB'
    },
    {
        id: 'sofas',
        title: 'Диваны',
        description: 'Уютные диваны для отдыха',
        color: '#FFCDD2'
    },
    {
        id: 'beds',
        title: 'Кровати',
        description: 'Комфортные кровати для здорового сна',
        color: '#C5CAE9'
    }
];

const Categories = () => {
    return (
        <Box sx={{ py: 8, bgcolor: 'background.default' }}>
            <Container maxWidth="lg">
                <Typography
                    variant="h2"
                    align="center"
                    sx={{
                        mb: 6,
                        fontWeight: 700,
                        color: '#2C2C2C',
                        fontSize: { xs: '2rem', md: '2.5rem' }
                    }}
                >
                    Категории
                </Typography>
                <Grid container spacing={4}>
                    {categories.map((category) => (
                        <Grid item xs={12} sm={6} md={3} key={category.id}>
                            <Card
                                component={Link}
                                to={`/catalog?category=${category.title}`}
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    textDecoration: 'none',
                                    transition: 'transform 0.3s ease-in-out',
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                    '&:hover': {
                                        transform: 'translateY(-8px)'
                                    }
                                }}
                            >
                                <Box
                                    sx={{
                                        position: 'relative',
                                        paddingTop: '75%',
                                        backgroundColor: category.color
                                    }}
                                >
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                            color: '#2C2C2C',
                                            fontWeight: 600,
                                            textAlign: 'center',
                                            width: '100%',
                                            padding: '0 16px'
                                        }}
                                    >
                                        {category.title}
                                    </Typography>
                                </Box>
                                <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 3 }}>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                            fontSize: '0.875rem',
                                            lineHeight: 1.5
                                        }}
                                    >
                                        {category.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Categories; 
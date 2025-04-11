import React from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { categoryConfig } from '../../config/categoryConfig';

const CategorySection = ({ category }) => {
    const navigate = useNavigate();
    const config = categoryConfig[category];

    if (!config) return null;

    const handleSubcategoryClick = (subcategoryId) => {
        navigate(`/catalog/${category}/${subcategoryId}`);
    };

    return (
        <Box sx={{ py: 4 }}>
            <Typography
                variant="h4"
                component="h1"
                sx={{
                    fontSize: { xs: '1.75rem', md: '2.25rem' },
                    fontWeight: 600,
                    color: '#2C2C2C',
                    mb: 4,
                    textAlign: 'center'
                }}
            >
                {config.title}
            </Typography>

            <Grid container spacing={3}>
                {config.subcategories.map((subcategory) => (
                    <Grid item xs={12} sm={6} md={4} key={subcategory.id}>
                        <Card
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                borderRadius: 2,
                                overflow: 'hidden',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                    '& .MuiCardMedia-root': {
                                        transform: 'scale(1.05)'
                                    }
                                }
                            }}
                        >
                            <Box sx={{ position: 'relative', pt: '75%', overflow: 'hidden' }}>
                                <CardMedia
                                    component="img"
                                    image={subcategory.image}
                                    alt={subcategory.label}
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.3s ease-in-out'
                                    }}
                                />
                            </Box>
                            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
                                <Typography
                                    variant="h6"
                                    component="h2"
                                    sx={{
                                        fontSize: '1.125rem',
                                        fontWeight: 500,
                                        mb: 2,
                                        color: '#2C2C2C'
                                    }}
                                >
                                    {subcategory.label}
                                </Typography>
                                <Button
                                    variant="outlined"
                                    onClick={() => handleSubcategoryClick(subcategory.id)}
                                    sx={{
                                        mt: 'auto',
                                        borderColor: '#2C2C2C',
                                        color: '#2C2C2C',
                                        '&:hover': {
                                            borderColor: '#1A1A1A',
                                            backgroundColor: 'rgba(44, 44, 44, 0.04)'
                                        }
                                    }}
                                >
                                    Смотреть все
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default CategorySection; 
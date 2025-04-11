import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/productSlice';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
    CardActions,
    Button,
    Chip,
    CircularProgress
} from '@mui/material';
import { Link } from 'react-router-dom';

const FeaturedProducts = () => {
    const dispatch = useDispatch();
    const { items: products, loading } = useSelector(state => state.products);

    useEffect(() => {
        if (!products.length) {
            dispatch(fetchProducts());
        }
    }, [dispatch, products.length]);

    const renderProduct = (product) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
            <Card
                elevation={0}
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
                    }
                }}
            >
                <CardMedia
                    component="img"
                    height="280"
                    image={product.images?.[0] || '/placeholder.png'}
                    alt={product.name}
                    sx={{ 
                        objectFit: 'cover',
                        borderRadius: '8px 8px 0 0'
                    }}
                />
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                        {product.isNew && (
                            <Chip 
                                label="Новинка" 
                                color="success" 
                                size="small"
                                sx={{ 
                                    borderRadius: '4px',
                                    fontWeight: 500
                                }} 
                            />
                        )}
                        {product.isPopular && (
                            <Chip 
                                label="Популярный" 
                                color="primary" 
                                size="small"
                                sx={{ 
                                    borderRadius: '4px',
                                    fontWeight: 500
                                }} 
                            />
                        )}
                    </Box>
                    <Typography 
                        gutterBottom 
                        variant="h6" 
                        component="h2"
                        sx={{
                            fontWeight: 600,
                            fontSize: '1.25rem',
                            mb: 1
                        }}
                    >
                        {product.name}
                    </Typography>
                    <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{ 
                            mb: 2,
                            minHeight: '3em',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical'
                        }}
                    >
                        {product.description}
                    </Typography>
                    <Typography 
                        variant="h6" 
                        color="primary"
                        sx={{
                            fontWeight: 700,
                            fontSize: '1.5rem'
                        }}
                    >
                        {Number(product.price).toLocaleString('ru-RU')} ₽
                    </Typography>
                </CardContent>
                <CardActions sx={{ p: 3, pt: 0 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to={`/product/${product._id}`}
                        fullWidth
                        sx={{
                            textTransform: 'none',
                            borderRadius: '8px',
                            py: 1
                        }}
                    >
                        Подробнее
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                <CircularProgress />
            </Box>
        );
    }

    // Фильтруем только новые и популярные товары
    const featuredProducts = products.filter(product => product.isNew || product.isPopular);

    return (
        <Box sx={{ bgcolor: 'background.default', py: 8 }}>
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
                    Наши товары
                </Typography>
                {featuredProducts.length > 0 ? (
                    <Grid container spacing={4}>
                        {featuredProducts.map(renderProduct)}
                    </Grid>
                ) : (
                    <Typography 
                        variant="body1" 
                        color="text.secondary" 
                        align="center"
                    >
                        Товаров пока нет
                    </Typography>
                )}
            </Container>
        </Box>
    );
};

export default FeaturedProducts; 
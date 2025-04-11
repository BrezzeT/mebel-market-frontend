import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Grid,
    Card,
    CardContent,
    CardActions,
    Chip,
    Tabs,
    Tab,
    Divider,
    useTheme,
    useMediaQuery,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import {
    FavoriteBorder as FavoriteIcon,
    ShoppingCart as CartIcon,
    Share as ShareIcon,
    Close as CloseIcon
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
    const [tabValue, setTabValue] = useState(0);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`/api/products/${id}`);
                setProduct(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleImageClick = (index) => {
        setSelectedImage(index);
    };

    const handleAddToCart = () => {
        // TODO: Implement add to cart functionality
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    if (loading) {
        return (
            <Container>
                <Typography>Загрузка...</Typography>
            </Container>
        );
    }

    if (!product) {
        return (
            <Container>
                <Typography>Товар не найден</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Grid container spacing={4}>
                {/* Изображения */}
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            position: 'relative',
                            paddingTop: '100%',
                            backgroundColor: 'rgba(0,0,0,0.05)',
                            mb: 2
                        }}
                    >
                        <Typography
                            variant="h4"
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                color: 'text.secondary'
                            }}
                        >
                            [Placeholder for Main Product Image]
                        </Typography>
                    </Box>
                    <Grid container spacing={1}>
                        {product.images.map((_, index) => (
                            <Grid item xs={3} key={index}>
                                <Box
                                    sx={{
                                        position: 'relative',
                                        paddingTop: '100%',
                                        backgroundColor: 'rgba(0,0,0,0.05)',
                                        cursor: 'pointer',
                                        border: selectedImage === index ? `2px solid ${theme.palette.primary.main}` : 'none'
                                    }}
                                    onClick={() => handleImageClick(index)}
                                >
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                            color: 'text.secondary'
                                        }}
                                    >
                                        Image {index + 1}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>

                {/* Информация о товаре */}
                <Grid item xs={12} md={6}>
                    <Box sx={{ mb: 2 }}>
                        {product.isNew && (
                            <Chip
                                label="Новинка"
                                color="primary"
                                sx={{ mb: 2 }}
                            />
                        )}
                        <Typography variant="h4" component="h1" gutterBottom>
                            {product.name}
                        </Typography>
                        <Typography variant="h5" color="primary" gutterBottom>
                            {product.price.toLocaleString('ru-RU')} ₽
                        </Typography>
                        {product.monthlyPayment && (
                            <Typography variant="body1" color="text.secondary" gutterBottom>
                                от {product.monthlyPayment.toLocaleString('ru-RU')} ₽/мес
                            </Typography>
                        )}
                    </Box>

                    <Box sx={{ mb: 3 }}>
                        <Typography variant="body1" paragraph>
                            {product.description}
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 3 }}>
                        <Grid container spacing={2}>
                            {product.dimensions && (
                                <Grid item xs={6}>
                                    <Typography variant="body2" color="text.secondary">
                                        Ширина: {product.dimensions.width} см
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Высота: {product.dimensions.height} см
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Глубина: {product.dimensions.depth} см
                                    </Typography>
                                </Grid>
                            )}
                            {product.materials && product.materials.length > 0 && (
                                <Grid item xs={6}>
                                    <Typography variant="body2" color="text.secondary">
                                        Материалы: {product.materials.join(', ')}
                                    </Typography>
                                </Grid>
                            )}
                        </Grid>
                    </Box>

                    <Box sx={{ mb: 3 }}>
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<CartIcon />}
                            onClick={handleAddToCart}
                            sx={{ mr: 2 }}
                        >
                            В корзину
                        </Button>
                        <IconButton color="primary">
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton color="primary">
                            <ShareIcon />
                        </IconButton>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    {/* Табы с дополнительной информацией */}
                    <Box sx={{ width: '100%' }}>
                        <Tabs value={tabValue} onChange={handleTabChange}>
                            <Tab label="Описание" />
                            <Tab label="Характеристики" />
                            <Tab label="Доставка" />
                        </Tabs>
                        <Box sx={{ mt: 2 }}>
                            {tabValue === 0 && (
                                <Typography variant="body1">
                                    {product.description}
                                </Typography>
                            )}
                            {tabValue === 1 && (
                                <Box>
                                    {product.features && product.features.map((feature, index) => (
                                        <Typography key={index} variant="body1" sx={{ mb: 1 }}>
                                            • {feature}
                                        </Typography>
                                    ))}
                                </Box>
                            )}
                            {tabValue === 2 && (
                                <Typography variant="body1">
                                    Бесплатная доставка при заказе от 50 000 ₽. Срок доставки 1-3 рабочих дня.
                                </Typography>
                            )}
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            {/* Диалог добавления в корзину */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>
                    Товар добавлен в корзину
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseDialog}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        {product.name} успешно добавлен в вашу корзину.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Продолжить покупки</Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            handleCloseDialog();
                            navigate('/cart');
                        }}
                    >
                        Перейти в корзину
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default ProductDetails; 
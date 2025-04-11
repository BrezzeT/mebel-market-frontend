import React, { useState } from 'react';
import {
    Box,
    Container,
    Grid,
    Typography,
    Button,
    IconButton,
    Divider,
    Chip,
    Paper,
    Tabs,
    Tab,
    useTheme,
    useMediaQuery
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    FavoriteBorder as FavoriteIcon,
    ShoppingCart as CartIcon,
    ZoomIn as ZoomIcon
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';

const ProductDetail = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();
    const { id } = useParams();
    const [selectedImage, setSelectedImage] = useState(0);
    const [tabValue, setTabValue] = useState(0);

    // Моковые данные товара
    const product = {
        id: 1,
        name: 'Стол Милан',
        price: 85000,
        monthlyPrice: 13000,
        description: 'Стол Милан - это элегантное решение для вашей гостиной или столовой. Изготовлен из массива дуба с использованием традиционных технологий столярного мастерства.',
        material: 'Дуб',
        dimensions: '120 x 80 x 75 см',
        weight: '25 кг',
        images: [
            '/images/products/table1.jpg',
            '/images/products/table2.jpg',
            '/images/products/table3.jpg',
            '/images/products/table4.jpg'
        ],
        features: [
            'Массив дуба',
            'Ручная обработка',
            'Экологичные материалы',
            'Гарантия 5 лет'
        ],
        specifications: {
            'Материал': 'Массив дуба',
            'Размеры': '120 x 80 x 75 см',
            'Вес': '25 кг',
            'Цвет': 'Натуральный дуб',
            'Стиль': 'Современный',
            'Страна производства': 'Россия'
        }
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleImageClick = (index) => {
        setSelectedImage(index);
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate(-1)}
                sx={{ mb: 2 }}
            >
                Назад
            </Button>

            <Grid container spacing={4}>
                {/* Галерея изображений */}
                <Grid item xs={12} md={6}>
                    <Box sx={{ position: 'relative' }}>
                        <Box
                            component="img"
                            src={product.images[selectedImage]}
                            alt={product.name}
                            sx={{
                                width: '100%',
                                height: 'auto',
                                objectFit: 'cover',
                                borderRadius: 1
                            }}
                        />
                        <IconButton
                            sx={{
                                position: 'absolute',
                                bottom: 16,
                                right: 16,
                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.9)'
                                }
                            }}
                        >
                            <ZoomIcon />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, mt: 2, overflowX: 'auto' }}>
                        {product.images.map((image, index) => (
                            <Box
                                key={index}
                                component="img"
                                src={image}
                                alt={`${product.name} ${index + 1}`}
                                onClick={() => handleImageClick(index)}
                                sx={{
                                    width: 80,
                                    height: 80,
                                    objectFit: 'cover',
                                    borderRadius: 1,
                                    cursor: 'pointer',
                                    border: selectedImage === index ? `2px solid ${theme.palette.primary.main}` : 'none',
                                    opacity: selectedImage === index ? 1 : 0.7,
                                    '&:hover': {
                                        opacity: 1
                                    }
                                }}
                            />
                        ))}
                    </Box>
                </Grid>

                {/* Информация о товаре */}
                <Grid item xs={12} md={6}>
                    <Typography variant="h4" gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant="h5" color="primary" gutterBottom>
                        {product.price.toLocaleString()} ₽
                    </Typography>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                        от {product.monthlyPrice.toLocaleString()} ₽ в месяц
                    </Typography>

                    <Box sx={{ my: 2 }}>
                        {product.features.map((feature, index) => (
                            <Chip
                                key={index}
                                label={feature}
                                sx={{ mr: 1, mb: 1 }}
                            />
                        ))}
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<CartIcon />}
                            sx={{ flex: 1 }}
                        >
                            В корзину
                        </Button>
                        <IconButton
                            color="primary"
                            sx={{ border: `1px solid ${theme.palette.primary.main}` }}
                        >
                            <FavoriteIcon />
                        </IconButton>
                    </Box>

                    <Paper sx={{ p: 2, mb: 4 }}>
                        <Tabs
                            value={tabValue}
                            onChange={handleTabChange}
                            sx={{ borderBottom: 1, borderColor: 'divider' }}
                        >
                            <Tab label="Описание" />
                            <Tab label="Характеристики" />
                        </Tabs>

                        <Box sx={{ mt: 2 }}>
                            {tabValue === 0 && (
                                <Typography variant="body1">
                                    {product.description}
                                </Typography>
                            )}
                            {tabValue === 1 && (
                                <Grid container spacing={2}>
                                    {Object.entries(product.specifications).map(([key, value]) => (
                                        <React.Fragment key={key}>
                                            <Grid item xs={6}>
                                                <Typography variant="body2" color="text.secondary">
                                                    {key}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography variant="body2">
                                                    {value}
                                                </Typography>
                                            </Grid>
                                        </React.Fragment>
                                    ))}
                                </Grid>
                            )}
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ProductDetail; 
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import {
    Box,
    Container,
    Typography,
    Grid,
    Button,
    IconButton,
    Card,
    CardMedia,
    CardContent,
    Tabs,
    Tab,
    Skeleton
} from '@mui/material';
import { FavoriteBorder } from '@mui/icons-material';
import api from '../../utils/axios';

const Catalog = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('all');
    const [activeSubcategory, setActiveSubcategory] = useState('all');
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const categoryFromUrl = queryParams.get('category');

    const categories = [
        { id: 'all', label: 'Все изделия' },
        { id: 'chairs', label: 'Стулья' },
        { id: 'sofas', label: 'Диваны и кресла' },
        { id: 'beds', label: 'Кровати' },
        { id: 'poufs', label: 'Банкетки и пуфики' },
        { id: 'tables', label: 'Столы' }
    ];

    const subcategories = {
        chairs: [
            { id: 'all', label: 'Все' },
            { id: 'dining', label: 'Обеденные', count: 55 },
            { id: 'bar', label: 'Барные', count: 12 }
        ]
    };

    useEffect(() => {
        if (categoryFromUrl) {
            setActiveCategory(categoryFromUrl);
        }
        fetchProducts();
    }, [categoryFromUrl, activeCategory]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const params = activeCategory !== 'all' ? { category: activeCategory } : {};
            const response = await api.get('/api/products', { params });
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        setActiveSubcategory('all');
    };

    const handleSubcategoryChange = (subcategory) => {
        setActiveSubcategory(subcategory);
    };

    return (
        <Box sx={{ bgcolor: '#FDF6F2', minHeight: '100vh', py: 4 }}>
            <Container maxWidth="lg">
                <Typography variant="h1" sx={{ mb: 4 }}>
                    {activeCategory === 'chairs' ? 'Дизайнерские стулья' : 'Каталог'}
                </Typography>

                {/* Категории */}
                <Tabs 
                    value={activeCategory} 
                    onChange={(e, val) => handleCategoryChange(val)}
                    sx={{ mb: 3 }}
                >
                    {categories.map(category => (
                        <Tab 
                            key={category.id}
                            label={category.label}
                            value={category.id}
                        />
                    ))}
                </Tabs>

                {/* Подкатегории (если есть) */}
                {activeCategory === 'chairs' && (
                    <Tabs 
                        value={activeSubcategory}
                        onChange={(e, val) => handleSubcategoryChange(val)}
                        sx={{ mb: 4 }}
                    >
                        {subcategories.chairs.map(subcategory => (
                            <Tab 
                                key={subcategory.id}
                                label={`${subcategory.label}${subcategory.count ? ` ${subcategory.count}` : ''}`}
                                value={subcategory.id}
                            />
                        ))}
                    </Tabs>
                )}

                {/* Список товаров */}
                <Grid container spacing={3}>
                    {loading ? (
                        // Скелетон загрузки
                        Array.from(new Array(8)).map((_, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <Card>
                                    <Skeleton variant="rectangular" height={200} />
                                    <CardContent>
                                        <Skeleton />
                                        <Skeleton width="60%" />
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        // Товары
                        products.map((product) => (
                            <Grid item xs={12} sm={6} md={3} key={product._id}>
                                <Card 
                                    sx={{ 
                                        position: 'relative',
                                        '&:hover': {
                                            boxShadow: '0 8px 40px rgba(0,0,0,0.1)'
                                        }
                                    }}
                                >
                                    <IconButton
                                        sx={{
                                            position: 'absolute',
                                            right: 8,
                                            top: 8,
                                            bgcolor: 'white',
                                            '&:hover': { bgcolor: 'white' }
                                        }}
                                    >
                                        <FavoriteBorder />
                                    </IconButton>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={product.images[0]}
                                        alt={product.name}
                                    />
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            {product.name}
                                        </Typography>
                                        <Typography variant="h6" color="primary" gutterBottom>
                                            от {product.price.toLocaleString()} ₽
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            от {product.monthlyPayment.toLocaleString()} ₽ в месяц
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    )}
                </Grid>
            </Container>
        </Box>
    );
};

export default Catalog; 
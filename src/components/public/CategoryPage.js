import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
    Skeleton,
    ButtonGroup
} from '@mui/material';
import { FavoriteBorder } from '@mui/icons-material';
import api from '../../utils/axios';

const categoryTitles = {
    chairs: 'Дизайнерские стулья',
    sofas: 'Диваны и кресла',
    beds: 'Кровати',
    poufs: 'Банкетки и пуфики',
    tables: 'Столы'
};

const categorySubcategories = {
    chairs: [
        { id: 'all', label: 'Все' },
        { id: 'bar', label: 'Барные' },
        { id: 'dining', label: 'Обеденные' },
        { id: 'office', label: 'Офисные' }
    ],
    sofas: [
        { id: 'all', label: 'Все' },
        { id: 'corner', label: 'Угловые' },
        { id: 'straight', label: 'Прямые' },
        { id: 'modular', label: 'Модульные' }
    ],
    beds: [
        { id: 'all', label: 'Все' },
        { id: 'single', label: 'Односпальные' },
        { id: 'double', label: 'Двуспальные' },
        { id: 'sofa_bed', label: 'Диван-кровати' }
    ],
    poufs: [
        { id: 'all', label: 'Все' },
        { id: 'classic', label: 'Классические' },
        { id: 'ottoman', label: 'Пуф-ottoman' },
        { id: 'storage', label: 'С хранением' }
    ],
    tables: [
        { id: 'all', label: 'Все' },
        { id: 'dining', label: 'Обеденные' },
        { id: 'coffee', label: 'Журнальные' },
        { id: 'console', label: 'Консольные' }
    ]
};

const materials = [
    { id: 'all', label: 'Все' },
    { id: 'wooden', label: 'Деревянные' },
    { id: 'metal', label: 'Металлические' },
    { id: 'soft', label: 'Мягкие' },
    { id: 'withArmrests', label: 'С подлокотниками' }
];

const CategoryPage = () => {
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeSubcategory, setActiveSubcategory] = useState('all');
    const [activeMaterial, setActiveMaterial] = useState('all');

    useEffect(() => {
        fetchProducts();
    }, [category, activeSubcategory, activeMaterial]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await api.get('/products', { 
                params: { 
                    category,
                    subcategory: activeSubcategory !== 'all' ? activeSubcategory : undefined,
                    material: activeMaterial !== 'all' ? activeMaterial : undefined
                }
            });
            console.log('Fetched products:', response.data);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ bgcolor: '#FDF6F2', minHeight: '100vh', pt: 4 }}>
            <Container maxWidth="lg">
                {/* Category Title */}
                <Typography 
                    variant="h1" 
                    sx={{ 
                        color: '#2C2C2C',
                        fontSize: { xs: '2rem', md: '2.5rem' },
                        fontWeight: 400,
                        mb: 4
                    }}
                >
                    {categoryTitles[category]}
                </Typography>

                {/* Subcategories */}
                {categorySubcategories[category] && (
                    <Box sx={{ mb: 4 }}>
                        <ButtonGroup variant="outlined" sx={{ mb: 2 }}>
                            {categorySubcategories[category].map((subcat) => (
                                <Button
                                    key={subcat.id}
                                    onClick={() => setActiveSubcategory(subcat.id)}
                                    variant={activeSubcategory === subcat.id ? 'contained' : 'outlined'}
                                    sx={{
                                        color: activeSubcategory === subcat.id ? 'white' : '#2C2C2C',
                                        borderColor: '#2C2C2C',
                                        '&:hover': {
                                            borderColor: '#2C2C2C',
                                            backgroundColor: activeSubcategory === subcat.id ? '#1A1A1A' : 'rgba(44, 44, 44, 0.04)'
                                        }
                                    }}
                                >
                                    {subcat.label}
                                </Button>
                            ))}
                        </ButtonGroup>
                    </Box>
                )}

                {/* Material Filters */}
                <Box sx={{ mb: 4 }}>
                    <ButtonGroup variant="outlined">
                        {materials.map((material) => (
                            <Button
                                key={material.id}
                                onClick={() => setActiveMaterial(material.id)}
                                variant={activeMaterial === material.id ? 'contained' : 'outlined'}
                                sx={{
                                    color: activeMaterial === material.id ? 'white' : '#2C2C2C',
                                    borderColor: '#2C2C2C',
                                    '&:hover': {
                                        borderColor: '#2C2C2C',
                                        backgroundColor: activeMaterial === material.id ? '#1A1A1A' : 'rgba(44, 44, 44, 0.04)'
                                    }
                                }}
                            >
                                {material.label}
                            </Button>
                        ))}
                    </ButtonGroup>
                </Box>

                {/* Products Grid */}
                <Grid container spacing={3}>
                    {loading ? (
                        // Loading Skeletons
                        Array.from(new Array(8)).map((_, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <Card>
                                    <Skeleton variant="rectangular" height={300} />
                                    <CardContent>
                                        <Skeleton />
                                        <Skeleton width="60%" />
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        // Product Cards
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
                                        height="300"
                                        image={`${process.env.REACT_APP_API_URL}/${product.images[0]}`}
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
                                            от {Math.round(product.price / 12).toLocaleString()} ₽ в месяц
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

export default CategoryPage; 
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    Box, 
    Container, 
    Typography, 
    Breadcrumbs,
    Link,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Button,
    CircularProgress
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/productSlice';
import { categoryConfig } from '../../config/categoryConfig';
import CategoryNavigation from './CategoryNavigation';

const CatalogPage = () => {
    const { category, subcategory } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { items: products, loading } = useSelector(state => state.products);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [activeMaterial, setActiveMaterial] = useState(null);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        if (products.length > 0) {
            let filtered = products;
            
            if (category) {
                filtered = filtered.filter(product => product.category === category);
            }
            
            if (subcategory) {
                filtered = filtered.filter(product => product.subcategory === subcategory);
            }

            if (category === 'chairs' && activeMaterial) {
                filtered = filtered.filter(product => 
                    product.materials === activeMaterial ||
                    (Array.isArray(product.materials) && product.materials.includes(activeMaterial))
                );
            }
            
            setFilteredProducts(filtered);

            // Обновляем количество товаров в каждой подкатегории
            if (category && categoryConfig[category]) {
                categoryConfig[category].subcategories.forEach(sub => {
                    let count = products.filter(
                        p => p.category === category && p.subcategory === sub.id
                    );
                    
                    if (category === 'chairs' && activeMaterial) {
                        count = count.filter(p => 
                            p.materials === activeMaterial ||
                            (Array.isArray(p.materials) && p.materials.includes(activeMaterial))
                        );
                    }
                    
                    sub.count = count.length;
                });
            }
        }
    }, [products, category, subcategory, activeMaterial]);

    const getCategoryTitle = () => {
        if (!category) return 'Каталог';
        
        const categoryData = categoryConfig[category];
        if (!categoryData) return 'Каталог';

        if (subcategory) {
            const subcategoryData = categoryData.subcategories.find(sub => sub.id === subcategory);
            return subcategoryData ? subcategoryData.label : categoryData.title;
        }

        return categoryData.title;
    };

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    const handleMaterialChange = (materialId) => {
        setActiveMaterial(materialId === activeMaterial ? null : materialId);
    };

    if (loading) {
        return (
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '60vh' 
            }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Breadcrumbs sx={{ mb: 3 }}>
                <Link 
                    component="button"
                    variant="body2"
                    onClick={() => navigate('/')}
                    sx={{ color: '#757575', textDecoration: 'none' }}
                >
                    Главная
                </Link>
                <Link 
                    component="button"
                    variant="body2"
                    onClick={() => navigate('/catalog')}
                    sx={{ color: '#757575', textDecoration: 'none' }}
                >
                    Каталог
                </Link>
                {category && (
                    <Link 
                        component="button"
                        variant="body2"
                        onClick={() => navigate(`/catalog/${category}`)}
                        sx={{ color: '#757575', textDecoration: 'none' }}
                    >
                        {categoryConfig[category]?.title}
                    </Link>
                )}
                {subcategory && (
                    <Typography color="text.primary">
                        {categoryConfig[category]?.subcategories.find(sub => sub.id === subcategory)?.label}
                    </Typography>
                )}
            </Breadcrumbs>

            <Typography
                variant="h4"
                component="h1"
                sx={{
                    fontSize: { xs: '1.75rem', md: '2.25rem' },
                    fontWeight: 600,
                    color: '#2C2C2C',
                    mb: 4
                }}
            >
                {getCategoryTitle()}
            </Typography>

            {category && (
                <CategoryNavigation 
                    category={category} 
                    activeSubcategory={subcategory}
                    activeMaterial={activeMaterial}
                    onMaterialChange={handleMaterialChange}
                />
            )}

            {filteredProducts.length === 0 ? (
                <Typography 
                    variant="body1" 
                    sx={{ 
                        textAlign: 'center',
                        color: '#757575',
                        mt: 4 
                    }}
                >
                    В данной категории пока нет товаров
                </Typography>
            ) : (
                <Grid container spacing={3}>
                    {filteredProducts.map((product) => (
                        <Grid item xs={12} sm={6} md={4} key={product._id}>
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
                                        image={product.images[0]}
                                        alt={product.name}
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
                                    {product.isNew && (
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: 16,
                                                left: 16,
                                                backgroundColor: '#2C2C2C',
                                                color: 'white',
                                                px: 1.5,
                                                py: 0.5,
                                                borderRadius: 1,
                                                fontSize: '0.875rem'
                                            }}
                                        >
                                            Новинка
                                        </Box>
                                    )}
                                </Box>
                                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
                                    <Typography
                                        variant="h6"
                                        component="h2"
                                        sx={{
                                            fontSize: '1.125rem',
                                            fontWeight: 500,
                                            mb: 1,
                                            color: '#2C2C2C'
                                        }}
                                    >
                                        {product.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ mb: 2 }}
                                    >
                                        {product.description.length > 100 
                                            ? `${product.description.substring(0, 100)}...` 
                                            : product.description}
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            mt: 'auto',
                                            mb: 2,
                                            fontWeight: 600,
                                            color: '#2C2C2C'
                                        }}
                                    >
                                        {Number(product.price).toLocaleString('ru-RU')} ₽
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        onClick={() => handleProductClick(product._id)}
                                        sx={{
                                            backgroundColor: '#2C2C2C',
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: '#1A1A1A'
                                            }
                                        }}
                                    >
                                        Подробнее
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default CatalogPage; 
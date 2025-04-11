import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
    TextField,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Pagination,
    Skeleton,
    Chip
} from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        category: '',
        search: '',
        sort: 'newest',
        page: 1,
        limit: 9
    });
    const [totalPages, setTotalPages] = useState(1);

    const categories = [
        'All',
        'Стулья',
        'Диваны',
        'Кровати',
        'Столы',
        'Пуфы'
    ];

    const sortOptions = [
        { value: 'newest', label: 'Сначала новые' },
        { value: 'price_asc', label: 'Цена: по возрастанию' },
        { value: 'price_desc', label: 'Цена: по убыванию' },
        { value: 'name_asc', label: 'Название: А-Я' },
        { value: 'name_desc', label: 'Название: Я-А' }
    ];

    useEffect(() => {
        fetchProducts();
    }, [filters]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/api/products', {
                params: {
                    ...filters,
                    category: filters.category === 'All' ? '' : filters.category
                }
            });
            setProducts(response.data);
            setTotalPages(Math.ceil(response.data.length / filters.limit));
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setLoading(false);
        }
    };

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters(prev => ({
            ...prev,
            [name]: value,
            page: 1 // Reset to first page when filters change
        }));
    };

    const handlePageChange = (event, value) => {
        setFilters(prev => ({
            ...prev,
            page: value
        }));
    };

    const renderProduct = (product) => (
        <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                    component="img"
                    height="200"
                    image={product.images[0] || '/placeholder.png'}
                    alt={product.name}
                    sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                        {product.isNew && <Chip label="Новинка" color="primary" size="small" />}
                        {product.isPopular && <Chip label="Популярный" color="secondary" size="small" />}
                    </Box>
                    <Typography gutterBottom variant="h6" component="h2">
                        {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                        {product.description}
                    </Typography>
                    <Typography variant="h6" color="primary">
                        {product.price.toLocaleString('ru-RU')} ₽
                    </Typography>
                </CardContent>
                <Box sx={{ p: 2 }}>
                    <Button
                        component={Link}
                        to={`/product/${product._id}`}
                        variant="contained"
                        fullWidth
                    >
                        Подробнее
                    </Button>
                </Box>
            </Card>
        </Grid>
    );

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Каталог товаров
            </Typography>

            <Box sx={{ mb: 4 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                        <TextField
                            fullWidth
                            label="Поиск"
                            name="search"
                            value={filters.search}
                            onChange={handleFilterChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl fullWidth>
                            <InputLabel>Категория</InputLabel>
                            <Select
                                name="category"
                                value={filters.category}
                                label="Категория"
                                onChange={handleFilterChange}
                            >
                                {categories.map((category) => (
                                    <MenuItem key={category} value={category}>
                                        {category}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl fullWidth>
                            <InputLabel>Сортировка</InputLabel>
                            <Select
                                name="sort"
                                value={filters.sort}
                                label="Сортировка"
                                onChange={handleFilterChange}
                            >
                                {sortOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>

            {loading ? (
                <Grid container spacing={3}>
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <Grid item xs={12} sm={6} md={4} key={item}>
                            <Skeleton variant="rectangular" height={200} />
                            <Skeleton />
                            <Skeleton width="60%" />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <>
                    <Grid container spacing={3}>
                        {products.map(renderProduct)}
                    </Grid>
                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                        <Pagination
                            count={totalPages}
                            page={filters.page}
                            onChange={handlePageChange}
                            color="primary"
                        />
                    </Box>
                </>
            )}
        </Container>
    );
};

export default Products; 
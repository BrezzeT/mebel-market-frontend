import React, { useState, useEffect } from 'react';
import {
    Box,
    Grid,
    Typography,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Button,
    Container,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    TextField,
    InputAdornment,
    IconButton,
    Chip,
    Divider,
    Breadcrumbs,
    Link,
    Alert,
    CircularProgress
} from '@mui/material';
import {
    Search as SearchIcon,
    FavoriteBorder as FavoriteIcon,
    ShoppingCart as CartIcon,
    NavigateNext as NavigateNextIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Tables = () => {
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        material: '',
        priceRange: '',
        sort: 'popular'
    });
    const [searchQuery, setSearchQuery] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchTables = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products?category=tables');
                if (!response.ok) {
                    throw new Error('Не удалось загрузить данные');
                }
                const data = await response.json();
                setTables(data);
                setError(null);
            } catch (error) {
                console.error('Error fetching tables:', error);
                setError('Произошла ошибка при загрузке данных');
            } finally {
                setLoading(false);
            }
        };
        fetchTables();
    }, []);

    const handleFilterChange = (event) => {
        setFilters({
            ...filters,
            [event.target.name]: event.target.value
        });
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/">
            Главная
        </Link>,
        <Typography key="2" color="text.primary">
            Столы
        </Typography>
    ];

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
                sx={{ mb: 4 }}
            >
                {breadcrumbs}
            </Breadcrumbs>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}
            
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Дизайнерские столы
                    </Typography>

                    <Box sx={{ mb: 4 }}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} md={4}>
                                <TextField
                                    fullWidth
                                    placeholder="Поиск столов..."
                                    value={searchQuery}
                                    onChange={handleSearch}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={4}>
                                        <FormControl fullWidth>
                                            <InputLabel>Материал</InputLabel>
                                            <Select
                                                name="material"
                                                value={filters.material}
                                                onChange={handleFilterChange}
                                                label="Материал"
                                            >
                                                <MenuItem value="">Все</MenuItem>
                                                <MenuItem value="wood">Деревянные</MenuItem>
                                                <MenuItem value="metal">Металлические</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <FormControl fullWidth>
                                            <InputLabel>Ценовой диапазон</InputLabel>
                                            <Select
                                                name="priceRange"
                                                value={filters.priceRange}
                                                onChange={handleFilterChange}
                                                label="Ценовой диапазон"
                                            >
                                                <MenuItem value="">Все</MenuItem>
                                                <MenuItem value="0-50000">До 50 000 ₽</MenuItem>
                                                <MenuItem value="50000-100000">50 000 - 100 000 ₽</MenuItem>
                                                <MenuItem value="100000+">От 100 000 ₽</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <FormControl fullWidth>
                                            <InputLabel>Сортировка</InputLabel>
                                            <Select
                                                name="sort"
                                                value={filters.sort}
                                                onChange={handleFilterChange}
                                                label="Сортировка"
                                            >
                                                <MenuItem value="popular">По популярности</MenuItem>
                                                <MenuItem value="price-asc">По возрастанию цены</MenuItem>
                                                <MenuItem value="price-desc">По убыванию цены</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>

                    <Grid container spacing={4}>
                        {tables.map((table) => (
                            <Grid item xs={12} sm={6} md={4} key={table.id}>
                                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <CardMedia
                                        component="img"
                                        height="300"
                                        image={table.image}
                                        alt={table.name}
                                        sx={{ objectFit: 'cover' }}
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h6" component="h2">
                                            {table.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" gutterBottom>
                                            {table.category}
                                        </Typography>
                                        <Chip
                                            label={table.material}
                                            size="small"
                                            sx={{ mb: 2 }}
                                        />
                                        <Typography variant="h6" color="primary">
                                            от {table.price.toLocaleString()} ₽
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            от {table.monthlyPrice.toLocaleString()} ₽ в месяц
                                        </Typography>
                                    </CardContent>
                                    <Divider />
                                    <CardActions>
                                        <Button
                                            size="small"
                                            startIcon={<CartIcon />}
                                            onClick={() => navigate(`/product/${table.id}`)}
                                        >
                                            В корзину
                                        </Button>
                                        <IconButton size="small" color="primary">
                                            <FavoriteIcon />
                                        </IconButton>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}
        </Container>
    );
};

export default Tables; 
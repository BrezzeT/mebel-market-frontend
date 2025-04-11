import React, { useState, useEffect } from 'react';
import {
    Box,
    Grid,
    Paper,
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider
} from '@mui/material';
import {
    ShoppingCart as ShoppingCartIcon,
    Inventory as InventoryIcon,
    Image as ImageIcon,
    People as PeopleIcon
} from '@mui/icons-material';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalBanners: 0,
        totalUsers: 0,
        recentProducts: [],
        recentBanners: []
    });

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            // Используем моковые данные, пока API не готов
            const mockData = {
                totalProducts: 15,
                totalBanners: 5,
                totalUsers: 10,
                recentProducts: [
                    { _id: '1', name: 'Стул офисный', price: 5999 },
                    { _id: '2', name: 'Стол письменный', price: 12999 },
                    { _id: '3', name: 'Диван угловой', price: 45999 },
                    { _id: '4', name: 'Кровать двуспальная', price: 32999 },
                    { _id: '5', name: 'Шкаф-купе', price: 28999 }
                ],
                recentBanners: [
                    { _id: '1', title: 'Летняя распродажа', description: 'Скидки до 50%' },
                    { _id: '2', title: 'Новая коллекция', description: 'Мебель 2024' },
                    { _id: '3', title: 'Бесплатная доставка', description: 'При заказе от 50000 ₽' }
                ]
            };

            setStats(mockData);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        }
    };

    const StatCard = ({ title, value, icon }) => (
        <Paper sx={{ p: 3, display: 'flex', alignItems: 'center' }}>
            <Box sx={{ mr: 2 }}>
                {icon}
            </Box>
            <Box>
                <Typography variant="h6" component="div">
                    {value}
                </Typography>
                <Typography color="text.secondary">
                    {title}
                </Typography>
            </Box>
        </Paper>
    );

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Панель управления
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Всего товаров"
                        value={stats.totalProducts}
                        icon={<InventoryIcon color="primary" sx={{ fontSize: 40 }} />}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Всего баннеров"
                        value={stats.totalBanners}
                        icon={<ImageIcon color="primary" sx={{ fontSize: 40 }} />}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Пользователей"
                        value={stats.totalUsers}
                        icon={<PeopleIcon color="primary" sx={{ fontSize: 40 }} />}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Заказов сегодня"
                        value="0"
                        icon={<ShoppingCartIcon color="primary" sx={{ fontSize: 40 }} />}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Последние добавленные товары
                        </Typography>
                        <List>
                            {stats.recentProducts.map((product) => (
                                <React.Fragment key={product._id}>
                                    <ListItem>
                                        <ListItemText
                                            primary={product.name}
                                            secondary={`Цена: ${product.price.toLocaleString('ru-RU')} ₽`}
                                        />
                                    </ListItem>
                                    <Divider />
                                </React.Fragment>
                            ))}
                        </List>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Последние добавленные баннеры
                        </Typography>
                        <List>
                            {stats.recentBanners.map((banner) => (
                                <React.Fragment key={banner._id}>
                                    <ListItem>
                                        <ListItemText
                                            primary={banner.title}
                                            secondary={banner.description}
                                        />
                                    </ListItem>
                                    <Divider />
                                </React.Fragment>
                            ))}
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard; 
import React from 'react';
import {
    Container,
    Typography,
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    Divider,
    useTheme
} from '@mui/material';
import {
    CheckCircle as CheckCircleIcon,
    ShoppingBag as ShoppingBagIcon,
    Home as HomeIcon
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

const OrderSuccess = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            <Card sx={{ mb: 4 }}>
                <CardContent sx={{ textAlign: 'center', py: 6 }}>
                    <CheckCircleIcon
                        sx={{
                            fontSize: 80,
                            color: 'success.main',
                            mb: 2
                        }}
                    />
                    <Typography variant="h4" component="h1" gutterBottom>
                        Заказ успешно оформлен!
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                        Спасибо за ваш заказ. Мы свяжемся с вами в ближайшее время для подтверждения деталей доставки.
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Номер вашего заказа: #{Math.floor(Math.random() * 1000000)}
                    </Typography>
                </CardContent>
            </Card>

            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <ShoppingBagIcon sx={{ mr: 1, color: 'primary.main' }} />
                                <Typography variant="h6">
                                    Что дальше?
                                </Typography>
                            </Box>
                            <Typography variant="body1" paragraph>
                                1. Мы проверим ваш заказ и свяжемся с вами для подтверждения
                            </Typography>
                            <Typography variant="body1" paragraph>
                                2. После подтверждения заказа мы начнем его обработку
                            </Typography>
                            <Typography variant="body1" paragraph>
                                3. Вы получите уведомление о готовности заказа к отправке
                            </Typography>
                            <Typography variant="body1">
                                4. Курьер свяжется с вами для согласования времени доставки
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <HomeIcon sx={{ mr: 1, color: 'primary.main' }} />
                                <Typography variant="h6">
                                    Продолжить покупки
                                </Typography>
                            </Box>
                            <Typography variant="body1" paragraph>
                                Посмотрите другие товары в нашем каталоге
                            </Typography>
                            <Button
                                variant="contained"
                                fullWidth
                                component={Link}
                                to="/catalog"
                                sx={{ mb: 2 }}
                            >
                                Перейти в каталог
                            </Button>
                            <Button
                                variant="outlined"
                                fullWidth
                                component={Link}
                                to="/"
                            >
                                На главную
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default OrderSuccess; 
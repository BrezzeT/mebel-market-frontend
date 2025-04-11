import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Box,
    Grid,
    Card,
    CardContent,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Radio,
    RadioGroup,
    FormControlLabel,
    Divider,
    Stepper,
    Step,
    StepLabel,
    useTheme,
    useMediaQuery
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    LocalShipping as ShippingIcon,
    Payment as PaymentIcon,
    CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        city: '',
        address: '',
        apartment: '',
        entrance: '',
        floor: '',
        deliveryMethod: 'courier',
        paymentMethod: 'card'
    });

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                // TODO: Replace with actual API call
                const mockItems = [
                    {
                        _id: '1',
                        name: 'Стол обеденный раздвижной',
                        price: 29990,
                        quantity: 1,
                        image: null
                    },
                    {
                        _id: '2',
                        name: 'Стул обеденный',
                        price: 4990,
                        quantity: 4,
                        image: null
                    }
                ];
                setCartItems(mockItems);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching cart items:', error);
                setLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    const steps = ['Контактная информация', 'Доставка', 'Оплата'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleNext = () => {
        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handleSubmit = async () => {
        try {
            // TODO: Implement order submission
            navigate('/order-success');
        } catch (error) {
            console.error('Error submitting order:', error);
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    if (loading) {
        return (
            <Container>
                <Typography>Загрузка...</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate(-1)}
                    sx={{ mb: 2 }}
                >
                    Назад
                </Button>
                <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>

            <Grid container spacing={4}>
                {/* Форма */}
                <Grid item xs={12} md={8}>
                    {activeStep === 0 && (
                        <Card sx={{ mb: 3 }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Контактная информация
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Имя"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Фамилия"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Телефон"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    )}

                    {activeStep === 1 && (
                        <Card sx={{ mb: 3 }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Адрес доставки
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Город"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Адрес"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            fullWidth
                                            label="Квартира"
                                            name="apartment"
                                            value={formData.apartment}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            fullWidth
                                            label="Подъезд"
                                            name="entrance"
                                            value={formData.entrance}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            fullWidth
                                            label="Этаж"
                                            name="floor"
                                            value={formData.floor}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl component="fieldset">
                                            <Typography variant="subtitle1" gutterBottom>
                                                Способ доставки
                                            </Typography>
                                            <RadioGroup
                                                name="deliveryMethod"
                                                value={formData.deliveryMethod}
                                                onChange={handleChange}
                                            >
                                                <FormControlLabel
                                                    value="courier"
                                                    control={<Radio />}
                                                    label="Курьерская доставка"
                                                />
                                                <FormControlLabel
                                                    value="pickup"
                                                    control={<Radio />}
                                                    label="Самовывоз"
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    )}

                    {activeStep === 2 && (
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Способ оплаты
                                </Typography>
                                <FormControl component="fieldset">
                                    <RadioGroup
                                        name="paymentMethod"
                                        value={formData.paymentMethod}
                                        onChange={handleChange}
                                    >
                                        <FormControlLabel
                                            value="card"
                                            control={<Radio />}
                                            label="Банковской картой"
                                        />
                                        <FormControlLabel
                                            value="installment"
                                            control={<Radio />}
                                            label="Рассрочка"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </CardContent>
                        </Card>
                    )}
                </Grid>

                {/* Итого */}
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Итого
                            </Typography>
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body1">
                                    Товары ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
                                </Typography>
                                <Typography variant="h6" color="primary">
                                    {calculateTotal().toLocaleString('ru-RU')} ₽
                                </Typography>
                            </Box>
                            <Divider sx={{ my: 2 }} />
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body1">
                                    Доставка
                                </Typography>
                                <Typography variant="body1" color="primary">
                                    {formData.deliveryMethod === 'courier' ? '500 ₽' : 'Бесплатно'}
                                </Typography>
                            </Box>
                            <Divider sx={{ my: 2 }} />
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="h6">
                                    Общая сумма
                                </Typography>
                                <Typography variant="h6" color="primary">
                                    {(calculateTotal() + (formData.deliveryMethod === 'courier' ? 500 : 0)).toLocaleString('ru-RU')} ₽
                                </Typography>
                            </Box>
                            <Button
                                variant="contained"
                                fullWidth
                                size="large"
                                onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                                startIcon={activeStep === steps.length - 1 ? <CheckCircleIcon /> : null}
                            >
                                {activeStep === steps.length - 1 ? 'Оформить заказ' : 'Продолжить'}
                            </Button>
                            {activeStep > 0 && (
                                <Button
                                    fullWidth
                                    onClick={handleBack}
                                    sx={{ mt: 2 }}
                                >
                                    Назад
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Checkout; 
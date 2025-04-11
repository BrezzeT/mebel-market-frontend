import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Button,
    IconButton,
    Divider,
    TextField,
    Paper,
    Stepper,
    Step,
    StepLabel,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Checkbox,
    FormControlLabel,
    useTheme,
    useMediaQuery,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import {
    Delete as DeleteIcon,
    Add as AddIcon,
    Remove as RemoveIcon,
    ArrowBack as ArrowBackIcon,
    Close as CloseIcon
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const [deliveryMethod, setDeliveryMethod] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

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

    const steps = ['Корзина', 'Доставка', 'Оплата'];

    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalMonthlyPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const handleQuantityChange = (itemId, newQuantity) => {
        if (newQuantity < 1) return;
        setCartItems(items =>
            items.map(item =>
                item._id === itemId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const handleDeleteClick = (item) => {
        setItemToDelete(item);
        setOpenDialog(true);
    };

    const handleDeleteConfirm = () => {
        setCartItems(items => items.filter(item => item._id !== itemToDelete._id));
        setOpenDialog(false);
        setItemToDelete(null);
    };

    const handleNext = () => {
        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
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

            {activeStep === 0 && (
                <Grid container spacing={4}>
                    <Grid item xs={12} md={8}>
                        {cartItems.map((item) => (
                            <Card key={item._id} sx={{ mb: 2 }}>
                                <CardContent>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item xs={12} sm={3}>
                                            <Box
                                                sx={{
                                                    position: 'relative',
                                                    paddingTop: '100%',
                                                    backgroundColor: 'rgba(0,0,0,0.05)'
                                                }}
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
                                                    [Placeholder for Product Image]
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Typography variant="h6" gutterBottom>
                                                {item.name}
                                            </Typography>
                                            <Typography variant="body1" color="primary">
                                                {item.price.toLocaleString('ru-RU')} ₽
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                                                    >
                                                        <RemoveIcon />
                                                    </IconButton>
                                                    <Typography sx={{ mx: 2 }}>
                                                        {item.quantity}
                                                    </Typography>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                                                    >
                                                        <AddIcon />
                                                    </IconButton>
                                                </Box>
                                                <IconButton
                                                    color="error"
                                                    onClick={() => handleDeleteClick(item)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        ))}
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                Итого
                            </Typography>
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body1">
                                    Товары ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
                                </Typography>
                                <Typography variant="h6" color="primary">
                                    {totalPrice.toLocaleString('ru-RU')} ₽
                                </Typography>
                            </Box>
                            <Divider sx={{ my: 2 }} />
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body1">
                                    Ежемесячный платеж
                                </Typography>
                                <Typography variant="h6" color="primary">
                                    {totalMonthlyPrice.toLocaleString('ru-RU')} ₽
                                </Typography>
                            </Box>
                            <Button
                                variant="contained"
                                fullWidth
                                size="large"
                                onClick={handleNext}
                            >
                                Оформить заказ
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            )}

            {activeStep === 1 && (
                <Grid container spacing={4}>
                    <Grid item xs={12} md={8}>
                        <Paper sx={{ p: 3, mb: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                Контактная информация
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Имя"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Фамилия"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Телефон"
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                        </Paper>

                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                Адрес доставки
                            </Typography>
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel>Способ доставки</InputLabel>
                                <Select
                                    value={deliveryMethod}
                                    onChange={(e) => setDeliveryMethod(e.target.value)}
                                    label="Способ доставки"
                                >
                                    <MenuItem value="courier">Курьерская доставка</MenuItem>
                                    <MenuItem value="pickup">Самовывоз</MenuItem>
                                </Select>
                            </FormControl>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Город"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Адрес"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Квартира"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Подъезд"
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                Итого
                            </Typography>
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body1">
                                    Товары ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
                                </Typography>
                                <Typography variant="h6" color="primary">
                                    {totalPrice.toLocaleString('ru-RU')} ₽
                                </Typography>
                            </Box>
                            <Divider sx={{ my: 2 }} />
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body1">
                                    Ежемесячный платеж
                                </Typography>
                                <Typography variant="h6" color="primary">
                                    {totalMonthlyPrice.toLocaleString('ru-RU')} ₽
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    onClick={handleBack}
                                >
                                    Назад
                                </Button>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={handleNext}
                                >
                                    Продолжить
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            )}

            {activeStep === 2 && (
                <Grid container spacing={4}>
                    <Grid item xs={12} md={8}>
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                Способ оплаты
                            </Typography>
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel>Выберите способ оплаты</InputLabel>
                                <Select
                                    value={paymentMethod}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    label="Выберите способ оплаты"
                                >
                                    <MenuItem value="card">Банковской картой</MenuItem>
                                    <MenuItem value="installment">Рассрочка</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Я согласен с условиями оплаты и доставки"
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                Итого
                            </Typography>
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body1">
                                    Товары ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
                                </Typography>
                                <Typography variant="h6" color="primary">
                                    {totalPrice.toLocaleString('ru-RU')} ₽
                                </Typography>
                            </Box>
                            <Divider sx={{ my: 2 }} />
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body1">
                                    Ежемесячный платеж
                                </Typography>
                                <Typography variant="h6" color="primary">
                                    {totalMonthlyPrice.toLocaleString('ru-RU')} ₽
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    onClick={handleBack}
                                >
                                    Назад
                                </Button>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={() => navigate('/order-success')}
                                >
                                    Оплатить
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            )}

            {/* Диалог подтверждения удаления */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>
                    Удалить товар
                    <IconButton
                        aria-label="close"
                        onClick={() => setOpenDialog(false)}
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
                        Вы уверены, что хотите удалить {itemToDelete?.name} из корзины?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Отмена</Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleDeleteConfirm}
                    >
                        Удалить
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Cart; 
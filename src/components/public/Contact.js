import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    TextField,
    Button,
    Paper,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Snackbar,
    Alert
} from '@mui/material';
import {
    Phone as PhoneIcon,
    Email as EmailIcon,
    LocationOn as LocationIcon,
    AccessTime as TimeIcon
} from '@mui/icons-material';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Здесь будет логика отправки формы
        setOpenSnackbar(true);
        setFormData({
            name: '',
            email: '',
            phone: '',
            message: ''
        });
    };

    const contactInfo = [
        {
            icon: <PhoneIcon />,
            title: 'Телефон',
            content: '8 939 380 07 14',
            description: 'Звоните нам с 9:00 до 20:00'
        },
        {
            icon: <EmailIcon />,
            title: 'Email',
            content: 'info@hochustul.ru',
            description: 'Ответим в течение 24 часов'
        },
        {
            icon: <LocationIcon />,
            title: 'Адрес',
            content: 'г. Москва, ул. Примерная, д. 1',
            description: 'Показать на карте'
        },
        {
            icon: <TimeIcon />,
            title: 'Режим работы',
            content: 'Пн-Пт: 9:00 - 20:00',
            description: 'Сб-Вс: 10:00 - 18:00'
        }
    ];

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Box sx={{ mb: 8, textAlign: 'center' }}>
                <Typography variant="h3" gutterBottom>
                    Контакты
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
                    Мы всегда рады помочь вам с выбором мебели и ответить на все ваши вопросы. 
                    Свяжитесь с нами удобным для вас способом.
                </Typography>
            </Box>

            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 4, height: '100%' }}>
                        <Typography variant="h5" gutterBottom>
                            Свяжитесь с нами
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Ваше имя"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
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
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Сообщение"
                                        name="message"
                                        multiline
                                        rows={4}
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="large"
                                        fullWidth
                                    >
                                        Отправить сообщение
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 4, height: '100%' }}>
                        <Typography variant="h5" gutterBottom>
                            Контактная информация
                        </Typography>
                        <List>
                            {contactInfo.map((item, index) => (
                                <React.Fragment key={index}>
                                    <ListItem>
                                        <ListItemIcon sx={{ color: 'primary.main' }}>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={item.title}
                                            secondary={
                                                <Box>
                                                    <Typography variant="body1">
                                                        {item.content}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {item.description}
                                                    </Typography>
                                                </Box>
                                            }
                                        />
                                    </ListItem>
                                    {index < contactInfo.length - 1 && <Divider />}
                                </React.Fragment>
                            ))}
                        </List>
                    </Paper>
                </Grid>
            </Grid>

            <Box sx={{ mt: 8 }}>
                <Typography variant="h5" gutterBottom align="center">
                    Как добраться
                </Typography>
                <Box
                    component="iframe"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.371787549138!2d37.618423315930474!3d55.75124498055754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x414ab5269715db59%3A0x1c1c1c1c1c1c1c1c!2z0JzQvtGB0LrQvtCy0YHQutC40Lkg0L_QvtC70YzQt9C-0LLQsNGC0LXQu9C10Lk!5e0!3m2!1sru!2sru!4v1645000000000!5m2!1sru!2sru"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </Box>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
            >
                <Alert
                    onClose={() => setOpenSnackbar(false)}
                    severity="success"
                    sx={{ width: '100%' }}
                >
                    Ваше сообщение успешно отправлено!
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Contact; 
import React from 'react';
import { Box, Container, Grid, Typography, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <Box 
            component="footer" 
            sx={{ 
                bgcolor: '#2C2C2C',
                color: 'white',
                py: 6,
                mt: 'auto'
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" gutterBottom>
                            О компании
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                            Hochustul - фабрика дизайнерской мебели, создающая уникальные интерьерные решения.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" gutterBottom>
                            Каталог
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <MuiLink component={Link} to="/catalog/chairs" color="inherit" underline="hover">
                                Стулья
                            </MuiLink>
                            <MuiLink component={Link} to="/catalog/sofas" color="inherit" underline="hover">
                                Диваны и кресла
                            </MuiLink>
                            <MuiLink component={Link} to="/catalog/beds" color="inherit" underline="hover">
                                Кровати
                            </MuiLink>
                            <MuiLink component={Link} to="/catalog/tables" color="inherit" underline="hover">
                                Столы
                            </MuiLink>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" gutterBottom>
                            Контакты
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            Телефон: +7 (999) 123-45-67
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            Email: info@hochustul.ru
                        </Typography>
                        <Typography variant="body2">
                            Адрес: г. Москва, ул. Примерная, д. 1
                        </Typography>
                    </Grid>
                </Grid>
                <Box sx={{ mt: 4, pt: 4, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <Typography variant="body2" align="center">
                        © {new Date().getFullYear()} Hochustul. Все права защищены.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer; 
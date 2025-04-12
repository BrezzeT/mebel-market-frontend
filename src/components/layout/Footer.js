import React from 'react';
import { Box, Container, Grid, Typography, Link } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledFooter = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(6, 0),
    marginTop: 'auto'
}));

const FooterLink = styled(Link)(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    textDecoration: 'none',
    display: 'block',
    marginBottom: theme.spacing(1),
    '&:hover': {
        color: theme.palette.primary.light
    }
}));

const Footer = () => {
    return (
        <StyledFooter>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            О компании
                        </Typography>
                        <Typography variant="body2">
                            Мы предлагаем качественные товары по доступным ценам.
                            Наша миссия - сделать покупки удобными и приятными.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            Каталог
                        </Typography>
                        <FooterLink href="/catalog">Все товары</FooterLink>
                        <FooterLink href="/catalog/new">Новинки</FooterLink>
                        <FooterLink href="/catalog/sale">Распродажа</FooterLink>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            Контакты
                        </Typography>
                        <Typography variant="body2" paragraph>
                            Email: info@example.com
                        </Typography>
                        <Typography variant="body2">
                            Телефон: +7 (123) 456-78-90
                        </Typography>
                    </Grid>
                </Grid>
                <Box sx={{ mt: 4, pt: 2, borderTop: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                    <Typography variant="body2" align="center">
                        © {new Date().getFullYear()} Все права защищены
                    </Typography>
                </Box>
            </Container>
        </StyledFooter>
    );
};

export default Footer; 
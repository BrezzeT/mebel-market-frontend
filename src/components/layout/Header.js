import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Container, Box, IconButton, Badge } from '@mui/material';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';

const StyledAppBar = styled(AppBar)({
    backgroundColor: '#FAF0E6', // Бежевый цвет как на макете
    boxShadow: 'none',
    position: 'relative'
});

const Logo = styled(Link)({
    color: '#46342E', // Коричневый цвет как на макете
    textDecoration: 'none',
    fontSize: '24px',
    fontWeight: 500,
    '&:hover': {
        color: '#46342E'
    }
});

const NavLink = styled(Link)({
    color: '#46342E',
    textDecoration: 'none',
    marginRight: '32px',
    fontSize: '16px',
    '&:hover': {
        color: '#000'
    }
});

const ContactButton = styled('button')({
    backgroundColor: '#46342E',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 24px',
    cursor: 'pointer',
    fontSize: '16px',
    '&:hover': {
        backgroundColor: '#2E231E'
    }
});

const LocationText = styled('span')({
    color: '#46342E',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    marginRight: '24px'
});

const PhoneNumber = styled('a')({
    color: '#46342E',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: 500,
    '&:hover': {
        color: '#000'
    }
});

const Header = () => {
    return (
        <StyledAppBar position="static">
            <Container maxWidth="lg">
                <Toolbar sx={{ justifyContent: 'space-between', padding: '16px 0' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Logo to="/">hochustul</Logo>
                        <Box sx={{ marginLeft: '48px' }}>
                            <NavLink to="/catalog">Каталог</NavLink>
                            <NavLink to="/delivery">Путь мебели до дома</NavLink>
                            <NavLink to="/contacts">Контакты</NavLink>
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <LocationText>
                            Казань
                        </LocationText>
                        <PhoneNumber href="tel:89393800714">
                            8 939 380 07 14
                        </PhoneNumber>
                        <Box sx={{ marginLeft: '32px', display: 'flex', gap: '16px' }}>
                            <ContactButton>Связаться</ContactButton>
                            <IconButton color="inherit">
                                <SearchIcon sx={{ color: '#46342E' }} />
                            </IconButton>
                            <IconButton>
                                <Badge badgeContent={0} color="primary">
                                    <ShoppingCartIcon sx={{ color: '#46342E' }} />
                                </Badge>
                            </IconButton>
                            <IconButton>
                                <FavoriteIcon sx={{ color: '#46342E' }} />
                            </IconButton>
                        </Box>
                    </Box>
                </Toolbar>
            </Container>
        </StyledAppBar>
    );
};

export default Header; 
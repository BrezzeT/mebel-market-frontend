import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Container, Box, IconButton, Badge, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    boxShadow: 'none',
    position: 'relative'
}));

const Logo = styled(Link)(({ theme }) => ({
    color: theme.palette.primary.main,
    textDecoration: 'none',
    fontSize: '24px',
    fontWeight: 500,
    '&:hover': {
        color: theme.palette.primary.dark
    }
}));

const NavLink = styled(Link)(({ theme }) => ({
    color: theme.palette.primary.main,
    textDecoration: 'none',
    marginRight: theme.spacing(4),
    fontSize: '16px',
    '&:hover': {
        color: theme.palette.primary.dark
    }
}));

const ContactButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
        backgroundColor: theme.palette.primary.dark
    }
}));

const Header = () => {
    return (
        <StyledAppBar position="static">
            <Container maxWidth="lg">
                <Toolbar>
                    <Logo to="/">Логотип</Logo>
                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                        <NavLink to="/catalog">Каталог</NavLink>
                        <NavLink to="/about">О нас</NavLink>
                        <NavLink to="/contacts">Контакты</NavLink>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <IconButton color="primary">
                            <SearchIcon />
                        </IconButton>
                        <IconButton color="primary">
                            <Badge badgeContent={0} color="error">
                                <FavoriteIcon />
                            </Badge>
                        </IconButton>
                        <IconButton color="primary">
                            <Badge badgeContent={0} color="error">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                        <ContactButton variant="contained">
                            Связаться с нами
                        </ContactButton>
                    </Box>
                </Toolbar>
            </Container>
        </StyledAppBar>
    );
};

export default Header; 
import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Box,
    Container,
    Badge,
    useMediaQuery,
    useTheme,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Menu,
    MenuItem,
    Divider
} from '@mui/material';
import {
    Menu as MenuIcon,
    ShoppingCart as CartIcon,
    Search as SearchIcon,
    Favorite as FavoriteIcon,
    Close as CloseIcon,
    LocationOn as LocationIcon,
    Phone as PhoneIcon,
    KeyboardArrowDown as ArrowDownIcon,
    Person as PersonIcon
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [catalogAnchorEl, setCatalogAnchorEl] = useState(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();
    const isAdmin = useSelector(state => state.auth?.user?.role === 'admin');

    const handleCatalogClick = (event) => {
        setCatalogAnchorEl(event.currentTarget);
    };

    const handleCatalogClose = () => {
        setCatalogAnchorEl(null);
    };

    const menuItems = [
        { text: 'Каталог', path: '/catalog', hasSubmenu: true },
        { text: 'О нас', path: '/about' },
        { text: 'Контакты', path: '/contact' },
    ];

    const catalogItems = [
        { text: 'Столы', path: '/catalog?category=Столы' },
        { text: 'Стулья', path: '/catalog?category=Стулья' },
        { text: 'Диваны', path: '/catalog?category=Диваны' },
        { text: 'Кровати', path: '/catalog?category=Кровати' },
        { text: 'Пуфы', path: '/catalog?category=Пуфы' },
    ];

    const TopBar = () => (
        <Box sx={{ 
            bgcolor: theme.palette.primary.dark,
            py: 1,
            borderBottom: '1px solid',
            borderColor: 'rgba(255, 255, 255, 0.1)'
        }}>
            <Container maxWidth="lg">
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box display="flex" alignItems="center" gap={3}>
                        <Box display="flex" alignItems="center">
                            <LocationIcon sx={{ mr: 1, color: 'white', fontSize: '1rem' }} />
                            <Typography variant="body2" color="white" sx={{ fontSize: '0.875rem' }}>
                                Казань
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                            <PhoneIcon sx={{ mr: 1, color: 'white', fontSize: '1rem' }} />
                            <Typography 
                                component="a"
                                href="tel:89393800714"
                                color="white" 
                                sx={{ 
                                    fontWeight: 500,
                                    fontSize: '0.875rem',
                                    textDecoration: 'none',
                                    '&:hover': {
                                        textDecoration: 'underline'
                                    }
                                }}
                            >
                                8 939 380 07 14
                            </Typography>
                        </Box>
                    </Box>
                    {isAdmin && (
                        <Button
                            component={Link}
                            to="/admin"
                            color="inherit"
                            size="small"
                            startIcon={<PersonIcon />}
                            sx={{ color: 'white' }}
                        >
                            Админ панель
                        </Button>
                    )}
                </Box>
            </Container>
        </Box>
    );

    const DesktopNav = () => (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <Typography
                variant="h6"
                component={Link}
                to="/"
                sx={{
                    textDecoration: 'none',
                    color: 'white',
                    fontWeight: 700,
                    letterSpacing: 1,
                    fontSize: '1.5rem',
                    '&:hover': {
                        color: 'rgba(255,255,255,0.9)'
                    }
                }}
            >
                hochustul
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 4 }}>
                {menuItems.map((item) => (
                    <Box key={item.path}>
                        {item.hasSubmenu ? (
                            <>
                                <Button
                                    color="inherit"
                                    onClick={handleCatalogClick}
                                    endIcon={<ArrowDownIcon />}
                                    sx={{
                                        fontWeight: 500,
                                        fontSize: '0.95rem',
                                        textTransform: 'none',
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: 'rgba(255,255,255,0.1)'
                                        }
                                    }}
                                >
                                    {item.text}
                                </Button>
                                <Menu
                                    anchorEl={catalogAnchorEl}
                                    open={Boolean(catalogAnchorEl)}
                                    onClose={handleCatalogClose}
                                    sx={{
                                        '& .MuiPaper-root': {
                                            borderRadius: '8px',
                                            mt: 1,
                                            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                                        }
                                    }}
                                >
                                    {catalogItems.map((item) => (
                                        <MenuItem 
                                            key={item.path}
                                            component={Link}
                                            to={item.path}
                                            onClick={handleCatalogClose}
                                            sx={{
                                                py: 1.5,
                                                px: 3,
                                                '&:hover': {
                                                    backgroundColor: 'rgba(62, 39, 35, 0.04)'
                                                }
                                            }}
                                        >
                                            {item.text}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </>
                        ) : (
                            <Button
                                component={Link}
                                to={item.path}
                                color="inherit"
                                sx={{
                                    fontWeight: 500,
                                    fontSize: '0.95rem',
                                    textTransform: 'none',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255,255,255,0.1)'
                                    }
                                }}
                            >
                                {item.text}
                            </Button>
                        )}
                    </Box>
                ))}
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton 
                    color="inherit"
                    sx={{
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.1)'
                        }
                    }}
                >
                    <SearchIcon />
                </IconButton>
                <IconButton 
                    color="inherit"
                    sx={{
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.1)'
                        }
                    }}
                >
                    <Badge 
                        badgeContent={0} 
                        color="error"
                    >
                        <CartIcon />
                    </Badge>
                </IconButton>
                <IconButton 
                    color="inherit"
                    sx={{
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.1)'
                        }
                    }}
                >
                    <Badge 
                        badgeContent={0} 
                        color="error"
                    >
                        <FavoriteIcon />
                    </Badge>
                </IconButton>
            </Box>
        </Box>
    );

    const MobileNav = () => (
        <>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => setMobileMenuOpen(true)}
                sx={{ color: 'white' }}
            >
                <MenuIcon />
            </IconButton>
            <Typography
                variant="h6"
                component={Link}
                to="/"
                sx={{
                    textDecoration: 'none',
                    color: 'white',
                    flexGrow: 1,
                    textAlign: 'center',
                    fontWeight: 700,
                }}
            >
                hochustul
            </Typography>
            <IconButton 
                color="inherit"
                sx={{ color: 'white' }}
            >
                <Badge badgeContent={0} color="error">
                    <CartIcon />
                </Badge>
            </IconButton>
            <Drawer
                anchor="left"
                open={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
            >
                <Box
                    sx={{ width: 280 }}
                    role="presentation"
                >
                    <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        p: 2,
                        borderBottom: '1px solid',
                        borderColor: 'divider'
                    }}>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            Меню
                        </Typography>
                        <IconButton onClick={() => setMobileMenuOpen(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <List>
                        <ListItem 
                            button 
                            component={Link} 
                            to="/catalog"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <ListItemText primary="Каталог" />
                        </ListItem>
                        <Divider />
                        {catalogItems.map((item) => (
                            <ListItem
                                button
                                key={item.path}
                                component={Link}
                                to={item.path}
                                onClick={() => setMobileMenuOpen(false)}
                                sx={{ pl: 4 }}
                            >
                                <ListItemText primary={item.text} />
                            </ListItem>
                        ))}
                        <Divider />
                        {menuItems.slice(1).map((item) => (
                            <ListItem
                                button
                                key={item.path}
                                component={Link}
                                to={item.path}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <ListItemText primary={item.text} />
                            </ListItem>
                        ))}
                        {isAdmin && (
                            <>
                                <Divider />
                                <ListItem
                                    button
                                    component={Link}
                                    to="/admin"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <ListItemText primary="Админ панель" />
                                </ListItem>
                            </>
                        )}
                    </List>
                </Box>
            </Drawer>
        </>
    );

    return (
        <>
            <TopBar />
            <AppBar 
                position="sticky" 
                elevation={0}
                sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderBottom: '1px solid',
                    borderColor: 'rgba(255, 255, 255, 0.1)'
                }}
            >
                <Container maxWidth="lg">
                    <Toolbar sx={{ py: 1 }}>
                        {isMobile ? <MobileNav /> : <DesktopNav />}
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
};

export default Navbar; 
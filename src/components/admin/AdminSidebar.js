import React, { useState } from 'react';
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    Divider,
    useTheme,
    useMediaQuery
} from '@mui/material';
import {
    Inventory as InventoryIcon,
    Image as ImageIcon,
    ExitToApp as LogoutIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 280;

const AdminSidebar = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [mobileOpen, setMobileOpen] = useState(false);

    const menuItems = [
        { id: 'products', label: 'Товары', icon: <InventoryIcon />, path: '/admin/products' },
        { id: 'banners', label: 'Баннеры', icon: <ImageIcon />, path: '/admin/banners' }
    ];

    const handleMenuSelect = (path) => {
        navigate(path);
        setMobileOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const drawer = (
        <Box sx={{
            height: '100%',
            backgroundColor: '#2C2C2C',
            color: 'white'
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '80px',
                backgroundColor: '#1A1A1A',
                px: 3
            }}>
                <Typography variant="h6" component="div" sx={{ 
                    fontWeight: 600,
                    letterSpacing: '0.5px',
                    fontSize: '1.25rem'
                }}>
                    Панель управления
                </Typography>
            </Box>
            <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
            <List sx={{ pt: 2 }}>
                {menuItems.map((item) => (
                    <ListItem
                        button
                        key={item.id}
                        onClick={() => handleMenuSelect(item.path)}
                        selected={location.pathname === item.path || (item.path === '/admin/products' && location.pathname === '/admin')}
                        sx={{
                            mb: 1,
                            mx: 2,
                            borderRadius: 1,
                            '&.Mui-selected': {
                                backgroundColor: '#4A4A4A',
                                '&:hover': {
                                    backgroundColor: '#4A4A4A',
                                }
                            },
                            '&:hover': {
                                backgroundColor: '#3A3A3A',
                            }
                        }}
                    >
                        <ListItemIcon sx={{ 
                            color: location.pathname === item.path ? '#fff' : 'rgba(255,255,255,0.7)',
                            minWidth: '40px'
                        }}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText 
                            primary={item.label}
                            sx={{
                                '& .MuiListItemText-primary': {
                                    fontSize: '0.95rem',
                                    fontWeight: location.pathname === item.path ? 500 : 400,
                                    color: location.pathname === item.path ? '#fff' : 'rgba(255,255,255,0.7)'
                                }
                            }}
                        />
                    </ListItem>
                ))}
            </List>
            <Divider sx={{ 
                borderColor: 'rgba(255,255,255,0.1)',
                mt: 'auto'
            }} />
            <List>
                <ListItem 
                    button 
                    onClick={handleLogout}
                    sx={{
                        mx: 2,
                        mb: 2,
                        borderRadius: 1,
                        color: '#FF5252',
                        '&:hover': {
                            backgroundColor: 'rgba(255,82,82,0.15)',
                        }
                    }}
                >
                    <ListItemIcon sx={{ 
                        color: 'inherit',
                        minWidth: '40px'
                    }}>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText 
                        primary="Выйти"
                        sx={{
                            '& .MuiListItemText-primary': {
                                fontSize: '0.95rem',
                                fontWeight: 500
                            }
                        }}
                    />
                </ListItem>
            </List>
        </Box>
    );

    return (
        <Box
            component="nav"
            sx={{ 
                width: { sm: drawerWidth }, 
                flexShrink: { sm: 0 }
            }}
        >
            <Drawer
                variant={isMobile ? 'temporary' : 'permanent'}
                open={isMobile ? mobileOpen : true}
                onClose={() => setMobileOpen(false)}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    '& .MuiDrawer-paper': { 
                        boxSizing: 'border-box', 
                        width: drawerWidth,
                        border: 'none',
                        boxShadow: '2px 0 10px rgba(0,0,0,0.1)'
                    },
                }}
            >
                {drawer}
            </Drawer>
        </Box>
    );
};

export default AdminSidebar; 
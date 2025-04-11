import React from 'react';
import { Box, Container } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import ProductManagement from './ProductManagement';
import BannerManagement from './BannerManagement';
import AdminSidebar from './AdminSidebar';

const AdminPanel = () => {
    return (
        <Box sx={{ 
            display: 'flex',
            minHeight: '100vh',
            backgroundColor: '#F8F9FA',
            pt: '64px' // Add padding top to prevent header overlap
        }}>
            <AdminSidebar />
            <Box sx={{ 
                flexGrow: 1,
                p: 3,
                overflow: 'auto'
            }}>
                <Container maxWidth="xl">
                    <Routes>
                        <Route path="/" element={<ProductManagement />} />
                        <Route path="/products" element={<ProductManagement />} />
                        <Route path="/banners" element={<BannerManagement />} />
                    </Routes>
                </Container>
            </Box>
        </Box>
    );
};

export default AdminPanel; 
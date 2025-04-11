import React from 'react';
import { Box } from '@mui/material';
import Hero from '../components/home/Hero';
import CategoryGrid from '../components/home/CategoryGrid';

const Home = () => {
    return (
        <Box sx={{ 
            backgroundColor: '#FAF0E6',
            minHeight: '100vh',
            paddingBottom: '64px'
        }}>
            <Hero />
            <CategoryGrid />
        </Box>
    );
};

export default Home; 
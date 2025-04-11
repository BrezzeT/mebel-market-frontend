import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import CategorySection from '../components/categories/CategorySection';

const categories = ['chairs', 'sofas', 'beds', 'poufs', 'tables'];

const HomePage = () => {
    return (
        <Box sx={{ py: 4 }}>
            <Container maxWidth="lg">
                <Typography
                    variant="h3"
                    component="h1"
                    sx={{
                        fontSize: { xs: '2rem', md: '2.5rem' },
                        fontWeight: 600,
                        color: '#2C2C2C',
                        mb: 6,
                        textAlign: 'center'
                    }}
                >
                    Мебель для вашего дома
                </Typography>

                {categories.map((category) => (
                    <CategorySection key={category} category={category} />
                ))}
            </Container>
        </Box>
    );
};

export default HomePage; 
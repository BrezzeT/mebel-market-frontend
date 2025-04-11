import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import ArrowButton from '../common/ArrowButton';

const Title = styled(Typography)({
    fontSize: '48px',
    fontWeight: 500,
    color: '#46342E',
    marginBottom: '48px',
    marginTop: '64px'
});

const Subtitle = styled(Typography)({
    fontSize: '18px',
    color: '#46342E',
    marginTop: '16px',
    marginBottom: '64px'
});

const CategoryCard = styled(Box)({
    position: 'relative',
    borderRadius: '16px',
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
    height: '300px',
    transition: 'transform 0.3s ease',
    '&:hover': {
        transform: 'translateY(-4px)',
        '& .arrow-button': {
            backgroundColor: 'rgba(70, 52, 46, 0.04)'
        }
    }
});

const CategoryLink = styled(Link)({
    textDecoration: 'none',
    color: 'inherit',
    display: 'block',
    height: '100%'
});

const CategoryTitle = styled(Box)({
    position: 'absolute',
    top: '24px',
    left: '24px',
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
});

const CategoryImage = styled('img')({
    width: '100%',
    height: '100%',
    objectFit: 'cover'
});

const categories = [
    { id: 'chairs', title: 'Стулья', image: '/images/category-chairs.jpg' },
    { id: 'sofas', title: 'Диваны и кресла', image: '/images/category-sofas.jpg' },
    { id: 'beds', title: 'Кровати', image: '/images/category-beds.jpg' },
    { id: 'poufs', title: 'Банкетки и пуфики', image: '/images/category-poufs.jpg' },
    { id: 'tables', title: 'Столы', image: '/images/category-tables.jpg' }
];

const CategoryGrid = () => {
    return (
        <Container maxWidth="lg">
            <Title variant="h2">
                Фабрика дизайнерской мебели hochustul
            </Title>
            <Subtitle>
                Создаем необычные интерьерные решения для каждого
            </Subtitle>
            <Grid container spacing={3}>
                {categories.map((category) => (
                    <Grid item xs={12} md={category.id === 'chairs' || category.id === 'sofas' ? 6 : 4} key={category.id}>
                        <CategoryCard>
                            <CategoryLink to={`/catalog/${category.id}`}>
                                <CategoryTitle>
                                    <Typography variant="h6" sx={{ color: '#46342E', fontSize: '18px', fontWeight: 500 }}>
                                        {category.title}
                                    </Typography>
                                    <ArrowButton variant="transparent" className="arrow-button" />
                                </CategoryTitle>
                                <CategoryImage src={category.image} alt={category.title} />
                            </CategoryLink>
                        </CategoryCard>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default CategoryGrid; 
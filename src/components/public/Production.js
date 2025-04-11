import React from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Paper,
    useTheme
} from '@mui/material';
import {
    Factory as FactoryIcon,
    Build as BuildIcon,
    Nature as NatureIcon,
    Security as SecurityIcon,
    LocalShipping as ShippingIcon,
    CheckCircle as CheckIcon
} from '@mui/icons-material';

const Production = () => {
    const theme = useTheme();

    const productionSteps = [
        {
            title: 'Отбор древесины',
            description: 'Мы используем только качественную древесину из экологически чистых регионов России',
            image: '/images/production/wood.jpg'
        },
        {
            title: 'Обработка материала',
            description: 'Современное оборудование и ручная обработка для идеального качества',
            image: '/images/production/processing.jpg'
        },
        {
            title: 'Сборка изделий',
            description: 'Профессиональная сборка с использованием качественной фурнитуры',
            image: '/images/production/assembly.jpg'
        },
        {
            title: 'Контроль качества',
            description: 'Многоступенчатый контроль качества на каждом этапе производства',
            image: '/images/production/quality.jpg'
        }
    ];

    const features = [
        {
            icon: <NatureIcon sx={{ fontSize: 40 }} />,
            title: 'Экологичные материалы',
            description: 'Мы используем только экологически чистые материалы высшего качества'
        },
        {
            icon: <BuildIcon sx={{ fontSize: 40 }} />,
            title: 'Современное производство',
            description: 'Наше производство оснащено современным оборудованием'
        },
        {
            icon: <ShippingIcon sx={{ fontSize: 40 }} />,
            title: 'Быстрая доставка',
            description: 'Доставляем мебель в любую точку России'
        },
        {
            icon: <SecurityIcon sx={{ fontSize: 40 }} />,
            title: 'Гарантия качества',
            description: 'Предоставляем гарантию на всю нашу продукцию'
        }
    ];

    const materials = [
        {
            name: 'Дуб',
            description: 'Прочная и долговечная древесина с красивой текстурой',
            image: '/images/materials/oak.jpg'
        },
        {
            name: 'Ясень',
            description: 'Эластичная и прочная древесина с выразительным рисунком',
            image: '/images/materials/ash.jpg'
        },
        {
            name: 'Бук',
            description: 'Твердая и износостойкая древесина с равномерной текстурой',
            image: '/images/materials/beech.jpg'
        }
    ];

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Box sx={{ mb: 8, textAlign: 'center' }}>
                <Typography variant="h3" gutterBottom>
                    О производстве
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
                    Наше производство сочетает в себе традиции ручной работы и современные технологии. 
                    Каждое изделие создается с заботой о качестве и долговечности.
                </Typography>
            </Box>

            <Grid container spacing={4} sx={{ mb: 8 }}>
                {features.map((feature, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                p: 3,
                                transition: 'transform 0.3s ease-in-out',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: theme.shadows[4]
                                }
                            }}
                        >
                            <Box
                                sx={{
                                    width: 80,
                                    height: 80,
                                    borderRadius: '50%',
                                    backgroundColor: 'primary.light',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mb: 2,
                                    color: 'white'
                                }}
                            >
                                {feature.icon}
                            </Box>
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="h2"
                                    sx={{ fontWeight: 600 }}
                                >
                                    {feature.title}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                >
                                    {feature.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ mb: 8 }}>
                <Typography variant="h4" gutterBottom align="center">
                    Процесс производства
                </Typography>
                <Grid container spacing={4}>
                    {productionSteps.map((step, index) => (
                        <Grid item xs={12} md={6} key={index}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="240"
                                    image={step.image}
                                    alt={step.title}
                                />
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        {step.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {step.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Box sx={{ mb: 8 }}>
                <Typography variant="h4" gutterBottom align="center">
                    Используемые материалы
                </Typography>
                <Grid container spacing={4}>
                    {materials.map((material, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={material.image}
                                    alt={material.name}
                                />
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        {material.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {material.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Paper sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Наши преимущества
                </Typography>
                <List>
                    <ListItem>
                        <ListItemIcon>
                            <CheckIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText
                            primary="Собственное производство"
                            secondary="Полный контроль качества на всех этапах производства"
                        />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemIcon>
                            <CheckIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText
                            primary="Опытные мастера"
                            secondary="Команда профессионалов с многолетним опытом работы"
                        />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemIcon>
                            <CheckIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText
                            primary="Современное оборудование"
                            secondary="Использование новейших технологий и оборудования"
                        />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemIcon>
                            <CheckIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText
                            primary="Гарантия качества"
                            secondary="Гарантия на все изделия и услуги"
                        />
                    </ListItem>
                </List>
            </Paper>
        </Container>
    );
};

export default Production; 
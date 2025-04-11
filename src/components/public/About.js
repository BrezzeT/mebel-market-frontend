import React from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import {
    CheckCircle as CheckCircleIcon,
    Factory as FactoryIcon,
    Handyman as HandymanIcon,
    LocalShipping as LocalShippingIcon,
    Support as SupportIcon
} from '@mui/icons-material';

const About = () => {
    const features = [
        {
            icon: <FactoryIcon />,
            title: 'Собственное производство',
            description: 'Мы производим мебель на собственном производстве в России, что позволяет нам контролировать качество на каждом этапе.'
        },
        {
            icon: <HandymanIcon />,
            title: 'Ручная работа',
            description: 'Каждое изделие создается вручную опытными мастерами с использованием традиционных технологий.'
        },
        {
            icon: <LocalShippingIcon />,
            title: 'Доставка по всей России',
            description: 'Организуем доставку в любой город России с соблюдением всех правил транспортировки мебели.'
        },
        {
            icon: <SupportIcon />,
            title: 'Гарантия и сервис',
            description: 'Предоставляем гарантию на всю продукцию и оказываем сервисное обслуживание.'
        }
    ];

    const advantages = [
        'Использование экологичных материалов',
        'Индивидуальный подход к каждому клиенту',
        'Возможность изготовления мебели по индивидуальным размерам',
        'Соблюдение сроков производства и доставки',
        'Профессиональная сборка на месте',
        'Гарантия качества и долговечности'
    ];

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Box sx={{ mb: 8, textAlign: 'center' }}>
                <Typography variant="h3" gutterBottom>
                    О компании
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
                    HOCHUSTUL - это современная мебельная мастерская, специализирующаяся на производстве дизайнерской мебели из массива дерева. 
                    Мы создаем уникальные предметы интерьера, которые сочетают в себе традиционное мастерство и современный дизайн.
                </Typography>
            </Box>

            <Grid container spacing={4} sx={{ mb: 8 }}>
                {features.map((feature, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent sx={{ textAlign: 'center' }}>
                                <Box sx={{ fontSize: 40, color: 'primary.main', mb: 2 }}>
                                    {feature.icon}
                                </Box>
                                <Typography variant="h6" gutterBottom>
                                    {feature.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {feature.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Grid container spacing={6}>
                <Grid item xs={12} md={6}>
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h4" gutterBottom>
                            Наши преимущества
                        </Typography>
                        <List>
                            {advantages.map((advantage, index) => (
                                <ListItem key={index}>
                                    <ListItemIcon>
                                        <CheckCircleIcon color="primary" />
                                    </ListItemIcon>
                                    <ListItemText primary={advantage} />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h4" gutterBottom>
                            Производство
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Наше производство расположено в современном цеху, оснащенном всем необходимым оборудованием. 
                            Мы используем только качественные материалы и фурнитуру от проверенных поставщиков.
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Каждое изделие проходит многоступенчатый контроль качества на всех этапах производства. 
                            Наши мастера имеют многолетний опыт работы и постоянно совершенствуют свои навыки.
                        </Typography>
                        <Typography variant="body1">
                            Мы гордимся тем, что создаем мебель, которая будет служить вам долгие годы и станет частью вашего дома.
                        </Typography>
                    </Box>
                </Grid>
            </Grid>

            <Box sx={{ mt: 8, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    Наша команда
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto', mb: 4 }}>
                    В нашей команде работают профессионалы своего дела - дизайнеры, столяры, маляры и другие специалисты, 
                    которые вкладывают душу в каждое изделие.
                </Typography>
                <Grid container spacing={4}>
                    {[1, 2, 3, 4].map((item) => (
                        <Grid item xs={12} sm={6} md={3} key={item}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="300"
                                    image={`/images/team/member${item}.jpg`}
                                    alt={`Сотрудник ${item}`}
                                />
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Имя Фамилия
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Должность
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

export default About; 
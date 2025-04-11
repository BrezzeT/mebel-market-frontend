import React from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Stepper,
    Step,
    StepLabel,
    Paper
} from '@mui/material';
import {
    LocalShipping as ShippingIcon,
    CheckCircle as CheckIcon,
    Payment as PaymentIcon,
    Build as BuildIcon,
    Home as HomeIcon
} from '@mui/icons-material';

const Delivery = () => {
    const deliverySteps = [
        {
            label: 'Выбор товара',
            description: 'Выберите понравившийся товар в нашем каталоге'
        },
        {
            label: 'Оформление заказа',
            description: 'Заполните форму заказа и выберите способ доставки'
        },
        {
            label: 'Подтверждение',
            description: 'Наш менеджер свяжется с вами для подтверждения заказа'
        },
        {
            label: 'Доставка',
            description: 'Доставляем товар в удобное для вас время'
        },
        {
            label: 'Сборка',
            description: 'Профессиональная сборка мебели на месте'
        }
    ];

    const deliveryOptions = [
        {
            title: 'Курьерская доставка',
            description: 'Доставка по Москве и Московской области',
            price: 'от 1000 ₽',
            features: [
                'Доставка в удобное для вас время',
                'Подъем на этаж',
                'Проверка товара при получении'
            ]
        },
        {
            title: 'Самовывоз',
            description: 'Забрать товар самостоятельно',
            price: 'Бесплатно',
            features: [
                'Собственный склад в Москве',
                'Удобная парковка',
                'Помощь с погрузкой'
            ]
        },
        {
            title: 'Доставка по России',
            description: 'Доставка в любой город России',
            price: 'Рассчитывается индивидуально',
            features: [
                'Транспортные компании на выбор',
                'Страхование груза',
                'Отслеживание доставки'
            ]
        }
    ];

    const assemblyInfo = [
        {
            icon: <CheckIcon />,
            text: 'Профессиональная сборка мебели'
        },
        {
            icon: <CheckIcon />,
            text: 'Опытные сборщики с необходимым инструментом'
        },
        {
            icon: <CheckIcon />,
            text: 'Гарантия на сборку'
        },
        {
            icon: <CheckIcon />,
            text: 'Уборка после сборки'
        }
    ];

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Box sx={{ mb: 8, textAlign: 'center' }}>
                <Typography variant="h3" gutterBottom>
                    Доставка и сборка
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
                    Мы заботимся о том, чтобы ваша мебель была доставлена вовремя и установлена профессионально. 
                    Выберите удобный для вас способ доставки и сборки.
                </Typography>
            </Box>

            <Box sx={{ mb: 8 }}>
                <Typography variant="h5" gutterBottom align="center">
                    Путь мебели до вашего дома
                </Typography>
                <Stepper alternativeLabel sx={{ mt: 4 }}>
                    {deliverySteps.map((step) => (
                        <Step key={step.label}>
                            <StepLabel>{step.label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>

            <Grid container spacing={4} sx={{ mb: 8 }}>
                {deliveryOptions.map((option, index) => (
                    <Grid item xs={12} md={4} key={index}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {option.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" paragraph>
                                    {option.description}
                                </Typography>
                                <Typography variant="h6" color="primary" paragraph>
                                    {option.price}
                                </Typography>
                                <List>
                                    {option.features.map((feature, idx) => (
                                        <ListItem key={idx}>
                                            <ListItemIcon>
                                                <CheckIcon color="primary" />
                                            </ListItemIcon>
                                            <ListItemText primary={feature} />
                                        </ListItem>
                                    ))}
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 4 }}>
                        <Typography variant="h5" gutterBottom>
                            Профессиональная сборка
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Мы предлагаем профессиональную сборку мебели на месте. 
                            Наши опытные сборщики приедут в удобное для вас время и соберут мебель качественно и аккуратно.
                        </Typography>
                        <List>
                            {assemblyInfo.map((item, index) => (
                                <ListItem key={index}>
                                    <ListItemIcon>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 4 }}>
                        <Typography variant="h5" gutterBottom>
                            Важная информация
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <PaymentIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Оплата"
                                    secondary="Оплата производится после проверки товара при получении. Мы принимаем наличные и банковские карты."
                                />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemIcon>
                                    <ShippingIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Сроки доставки"
                                    secondary="Сроки доставки зависят от наличия товара на складе и выбранного способа доставки. Обычно доставка осуществляется в течение 1-3 рабочих дней."
                                />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemIcon>
                                    <BuildIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Сборка"
                                    secondary="Сборка мебели осуществляется в день доставки или в удобное для вас время."
                                />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Гарантия"
                                    secondary="Мы предоставляем гарантию на все товары и услуги. В случае возникновения проблем, мы оперативно их решим."
                                />
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Delivery; 
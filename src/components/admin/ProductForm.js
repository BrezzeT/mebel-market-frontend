import React, { useState, useEffect } from 'react';
import {
    Box,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    Typography,
    Paper,
    FormHelperText,
    Chip
} from '@mui/material';
import api from '../../utils/axios';
import { categoryConfig } from '../../config/categoryConfig';

const ProductForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        subcategory: '',
        materials: [],
        price: '',
        dimensions: {
            width: '',
            height: '',
            depth: ''
        },
        images: []
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'category') {
            setFormData(prev => ({
                ...prev,
                [name]: value,
                subcategory: '',
                materials: []
            }));
            return;
        }

        if (name === 'materials') {
            const materialExists = formData.materials.includes(value);
            setFormData(prev => ({
                ...prev,
                materials: materialExists 
                    ? prev.materials.filter(m => m !== value)
                    : [...prev.materials, value]
            }));
            return;
        }

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        
        // Проверяем размер файлов
        const maxSize = 5 * 1024 * 1024; // 5MB
        const invalidFiles = files.filter(file => file.size > maxSize);
        
        if (invalidFiles.length > 0) {
            setError('Размер каждого файла не должен превышать 5MB');
            return;
        }

        // Проверяем тип файлов
        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        const invalidTypes = files.filter(file => !validTypes.includes(file.type));

        if (invalidTypes.length > 0) {
            setError('Разрешены только изображения (JPEG, PNG, GIF, WEBP)');
            return;
        }

        setFormData(prev => ({
            ...prev,
            images: files
        }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Валидация обязательных полей
            const requiredFields = {
                name: 'Название товара',
                category: 'Категория',
                subcategory: 'Подкатегория',
                price: 'Цена',
                description: 'Описание'
            };

            for (const [field, label] of Object.entries(requiredFields)) {
                if (!formData[field]) {
                    throw new Error(`Поле "${label}" обязательно для заполнения`);
                }
            }

            // Валидация размеров
            const dimensions = formData.dimensions;
            if (!dimensions.width || !dimensions.height || !dimensions.depth) {
                throw new Error('Все размеры товара должны быть указаны');
            }

            if (dimensions.width <= 0 || dimensions.height <= 0 || dimensions.depth <= 0) {
                throw new Error('Размеры должны быть больше 0');
            }

            // Валидация цены
            const price = Number(formData.price);
            if (isNaN(price) || price <= 0) {
                throw new Error('Цена должна быть положительным числом');
            }

            // Валидация изображений
            if (!formData.images.length) {
                throw new Error('Добавьте хотя бы одно изображение');
            }

            const formDataToSend = new FormData();
            
            // Базовые поля
            formDataToSend.append('name', formData.name.trim());
            formDataToSend.append('category', formData.category);
            formDataToSend.append('subcategory', formData.subcategory);
            formDataToSend.append('price', String(price));
            formDataToSend.append('description', formData.description.trim());

            // Материалы
            if (formData.materials.length > 0) {
                formDataToSend.append('materials', JSON.stringify(formData.materials));
            }

            // Размеры
            formDataToSend.append('dimensions', JSON.stringify({
                width: Number(dimensions.width),
                height: Number(dimensions.height),
                depth: Number(dimensions.depth)
            }));

            // Изображения
            formData.images.forEach(file => {
                formDataToSend.append('images', file);
            });

            console.log('Отправка данных на сервер...');
            const response = await api.post('/products', formDataToSend);
            console.log('Ответ сервера:', response.data);

            // Очистка формы после успешного создания
            setFormData({
                name: '',
                description: '',
                category: '',
                subcategory: '',
                materials: [],
                price: '',
                dimensions: {
                    width: '',
                    height: '',
                    depth: ''
                },
                images: []
            });

            // Очищаем input файлов
            const fileInput = document.getElementById('images-input');
            if (fileInput) {
                fileInput.value = '';
            }

            alert('Товар успешно создан!');
        } catch (error) {
            console.error('Ошибка при создании товара:', error);
            setError(error.response?.data?.message || error.message || 'Ошибка при создании товара');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
                Добавить новый товар
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Название товара"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth required>
                            <InputLabel>Категория</InputLabel>
                            <Select
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                            >
                                {Object.entries(categoryConfig).map(([key, config]) => (
                                    <MenuItem key={key} value={key}>
                                        {config.title}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth required disabled={!formData.category}>
                            <InputLabel>Подкатегория</InputLabel>
                            <Select
                                name="subcategory"
                                value={formData.subcategory}
                                onChange={handleInputChange}
                            >
                                {formData.category && categoryConfig[formData.category].subcategories.map(subcat => (
                                    <MenuItem key={subcat.id} value={subcat.id}>
                                        {subcat.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel>Материалы</InputLabel>
                            <Select
                                name="materials"
                                multiple
                                value={formData.materials}
                                onChange={handleInputChange}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => {
                                            const material = formData.category 
                                                ? categoryConfig[formData.category].materials.find(m => m.id === value)
                                                : null;
                                            return (
                                                <Chip 
                                                    key={value} 
                                                    label={material ? material.label : value}
                                                />
                                            );
                                        })}
                                    </Box>
                                )}
                            >
                                {formData.category && categoryConfig[formData.category].materials.map(material => (
                                    <MenuItem key={material.id} value={material.id}>
                                        {material.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Цена"
                            name="price"
                            type="number"
                            value={formData.price}
                            onChange={handleInputChange}
                            required
                            InputProps={{
                                startAdornment: '₽'
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Описание"
                            name="description"
                            multiline
                            rows={4}
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom>
                            Размеры (см)
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    label="Ширина"
                                    name="width"
                                    type="number"
                                    value={formData.dimensions.width}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        dimensions: {
                                            ...prev.dimensions,
                                            width: e.target.value
                                        }
                                    }))}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    label="Высота"
                                    name="height"
                                    type="number"
                                    value={formData.dimensions.height}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        dimensions: {
                                            ...prev.dimensions,
                                            height: e.target.value
                                        }
                                    }))}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    label="Глубина"
                                    name="depth"
                                    type="number"
                                    value={formData.dimensions.depth}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        dimensions: {
                                            ...prev.dimensions,
                                            depth: e.target.value
                                        }
                                    }))}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <input
                            accept="image/*"
                            type="file"
                            multiple
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                            id="images-input"
                        />
                        <label htmlFor="images-input">
                            <Button variant="contained" component="span">
                                Загрузить изображения
                            </Button>
                        </label>
                        {formData.images.length > 0 && (
                            <FormHelperText>
                                Выбрано файлов: {formData.images.length}
                            </FormHelperText>
                        )}
                    </Grid>
                    {error && (
                        <Grid item xs={12}>
                            <Typography color="error">{error}</Typography>
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={loading}
                            fullWidth
                        >
                            {loading ? 'Создание...' : 'Создать товар'}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
};

export default ProductForm; 
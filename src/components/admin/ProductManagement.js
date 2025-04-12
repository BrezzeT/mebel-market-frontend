import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogActions,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Typography,
    Grid,
    CircularProgress,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Checkbox,
    FormControlLabel,
    Snackbar,
    Alert
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Add as AddIcon,
    CloudUpload as CloudUploadIcon,
    Close as CloseIcon
} from '@mui/icons-material';
import {
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct
} from '../../store/productSlice';

const categoryProperties = {
    chairs: {
        subcategories: [
            { id: 'bar', label: 'Барные' },
            { id: 'dining', label: 'Обеденные' }
        ],
        materials: [
            { id: 'wooden', label: 'Деревянные' },
            { id: 'metal', label: 'Металлические' },
            { id: 'soft', label: 'Мягкие' },
            { id: 'withArmrests', label: 'С подлокотниками' }
        ]
    },
    sofas: {
        subcategories: [
            { id: 'without_legs', label: 'Без ножек' },
            { id: 'modular', label: 'Модульные' },
            { id: 'with_legs', label: 'На ножках' },
            { id: 'non_folding', label: 'Нераскладной' },
            { id: 'straight', label: 'Прямые' },
            { id: 'folding', label: 'Раскладной' },
            { id: 'ottoman', label: 'С оттоманкой' },
            { id: 'corner', label: 'Угловые' }
        ],
        materials: [
            { id: 'soft', label: 'Мягкие' },
            { id: 'withArmrests', label: 'С подлокотниками' }
        ]
    },
    beds: {
        subcategories: [
            { id: 'single', label: 'Односпальные' },
            { id: 'double', label: 'Двуспальные' },
            { id: 'sofa_bed', label: 'Диван-кровати' }
        ],
        materials: [
            { id: 'wooden', label: 'Деревянные' },
            { id: 'metal', label: 'Металлические' },
            { id: 'soft', label: 'Мягкие' }
        ]
    },
    poufs: {
        subcategories: [
            { id: 'without_storage', label: 'Без ящика' },
            { id: 'with_storage', label: 'С ящиком' }
        ],
        materials: [
            { id: 'soft', label: 'Мягкие' }
        ]
    },
    tables: {
        subcategories: [
            { id: 'wooden', label: 'Деревянные' },
            { id: 'metal', label: 'Металлические' },
            { id: 'coffee', label: 'Журнальные' }
        ],
        materials: [
            { id: 'wooden', label: 'Деревянные' },
            { id: 'metal', label: 'Металлические' }
        ]
    }
};

const categories = [
    { id: 'chairs', label: 'Стулья' },
    { id: 'sofas', label: 'Диваны' },
    { id: 'beds', label: 'Кровати' },
    { id: 'poufs', label: 'Пуфы' },
    { id: 'tables', label: 'Столы' }
];

const ImagePreview = ({ images, onRemove }) => {
    return (
        <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            flexWrap: 'wrap',
            mt: 2
        }}>
            {images.map((image, index) => (
                <Box
                    key={index}
                    sx={{
                        position: 'relative',
                        width: 150,
                        height: 150,
                        borderRadius: 1,
                        overflow: 'hidden',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                >
                    <img
                        src={image instanceof File ? URL.createObjectURL(image) : image}
                        alt={`Preview ${index + 1}`}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                    />
                    <IconButton
                        size="small"
                        onClick={() => onRemove(index)}
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            backgroundColor: 'rgba(255,255,255,0.9)',
                            '&:hover': {
                                backgroundColor: 'rgba(255,255,255,1)'
                            }
                        }}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </Box>
            ))}
        </Box>
    );
};

const ProductManagement = () => {
    const dispatch = useDispatch();
    const { items: products, loading } = useSelector(state => state.products);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        subcategory: '',
        materials: [],
        dimensions: {
            width: '',
            height: '',
            depth: ''
        },
        isNew: false,
        isPopular: false,
        images: []
    });

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setFormData(prev => ({
            ...prev,
            images: [...prev.images, ...files]
        }));
    };

    const handleRemoveImage = (index) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    useEffect(() => {
        if (!products.length) {
            dispatch(fetchProducts());
        }
    }, [dispatch, products.length]);

    const handleOpenDialog = (product = null) => {
        if (product) {
            setSelectedProduct(product);
            setFormData({
                name: product.name || '',
                description: product.description || '',
                price: product.price || '',
                category: product.category || '',
                subcategory: product.subcategory || '',
                materials: product.materials || [],
                dimensions: {
                    width: product.dimensions?.width || '',
                    height: product.dimensions?.height || '',
                    depth: product.dimensions?.depth || ''
                },
                isNew: Boolean(product.isNew),
                isPopular: Boolean(product.isPopular),
                images: product.images || []
            });
        } else {
            setSelectedProduct(null);
            setFormData({
                name: '',
                description: '',
                price: '',
                category: '',
                subcategory: '',
                materials: [],
                dimensions: {
                    width: '',
                    height: '',
                    depth: ''
                },
                isNew: false,
                isPopular: false,
                images: []
            });
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedProduct(null);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        if (type === 'checkbox') {
            setFormData(prev => ({
                ...prev,
                [name]: checked
            }));
            return;
        }

        if (name === 'category') {
            // Reset subcategory and materials when category changes
            setFormData(prev => ({
                ...prev,
                [name]: value,
                subcategory: '', // Reset subcategory
                materials: [] // Reset materials
            }));
            return;
        }

        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    const showMessage = (message, severity = 'success') => {
        setSnackbar({
            open: true,
            message,
            severity
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            setSubmitting(true);

            // Validate required fields
            if (!formData.name || !formData.description || !formData.price || !formData.category) {
                showMessage('Пожалуйста, заполните все обязательные поля', 'error');
                return;
            }

            const productData = new FormData();
            
            // Add basic fields
            productData.append('name', formData.name);
            productData.append('description', formData.description);
            productData.append('price', String(formData.price));
            productData.append('category', formData.category);
            
            // Add materials
            if (formData.materials.length > 0) {
                productData.append('materials', JSON.stringify(formData.materials));
            }
            
            // Add optional fields if they exist
            if (formData.subcategory) {
                productData.append('subcategory', formData.subcategory);
            }
            
            // Add dimensions as JSON string if any dimension is specified
            if (formData.dimensions.width || formData.dimensions.height || formData.dimensions.depth) {
                productData.append('dimensions', JSON.stringify({
                    width: formData.dimensions.width,
                    height: formData.dimensions.height,
                    depth: formData.dimensions.depth
                }));
            }
            
            // Add boolean fields
            productData.append('isNew', String(formData.isNew));
            productData.append('isPopular', String(formData.isPopular));
            
            // Add images
            if (formData.images && formData.images.length > 0) {
                formData.images.forEach((image) => {
                    if (image instanceof File) {
                        productData.append('images', image);
                    }
                });
            }

            // Log the data being sent
            console.log('Submitting product data:', {
                name: formData.name,
                description: formData.description,
                price: formData.price,
                category: formData.category,
                subcategory: formData.subcategory,
                dimensions: formData.dimensions,
                isNew: formData.isNew,
                isPopular: formData.isPopular,
                imagesCount: formData.images.length
            });

            // Log FormData contents for debugging
            for (let pair of productData.entries()) {
                console.log(pair[0], pair[1]);
            }

            // Dispatch create or update action
            if (selectedProduct) {
                await dispatch(updateProduct({ id: selectedProduct._id, productData })).unwrap();
                showMessage('Товар успешно обновлен');
            } else {
                const result = await dispatch(createProduct(productData)).unwrap();
                console.log('Create product result:', result);
                showMessage('Товар успешно создан');
            }

            handleCloseDialog();
            dispatch(fetchProducts()); // Refresh the product list
        } catch (error) {
            console.error('Error submitting product:', error);
            showMessage(error.message || 'Не удалось создать товар', 'error');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Вы уверены, что хотите удалить этот товар?')) {
            try {
                setSubmitting(true);
                await dispatch(deleteProduct(id)).unwrap();
                showMessage('Товар успешно удален');
                await dispatch(fetchProducts());
            } catch (error) {
                console.error('Error deleting product:', error);
                showMessage(error.message || 'Ошибка при удалении товара', 'error');
            } finally {
                setSubmitting(false);
            }
        }
    };

    if (loading) {
        return (
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '200px' 
            }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                mb: 3
            }}>
                <Typography 
                    variant="h5" 
                    component="h2"
                    sx={{
                        fontSize: '1.5rem',
                        fontWeight: 600,
                        color: '#2C2C2C'
                    }}
                >
                    Управление товарами
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpenDialog(null)}
                    sx={{
                        backgroundColor: '#2C2C2C',
                        color: 'white',
                        borderRadius: '4px',
                        textTransform: 'none',
                        px: 3,
                        py: 1,
                        fontSize: '0.95rem',
                        fontWeight: 500,
                        boxShadow: 'none',
                        '&:hover': {
                            backgroundColor: '#1A1A1A',
                            boxShadow: 'none'
                        }
                    }}
                >
                    Добавить товар
                </Button>
            </Box>

            <TableContainer 
                component={Paper}
                sx={{
                    boxShadow: 'none',
                    borderRadius: 2,
                    border: '1px solid #E0E0E0',
                    overflow: 'hidden'
                }}
            >
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#F8F9FA' }}>
                            <TableCell sx={{ 
                                fontWeight: 600,
                                color: '#2C2C2C',
                                fontSize: '0.875rem',
                                py: 2
                            }}>
                                Изображение
                            </TableCell>
                            <TableCell sx={{ 
                                fontWeight: 600,
                                color: '#2C2C2C',
                                fontSize: '0.875rem',
                                py: 2
                            }}>
                                Название
                            </TableCell>
                            <TableCell sx={{ 
                                fontWeight: 600,
                                color: '#2C2C2C',
                                fontSize: '0.875rem',
                                py: 2
                            }}>
                                Категория
                            </TableCell>
                            <TableCell sx={{ 
                                fontWeight: 600,
                                color: '#2C2C2C',
                                fontSize: '0.875rem',
                                py: 2
                            }}>
                                Цена
                            </TableCell>
                            <TableCell align="right" sx={{ 
                                fontWeight: 600,
                                color: '#2C2C2C',
                                fontSize: '0.875rem',
                                py: 2
                            }}>
                                Действия
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow 
                                key={product._id}
                                sx={{
                                    '&:hover': {
                                        backgroundColor: '#F8F9FA'
                                    }
                                }}
                            >
                                <TableCell sx={{ py: 2 }}>
                                    <Box
                                        sx={{
                                            width: 70,
                                            height: 70,
                                            borderRadius: 1.5,
                                            overflow: 'hidden',
                                            backgroundColor: '#F8F9FA',
                                            border: '1px solid #E0E0E0'
                                        }}
                                    >
                                        {product.images && product.images[0] ? (
                                            <img
                                                src={product.images[0]}
                                                alt={product.name}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover'
                                                }}
                                            />
                                        ) : (
                                            <Box
                                                sx={{
                                                    width: '100%',
                                                    height: '100%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    backgroundColor: '#F8F9FA'
                                                }}
                                            >
                                                <Typography 
                                                    variant="caption" 
                                                    sx={{ 
                                                        color: '#757575',
                                                        fontSize: '0.75rem'
                                                    }}
                                                >
                                                    Нет фото
                                                </Typography>
                                            </Box>
                                        )}
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Typography 
                                        variant="body1"
                                        sx={{
                                            color: '#2C2C2C',
                                            fontWeight: 500,
                                            fontSize: '0.95rem'
                                        }}
                                    >
                                        {product.name}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography 
                                        variant="body2"
                                        sx={{
                                            color: '#757575',
                                            fontSize: '0.875rem'
                                        }}
                                    >
                                        {product.category}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography 
                                        variant="body2"
                                        sx={{
                                            color: '#2C2C2C',
                                            fontWeight: 500,
                                            fontSize: '0.95rem'
                                        }}
                                    >
                                        {Number(product.price).toLocaleString('ru-RU')} ₽
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton 
                                        onClick={() => handleOpenDialog(product)}
                                        sx={{ 
                                            color: '#2C2C2C',
                                            '&:hover': {
                                                backgroundColor: 'rgba(44, 44, 44, 0.1)'
                                            }
                                        }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton 
                                        onClick={() => handleDelete(product._id)}
                                        sx={{ 
                                            color: '#FF5252',
                                            '&:hover': {
                                                backgroundColor: 'rgba(255, 82, 82, 0.1)'
                                            }
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        {products.length === 0 && (
                            <TableRow>
                                <TableCell 
                                    colSpan={5} 
                                    align="center" 
                                    sx={{ 
                                        py: 8,
                                        color: '#757575'
                                    }}
                                >
                                    <Typography variant="body1">
                                        Товары не найдены
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 2,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        maxWidth: '800px'
                    }
                }}
            >
                <Box sx={{ 
                    borderBottom: '1px solid #E0E0E0',
                    px: 3,
                    py: 2.5,
                    backgroundColor: '#F8F9FA'
                }}>
                    <Typography 
                        variant="h6" 
                        sx={{ 
                            fontWeight: 600, 
                            color: '#2C2C2C',
                            fontSize: '1.25rem'
                        }}
                    >
                        {selectedProduct ? 'Редактировать товар' : 'Добавить новый товар'}
                    </Typography>
                </Box>
                <DialogContent sx={{ p: 3 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Название товара *"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 1
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Описание *"
                                name="description"
                                multiline
                                rows={4}
                                value={formData.description}
                                onChange={handleInputChange}
                                required
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 1
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth required>
                                <InputLabel>Категория *</InputLabel>
                                <Select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    label="Категория *"
                                >
                                    {categories.map((category) => (
                                        <MenuItem key={category.id} value={category.id}>
                                            {category.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {formData.category && categoryProperties[formData.category]?.subcategories && (
                                <FormControl fullWidth>
                                    <InputLabel>Подкатегория</InputLabel>
                                    <Select
                                        name="subcategory"
                                        value={formData.subcategory}
                                        onChange={handleInputChange}
                                        label="Подкатегория"
                                    >
                                        {categoryProperties[formData.category].subcategories.map((subcat) => (
                                            <MenuItem key={subcat.id} value={subcat.id}>
                                                {subcat.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {formData.category && categoryProperties[formData.category]?.materials && (
                                <FormControl fullWidth>
                                    <InputLabel>Материалы</InputLabel>
                                    <Select
                                        multiple
                                        name="materials"
                                        value={formData.materials}
                                        onChange={handleInputChange}
                                        label="Материалы"
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value) => (
                                                    <Typography key={value} variant="body2">
                                                        {categoryProperties[formData.category].materials.find(m => m.id === value)?.label}
                                                    </Typography>
                                                ))}
                                            </Box>
                                        )}
                                    >
                                        {categoryProperties[formData.category].materials.map((material) => (
                                            <MenuItem key={material.id} value={material.id}>
                                                <Checkbox checked={formData.materials.indexOf(material.id) > -1} />
                                                {material.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Цена *"
                                name="price"
                                type="number"
                                value={formData.price}
                                onChange={handleInputChange}
                                required
                                InputProps={{
                                    endAdornment: <Typography sx={{ color: '#757575' }}>₽</Typography>
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 1
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
                                Размеры (см)
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <TextField
                                        fullWidth
                                        label="Ширина"
                                        name="dimensions.width"
                                        type="number"
                                        value={formData.dimensions.width}
                                        onChange={handleInputChange}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 1
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        fullWidth
                                        label="Высота"
                                        name="dimensions.height"
                                        type="number"
                                        value={formData.dimensions.height}
                                        onChange={handleInputChange}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 1
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        fullWidth
                                        label="Глубина"
                                        name="dimensions.depth"
                                        type="number"
                                        value={formData.dimensions.depth}
                                        onChange={handleInputChange}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 1
                                            }
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
                                Изображения
                            </Typography>
                            <Button
                                variant="outlined"
                                component="label"
                                startIcon={<CloudUploadIcon />}
                                sx={{
                                    width: '100%',
                                    py: 2,
                                    border: '2px dashed #E0E0E0',
                                    borderRadius: 1,
                                    color: '#757575',
                                    '&:hover': {
                                        backgroundColor: '#F8F9FA',
                                        border: '2px dashed #2C2C2C'
                                    }
                                }}
                            >
                                Загрузить изображения
                                <input
                                    type="file"
                                    hidden
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                            </Button>
                            <ImagePreview 
                                images={formData.images}
                                onRemove={handleRemoveImage}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={formData.isNew}
                                        onChange={handleInputChange}
                                        name="isNew"
                                    />
                                }
                                label="Новинка"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={formData.isPopular}
                                        onChange={handleInputChange}
                                        name="isPopular"
                                    />
                                }
                                label="Популярный товар"
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ 
                    borderTop: '1px solid #E0E0E0',
                    px: 3,
                    py: 2,
                    backgroundColor: '#F8F9FA'
                }}>
                    <Button 
                        onClick={handleCloseDialog}
                        sx={{ 
                            color: '#757575',
                            '&:hover': {
                                backgroundColor: 'rgba(0,0,0,0.05)'
                            }
                        }}
                    >
                        Отмена
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={submitting}
                        sx={{
                            backgroundColor: '#2C2C2C',
                            color: '#FFFFFF',
                            '&:hover': {
                                backgroundColor: '#1A1A1A'
                            },
                            '&:disabled': {
                                backgroundColor: '#E0E0E0'
                            }
                        }}
                    >
                        {submitting ? (
                            <CircularProgress size={24} sx={{ color: 'white' }} />
                        ) : (
                            selectedProduct ? 'Сохранить' : 'Добавить'
                        )}
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert 
                    onClose={handleCloseSnackbar} 
                    severity={snackbar.severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ProductManagement; 
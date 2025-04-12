import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { categoryConfig } from '../../config/categoryConfig';

const CategoryNavigation = ({ category, activeSubcategory, activeMaterial, onMaterialChange }) => {
    const navigate = useNavigate();
    const config = categoryConfig[category];

    if (!config) return null;

    const handleClick = (subcategoryId) => {
        if (subcategoryId) {
            navigate(`/catalog/${category}/${subcategoryId}`);
        } else {
            navigate(`/catalog/${category}`);
        }
    };

    const handleMaterialClick = (materialId) => {
        onMaterialChange(materialId);
    };

    return (
        <Box sx={{ mb: 4 }}>
            <Box sx={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: 1,
                alignItems: 'center',
                borderBottom: '1px solid #E0E0E0',
                pb: 2
            }}>
                <Button
                    onClick={() => handleClick()}
                    sx={{
                        color: !activeSubcategory ? '#2C2C2C' : '#757575',
                        fontWeight: !activeSubcategory ? 600 : 400,
                        '&:hover': {
                            backgroundColor: 'rgba(44, 44, 44, 0.04)'
                        },
                        textTransform: 'none',
                        fontSize: '1rem'
                    }}
                >
                    Все изделия
                </Button>

                {config.subcategories.map((subcategory) => (
                    <Box key={subcategory.id} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button
                            onClick={() => handleClick(subcategory.id)}
                            sx={{
                                color: activeSubcategory === subcategory.id ? '#2C2C2C' : '#757575',
                                fontWeight: activeSubcategory === subcategory.id ? 600 : 400,
                                '&:hover': {
                                    backgroundColor: 'rgba(44, 44, 44, 0.04)'
                                },
                                textTransform: 'none',
                                fontSize: '1rem'
                            }}
                        >
                            {subcategory.label}
                        </Button>
                        {subcategory.count !== undefined && (
                            <Typography
                                variant="body2"
                                sx={{
                                    ml: 0.5,
                                    color: '#757575',
                                    fontSize: '0.875rem'
                                }}
                            >
                                {subcategory.count}
                            </Typography>
                        )}
                    </Box>
                ))}
            </Box>

            {config.materials && config.materials.length > 0 && (
                <Box sx={{ 
                    mt: 2,
                    pt: 2,
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: 1,
                    alignItems: 'center'
                }}>
                    <Typography
                        sx={{
                            color: '#757575',
                            fontSize: '0.875rem',
                            mr: 2
                        }}
                    >
                        Материал:
                    </Typography>
                    {config.materials.map((material) => (
                        <Button
                            key={material.id}
                            onClick={() => handleMaterialClick(material.id)}
                            sx={{
                                color: activeMaterial === material.id ? '#2C2C2C' : '#757575',
                                fontWeight: activeMaterial === material.id ? 600 : 400,
                                backgroundColor: activeMaterial === material.id ? 'rgba(44, 44, 44, 0.04)' : 'transparent',
                                '&:hover': {
                                    backgroundColor: 'rgba(44, 44, 44, 0.04)'
                                },
                                textTransform: 'none',
                                fontSize: '0.875rem',
                                borderRadius: '16px',
                                px: 2
                            }}
                        >
                            {material.label}
                        </Button>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default CategoryNavigation; 
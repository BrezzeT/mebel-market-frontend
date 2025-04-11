import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const StyledButton = styled(Button)(({ theme, variant }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 500,
    textTransform: 'none',
    ...(variant === 'light' && {
        backgroundColor: '#fff',
        color: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
        },
    }),
    ...(variant === 'dark' && {
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        },
    }),
    ...(variant === 'transparent' && {
        backgroundColor: 'transparent',
        color: theme.palette.primary.main,
        padding: '8px',
        minWidth: 'auto',
        borderRadius: '50%',
        '&:hover': {
            backgroundColor: 'rgba(70, 52, 46, 0.04)',
        },
    }),
}));

const ArrowIcon = styled(ArrowForwardIcon)(({ variant }) => ({
    fontSize: variant === 'transparent' ? 20 : 24,
    transition: 'transform 0.2s ease-in-out',
    '.MuiButton-root:hover &': {
        transform: 'translateX(4px)',
    },
}));

const ArrowButton = ({ children, variant = 'dark', ...props }) => {
    return (
        <StyledButton variant={variant} {...props}>
            {children}
            <ArrowIcon variant={variant} />
        </StyledButton>
    );
};

export default ArrowButton; 
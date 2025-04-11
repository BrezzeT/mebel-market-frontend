import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#2C2C2C',
            contrastText: '#fff'
        },
        secondary: {
            main: '#F8F3F0',
            contrastText: '#2C2C2C'
        },
        background: {
            default: '#F8F3F0',
            paper: '#fff'
        },
        text: {
            primary: '#2C2C2C',
            secondary: 'rgba(44, 44, 44, 0.7)'
        }
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 400,
            fontSize: '2.75rem',
            lineHeight: 1.2
        },
        h2: {
            fontWeight: 400,
            fontSize: '1.75rem',
            lineHeight: 1.3
        },
        overline: {
            fontWeight: 400,
            fontSize: '0.875rem',
            letterSpacing: '0.02em'
        },
        button: {
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '1rem'
        }
    },
    shape: {
        borderRadius: 8
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 4,
                    textTransform: 'none',
                    fontWeight: 500,
                    padding: '8px 24px',
                    fontSize: '1rem',
                    minWidth: '120px'
                },
                contained: {
                    backgroundColor: '#FFFFFF',
                    color: '#2C2C2C',
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.9)'
                    }
                }
            }
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: '#FFFFFF',
                    padding: '8px',
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.2)'
                    }
                },
                sizeSmall: {
                    padding: '4px'
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 8,
                        backgroundColor: '#FFFFFF',
                        '&:hover fieldset': {
                            borderColor: '#2C2C2C'
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#2C2C2C'
                        }
                    }
                }
            }
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    borderRadius: 8
                }
            }
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    borderRadius: 16
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)'
                }
            }
        }
    }
});

export default theme; 
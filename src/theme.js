import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#46342E',
            light: '#5B463D',
            dark: '#2E231E',
            contrastText: '#fff'
        },
        secondary: {
            main: '#FAF0E6',
            light: '#FFF5EA',
            dark: '#E6D9CC',
            contrastText: '#46342E'
        },
        background: {
            default: '#FAF0E6',
            paper: '#FFFFFF'
        },
        text: {
            primary: '#46342E',
            secondary: '#5B463D'
        }
    },
    typography: {
        fontFamily: '"Roboto", "Arial", sans-serif',
        h1: {
            fontSize: '48px',
            fontWeight: 500,
            color: '#46342E'
        },
        h2: {
            fontSize: '32px',
            fontWeight: 500,
            color: '#46342E'
        },
        h3: {
            fontSize: '24px',
            fontWeight: 500,
            color: '#46342E'
        },
        body1: {
            fontSize: '16px',
            lineHeight: 1.5,
            color: '#46342E'
        },
        button: {
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: 1.5
        }
    },
    shape: {
        borderRadius: 8
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: '12px 24px',
                    fontSize: '16px',
                    fontWeight: 500,
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: 'none'
                    }
                },
                contained: {
                    backgroundColor: '#46342E',
                    color: '#fff',
                    '&:hover': {
                        backgroundColor: '#2E231E'
                    }
                },
                outlined: {
                    borderColor: '#46342E',
                    color: '#46342E',
                    '&:hover': {
                        backgroundColor: 'rgba(70, 52, 46, 0.04)',
                        borderColor: '#2E231E'
                    }
                },
                text: {
                    color: '#46342E',
                    '&:hover': {
                        backgroundColor: 'rgba(70, 52, 46, 0.04)'
                    }
                }
            },
            defaultProps: {
                disableElevation: true
            }
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: '#46342E',
                    '&:hover': {
                        backgroundColor: 'rgba(70, 52, 46, 0.04)'
                    }
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: 'none',
                    border: '1px solid #E6D9CC'
                }
            }
        },
        MuiContainer: {
            styleOverrides: {
                root: {
                    '@media (min-width: 1200px)': {
                        maxWidth: 1200
                    }
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 8,
                        '&:hover fieldset': {
                            borderColor: '#46342E'
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#46342E'
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
        }
    }
});

export default theme; 
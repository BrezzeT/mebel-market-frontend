import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CircularProgress, Box, Alert } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/layout/Header';
import Home from './pages/Home';

// Компоненты, которые нужны сразу
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/auth/ProtectedRoute';
import CategorySection from './components/categories/CategorySection';
import CatalogPage from './components/catalog/CatalogPage';

// Компонент для обработки ошибок
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <Box sx={{ p: 3 }}>
                    <Alert severity="error">
                        Произошла ошибка при загрузке страницы. Пожалуйста, обновите страницу.
                    </Alert>
                </Box>
            );
        }

        return this.props.children;
    }
}

// Ленивая загрузка компонентов
const CategoryPage = lazy(() => import('./components/public/CategoryPage'));
const Catalog = lazy(() => import('./components/public/Catalog'));
const ProductDetails = lazy(() => import('./components/public/ProductDetails'));
const AdminPanel = lazy(() => import('./components/admin/AdminPanel'));
const Login = lazy(() => import('./components/auth/Login'));
const Register = lazy(() => import('./components/auth/Register'));

// Компонент загрузки
const LoadingSpinner = () => (
    <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
        bgcolor="background.default"
    >
        <CircularProgress />
    </Box>
);

// Создаем тему для всего приложения
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
        button: {
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: 1.5
        },
        h1: {
            fontSize: '48px',
            fontWeight: 500,
            color: '#46342E'
        },
        h2: {
            fontSize: '32px',
            fontWeight: 500,
            color: '#46342E'
        }
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
        }
    },
    shape: {
        borderRadius: 8
    }
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <ErrorBoundary>
                <Router>
                    <Header />
                    <Suspense fallback={<LoadingSpinner />}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/catalog" element={<CatalogPage />} />
                            <Route path="/catalog/:category" element={<CatalogPage />} />
                            <Route path="/catalog/:category/:subcategory" element={<CatalogPage />} />
                            <Route path="/product/:id" element={<ProductDetails />} />
                            <Route 
                                path="/admin/*" 
                                element={
                                    <ProtectedRoute>
                                        <AdminPanel />
                                    </ProtectedRoute>
                                } 
                            />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                    </Suspense>
                    <Footer />
                </Router>
            </ErrorBoundary>
        </ThemeProvider>
    );
}

export default App;
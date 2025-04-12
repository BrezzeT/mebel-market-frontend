import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/index';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ErrorBoundary } from 'react-error-boundary';

// Компонент для отображения ошибки
const ErrorFallback = ({ error }) => {
    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>Что-то пошло не так</h2>
            <pre style={{ color: 'red' }}>{error.message}</pre>
            <button onClick={() => window.location.reload()}>
                Обновить страницу
            </button>
        </div>
    );
};

// Создаем корневой элемент
const container = document.getElementById('root');
const root = createRoot(container);

// Рендерим приложение
root.render(
    <React.StrictMode>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <App />
                </PersistGate>
            </Provider>
        </ErrorBoundary>
    </React.StrictMode>
);

// Измеряем производительность
reportWebVitals();

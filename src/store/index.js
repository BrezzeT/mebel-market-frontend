import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import productReducer from './productSlice';

// Конфигурация persist для продуктов
const productsPersistConfig = {
    key: 'products',
    storage,
    whitelist: ['items'] // Сохраняем только items
};

const persistedProductReducer = persistReducer(productsPersistConfig, productReducer);

// Middleware для логирования ошибок
const errorLogger = store => next => action => {
    try {
        return next(action);
    } catch (error) {
        console.error('Redux error:', error);
        return next({ type: 'ERROR', payload: error.message });
    }
};

export const store = configureStore({
    reducer: {
        products: persistedProductReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST']
            }
        }).concat(errorLogger)
});

export const persistor = persistStore(store); 
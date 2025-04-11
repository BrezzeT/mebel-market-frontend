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

export const store = configureStore({
    reducer: {
        products: persistedProductReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST']
            }
        })
});

export const persistor = persistStore(store); 
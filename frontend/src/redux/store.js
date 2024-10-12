import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import subscriptionReducer from './subscription/subscriptionSlice';
import serviceproviderReducer from './serviceProvider/serviceProviderSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default storage (localStorage for web)

// Configuration for redux-persist
const persistConfig = {
    key: 'root', // Key to store the persisted data
    storage,     // Use local storage
};

// Create a persisted reducer for each slice
const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedSubscriptionReducer = persistReducer(persistConfig, subscriptionReducer);
const persistedServiceProviderReducer = persistReducer(persistConfig, serviceproviderReducer);

const store = configureStore({
    reducer: {
        user: persistedUserReducer,               // Persisting user slice
        subscription: persistedSubscriptionReducer, // Persisting subscription slice
        serviceprovider: persistedServiceProviderReducer, // Persisting serviceprovider slice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,  // Disable serializability check for redux-persist
        }),
});

// Persistor for the store
export const persistor = persistStore(store);

export default store;

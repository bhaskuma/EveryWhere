import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice'
import subscriptionReducer from './subscription/subscriptionSlice';
const store = configureStore({
    reducer: {
        user: userReducer,
        subscription: subscriptionReducer
    },
});

export default store;

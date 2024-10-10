import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice'
import subscriptionReducer from './subscription/subscriptionSlice';
import serviceproviderReducer from './serviceProvider/serviceProviderSlice';
const store = configureStore({
    reducer: {
        user: userReducer,
        subscription: subscriptionReducer,
        serviceprovider: serviceproviderReducer
    },
});

export default store;

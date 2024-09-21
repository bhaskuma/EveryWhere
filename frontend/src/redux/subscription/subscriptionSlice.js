import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: 'expired',
    plan: null,
    endDate: null,
}

const subscriptionSlice = createSlice({
    name: 'subscription',
    initialState,
    reducers: {
        setSubscription: (state, action) => {
            state.status = action.payload.status;
            state.plan = action.payload.plan;
            state.endDate = action.payload.endDate;

        },
        clearSubscription: (state, action) => {
            state.status = 'expired';
            state.plan = null;
            state.endDate = null;

        }

    }
})

export const { setSubscription, clearSubscription } = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
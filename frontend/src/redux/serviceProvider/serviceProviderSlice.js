import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    currentProvider: null
}

const serviceProviderSlice = createSlice({
    name: 'serviceprovider',
    initialState,
    reducers: {
        setProvider: (state, action) => {
            state.currentProvider = action.payload;
        },
        clearProvider: (state) => {
            state.currentProvider = null;
        }
    }

})

export const { setProvider, clearProvider } = serviceProviderSlice.actions;
export default serviceProviderSlice.reducer


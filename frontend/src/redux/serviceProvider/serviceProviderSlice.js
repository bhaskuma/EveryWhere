import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    currentProvider: null
}

const serviceProviderSlice = createSlice({
    name: 'serviceprovider',
    initialState,
    reducers: {
        setProvider: (state, action) => {
            state.clearProvider = action.payload;
        },
        clearProvider: (state) => {
            state.clearProvider = null;
        }
    }

})

export const { setProvider, clearProvider } = serviceProviderSlice.actions;
export default serviceProviderSlice.reducer


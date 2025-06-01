import { createSlice } from '@reduxjs/toolkit'

const prodSlice = createSlice({
    name: 'prod',// Name of the slice
    initialState: {
        link: `${import.meta.env.VITE_BACKEND_URL}`,
    },
    reducers: {
        // Add any reducers if needed
    }
})

export const { reducer } = prodSlice;
export default prodSlice.reducer;

// Added the reducers section (even if empty) which is required for Redux Toolkit slices to work properly
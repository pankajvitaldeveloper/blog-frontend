import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        user: null
    },
    reducers:{
        login: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;//payload is the user object that we pass in the action
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        }
    }
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
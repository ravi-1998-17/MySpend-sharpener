import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    email: null,
    isLoggedIn: false,
    isAuthChecked: false,
    loading: false,
    error: null,
}


const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        // Logout Reducer
        login(state, action) {
            state.token = action.payload.token;
            state.email = action.payload.email;
            state.isLoggedIn = true;
            state.error = null;

            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("email", action.payload.email);
        },
        //logout
        logout(state, action) {
            state.token = null;
            state.email = null;
            state.isLoggedIn = false;
            state.error = null;

            localStorage.removeItem("token");
            localStorage.removeItem("email");
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
        setAuthChecked(state, action) {
            state.isAuthChecked = action.payload;
        },
        loadFromStorage(state) {
            // Check token from localStorage
            const savedToken = localStorage.getItem("token");
            const savedEmail = localStorage.getItem("email");

            if (savedToken && savedEmail) {
                state.token = savedToken;
                state.email = savedEmail;
                state.isLoggedIn = true;
            }

            state.isAuthChecked = true;
        },

    }
})

export const { login, logout, setLoading, setError, setAuthChecked, loadFromStorage } = authSlice.actions;
export default authSlice.reducer;
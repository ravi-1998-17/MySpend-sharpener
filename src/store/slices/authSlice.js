// store/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  email: null,
  uid: null,
  photo: null,
  isLoggedIn: false,
  isAuthChecked: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.uid = action.payload.uid || null;
      state.photo = action.payload.photo || null;
      state.isLoggedIn = true;
      state.error = null;

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("email", action.payload.email);
      if (action.payload.uid) localStorage.setItem("uid", action.payload.uid);
      if (action.payload.photo) localStorage.setItem("photo", action.payload.photo);
    },
    logout(state) {
      state.token = null;
      state.email = null;
      state.uid = null;
      state.photo = null;
      state.isLoggedIn = false;
      state.error = null;

      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("uid");
      localStorage.removeItem("photo");
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
      const savedToken = localStorage.getItem("token");
      const savedEmail = localStorage.getItem("email");
      const savedUid = localStorage.getItem("uid");
      const savedPhoto = localStorage.getItem("photo");

      if (savedToken && savedEmail) {
        state.token = savedToken;
        state.email = savedEmail;
        state.uid = savedUid || null;
        state.photo = savedPhoto || null;
        state.isLoggedIn = true;
      }

      state.isAuthChecked = true;
    },
  },
});

export const { login, logout, setLoading, setError, setAuthChecked, loadFromStorage } =
  authSlice.actions;
export default authSlice.reducer;

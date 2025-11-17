// demo-redux.jsx
import { configureStore, createSlice } from "@reduxjs/toolkit";

/* ----------------------------------------
   COUNTER SLICE
-----------------------------------------*/
const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment(state) {
      state.value++;
    },
    decrement(state) {
      state.value--;
    },
    reset(state) {
      state.value = 0;
    },
  },
});

/* ----------------------------------------
   AUTH SLICE
-----------------------------------------*/
const authSlice = createSlice({
  name: "auth",
  initialState: {
    email: "",
    password: "",
  },
  reducers: {
    setEmail(state, action) {
      state.email = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
  },
});

/* ----------------------------------------
   STORE
-----------------------------------------*/
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    auth: authSlice.reducer,
  },
});


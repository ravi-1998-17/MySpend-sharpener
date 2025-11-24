import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  premiumActive: false,
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    setExpenses(state, action) {
      state.items = action.payload || [];
      state.premiumActive = state.items.some(exp => Number(exp.money) > 10000);
    },
    addExpense(state, action) {
      state.items.push(action.payload);
      state.premiumActive = state.items.some(exp => Number(exp.money) > 10000);
    },
    updateExpense(state, action) {
      const index = state.items.findIndex(e => e.id === action.payload.id);
      if (index !== -1) state.items[index] = action.payload;
      state.premiumActive = state.items.some(exp => Number(exp.money) > 10000);
    },
    deleteExpense(state, action) {
      state.items = state.items.filter(e => e.id !== action.payload);
      state.premiumActive = state.items.some(exp => Number(exp.money) > 10000);
    },
  },
});

export const { setExpenses, addExpense, updateExpense, deleteExpense } = expensesSlice.actions;
export default expensesSlice.reducer;

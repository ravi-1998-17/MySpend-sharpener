// store/slices/expensesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    totalAmount: 0,
    premiumActive: false,
    loading: false,
    error: null,
};

const expensesSlice = createSlice({
    name: "expenses",
    initialState,
    reducers: {
        setExpenses(state, action) {
            state.items = action.payload;
            state.totalAmount = state.items.reduce(
                (acc, item) => acc + Number(item.money),
                0
            );
            state.premiumActive = state.totalAmount > 10000;
        },
        addExpense(state, action) {
            state.items.push(action.payload);
            state.totalAmount += Number(action.payload.money);
            state.premiumActive = state.totalAmount > 10000;
        },
        updateExpense(state, action) {
            const index = state.items.findIndex((exp) => exp.id === action.payload.id);
            if (index >= 0) {
                state.totalAmount =
                    state.totalAmount - Number(state.items[index].money) + Number(action.payload.money);
                state.items[index] = action.payload;
                state.premiumActive = state.totalAmount > 10000;
            }
        },
        deleteExpense(state, action) {
            const index = state.items.findIndex((exp) => exp.id === action.payload);
            if (index >= 0) {
                state.totalAmount -= Number(state.items[index].money);
                state.items.splice(index, 1);
                state.premiumActive = state.totalAmount > 10000;
            }
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
});

export const {
    setExpenses,
    addExpense,
    updateExpense,
    deleteExpense,
    setLoading,
    setError,
} = expensesSlice.actions;
export default expensesSlice.reducer;

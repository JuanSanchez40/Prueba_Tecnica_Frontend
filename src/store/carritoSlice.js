import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const carritoSlice = createSlice({
  name: 'carrito',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      const idx = state.items.findIndex(item => item.id === action.payload);
      if (idx !== -1) {
        state.items.splice(idx, 1);
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearCart } = carritoSlice.actions;
export default carritoSlice.reducer;

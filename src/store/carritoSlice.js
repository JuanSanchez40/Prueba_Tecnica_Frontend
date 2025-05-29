import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Cada item: { ...producto, cantidad }
};

const carritoSlice = createSlice({
  name: 'carrito',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const idx = state.items.findIndex(item => item.id === action.payload.id);
      if (idx !== -1) {
        state.items[idx].cantidad += 1;
      } else {
        state.items.push({ ...action.payload, cantidad: 1 });
      }
    },
    removeItem: (state, action) => {
      const idx = state.items.findIndex(item => item.id === action.payload);
      if (idx !== -1) {
        if (state.items[idx].cantidad > 1) {
          state.items[idx].cantidad -= 1;
        } else {
          state.items.splice(idx, 1);
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearCart } = carritoSlice.actions;
export default carritoSlice.reducer;

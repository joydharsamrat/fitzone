import { CartItem } from "../../../interface";

import { createSlice } from "@reduxjs/toolkit";

const initialState: { items: CartItem[] } = {
  items: JSON.parse(localStorage.getItem("cartItems") || "[]"),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item._id === product._id);
      if (existingItem) {
        existingItem.quantity += product.quantity;
      } else {
        state.items.push(product);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    decreaseQuantity: (state, action) => {
      const { _id } = action.payload;
      const existingItem = state.items.find((item) => item._id === _id);
      if (existingItem && existingItem.quantity > 0) {
        existingItem.quantity -= 1;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    increaseQuantity: (state, action) => {
      const { _id } = action.payload;
      const existingItem = state.items.find((item) => item._id === _id);
      if (existingItem) {
        existingItem.quantity += 1;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cartItems");
    },
  },
});

export const {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;

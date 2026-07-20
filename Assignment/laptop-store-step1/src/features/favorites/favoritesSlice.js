import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: "favorites",

  initialState,

  reducers: {
    addFavorite: (state, action) => {
      const selectedProduct = action.payload;

      const productAlreadyExists = state.items.some(
        (product) =>
          String(product.id) === String(selectedProduct.id)
      );

      if (!productAlreadyExists) {
        state.items.push(selectedProduct);
      }
    },

    removeFavorite: (state, action) => {
      const productId = action.payload;

      state.items = state.items.filter(
        (product) =>
          String(product.id) !== String(productId)
      );
    },

    clearFavorites: (state) => {
      state.items = [];
    },
  },
});

export const {
  addFavorite,
  removeFavorite,
  clearFavorites,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
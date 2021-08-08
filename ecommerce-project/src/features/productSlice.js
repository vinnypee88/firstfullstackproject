import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//Product Slice will add product objects to the store for rendering/filtering etc
export const getProducts = createAsyncThunk(
  "productSlice/getProducts",
  async () => {
    const storeProducts = await fetch("http://localhost:4000/products");
    const response = await storeProducts.json();
    return response;
  }
);

const productSlice = createSlice({
  name: "productSlice",
  initialState: {
    isLoading: false,
    hasError: false,
    products: [],
  },
  extraReducers: {
    [getProducts.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.hasError = false;
      state.products = action.payload;
    },
    [getProducts.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

export default productSlice.reducer;
export const selectProducts = (state) => state.productSlice.products;

import { createSlice } from "@reduxjs/toolkit";

//Product Slice will add product objects to the store for rendering/filtering etc

const productSlice = createSlice({
  name: "productSlice",
  initialState: {
    isLoading: false,
    loggedIn: false,
    products: [],
  },
  extraReducers: {},
});

export default productSlice.reducer;

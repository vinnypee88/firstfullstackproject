import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//get orders from logged in user
export const getOrders = createAsyncThunk("orderSlice/getOrders", async () => {
  const orders = await fetch("http://localhost:4000/orders");
  const response = await orders.json();
  console.log(response);
  return response;
});

const orderSlice = createSlice({
  name: "orderSlice",
  initialState: {
    isLoading: false,
    hasError: false,
    orders: [],
  },
  extraReducers: {
    [getOrders.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [getOrders.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.hasError = false;
      console.log(action.payload);
    },
    [getOrders.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

export default orderSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//get orders from logged in user
export const getOrders = createAsyncThunk("orderSlice/getOrders", async () => {
  const options = {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const orders = await fetch("http://localhost:4000/orders", options);
  const response = await orders.json();
  return response;
});

export const getOrderDetails = createAsyncThunk(
  "orderSlice/getOrderDetails",
  async (orderId) => {
    const orderInfo = { orderId: orderId };
    const options = {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(orderInfo),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const orders = await fetch("http://localhost:4000/orders/details", options);
    const response = await orders.json();
    return response;
  }
);

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
      state.orders = action.payload;
    },
    [getOrders.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    },
    [getOrderDetails.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [getOrderDetails.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.hasError = false;
      const id = action.payload[0].order_id;
      const index = state.orders.findIndex((element) => {
        return element.id === id;
      });
      state.orders[index].items = action.payload;
    },
    [getOrderDetails.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

export default orderSlice.reducer;
export const selectOrders = (state) => state.orderSlice.orders;

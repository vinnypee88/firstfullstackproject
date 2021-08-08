import { configureStore } from "@reduxjs/toolkit";
import productSliceReducer from "../features/productSlice";
import userSliceReducer from "../features/userSlice";
import orderSliceReducer from "../features/orderSlice";

export const store = configureStore({
  reducer: {
    userSlice: userSliceReducer,
    productSlice: productSliceReducer,
    orderSlice: orderSliceReducer,
  },
});

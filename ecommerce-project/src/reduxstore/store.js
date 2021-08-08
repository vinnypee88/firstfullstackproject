import { configureStore } from "@reduxjs/toolkit";
import productsSliceReducer from "../features/productsSlice";
import userSliceReducer from "../features/userSlice";

export const store = configureStore({
  reducer: {
    userSlice: userSliceReducer,
    productsSlice: productsSliceReducer,
  },
});

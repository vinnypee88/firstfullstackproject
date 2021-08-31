import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//Logging in the user will obtain user information and the cart information and add it to the store

export const loginUserApi = createAsyncThunk(
  "userSlice/loginUserApi",
  async (credentials) => {
    const options = {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const loginApi = await fetch("/login", options);
    const response = await loginApi.json();
    return response;
  }
);

export const updateUserInfo = createAsyncThunk(
  "userSlice/updateUserInfo",
  async (info) => {
    const options = {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify(info),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const userUpdate = await fetch("/user", options);
    const response = await userUpdate.json();
    return response;
  }
);

export const logoutApi = createAsyncThunk("userSlice/logoutApi", async () => {
  const options = {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const logoutApi = await fetch("/logout", options);
  const response = await logoutApi.json();
  return response;
});

export const registerUserApi = createAsyncThunk(
  "userSlice/registerUserApi",
  async (credentials) => {
    const options = {
      method: "POST",
      body: JSON.stringify(credentials),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const registerApi = await fetch("/signup", options);
    const response = await registerApi.json();
    return response;
  }
);

export const addToCartApi = createAsyncThunk(
  "userSlice/addToCartApi",
  async (itemToAdd) => {
    const options = {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(itemToAdd),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const add = await fetch("/cart", options);
    const response = await add.json();
    return response;
  }
);
export const reduceQuantityApi = createAsyncThunk(
  "userSlice/reduceQuantityApi",
  async (itemToReduce) => {
    const options = {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify(itemToReduce),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const minus = await fetch("/cart", options);
    const response = await minus.json();
    return response;
  }
);

export const deleteItemApi = createAsyncThunk(
  "userSlice/deleteItemApi",
  async (itemToDelete) => {
    const options = {
      method: "DELETE",
      credentials: "include",
      body: JSON.stringify(itemToDelete),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const add = await fetch("/cart", options);
    const response = await add.json();
    return response;
  }
);

export const checkoutApi = createAsyncThunk(
  "userSlice/checkoutApi",
  async () => {
    const options = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const checkout = await fetch("/checkout", options);
    const response = await checkout.json();
    return response;
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    isLoading: false,
    loggedIn: false,
    user: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      DOB: "",
      cart: [],
    },
  },
  extraReducers: {
    [loginUserApi.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [loginUserApi.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.hasError = false;
      if (action.payload[0].id === undefined || action.payload[0].id === null) {
        //can potentially use useEffect hook to run this outside of the slice action
        alert("incorrect credentials");
        return;
      } else {
        state.user.firstName = action.payload[0].first_name;
        state.user.lastName = action.payload[0].last_name;
        state.user.email = action.payload[0].email;
        state.user.address = action.payload[0].address;
        state.user.DOB = action.payload[0].date_of_birth;
        state.user.cart = action.payload[1];
        state.loggedIn = true;
        return;
      }
    },
    [loginUserApi.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    },
    [logoutApi.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [logoutApi.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.hasError = false;
      //This section will take the response from the login api call and update the state with user info and cart info
      state.user.firstName = [];
      state.user.lastName = [];
      state.user.email = [];
      state.user.address = [];
      state.user.DOB = [];
      state.user.cart = [];
      state.loggedIn = false;
      //somehow set orders to zero on orderSlice
    },
    [logoutApi.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    },
    [registerUserApi.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [registerUserApi.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.hasError = false;
      state.user.firstName = action.payload.first_name;
      state.user.lastName = action.payload.last_name;
      state.user.email = action.payload.email;
      state.user.address = action.payload.address;
      state.user.DOB = action.payload.date_of_birth;
      state.loggedIn = true;
    },
    [registerUserApi.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    },
    [addToCartApi.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [addToCartApi.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.hasError = false;
      state.user.cart = action.payload;
    },
    [addToCartApi.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    },
    [reduceQuantityApi.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [reduceQuantityApi.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.hasError = false;
      state.user.cart = action.payload;
    },
    [reduceQuantityApi.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    },
    [deleteItemApi.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [deleteItemApi.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.hasError = false;
      state.user.cart = action.payload;
    },
    [deleteItemApi.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    },
    [updateUserInfo.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [updateUserInfo.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.hasError = false;
      state.user.firstName = action.payload[0].first_name;
      state.user.lastName = action.payload[0].last_name;
      state.user.email = action.payload[0].email;
      state.user.address = action.payload[0].address;
      state.user.DOB = action.payload[0].date_of_birth;
    },
    [updateUserInfo.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

export default userSlice.reducer;
export const selectUser = (state) => state.userSlice.user;
export const selectLoggedIn = (state) => state.userSlice.loggedIn;
export const selectCart = (state) => state.userSlice.user.cart;

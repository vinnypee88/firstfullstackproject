import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//Logging in the user will obtain user information and the cart information and add it to the store
export const loginUserApi = createAsyncThunk(
  "userSlice/loginUserApi",
  async (credentials) => {
    const options = {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const loginApi = await fetch("http://localhost:4000/login", options);
    const response = await loginApi.json();
    return response;
  }
);

export const logoutApi = createAsyncThunk("userSlice/logoutApi", async () => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const logoutApi = await fetch("http://localhost:4000/logout", options);
  const response = await logoutApi.json();
  return response;
});

export const registerUserApi = createAsyncThunk(
  "userSlice/registerUserApi",
  async (credentials) => {
    const options = {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const registerApi = await fetch("http://localhost:4000/signup", options);
    const response = await registerApi.json();
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
      //This section will take the response from the login api call and update the state with user info and cart info
      //check if user credentials valid
      if (!action.payload.userInfo) {
        //can potentially use useEffect hook to run this outside of the slice action
        alert("incorrect credentials");
        return;
      } else {
        state.user.firstName = action.payload.userInfo[0].first_name;
        state.user.lastName = action.payload.userInfo[0].last_name;
        state.user.email = action.payload.userInfo[0].email;
        state.user.address = action.payload.userInfo[0].address;
        state.user.DOB = action.payload.userInfo[0].date_of_birth;
        state.user.cart = action.payload.userCart;
        state.loggedIn = true;
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
    },
    [registerUserApi.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

export default userSlice.reducer;
export const selectUser = (state) => state.userSlice.user;

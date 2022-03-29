import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userActions } from "../user-slice";
import { loginActions } from "../login-slice";
import { host } from "../../config";
export const signupUser = createAsyncThunk(
  "signup/signupUser",
  async ({ body, role }, getState) => {
    const response = await fetch(`${host}/signup?role=${role}`, {
      method: "POST",
      body: JSON.stringify(body),

      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (response.ok === false) {
      throw new Error(data.Error);
    } else {
      // getState.dispatch(userActions.setLoggedInUser({ user: data.user }));
      // getState.dispatch(
      //   loginActions.setToken({ token: "Bearer " + data.token })
      // );
    }
    return data;
  }
);
export const verifyUser = createAsyncThunk(
  "signup/verifyUser",
  async ({ otp }, getState) => {
    const states = getState.getState();
    const response = await fetch(`${host}/verify/${otp}`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (response.ok === false) {
      throw new Error(data.Error);
    } else {
      getState.dispatch(userActions.setLoggedInUser({ user: data.user }));
      getState.dispatch(
        loginActions.setToken({ token: "Bearer " + data.token })
      );
      localStorage.setItem("token", "Bearer " + data.token);
    }
    return data;
  }
);

export const signupSlice = createSlice({
  name: "signup",
  initialState: {
    status: "idle",
    errorMessage: "",
    _id: null,
  },
  reducers: {},
  extraReducers: {
    [signupUser.fulfilled]: (state, action) => {
      state.errorMessage = "";
      state.status = "succeeded";
      state._id = action.payload._id;
    },
    [signupUser.pending]: (state, action) => {
      state.errorMessage = "";
      state.status = "loading";
    },
    [signupUser.rejected]: (state, action) => {
      state.status = "failed";
      state.errorMessage = action.error.message;
    },
    [verifyUser.fulfilled]: (state, action) => {
      state.errorMessage = "";
      state.status = "succeeded";
    },
    [verifyUser.pending]: (state, action) => {
      state.errorMessage = "";
      state.status = "loading";
    },
    [verifyUser.rejected]: (state, action) => {
      state.status = "failed";
      state.errorMessage = action.error.message;
    },
  },
});

export const signupActions = signupSlice.actions;
export default signupSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userActions } from "./user-actions";
import { loginActions } from "./login-actions";
import baseService from "../../API/baseService";
const initialState = {
  status: "idle",
  errorMessage: "",
};
export const signupUser = createAsyncThunk(
  "signup/signupUser",
  async ({ body, role }, getState) => {
    try {
      const response = await baseService.post(`/signup?role=${role}`, body);

      return response.data;
    } catch (e) {
      throw new Error(e.response.data.Error);
    }
  }
);
export const verifyUser = createAsyncThunk(
  "signup/verifyUser",
  async ({ otp }, getState) => {
    try {
      const response = await baseService.post(`/verify/${otp}`);

      baseService.defaults.headers.common["Authorization"] =
        "Bearer " + response.data.token;
      getState.dispatch(
        userActions.setLoggedInUser({ user: response.data.user })
      );
      getState.dispatch(
        loginActions.setToken({ token: "Bearer " + response.data.token })
      );
      getState.dispatch(loginActions.setRole({ role: response.data.role }));
      localStorage.setItem("token", "Bearer " + response.data.token);
      return response.data;
    } catch (e) {
      throw new Error(e.response.data.Error);
    }
  }
);

export const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    setErrorMessage(state, action) {
      state.errorMessage = action.payload.errorMessage;
    },
    setStatus(state, action) {
      state.status = action.payload.status;
    },
    reset() {
      return initialState;
    },
  },
  extraReducers: {
    [signupUser.fulfilled]: (state, action) => {
      state.errorMessage = "";
      state.status = "Signup Successful";
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
      state.status = "Verification Successful";
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

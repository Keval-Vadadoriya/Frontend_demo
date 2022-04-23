import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { socketActions } from "../slice/socket-slice";
import { userActions } from "./user-actions";
import baseService from "../../API/baseService";
const initialState = {
  status: "idle",
  errorMessage: "",
  token: localStorage.getItem("token"),
  role: "",
};
export const loggedInUser = createAsyncThunk(
  "login/loggedInUser",
  async (obj, getState) => {
    // const states=getState.getState()
    const body = {
      email: obj.loginEmail,
      password: obj.loginPassword,
    };
    try {
      const response = await baseService.post("/login", body);
      baseService.defaults.headers.common["Authorization"] =
        "Bearer " + response.data.token;
      getState.dispatch(
        userActions.setLoggedInUser({ user: response.data.user })
      );
      getState.dispatch(loginActions.setRole({ role: response.data.role }));

      getState.dispatch(socketActions.setSocket());

      localStorage.setItem("token", "Bearer " + response.data.token);
      // states.socket.socket.emit("setId",response.data.user._id)
      return response.data;
    } catch (e) {
      throw new Error(e.response.data.Error);
    }
  }
);
export const verifyPassword = createAsyncThunk(
  "login/verifyPassword",
  async ({ otp, body }, getState) => {
    try {
      const response = await baseService.post(`/verifyPassword/${otp}`, body);

      return response.data;
    } catch (e) {
      throw new Error(e.response.data.Error);
    }
  }
);
export const forgotPassword = createAsyncThunk(
  "login/forgotPassword",
  async ({ body }, getState) => {
    try {
      const response = await baseService.post(`/forgotPassword`, body);

      return response.data;
    } catch (e) {
      throw new Error(e.response.data.Error);
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload.token;
    },
    setRole(state, action) {
      state.role = action.payload.role;
    },
    setErrorMessage(state, action) {
      state.errorMessage = action.payload.errorMessage;
    },
    setStatus(state, action) {
      state.status = action.payload.status;
    },
    reset() {
      return {
        status: "idle",
        errorMessage: "",
        token: "",
        role: "",
      };
    },
  },
  extraReducers: {
    [loggedInUser.fulfilled]: (state, action) => {
      state.status = "Login Successful";
      state.errorMessage = "";
      state.token = "Bearer " + action.payload.token;
    },
    [loggedInUser.pending]: (state, action) => {
      state.errorMessage = "";
      state.status = "loading";
    },
    [loggedInUser.rejected]: (state, action) => {
      state.status = "failed";
      state.errorMessage = action.error.message;
    },
    [forgotPassword.fulfilled]: (state, action) => {
      state.status = "Sent";
      state.errorMessage = "";
    },
    [forgotPassword.pending]: (state, action) => {
      state.errorMessage = "";
      state.status = "loading";
    },
    [forgotPassword.rejected]: (state, action) => {
      state.status = "failed";
      state.errorMessage = action.error.message;
    },
    [verifyPassword.fulfilled]: (state, action) => {
      state.status = "Password Updated Successfully";
      state.errorMessage = "";
    },
    [verifyPassword.pending]: (state, action) => {
      state.errorMessage = "";
      state.status = "loading";
    },
    [verifyPassword.rejected]: (state, action) => {
      state.status = "failed";
      state.errorMessage = action.error.message;
    },
  },
});

export const loginActions = loginSlice.actions;

export default loginSlice.reducer;

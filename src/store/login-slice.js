import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLoggedIn: localStorage.getItem("isLoggedIn"),
    token: localStorage.getItem("token"),
    role: localStorage.getItem("role") ? localStorage.getItem("role") : "user",
  },
  reducers: {
    setLoginStatus(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
    },
    setRole(state, action) {
      state.role = action.payload.role;
    },
  },
});

export const loginActions = loginSlice.actions;

export default loginSlice;

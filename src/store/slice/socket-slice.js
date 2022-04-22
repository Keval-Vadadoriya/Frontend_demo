import { createSlice } from "@reduxjs/toolkit";
import socketIOClient from "socket.io-client";
const initialState = {
  socket: socketIOClient(process.env.REACT_APP_HOST),
  data: null,
};
const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocket(state) {
      state.socket = socketIOClient(process.env.REACT_APP_HOST);
    },
    setData(state, action) {
      state.data = action.payload.data;
    },
    reset() {
      return initialState;
    },
  },
});

export const socketActions = socketSlice.actions;

export default socketSlice.reducer;

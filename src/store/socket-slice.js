import { createSlice } from "@reduxjs/toolkit";
import socketIOClient from "socket.io-client";
const initialState = {
  // socket: socketIOClient(process.env.REACT_APP_HOST),
  socket: socketIOClient('http://127.0.0.1:3000'),
  data: null,
};
const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocket(state) {
      // state.socket = socketIOClient(process.env.REACT_APP_HOST);
      state.socket = socketIOClient('http://127.0.0.1:3000');
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

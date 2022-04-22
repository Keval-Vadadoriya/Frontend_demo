import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  open: false,
  severity: "success",
  message: "",
  page: true,
};
const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,

  reducers: {
    setSnackbar(state, action) {
      state.open = action.payload.open;
      state.severity = action.payload.severity;
      state.message = action.payload.message;
    },
    setPage(state, action) {
      state.page = action.payload.page;
    },
    reset() {
      return initialState;
    },
  },
});

export const snackbarActions = snackbarSlice.actions;

export default snackbarSlice.reducer;

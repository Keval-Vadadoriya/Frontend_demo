import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginActions } from "./login-actions";
import baseService from "../../API/baseService";
const initialState = {
  status: "loading data",
  errorMessage: "",
  user: {},
};

export const editProfile = createAsyncThunk(
  "user/editProfile",
  async ({ body, role, userId }, getState) => {
    try {
      const response = await baseService.patch(
        `/editprofile/${userId}?role=${role}`,
        body
      );

      return response.data;
    } catch (e) {
      throw new Error(e.response.data.Error);
    }
  }
);
export const getUser = createAsyncThunk("user/getUser", async (_, getState) => {
  try {
    // const states=getState.getState()
    const response = await baseService.get(`/getprofile`);

      // states.socket.socket.emit("setId",response.data.user._id)
      getState.dispatch(loginActions.setRole({ role: response.data.role }));
    return response.data;
  } catch (e) {
    throw new Error(e.response.data.Error);
  }
});
const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setLoggedInUser(state, action) {
      state.user = action.payload.user;
    },
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
    [editProfile.fulfilled]: (state, action) => {
      state.status = "Saved Changes Successfully";
      state.errorMessage = "";
      state.user = action.payload;
    },
    [editProfile.pending]: (state, action) => {
      state.errorMessage = "";
      state.status = "loading";
    },
    [editProfile.rejected]: (state, action) => {
      state.status = "failed";
      state.errorMessage = action.error.message;
    },
    [getUser.fulfilled]: (state, action) => {
      state.status = "user data";
      state.errorMessage = "";
      state.user = action.payload.user;
    },
    [getUser.pending]: (state, action) => {
      state.errorMessage = "";
      state.status = "loading data";
    },
    [getUser.rejected]: (state, action) => {
      state.status = "failed";
      state.errorMessage = action.error.message;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;

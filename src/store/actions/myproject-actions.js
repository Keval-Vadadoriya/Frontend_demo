import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { projectActions } from "./project-actions";
import baseService from "../../API/baseService";
const initialState = {
  status: "idle",
  errorMessage: "",
  project: null,
};
export const removeProject = createAsyncThunk(
  "myproject/removeProject",
  async ({ projectId }, getState) => {
    try {
      const response = await baseService.delete(`/removeproject/${projectId}`);
      console.log(response);
      getState.dispatch(
        projectActions.setProjects({ projects: response.data.projects })
      );

      return;
    } catch (e) {
      throw new Error(e.response.data.Error);
    }
  }
);

export const postProject = createAsyncThunk(
  "myproject/postProject",
  async (body, getState) => {
    try {
      const response = await baseService.post(`/project`, body);
      console.log(response);

      getState.dispatch(
        projectActions.setProjects({ projects: response.data.projects })
      );
      return;
    } catch (e) {
      throw new Error(e.response.data.Error);
    }
  }
);

export const myprojectSlice = createSlice({
  name: "myproject",
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
    [removeProject.fulfilled]: (state, action) => {
      state.status = "Project Deleted Successfully";
      state.errorMessage = "";
      state.reviews = action.payload;
    },
    [removeProject.pending]: (state, action) => {
      state.status = "loading";
      state.errorMessage = "";
    },
    [removeProject.rejected]: (state, action) => {
      state.status = "failed";
      state.errorMessage = action.error.message;
    },
    [postProject.fulfilled]: (state, action) => {
      state.status = "Project Posted Successfully";
      state.errorMessage = "";
    },
    [postProject.pending]: (state, action) => {
      state.status = "loading";
      state.errorMessage = "";
    },
    [postProject.rejected]: (state, action) => {
      state.status = "failed";
      state.errorMessage = action.error.message;
    },
  },
});
export const myprojectActions = myprojectSlice.actions;
export default myprojectSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseService from "../../API/baseService";
const initialState = {
  status: "idle",
  errorMessage: "",
  projects: [],
  count: 0,
};
export const getAllProjects = createAsyncThunk(
  "project/getAllProjects",
  async ({ search, skip }, getState) => {
    try {
      const response = await baseService.get(
        `/getallprojects?search=${search}&&limit=10&&skip=${skip}`
      );

      return response.data;
    } catch (e) {
      throw new Error(e.response.data.Error);
    }
  }
);
export const getMyProjects = createAsyncThunk(
  "project/getMyProjects",
  async ({ skip }, getState) => {
    try {
      const response = await baseService.get(
        `/getmyprojects?limit=10&&skip=${skip}`
      );

      return response.data;
    } catch (e) {
      throw new Error(e.response.data.Error);
    }
  }
);

export const filterProjects = createAsyncThunk(
  "project/filterProjects",
  async ({ location, profession, sort, skip }, getState) => {
    try {
      const response = await baseService.get(
        `/filterprojects?${location !== "none" ? `location=${location}` : ""}${
          profession !== "none" ? `&&profession=${profession}` : ""
        }${sort !== "none" ? `&&sort=${sort}` : ""}&&limit=10&&skip=${skip}`
      );
      return response.data;
    } catch (e) {
      throw new Error(e.response.data.Error);
    }
  }
);

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setErrorMessage(state, action) {
      state.errorMessage = action.payload.errorMessage;
    },
    reset() {
      return initialState;
    },
  },
  extraReducers: {
    //getAllWorkers
    [getAllProjects.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.errorMessage = "";

      state.projects = action.payload.projects;
      if (action.payload.count !== 0 && !isNaN(action.payload.count)) {
        state.count = action.payload.count;
      }
    },
    [getAllProjects.pending]: (state, action) => {
      state.errorMessage = "";
      state.status = "loading";
    },
    [getAllProjects.rejected]: (state, action) => {
      state.status = "failed";
      state.errorMessage = action.error.message;
    },
    //filter Workers
    [filterProjects.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.errorMessage = "";
      state.projects = action.payload.projects;
      if (action.payload.count !== 0 && !isNaN(action.payload.count)) {
        state.count = action.payload.count;
      }
    },
    [filterProjects.pending]: (state, action) => {
      state.errorMessage = "";
      state.status = "loading";
    },
    [filterProjects.rejected]: (state, action) => {
      state.status = "failed";
      state.errorMessage = action.error.message;
      state.workers = null;
    },
    //get Worker
    [getMyProjects.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.errorMessage = "";
      state.projects = action.payload.myProjects;
      if (action.payload.count !== 0 && !isNaN(action.payload.count)) {
        state.count = action.payload.count;
      }
    },
    [getMyProjects.pending]: (state) => {
      state.errorMessage = "";
      state.status = "loading";
    },
    [getMyProjects.rejected]: (state, action) => {
      state.status = "failed";
      state.errorMessage = action.error.message;
    },
  },
});

export const projectActions = projectSlice.actions;
export default projectSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseService from "../../API/baseService";
const initialState = {
  status: "idle",
  errorMessage: "",
  workers: [],
  worker: null,
  count: 0,
};
export const getAllWorkers = createAsyncThunk(
  "workers/getAllWorkers",
  async ({ search, skip }, getState) => {
    try {
      const response = await baseService.get(
        `/getallworkers?search=${search}&&limit=10&&skip=${skip}`
      );

      return response.data;
    } catch (e) {
      throw new Error(e.response.data.Error);
    }
  }
);
export const getWorker = createAsyncThunk(
  "workers/getWorker",
  async ({ workerId }, getState) => {
    try {
      const response = await baseService.get(`/getworker/${workerId}`);

      return response.data;
    } catch (e) {
      throw new Error(e.response.data.Error);
    }
  }
);

export const filterWorkers = createAsyncThunk(
  "workers/filterWorkers",
  async ({ location, profession, review, availability, skip }, getState) => {
    try {
      const response = await baseService.get(
        `/filterworkers?${location !== "none" ? `location=${location}&&` : ""}${
          profession !== "none" ? `profession=${profession}&&` : ""
        }${review !== "none" ? `review=${review}&&` : ""}${
          availability !== "none" ? `availability=${availability}&&` : ""
        }limit=3&&skip=${skip}`
      );

      return response.data;
    } catch (e) {
      throw new Error(e.response.data.Error);
    }
  }
);

export const workersSlice = createSlice({
  name: "workers",
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
    [getAllWorkers.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.errorMessage = "";

      state.workers = action.payload.workers;
      if (action.payload.count !== 0 && !isNaN(action.payload.count)) {
        state.count = action.payload.count;
      }
    },
    [getAllWorkers.pending]: (state, action) => {
      state.errorMessage = "";
      state.status = "loading";
    },
    [getAllWorkers.rejected]: (state, action) => {
      state.status = "failed";
      state.errorMessage = action.error.message;
    },
    //filter Workers
    [filterWorkers.fulfilled]: (state, action) => {
      state.errorMessage = "";
      state.status = "succeeded";
      state.workers = action.payload.workers;
      if (action.payload.count !== 0 && !isNaN(action.payload.count)) {
        state.count = action.payload.count;
      }
    },
    [filterWorkers.pending]: (state, action) => {
      state.errorMessage = "";
      state.status = "loading";
    },
    [filterWorkers.rejected]: (state, action) => {
      state.status = "failed";
      state.errorMessage = action.error.message;
      state.workers = null;
    },
    //get Worker
    [getWorker.fulfilled]: (state, action) => {
      state.errorMessage = "";
      state.status = "succeeded";
      state.worker = action.payload;
    },
    [getWorker.pending]: (state) => {
      state.errorMessage = "";
      state.status = "loading";
    },
    [getWorker.rejected]: (state, action) => {
      state.status = "failed";
      state.errorMessage = action.error.message;
    },
  },
});

export const workersActions = workersSlice.actions;
export default workersSlice.reducer;

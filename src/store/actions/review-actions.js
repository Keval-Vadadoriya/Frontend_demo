import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseService from "../baseService";

export const getReviews = createAsyncThunk(
  "reviews/getReviews",
  async ({ workerId }, getState) => {
    try {
      const response = await baseService.get(`/getreview/${workerId}`);

      return response.data;
    } catch (e) {
      throw new Error(e.response.data.Error);
    }
  }
);

export const addReview = createAsyncThunk(
  "reviews/addReview",
  async ({ description, review, workerId }, getState) => {
    const states = getState.getState();

    try {
      const response = await baseService.post(`/review/${workerId}`, {
        description,
        review,
        owner: states.user.user._id,
      });

      getState.dispatch(getReviews({ workerId }));
      return response.data;
    } catch (e) {
      throw new Error(e.response.data.Error);
    }
  }
);

export const reviewsSlice = createSlice({
  name: "reviews",
  initialState: {
    status: "idle",
    errorMessage: "",
    reviews: [],
  },
  reducers: {},
  extraReducers: {
    [getReviews.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.errorMessage = "";
      state.reviews = action.payload;
    },
    [getReviews.pending]: (state, action) => {
      state.status = "loading";
      state.errorMessage = "";
    },
    [getReviews.rejected]: (state, action) => {
      state.status = "failed";
      state.errorMessage = action.error.message;
    },
    [addReview.fulfilled]: (state, action) => {
      state.status = "Review Added Successfully";
      state.errorMessage = "";
    },
    [addReview.pending]: (state, action) => {
      state.status = "loading";
      state.errorMessage = "";
    },
    [addReview.rejected]: (state, action) => {
      state.status = "failed";
      state.errorMessage = action.error.message;
    },
  },
});

export default reviewsSlice.reducer;

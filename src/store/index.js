import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import login from "./actions/login-actions";
import signup from "./actions/signup-actions";
import reviews from "./actions/review-actions";
import project from "./actions/project-actions";
import workerslist from "./actions/workers-action";
import myproject from "./actions/myproject-actions";
import user, { getUser } from "./actions/user-actions";
import chat from "./slice/chat-slice";
import socket from "./slice/socket-slice";
import snackbar from "./slice/snackbar-slice";

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});
const store = configureStore({
  reducer: {
    login,
    user,
    socket,
    signup,
    workerslist,
    reviews,
    chat,
    project,
    myproject,
    snackbar,
  },
  middleware: customizedMiddleware,
});
if (store.getState().login.token) {
  store.dispatch(getUser());
}
export default store;

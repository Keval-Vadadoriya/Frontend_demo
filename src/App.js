import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";

import SignupForm from "./components/forms/Signup-Form";
import LoginForm from "./components/forms/Login-Form";
import Header from "./components/layout/Header";
import Worker from "./components/worker/Worker";
import Projects from "./components/projects/Projects";
import MyProjects from "./components/my projects/MyProjects";
import Profile from "./components/profile/Profile";
import Review from "./components/reviews/Review";
import Chat from "./components/chats/Chat";
import Chats from "./components/chats/Chats";
import Home from "./components/Home/Home";
import WorkerProfile from "./components/worker/WorkerProfile";
import Welcome from "./components/welcome/Welcome";
import Unauthorized from "./components/welcome/Unauthorized";
import NotFound from "./components/welcome/NotFound";
import { Box, Snackbar, Alert, Slide } from "@mui/material";
import { snackbarActions } from "./store/snackbar-slice";
import { useTheme } from "@mui/styles";

function App() {
  const theme = useTheme();
  console.log(theme);
  const { open, severity, message } = useSelector((state) => state.snackbar);
  const token = useSelector((state) => state.login.token);
  const role = useSelector((state) => state.login.role);
  const dispatch = useDispatch();
  const handleSnackbar = () => {
    dispatch(snackbarActions.setSnackbar({ open: false }));
  };

  return (
    <>
      <Box sx={{ minWidth: "xs" }}>
        <Header />
        <Routes>
          {!token && <Route path="/" element={<Welcome />} />}

          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          {token && (
            <Route path="/" element={<Home />}>
              <Route path="profile" element={<Profile />} />
              <Route path="chats" element={<Chat />}>
                <Route path=":workerid" element={<Chats />} />
              </Route>

              <Route path="workers">
                <Route
                  index
                  element={role === "user" ? <Worker /> : <Unauthorized />}
                />
                <Route path=":workerid">
                  <Route index element={<WorkerProfile />} />
                  <Route path="review/:id" element={<Review />} />
                </Route>
              </Route>

              <Route
                path="myprojects"
                element={role === "user" ? <MyProjects /> : <Unauthorized />}
              />

              <Route path="projects">
                <Route
                  index
                  element={role === "worker" ? <Projects /> : <Unauthorized />}
                />
              </Route>
            </Route>
          )}
          {!token && <Route path="/*" element={<Navigate to="/login" />} />}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        TransitionComponent={Slide}
        autoHideDuration={1000}
        onClose={handleSnackbar}
      >
        <Alert
          onClose={handleSnackbar}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;

import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";

import SignupForm from "./components/forms/Signup-Form";
import LoginForm from "./components/forms/Login-Form";
import Header from "./components/layout/Header";
import Worker from "./components/worker/Worker";
import Profile from "./components/profile/Profile";
import Review from "./components/reviews/Review";
import Chat from "./components/chats/Chat";
import Chats from "./components/chats/Chats";
import Home from "./components/Home/Home";
import WorkerProfile from "./components/worker/WorkerProfile";

console.log("appU");

function App() {
  const token = useSelector((state) => state.login.token);
  const role = useSelector((state) => state.login.role);

  return (
    <Fragment>
      <Header />
      <main>
        <Routes>
          {!token && (
            <Route path="/" element={<h1>Welcome to DemoProject</h1>} />
          )}
          {token && <Route path="/" element={<Navigate to="home" />} />}

          <Route path="/signup" element={!token && <SignupForm />} />
          <Route path="/login" element={!token && <LoginForm />} />
          {token && (
            <Route path="/home" element={<Home />}>
              <Route path="profile" element={<Profile />} />
              <Route path="chats" element={<Chat />}>
                <Route path=":workerid" element={<Chats />} />
              </Route>
              {role === "user" && (
                <Route path="worker">
                  <Route index element={<Worker />} />
                  <Route path=":workerid">
                    <Route index element={<WorkerProfile />} />
                    <Route path="review/:id" element={<Review />} />
                  </Route>
                </Route>
              )}
              {role === "worker" && (
                <Route path="worker/*" element={<h1>Unauthorized</h1>} />
              )}
            </Route>
          )}
          {!token && (
            <Route path="/home/*" element={<Navigate to="/login" />} />
          )}
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </main>
    </Fragment>
  );
}

export default App;

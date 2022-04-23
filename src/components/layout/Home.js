import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Box } from "@mui/system";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

  //redux states
  const socket = useSelector((state) => state.socket.socket);
  const userId = useSelector((state) => state.user.user._id);
  const role = useSelector((state) => state.login.role);

  useEffect(() => {
    if (userId) {
      socket.emit("setId", userId);
    }
  }, [userId, socket]);
  useEffect(() => {
    if (location.pathname === "/") {
      if (role === "user") {
        navigate("/workers");
      }
      if (role === "worker") {
        navigate("/projects");
      }
    }
  }, [location, navigate, role]);

  return (
    <>
      <Box
        sx={{
          height: "110%",
          backgroundColor: "white",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Outlet />
      </Box>
    </>
  );
};
export default Home;

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Box } from "@mui/system";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

  //redux states
  const socket = useSelector((state) => state.socket.socket);
  const userId = useSelector((state) => state.user.user._id);
  const role = useSelector((state) => state.login.role);
  if (userId) {
    socket.emit("setId", userId);
  }
  useEffect(() => {
    if (location.pathname === "/") {
      if (role === "user") {
        navigate("/workers");
      }
      if (role === "worker") {
        navigate("/projects");
      }
    }
  }, [location]);


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

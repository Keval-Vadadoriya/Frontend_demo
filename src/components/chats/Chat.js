import { Fragment, useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Box, Fade, Grid, Typography } from "@mui/material";
import { chatActions } from "../../store/actions/chat-actions";
import { List, ListItem, Avatar } from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  chat: {
    position: "sticky",
    top: 60,
    height: "92.5vh",

    backgroundColor: theme.palette.fifth.light,
  },
  chatList: {
    boxSizing: "border-box",
    width: "100%",
    height: "85vh",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    overflow: "scroll",
    padding: 10,
  },
  chatListItem: {
    margin: 5,
    padding: 10,
    borderRadius: 20,
    backgroundColor: theme.palette.third.light,
    "&:hover": {
      backgroundColor: theme.palette.third.extra,
      textColor: "white",
      border: `1px solid ${theme.palette.secondary.main}`,
    },
  },
  userName: {
    padding: 5,
    fontSize: "25px",
    fontFamily: "Arvo",
    position: "sticky",
    top: "55px",
    zIndex: "1",
    backgroundColor: theme.palette.primary.extra,
    color: theme.palette.third.light,
  },
}));
const Chat = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const dispatch = useDispatch();

  //redux states
  const userId = useSelector((state) => state.user.user._id);
  const userName = useSelector((state) => state.user.user.name);
  const role = useSelector((state) => state.login.role);
  const { chatList } = useSelector((state) => state.chat);
  const socket = useSelector((state) => state.socket.socket);
  const page = useSelector((state) => state.snackbar.page);

  //getting chatlist
  useEffect(() => {
    socket.removeAllListeners("chatlist");
    socket.on("chatlist", (list, chats) => {
      dispatch(chatActions.setChatList({ list }));
      if (chats) {
        dispatch(
          chatActions.setChats({
            chats,
            role,
            receiverId: chats[role === "user" ? "worker" : "user"]._id,
          })
        );
      }
    });
  }, [dispatch, socket, role]);
  useEffect(() => {
    if (userId && role) {
      socket.emit("getchatlist", { userId, role });
    }
  }, [userId, role, socket]);

  //chatlist ui
  let chatListUi;
  if (chatList.length !== 0) {
    chatListUi = chatList.map((worker) => {
      return (
        <ListItem
          key={worker._id}
          component={NavLink}
          to={`/chats/${worker.user._id}`}
          className={classes.chatListItem}
          sx={{ display: "flex", justifyContent: "flex-start" }}
          style={({ isActive }) =>
            isActive
              ? {
                  backgroundColor: theme.palette.fifth.light,
                  border: `1px solid ${theme.palette.secondary.main}`,
                }
              : {}
          }
        >
          <Avatar
            src={`${process.env.REACT_APP_HOST}/${worker.user.avatar}`}
            sx={{ mardin: "10px" }}
          />
          <Typography
            sx={{
              color: "black",
              fontFamily: "Arvo",
              paddingLeft: "5px",
              flexGrow: "1",
            }}
          >
            {worker.user.name}
          </Typography>
          {worker.count !== 0 && (
            <Avatar
              sx={{
                color: "white",
                backgroundColor: "green",
                fontSize: "17px",
                height: "25px",
                width: "25px",
              }}
            >
              {worker.count}
            </Avatar>
          )}
        </ListItem>
      );
    });
  }

  return (
    <Fragment>
      <Fade in={true} timeout={1000}>
        <Box sx={{ height: { xs: "91vh", md: "92.5vh" } }}>
          <Grid container>
            <Grid
              item
              xs={12}
              md={3}
              sx={{
                display: { xs: page ? "auto" : "none", md: "block" },
              }}
            >
              <Box className={classes.chat}>
                <Box className={classes.userName}>{userName}</Box>
                <List dense className={classes.chatList}>
                  {chatListUi && chatListUi}
                </List>
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              md={9}
              sx={{
                backgroundColor: "white",
              }}
            >
              <Outlet />
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Fragment>
  );
};
export default Chat;

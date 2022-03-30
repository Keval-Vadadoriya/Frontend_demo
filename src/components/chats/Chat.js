import { Fragment, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import classes from "./Chat.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Box, Grid, Typography } from "@mui/material";
import { chatActions } from "../../store/actions/chat-actions";
import { host } from "../../config";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
const Chat = () => {
  const userId = useSelector((state) => state.user.user._id);
  const user = useSelector((state) => state.user.user);
  const role = useSelector((state) => state.login.role);
  const { chatList } = useSelector((state) => state.chat);
  const socket = useSelector((state) => state.socket.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("chatlist", (list, chats) => {
      console.log(list);
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
    console.log(userId, role);
    if (userId && role) {
      console.log("hhh", userId, role);
      socket.emit("getchatlist", userId, role);
    }
  }, [userId, role]);

  let chatListUi;
  if (chatList) {
    chatListUi = chatList.map((worker) => {
      console.log(worker);
      return (
        <ListItem
          className={classes.hover}
          key={worker._id}
          component={Link}
          to={`/home/chats/${worker.user._id}`}
        >
          <ListItemAvatar>
            <Avatar src={`${host}/${worker.user.avatar}`} />
          </ListItemAvatar>
          <ListItemText id={worker.user._id} primary={`${worker.user.name}`} />
          <ListItemText id={worker.user._id} primary={`${worker.count}`} />
        </ListItem>
      );
    });
  }

  return (
    <Fragment>
      <Grid container>
        <Grid item xs={3}>
          <Box position="sticky" top={70}>
            <Typography variant="h4" marginLeft={1}>
              {user.name}
            </Typography>
            <List
              dense
              sx={{
                width: "100%",
                // maxWidth: 360,
                bgcolor: "background.paper",
                padding: 0,
              }}
            >
              {chatList && chatListUi}
            </List>
          </Box>
        </Grid>
        <Grid item xs={9}>
          <div>
            <div>
              <Outlet />
            </div>
          </div>
        </Grid>
      </Grid>
    </Fragment>
  );
};
export default Chat;

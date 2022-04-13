import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { chatActions } from "../../store/actions/chat-actions";
import {
  Button,
  Grid,
  TextField,
  Box,
  Typography,
  Avatar,
  Container,
  FormControl,
  Fade,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { socketActions } from "../../store/socket-slice";
import { makeStyles, useTheme } from "@mui/styles";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { snackbarActions } from "../../store/snackbar-slice";

const useStyles = makeStyles((theme) => ({
  chatOwner: {
    // backgroundColor: theme.palette.secondary.main,
    backgroundColor: theme.palette.secondary.main,
    display: "flex",
    color: "white",
    fontSize: 20,
    padding: 5,
    // borderRadius: 10,
    position: "-webkit-sticky",
    position: "sticky",
    top: 0,
  },
  sendMessage: {
    backgroundColor: theme.palette.secondary.main,
    // backgroundColor: theme.palette.secondary.main,
    position: "-webkit-sticky",
    position: "sticky",
    margin: 0,
    borderRadius: "5px",
    padding: "5px",
    bottom: 0,
  },
  chats: {
    top: 0,
    marginLeft: "20px",
    marginRight: "20px",
    height: "90vh",
    overflowY: "scroll",
    marginTop: 10,
    "&::-webkit-scrollbar": {
      display: "none",
    },
    // "&::-webkit-scrollbar-track": {
    //   boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    //   webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    // },
    // "&::-webkit-scrollbar-thumb": {
    //   backgroundColor: "rgba(0,0,0,.1)",
    //   outline: "1px solid slategrey",
    // },
  },
  chatList: {
    backgroundColor: theme.palette.fifth.light,
    display: "flex",
    flexDirection: "column",
    // backgroundColor: theme.palette.primary.extra,
    height: "77vh",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    overflowY: "scroll",
  },
  message: {
    margin: 10,
    // padding: 7,
  },
}));

function Chats() {
  const theme = useTheme();
  const navigate = useNavigate();
  const classes = useStyles(theme);
  const receiverId = useParams();
  let messageList;
  const messagesEndRef = useRef();
  const userId = useSelector((state) => state.user.user._id);
  const role = useSelector((state) => state.login.role);
  const dispatch = useDispatch();
  const socket = useSelector((state) => state.socket.socket);
  const [message, setMessage] = useState("");
  const { chats, chatsOwner } = useSelector((state) => state.chat);
  const data = useSelector((state) => state.socket.data);

  //scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats[receiverId.workerid]]);

  useEffect(() => {
    if (data) {
      socket.emit(
        "delivered",
        data.message._id,
        data.sender,
        data.receiver,
        data.role,
        receiverId.workerid === data.sender ? true : false,
        (response) => {
          dispatch(chatActions.setChatList({ list: response.chatList }));
        }
      );
    }
  }, [data]);

  useEffect(async () => {
    socket.removeAllListeners();

    socket.on("message", (data) => {
      dispatch(socketActions.setData({ data }));
      dispatch(
        chatActions.setChat({
          message: data.message,
          receiverId: data.sender,
        })
      );
    });
    socket.on("messageDelivered", (_id) => {
      dispatch(
        chatActions.setStatus({
          status: "delivered",
          _id,
          receiverId: receiverId.workerid,
        })
      );
    });
    dispatch(snackbarActions.setPage({ page: false }));
  }, []);
  useEffect(async () => {
    if (userId && role) {
      socket.emit("getchats", userId, role, receiverId.workerid, (response) => {
        dispatch(
          chatActions.setChats({
            chats: response.chats,
            role,
            receiverId: receiverId.workerid,
          })
        );
        dispatch(chatActions.setChatList({ list: response.chatList }));
      });
      socket.emit("addToChatList", userId, role, receiverId.workerid);
    }
  }, [receiverId.workerid, userId, role]);

  const changeMessageHandler = (event) => {
    setMessage(event.target.value);
  };
  const sendMessageHandler = async (event) => {
    event.preventDefault();
    setMessage("");
    let createMessage = {
      message,
      time: new Date().getTime(),
      owner: userId,
      role: role === "user" ? "User" : "Worker",
      status: "pending",
    };

    socket.emit(
      "message",
      {
        message: createMessage,
        sender: userId,
        receiver: receiverId.workerid,
        role,
      },
      (response) => {
        dispatch(
          chatActions.setChat({
            message: response.message,
            receiverId: receiverId.workerid,
          })
        );
        dispatch(chatActions.setChatList({ list: response.chatlist }));
      }
    );
  };
  if (chats[receiverId.workerid]) {
    messageList = chats[receiverId.workerid].map((message) => {
      const date = new Date(message.time);
      return (
        <Box
          key={message._id}
          className={classes.message}
          sx={{
            textAlign: message.owner === userId ? "right" : "left",
            alignSelf: message.owner === userId ? "flex-end" : "flex-start",
            paddingLeft: message.owner !== userId ? "30px" : 0,
            paddingRight: message.owner === userId ? "30px" : "0",
            borderTopLeftRadius: message.owner !== userId ? 0 : 30,
            borderTopRightRadius: message.owner === userId ? 0 : 30,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            paddingTop: "3px",
            maxWidth: "60%",
            minWidth: "30%",
            backgroundColor:
              message.owner !== userId && message.status === "sent"
                ? "rgb(218, 255, 227)"
                : "white",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              wordBreak: "break-word",
              fontSize: { xs: "17px", md: "20px" },
              fontFamily: "Roboto",
            }}
          >
            {message.message}
            <Typography
              sx={{
                fontSize: { xs: "7px", md: "13px" },
                fontStyle: "italic",
                fontFamily: "Arvo",
                color: "gray",
              }}
            >{`${date.toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}${
              message.owner === userId ? ` ${message.status}` : ""
            }`}</Typography>
          </Typography>
        </Box>
      );
    });
  }
  return (
    <Fade in={true} timeout={1000}>
      <Box className={classes.chats}>
        {/* <Container
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      > */}
        <Grid container>
          <Grid item xs={12} className={classes.chatOwner}>
            <Button
              onClick={() => {
                dispatch(snackbarActions.setPage({ page: true }));
                navigate("/chats");
              }}
            >
              <ArrowBackIosIcon sx={{ color: "white" }} />
            </Button>
            <Box
              component={Link}
              to={role === "user" ? `/workers/${receiverId.workerid}` : ""}
              sx={{ display: "flex", textDecoration: "none" }}
            >
              <Avatar
                src={`${process.env.REACT_APP_HOST}/${chatsOwner?.avatar}`}
                sx={{ marginLeft: 0 }}
              />
              <Typography
                sx={{
                  display: "inline",
                  marginLeft: 3,
                  fontSize: 25,
                  fontFamily: "Arvo",
                  color: "white",
                }}
              >
                {chatsOwner && chatsOwner.name}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sx={{ height: "77vh" }}>
            <Box className={classes.chatList}>
              {messageList && messageList}
              <Box ref={messagesEndRef} />
            </Box>
          </Grid>
        </Grid>
        <Grid
          container
          component="form"
          onSubmit={sendMessageHandler}
          className={classes.sendMessage}
        >
          <Grid item xs={10} md={11}>
            <FormControl fullWidth>
              <TextField
                autoComplete="message"
                name="Message"
                required
                variant="filled"
                fullWidth
                id="Message"
                label="Message"
                autoFocus
                value={message}
                onChange={changeMessageHandler}
                sx={{
                  // color: "black",
                  backgroundColor: "white",
                  borderRadius: "5px",
                  color: "black",
                  "& label.Mui-focused": {
                    color: theme.palette.secondary.main,
                  },
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={1}>
            <Button type="submit">
              <SendIcon fontSize="large" sx={{ color: "white" }} />
            </Button>
          </Grid>
        </Grid>
        {/* </Container> */}
      </Box>
    </Fade>
  );
}

export default Chats;

import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";

//redux
import { chatActions } from "../../store/slice/chat-slice";
import { socketActions } from "../../store/slice/socket-slice";
import { snackbarActions } from "../../store/slice/snackbar-slice";

//mui
import {
  Button,
  Grid,
  TextField,
  Box,
  Typography,
  Avatar,
  FormControl,
  Fade,
} from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

//design
const useStyles = makeStyles((theme) => ({
  chatOwner: {
    backgroundColor: theme.palette.secondary.main,
    display: "flex",
    color: "white",
    fontSize: 20,
    padding: 5,
    position: "sticky",
    top: 0,
  },
  sendMessage: {
    backgroundColor: theme.palette.secondary.main,
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
  },
  chatList: {
    backgroundColor: theme.palette.fifth.light,
    display: "flex",
    flexDirection: "column",
    height: "77vh",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    overflowY: "scroll",
  },
  message: {
    margin: 10,
  },
}));

function Chats() {
  const theme = useTheme();
  const navigate = useNavigate();
  const classes = useStyles(theme);
  const { receiverId } = useParams();
  const messagesEndRef = useRef();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  let messageList;

  //redux states
  const userId = useSelector((state) => state.user.user._id);
  const role = useSelector((state) => state.login.role);
  const socket = useSelector((state) => state.socket.socket);
  const { chats, chatsOwner } = useSelector((state) => state.chat);
  const data = useSelector((state) => state.socket.data);

  //scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [chats[receiverId]]);

  //emmiting delivered status
  useEffect(() => {
    if (data) {
      socket.emit(
        "delivered",
        {
          messageId: data.message._id,
          sender: data.sender,
          receiver: data.receiver,
          role: data.role,
          active: receiverId === data.sender ? true : false,
        },
        (response) => {
          dispatch(chatActions.setChatList({ list: response.chatList }));
        }
      );
    }
  }, [data, dispatch, socket]);

  //getting messages and delivered status
  useEffect(() => {
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
    socket.on("messageDelivered", (messageId) => {
      dispatch(
        chatActions.setStatus({
          status: "delivered",
          messageId,
          receiverId,
        })
      );
    });
    dispatch(snackbarActions.setPage({ page: false }));
  }, [dispatch, socket, receiverId]);

  //adding to chatlist and getting chats
  useEffect(() => {
    if (userId && role) {
      socket.emit(
        "addToChatList",
        { senderId: userId, role, receiverId },
        (response) => {
          if (response.status === "success") {
            socket.emit(
              "getchats",
              { userId, role, receiverId },
              (response) => {
                dispatch(
                  chatActions.setChats({
                    chats: response.chats,
                    role,
                    receiverId,
                  })
                );
                dispatch(chatActions.setChatList({ list: response.chatList }));
              }
            );
          }
        }
      );
    }
  }, [receiverId, userId, role, dispatch, socket]);

  //sending message
  const sendMessageHandler = (event) => {
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
        receiver: receiverId,
        role,
      },
      (response) => {
        dispatch(
          chatActions.setChat({
            message: response.message,
            receiverId,
          })
        );
        dispatch(chatActions.setChatList({ list: response.chatlist }));
      }
    );
  };

  //message list ui
  if (chats[receiverId]) {
    messageList = chats[receiverId].map((message) => {
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

  //jsx
  return (
    <Fade in={true} timeout={1000}>
      <Box className={classes.chats}>
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
              to={role === "user" ? `/workers/${receiverId}` : ""}
              sx={{ display: "flex", textDecoration: "none" }}
            >
              <Avatar
                src={`${process.env.REACT_APP_HOST}/${
                  chatsOwner ? chatsOwner.avatar : "uploads/default.jpg"
                }`}
                sx={{ marginLeft: 0 }}
              />
              <Typography
                sx={{
                  display: "inline",
                  alignItems: "center",
                  marginLeft: 3,
                  fontSize: { xs: 20, md: 25 },
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
                multiline
                variant="filled"
                fullWidth
                id="Message"
                label="Message"
                autoFocus
                value={message}
                onChange={(event) => {
                  setMessage(event.target.value);
                }}
                sx={{
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
      </Box>
    </Fade>
  );
}

export default Chats;

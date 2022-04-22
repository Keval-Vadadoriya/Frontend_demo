import React from "react";
import { Box, Button, Slide, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { loginActions } from "../../store/actions/login-actions";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "rgb(256, 256, 256)",
    overflow: "hidden",
    height: "92.5vh",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: "url(https://wallpaperaccess.com/full/2581470.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
  },
  welcome: {
    textAlign: "center",
    width: "100%",
    color: theme.palette.secondary.main,
    fontSize: "50px",
    wordBreak: "break-word",
  },
  buttons: {
    textAlign: "center",
    marginTop: "20px",
  },
  button: {
    color: "black",
    padding: "10px 20px",
    backgroundColor: theme.palette.third.extra,
    margin: "10px",
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: "white",
    },
  },
}));

function Welcome() {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const setRole = (event) => {
    dispatch(loginActions.setRole({ role: event.target.value }));
    navigate("/signup");
  };
  return (
    <>
      <Box className={classes.container}>
        <Grid container>
          <Grid item xs={12}>
            <Slide direction="down" in={true} timeout={3000}>
              <Typography
                className={classes.welcome}
                sx={{ fontFamily: "Arvo" }}
              >
                Welcome To EasyWork
              </Typography>
            </Slide>
          </Grid>
          <Grid item xs={12} className={classes.buttons}>
            <Slide direction="up" in={true} timeout={3000}>
              <Button
                onClick={setRole}
                value="worker"
                className={classes.button}
                sx={{ fontFamily: "Arvo", textTransform: "capitalize" }}
              >
                Want To Work?
              </Button>
            </Slide>
            <Slide direction="up" in={true} timeout={3000}>
              <Button
                onClick={setRole}
                value="user"
                className={classes.button}
                sx={{ fontFamily: "Arvo", textTransform: "capitalize" }}
              >
                Looking For Worker?
              </Button>
            </Slide>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Welcome;

import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Fade, useMediaQuery } from "@mui/material";

import {
  loggedInUser,
  forgotPassword,
  verifyPassword,
  loginActions,
} from "../../store/login-slice";
import { signupActions, verifyUser } from "../../store/actions/signup-actions";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  Grid,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { snackbarActions } from "../../store/snackbar-slice";
import { useTheme } from "@mui/styles";

const LoginForm = () => {
  const theme = useTheme();
  const [loginEmail, setLoginEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [loginPassword, setLoginPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [forgotDialog, setForgotDialog] = useState(false);
  const [verifyDialog, setVerifyDialog] = useState(false);
  const [otp, setOtp] = useState();

  const { status, token, errorMessage } = useSelector((state) => state.login);
  const { status: verifyStatus, errorMessage: verifyerrorMessage } =
    useSelector((state) => state.signup);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  //handling error and success
  useEffect(() => {
    if (errorMessage === "Plese Verify Your Email") {
      setOpen(true);
    }
    if (status === "Password Updated Successfully") {
      setVerifyDialog(false);
    }
    if (errorMessage) {
      dispatch(
        snackbarActions.setSnackbar({
          open: true,
          severity: "error",
          message: errorMessage,
        })
      );
      dispatch(loginActions.setErrorMessage({ errorMessage: "" }));
    }
    if (
      status === "Login Successful" ||
      status === "Password Updated Successfully" ||
      status === "Sent"
    ) {
      dispatch(
        snackbarActions.setSnackbar({
          open: true,
          severity: "success",
          message: status,
        })
      );
      dispatch(loginActions.setStatus({ status: "idle" }));
    }
    if (verifyStatus === "Verification Successful") {
      dispatch(
        snackbarActions.setSnackbar({
          open: true,
          severity: "success",
          message: verifyStatus,
        })
      );
      dispatch(signupActions.setStatus({ status: "idle" }));
    }
    if (status === "Sent") {
      setForgotDialog(false);
      setVerifyDialog(true);
    }
  }, [status, verifyStatus, errorMessage]);

  //dialogs
  const handleVerifyUserClose = () => {
    setOpen(false);
  };
  const handleVerifyPasswordClose = () => {
    setVerifyDialog(false);
  };
  const verify = () => {
    dispatch(verifyUser({ otp }));
  };
  const changeOtpHandler = (event) => {
    setOtp(event.target.value);
  };

  const forgotPasswordHandler = () => {
    setForgotDialog(true);
  };
  const handleForgotClose = () => {
    setForgotDialog(false);
  };
  const changeForgotPasswordHandler = (event) => {
    setPassword(event.target.value);
  };
  const changeConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.target.value);
  };
  const verifyPasswordx = () => {
    if (password === confirmPassword) {
      const body = {
        password,
      };
      dispatch(verifyPassword({ otp, body }));
    }
  };
  const forgotPasswordx = () => {
    const body = {
      email: loginEmail,
    };
    dispatch(forgotPassword({ body }));
  };
  //Login Request
  useEffect(() => {
    if (
      token &&
      (status === "Login Successful" ||
        verifyStatus === "Verification Successful")
    ) {
      navigate("/");
    }
  }, [token, status, verifyStatus]);

  //Submit Handler
  const onSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(loggedInUser({ loginEmail, loginPassword }));
  };

  // validations
  const changeEmailHandler = (event) => {
    setLoginEmail(event.target.value);
    if (
      event.target.value
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      setEmailIsValid(true);
    } else {
      setEmailIsValid(false);
    }
  };

  const changePasswordHandler = (event) => {
    setLoginPassword(event.target.value);
    if (event.target.value.length >= 7) {
      setPasswordIsValid(true);
    } else {
      setPasswordIsValid(false);
    }
  };
  const matches = useMediaQuery("(max-width:600px)");
  return (
    <>
      <Fade in={true} timeout={500}>
        <Box
          sx={{
            // marginTop: 8,
            height: "92.5vh",
            width: "100vw",
            backgroundImage:
              "url(https://wallpaperaccess.com/full/2581470.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            backdropFilter: "brightness(50%)",
          }}
        >
          <Box
            sx={{
              backdropFilter: "blur(5px)",
              // marginTop: 8,
              height: "92.5vh",
              width: "100vw",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={onSubmitHandler}
              sx={{ mt: 3, width: { xs: "80%", md: "auto" } }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    error={!emailIsValid}
                    helperText={!emailIsValid ? "Please Enter Valid Email" : ""}
                    color="success"
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={changeEmailHandler}
                    sx={{ backgroundColor: "rgba(256,256,256,0)" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    error={!passwordIsValid}
                    color="success"
                    name="password"
                    label="Password"
                    helperText={
                      !passwordIsValid ? "Minimum 7 characters required" : ""
                    }
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={changePasswordHandler}
                    sx={{ backgroundColor: "rgba(256,256,256,0)" }}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  color: theme.palette.secondary.main,
                  backgroundColor: theme.palette.third.extra,
                  "&:hover": {
                    backgroundColor: theme.palette.secondary.main,
                    color: theme.palette.third.light,
                  },
                }}
              >
                Sign In
              </Button>
              <Grid container justifyContent="space-around">
                <Grid item>
                  <Typography
                    variant="body2"
                    onClick={forgotPasswordHandler}
                    color="blue"
                    sx={{
                      "&:hover": {
                        color: theme.palette.secondary.main,
                        cursor: "pointer",
                      },
                    }}
                  >
                    forgot password
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2" component={Link} to={"/signup"}>
                    don't have an account? Sign up
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Fade>

      {/* Verify User Dialog */}
      <Dialog fullscreen={matches} open={open} onClose={handleVerifyUserClose}>
        <DialogTitle
          sx={{
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.third.light,
            fontFamily: "Arvo",
          }}
        >
          Verify Email
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To Verify email, please enter otp we have sent to your email address
            here.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={changeOtpHandler}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleVerifyUserClose}>Cancel</Button>
          <Button onClick={verify}>Submit</Button>
        </DialogActions>
      </Dialog>

      {/* Verify Password Dialog */}
      <Dialog
        fullScreen={matches}
        open={verifyDialog}
        onClose={handleVerifyPasswordClose}
      >
        <DialogTitle
          sx={{
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.third.light,
            fontFamily: "Arvo",
          }}
        >
          Password Verification
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            We have sent otp to your registered email address
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="Otp"
            label="Otp"
            type="text"
            fullWidth
            variant="standard"
            onChange={changeOtpHandler}
          />
          <TextField
            required
            margin="dense"
            id="name"
            label="New Password"
            type="text"
            fullWidth
            variant="standard"
            onChange={changeForgotPasswordHandler}
          />
          <TextField
            required
            margin="dense"
            id="name"
            label="Confirm Password"
            type="text"
            fullWidth
            variant="standard"
            onChange={changeConfirmPasswordHandler}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleVerifyPasswordClose}>Cancel</Button>
          <Button onClick={verifyPasswordx}>verify</Button>
        </DialogActions>
      </Dialog>

      {/* forgot Dialogue */}
      <Dialog
        fullScreen={matches}
        open={forgotDialog}
        onClose={handleForgotClose}
      >
        <DialogTitle
          sx={{
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.third.light,
            fontFamily: "Arvo",
          }}
        >
          Forgot Password
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Please Enter Your Email Address</DialogContentText>

          <TextField
            autoFocus
            required
            margin="dense"
            id="Email"
            label="Email"
            type="text"
            fullWidth
            variant="standard"
            onChange={changeEmailHandler}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleForgotClose}>Cancel</Button>
          <Button onClick={forgotPasswordx}>forgot</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LoginForm;

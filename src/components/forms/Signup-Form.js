import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginActions } from "../../store/actions/login-actions";
import {
  signupActions,
  signupUser,
  verifyUser,
} from "../../store/actions/signup-actions";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  Box,
  Avatar,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useMediaQuery,
  Fade,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { snackbarActions } from "../../store/slice/snackbar-slice";
import { useTheme } from "@mui/styles";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  input: {
    backgroundColor: "rgba(256,256,256,0)",
  },
}));

const SignupForm = () => {
  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const matches = useMediaQuery("(max-width:600px)");

  //redux states
  const token = useSelector((state) => state.login.token);
  const role = useSelector((state) => state.login.role);
  const { status, errorMessage } = useSelector((state) => state.signup);

  //states
  const [touched, setTouched] = useState(false);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [nameIsValid, setNameIsValid] = useState(false);
  const [email, setEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordIsValid, setConfirmPasswordIsValid] = useState(false);
  const [profession, setProfession] = useState("");
  const [professionIsValid, setProfessionIsValid] = useState(false);
  const [location, setLocation] = useState("");
  const [locationIsValid, setLocationIsValid] = useState(false);
  const [roleIsValid, setRoleIsValid] = useState(role !== "");
  const [otp, setOtp] = useState();

  if (token) {
    navigate("/");
  }

  //handling error and success
  useEffect(() => {
    if (status === "Signup Successful") {
      setOpen(true);
    }
    if (errorMessage) {
      dispatch(
        snackbarActions.setSnackbar({
          open: true,
          severity: "error",
          message: errorMessage,
        })
      );
      dispatch(signupActions.setErrorMessage({ errorMessage: "" }));
    }
    if (
      status === "Signup Successful" ||
      status === "Verification Successful"
    ) {
      dispatch(
        snackbarActions.setSnackbar({
          open: true,
          severity: "success",
          message: "Otp Sent",
        })
      );
      dispatch(signupActions.setStatus({ status: "idle" }));
    }
  }, [status, errorMessage, dispatch]);

  const handleClose = () => {
    setOpen(false);
  };
  const verifyUserHandler = () => {
    dispatch(verifyUser({ otp }));
  };

  //changing Role
  const changeRole = (event) => {
    setRoleIsValid(true);
    dispatch(loginActions.setRole({ role: event.target.value }));
  };

  //Submit Handler
  const SubmitHandler = (event) => {
    event.preventDefault();

    let body =
      role === "user"
        ? {
            name,
            email,
            password,
          }
        : { name, email, password, profession, location };
    if (confirmPasswordIsValid) {
      dispatch(signupUser({ body, role }));
    }
  };

  //Validations
  const changeNameHandler = (event) => {
    setName(event.target.value);
    if (event.target.value.length > 0) {
      setNameIsValid(true);
    } else {
      setNameIsValid(false);
    }
  };

  const changeEmailHandler = (event) => {
    setEmail(event.target.value);
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
    setPassword(event.target.value);
    if (event.target.value.length >= 7) {
      setPasswordIsValid(true);
    } else {
      setPasswordIsValid(false);
    }
    if (event.target.value.length !== confirmPassword) {
      setConfirmPasswordIsValid(false);
    } else {
      setConfirmPasswordIsValid(true);
    }
  };

  const changeConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.target.value);
    if (password === event.target.value) {
      setConfirmPasswordIsValid(true);
    } else {
      setConfirmPasswordIsValid(false);
    }
  };

  const changeProfessionHandler = (event) => {
    setProfession(event.target.value);
    if (event.target.value !== "none") {
      setProfessionIsValid(true);
    } else {
      setProfessionIsValid(false);
    }
  };

  const changeLocationHandler = (event) => {
    setLocation(event.target.value);
    if (event.target.value !== "none") {
      setLocationIsValid(true);
    } else {
      setLocationIsValid(false);
    }
  };

  //return
  return (
    <>
      <Fade in={true} timeout={500}>
        <Box
          sx={{
            width: "100vw",
            height: "92.5vh",
            backgroundImage:
              "url(https://wallpaperaccess.com/full/2581470.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
          }}
        >
          <Box
            sx={{
              backdropFilter: "blur(5px)",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              height: "92.5vh",
              width: "100vw",
              overflowY: "scroll",
              paddingBottom: "20px",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              onSubmit={SubmitHandler}
              sx={{
                mt: { xs: 1, md: 3 },
                width: { xs: "80%", md: "40%" },
              }}
              onClick={() => setTouched(true)}
            >
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <FormControl
                    fullWidth
                    required
                    error={touched && !roleIsValid}
                  >
                    <InputLabel id="role">Role</InputLabel>
                    <Select
                      className={classes.input}
                      labelId="role"
                      id="role"
                      value={role}
                      label="Role"
                      color="success"
                      onChange={changeRole}
                    >
                      <MenuItem value={""} disabled hidden>
                        {"Select Role"}
                      </MenuItem>
                      <MenuItem value={"user"}>{"User"}</MenuItem>
                      <MenuItem value={"worker"}>{"Worker"}</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={classes.input}
                    autoComplete="given-name"
                    error={touched && !nameIsValid}
                    color="success"
                    name="Name"
                    helperText={!nameIsValid ? "Name is required" : ""}
                    required
                    fullWidth
                    id="Name"
                    label="Name"
                    onChange={changeNameHandler}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    className={classes.input}
                    required
                    fullWidth
                    error={touched && !emailIsValid}
                    color="success"
                    helperText={!emailIsValid ? "Please Enter Valid Email" : ""}
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={changeEmailHandler}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={classes.input}
                    required
                    fullWidth
                    error={touched && !passwordIsValid}
                    color="success"
                    helperText={
                      !passwordIsValid ? "Minimum 7 characters required" : ""
                    }
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={changePasswordHandler}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={classes.input}
                    required
                    fullWidth
                    error={touched && !confirmPasswordIsValid}
                    color="success"
                    helperText={
                      !confirmPasswordIsValid
                        ? "Confirm Password Should be same as Password"
                        : ""
                    }
                    name="confirm password"
                    label="Confirm Password"
                    type="password"
                    id="confirm password"
                    autoComplete="new-password"
                    onChange={changeConfirmPasswordHandler}
                  />
                </Grid>
                {role === "worker" && (
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      required
                      error={touched && !professionIsValid}
                    >
                      <InputLabel id="profession">Profession</InputLabel>
                      <Select
                        className={classes.input}
                        labelId="profession"
                        id="profession"
                        value={profession}
                        label="Profession"
                        color="success"
                        required
                        onChange={changeProfessionHandler}
                      >
                        <MenuItem value={"none"} disabled hidden>
                          {"Select Profession"}
                        </MenuItem>
                        <MenuItem value={"carpenter"}>{"Carpenter"}</MenuItem>
                        <MenuItem value={"plumber"}>{"Plumber"}</MenuItem>
                        <MenuItem value={"electrician"}>
                          {"Electrician"}
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                )}
                {role === "worker" && (
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      required
                      error={touched && !locationIsValid}
                    >
                      <InputLabel id="location">Location</InputLabel>
                      <Select
                        className={classes.input}
                        labelId="location"
                        id="location"
                        value={location}
                        color="success"
                        required
                        label="Location"
                        onChange={changeLocationHandler}
                      >
                        <MenuItem value={"none"} disabled hidden>
                          {"Select Location"}
                        </MenuItem>
                        <MenuItem value={"surat"}>{"Surat"}</MenuItem>
                        <MenuItem value={"anand"}>{"Anand"}</MenuItem>
                        <MenuItem value={"vadodara"}>{"Vadodara"}</MenuItem>
                        <MenuItem value={"ahmedabad"}>{"Ahmedabad"}</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                )}
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: { xs: 1, md: 3 },
                  mb: 2,
                  color: theme.palette.secondary.main,
                  backgroundColor: theme.palette.third.extra,
                  "&:hover": {
                    backgroundColor: theme.palette.secondary.main,
                    color: theme.palette.third.light,
                  },
                }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Typography variant="body2" component={Link} to={"/login"}>
                    Already have an account? Sign in
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Fade>
      <Dialog fullScreen={matches} open={open} onClose={handleClose}>
        <DialogTitle
          sx={{
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.third.light,
            fontFamily: "Arvo",
          }}
        >
          Email Verification
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To verify, please enter otp we have sent to your email address here.
          </DialogContentText>
          <TextField
            required
            margin="dense"
            id="name"
            label="OTP"
            type="text"
            fullWidth
            variant="standard"
            onChange={(event) => {
              setOtp(event.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={verifyUserHandler}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SignupForm;

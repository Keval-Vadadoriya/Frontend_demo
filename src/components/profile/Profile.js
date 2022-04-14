import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import { editProfile, userActions } from "../../store/user-slice";
import Review from "../reviews/Review";
import React from "react";
import {
  Avatar,
  Container,
  Button,
  Input,
  Badge,
  Box,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  Fade,
} from "@mui/material";
import Slide from "@mui/material/Slide";
import { snackbarActions } from "../../store/snackbar-slice";
import { useTheme } from "@mui/styles";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Profile = () => {
  const theme = useTheme();
  const user = useSelector((state) => state.user.user);
  const matches = useMediaQuery("(max-width:600px)");
  const [review, setReview] = useState(false);
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [newAvatar, setNewAvatar] = useState("");
  const [description, setDescription] = useState("");
  const [age, setAge] = useState(0);
  const [profession, setProfession] = useState("none");
  const [professionIsValid, setProfessionIsValid] = useState(false);
  const [location, setLocation] = useState("none");
  const [availability, setAvailability] = useState("");
  const [locationIsValid, setLocationIsValid] = useState(false);
  const [OldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState("");
  const [changePassword, setChangePassword] = useState(false);
  const { status, errorMessage } = useSelector((state) => state.user);
  const role = useSelector((state) => state.login.role);
  const userId = useSelector((state) => state.user.user._id);
  const avatar = user.avatar;

  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(user) !== 0) {
      setName(user.name);
      setEmail(user.email);
      setDescription(user?.description);
      setContact(user.contact ? user.contact : "");
      setLocation(user.location);
      setProfession(user.profession);
      setAge(user.age);
      setAvailability(user.availability);
    }
  }, [user]);
  useEffect(() => {
    if (status === "Saved Changes Successfully") {
      dispatch(
        snackbarActions.setSnackbar({
          open: true,
          severity: "success",
          message: status,
        })
      );
      dispatch(userActions.setStatus({ status: "idle" }));
    }
  }, [status]);

  useEffect(() => {
    if (errorMessage) {
      dispatch(
        snackbarActions.setSnackbar({
          open: true,
          severity: "error",
          message: errorMessage,
        })
      );
      dispatch(userActions.setErrorMessage({ errorMessage: "" }));
    }
  }, [errorMessage]);

  //change password
  const updatePassword = () => {
    setChangePassword(false);
    const formData = new FormData();
    if (passwordIsValid) {
      formData.append("password", OldPassword);
      formData.append("newpassword", newPassword);
    }
    dispatch(editProfile({ body: formData, role, userId }));
    setEdit(false);
  };

  //Submit Handler
  const SubmitHandler = (event) => {
    event.preventDefault();
    // setChangePassword(false);
    const formData = new FormData();
    if (newAvatar) {
      formData.append("avatar", newAvatar);
    }
    if (name) {
      formData.append("name", name);
    }
    if (email) {
      formData.append("email", email);
    }
    if (contact) {
      formData.append("contact", contact);
    }
    if (age) {
      formData.append("age", age);
    }
    if (role === "worker") {
      if (profession) {
        formData.append("profession", profession);
      }
      if (location) {
        formData.append("location", location);
      }
      if (description) {
        formData.append("description", description);
      }
      if (availability === true || availability === false)
        formData.append("availability", availability);
    }

    dispatch(editProfile({ body: formData, role, userId }));
    setEdit(false);
  };

  const handleClose = () => {
    setReview(false);
  };
  //Validations

  const changeProfessionHandler = (event) => {
    setProfession(event.target.value);
    if (event.target.value !== "none") {
      setProfessionIsValid(true);
    } else {
      setProfessionIsValid(false);
    }
  };
  const changeAvailabilityHandler = (event, value) => {
    setAvailability(event.target.value);
  };

  const changeLocationHandler = (event) => {
    setLocation(event.target.value);
    if (event.target.value !== "none") {
      setLocationIsValid(true);
    } else {
      setLocationIsValid(false);
    }
  };
  const handlePasswordClose = () => {
    setChangePassword(false);
  };

  return (
    <>
      <Fade in={true} timeout={1000}>
        <Box
          sx={{
            backgroundColor: theme.palette.third.light,
            height: "91.5vh",
            width: "100vw",
            overflowY: "scroll",
          }}
        >
          <Container
            sx={{
              display: "flex",
              justifyContent: "center",
              width: { xs: "100%", md: "70%" },
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "space-around",
                width: "100%",
                marginTop: { xs: "10px", md: "20px" },
              }}
            >
              <Button
                onClick={() => {
                  setEdit(!edit);
                }}
                sx={{
                  fontSize: "18px",
                  textTransform: "capitalize",
                }}
              >
                {edit ? "Discard Changes" : "Edit Profile"}
              </Button>
              {role === "worker" && (
                <Button
                  onClick={() => setReview(true)}
                  sx={{
                    fontSize: "18px",
                    textTransform: "capitalize",
                  }}
                >
                  Reviews
                </Button>
              )}
              <Button
                onClick={() => setChangePassword(true)}
                sx={{
                  fontSize: "18px",
                  textTransform: "capitalize",
                }}
              >
                Change Password
              </Button>
            </Box>
            {status !== "loading" && (
              <Box
                component="form"
                encType="multipart/form-data"
                onSubmit={SubmitHandler}
              >
                {user && Object.keys(user).length !== 0 && (
                  <Grid container rowSpacing={2} marginTop={{ xs: 0, md: 3 }}>
                    <Grid
                      item
                      xs={12}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Badge
                        color="secondary"
                        invisible={!edit}
                        badgeContent={
                          <label htmlFor="contained-button-file">
                            <Input
                              accept="image/*"
                              id="contained-button-file"
                              type="file"
                              sx={{ display: "none" }}
                              onChange={(event) =>
                                setNewAvatar(event.target.files[0])
                              }
                            />

                            <EditIcon sx={{ cursor: "pointer" }} />
                          </label>
                        }
                      >
                        <Avatar
                          src={
                            newAvatar && edit
                              ? window.URL.createObjectURL(newAvatar)
                              : `${process.env.REACT_APP_HOST}/${avatar}`
                          }
                          sx={{
                            width: 100,
                            height: 100,
                          }}
                        />
                      </Badge>
                    </Grid>
                    {edit && (
                      <Grid item xs={12} textAlign="center" color="gray">
                        Maximum Size Allowed 1Mb
                      </Grid>
                    )}
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        disabled={!edit}
                        value={edit ? name : user.name}
                        name="Name"
                        label="Name"
                        type="text"
                        id="name"
                        autoComplete="name"
                        onChange={(event) => setName(event.target.value)}
                      />
                    </Grid>
                    {role === "worker" && (
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          multiline
                          disabled={!edit}
                          value={edit ? description : user.description}
                          name="About You"
                          label="About You"
                          type="text"
                          id="About You"
                          autoComplete="About You"
                          onChange={(event) =>
                            setDescription(event.target.value)
                          }
                        />
                      </Grid>
                    )}
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        disabled={true}
                        value={edit ? email : user.email}
                        name="Email"
                        label="Email"
                        type="email"
                        id="Email"
                        autoComplete="Email"
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        disabled={!edit}
                        name="Contact"
                        value={
                          edit ? contact : user.contact ? user.contact : ""
                        }
                        label="Contact"
                        type="tel"
                        inputProps={{
                          pattern: "[6-9]{1}[0-9]{9}",
                          maxLength: 10,
                          minLength: 10,
                        }}
                        helperText={
                          edit
                            ? "contact should start with number 6-9 and contain 10 digits"
                            : ""
                        }
                        id="Contact"
                        autoComplete="Contact"
                        onChange={(event) => {
                          let str = event.target.value;
                          const i = str.length;
                          if (isNaN(str[i - 1])) {
                            str = str.replace(str[i - 1], "");
                          }
                          setContact(str);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        disabled={!edit}
                        value={edit ? age : user.age}
                        name="Age"
                        label="Age"
                        type="number"
                        id="Age"
                        autoComplete="Age"
                        onChange={(event) => setAge(event.target.value)}
                      />
                    </Grid>
                    {role === "worker" && (
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <InputLabel id="profession">Profession</InputLabel>
                          <Select
                            labelId="profession"
                            id="profession"
                            value={edit ? profession : user.profession}
                            disabled={!edit}
                            label="Profession"
                            onChange={changeProfessionHandler}
                          >
                            <MenuItem value={"none"} disabled hidden>
                              {"Select Profession"}
                            </MenuItem>
                            <MenuItem value={"carpenter"}>
                              {"Carpenter"}
                            </MenuItem>
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
                        <FormControl fullWidth>
                          <InputLabel id="location">Location</InputLabel>
                          <Select
                            labelId="location"
                            id="location"
                            value={edit ? location : user.location}
                            disabled={!edit}
                            label="Location"
                            onChange={changeLocationHandler}
                          >
                            <MenuItem value={"none"} disabled hidden>
                              {"Select Location"}
                            </MenuItem>
                            <MenuItem value="surat">Surat</MenuItem>
                            <MenuItem value="anand">Anand</MenuItem>
                            <MenuItem value="vadodara">Vadodara</MenuItem>
                            <MenuItem value="ahmedabad">Ahmedabad</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    )}
                    {role === "worker" && (
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <InputLabel id="availability">
                            Availability
                          </InputLabel>
                          <Select
                            labelId="availability"
                            id="availability"
                            value={edit ? availability : user.availability}
                            disabled={!edit}
                            label="Availability"
                            onChange={changeAvailabilityHandler}
                          >
                            <MenuItem value={"none"} disabled>
                              {"Select Availability"}
                            </MenuItem>
                            <MenuItem value={true}>{"Available"}</MenuItem>
                            <MenuItem value={false}>{"Not Available"}</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    )}

                    <Button type="submit" sx={{ margin: "5px" }}>
                      Save Changes
                    </Button>
                  </Grid>
                )}
              </Box>
            )}
          </Container>
        </Box>
      </Fade>
      <Dialog
        fullScreen
        TransitionComponent={Transition}
        open={review}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle
          sx={{
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.third.light,
            fontFamily: "Arvo",
          }}
        >
          Reviews
        </DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            <Review workerId={userId} />
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 2,
          }}
        >
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        fullScreen={matches}
        open={changePassword}
        onClose={handlePasswordClose}
        sx={{
          "& .MuiDialog-container": {
            color: "green",
            "& .MuiPaper-root": {
              borderRadius: "20px",
              width: "100%",
              maxWidth: "500px",
            },
          },
        }}
      >
        <DialogTitle
          sx={{
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.third.light,
            fontFamily: "Arvo",
          }}
        >
          Change Password
        </DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Old Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={(event) => setOldPassword(event.target.value)}
          />
          <TextField
            margin="dense"
            id="name"
            label="New Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={(event) => setNewPassword(event.target.value)}
          />
          <TextField
            margin="dense"
            id="name"
            label="Confirm Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={(event) =>
              setPasswordIsValid(newPassword === event.target.value)
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePasswordClose}>Cancel</Button>
          <Button onClick={updatePassword} disabled={!passwordIsValid}>
            Change
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default Profile;

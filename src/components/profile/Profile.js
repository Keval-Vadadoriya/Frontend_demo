import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import { editUser } from "../../store/user-slice";
import Review from "../reviews/Review";
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
} from "@mui/material";
import { snackbarActions } from "../../store/snackbar-slice";
const Profile = () => {
  const user = useSelector((state) => state.user.user);
  console.log(user);
  const [review, setReview] = useState(false);
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [newAvatar, setNewAvatar] = useState("");
  const [description, setDescription] = useState("");
  const [age, setAge] = useState("");
  const [profession, setProfession] = useState(user ? user.profession : "");
  const [professionIsValid, setProfessionIsValid] = useState(false);
  const [location, setLocation] = useState(user ? user.location : "");
  const [availability, setAvailability] = useState(user.availability);
  const [locationIsValid, setLocationIsValid] = useState(false);
  const [OldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState("");
  const { status, errorMessage } = useSelector((state) => state.user);
  const role = useSelector((state) => state.login.role);
  const userId = useSelector((state) => state.user.user._id);
  const avatar = user.avatar;

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "Saved Changes Successfully") {
      dispatch(
        snackbarActions.setSnackbar({
          open: true,
          severity: "success",
          message: status,
        })
      );
    }
  }, [status]);

  //Submit Handler
  const SubmitHandler = (event) => {
    event.preventDefault();
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
    if (passwordIsValid) {
      console.log("valid");
      formData.append("password", OldPassword);
      formData.append("newpassword", newPassword);
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
      formData.append("availability", availability);
    }
    console.log(formData);
    dispatch(editUser({ body: formData, role, userId }));
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
    console.log(value);
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

  return (
    <>
      <Container fullWidth>
        <Button
          onClick={() => {
            setEdit(true);
          }}
        >
          Edit Profile
        </Button>
        <Box
          component="form"
          encType="multipart/form-data"
          onSubmit={SubmitHandler}
        >
          {status === "loading" && <p>Loading</p>}
          {status !== "loading" && (
            <>
              <Grid container rowSpacing={2} marginTop={5}>
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Badge
                    color="secondary"
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
                        <EditIcon />
                      </label>
                    }
                  >
                    <Avatar
                      src={
                        newAvatar
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
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    disabled={!edit}
                    name="Name"
                    label="Name"
                    type="text"
                    id="name"
                    autoComplete="name"
                    onChange={(event) => setName(event.target.value)}
                    defaultValue={`${user.name ? user.name : ""}`}
                  />
                </Grid>
                {role === "worker" && (
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      disabled={!edit}
                      name="About You"
                      label="About You"
                      type="text"
                      id="About You"
                      autoComplete="About You"
                      onChange={(event) => setDescription(event.target.value)}
                      defaultValue={`${
                        user.description ? user.description : ""
                      }`}
                    />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    disabled={true}
                    name="Email"
                    label="Email"
                    type="email"
                    id="Email"
                    autoComplete="Email"
                    onChange={(event) => setEmail(event.target.value)}
                    defaultValue={`${user.email ? user.email : ""}`}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    disabled={!edit}
                    name="Contact"
                    label="Contact"
                    type="tel"
                    pattern="[6-9]{1}[0-9]{9}"
                    id="Contact"
                    autoComplete="Contact"
                    onChange={(event) => setContact(event.target.value)}
                    defaultValue={`${user.contact ? user.contact : ""}`}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    disabled={!edit}
                    name="Age"
                    label="Age"
                    type="number"
                    id="Age"
                    autoComplete="Age"
                    onChange={(event) => setAge(event.target.value)}
                    defaultValue={`${user.age ? user.age : ""}`}
                  />
                </Grid>
                {edit && (
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      disabled={!edit}
                      name="Old Password"
                      label="Old Password"
                      type="password"
                      id="Old Password"
                      autoComplete="Old Password"
                      onChange={(event) => setOldPassword(event.target.value)}
                    />
                  </Grid>
                )}
                {edit && (
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="New Password"
                      label="New Password"
                      type="password"
                      id="New Password"
                      autoComplete="New Password"
                      onChange={(event) => setNewPassword(event.target.value)}
                    />
                  </Grid>
                )}
                {edit && (
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="Confirm Password"
                      label="Confirm Password"
                      type="password"
                      id="Confirm Password"
                      autoComplete="Confirm Password"
                      onChange={(event) =>
                        setPasswordIsValid(newPassword === event.target.value)
                      }
                    />
                  </Grid>
                )}
                {role === "worker" && (
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Profession
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={profession}
                        disabled={!edit}
                        label="Profession"
                        defaultValue={`${user.profession}`}
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
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Location
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={location}
                        disabled={!edit}
                        label="Location"
                        defaultValue={`${user.location}`}
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
                {role === "worker" && (
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Availability
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={location}
                        disabled={!edit}
                        label="Availability"
                        defaultValue={`${user.availability}`}
                        onChange={changeAvailabilityHandler}
                      >
                        <MenuItem value={"none"} disabled hidden>
                          {"Select Availability"}
                        </MenuItem>
                        <MenuItem value={true}>{"Available"}</MenuItem>
                        <MenuItem value={false}>{"Not Available"}</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                )}

                <Button type="submit">Save Changes</Button>
              </Grid>

              {status !== "loading" && errorMessage && <p>{errorMessage}</p>}
            </>
          )}
        </Box>
        {role === "worker" && (
          <Button onClick={() => setReview(true)}>Reviews</Button>
        )}
        <Dialog
          open={review}
          onClose={handleClose}
          scroll="paper"
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">Reviews</DialogTitle>
          <DialogContent dividers={true}>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Review workerId={userId} />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Subscribe</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};
export default Profile;

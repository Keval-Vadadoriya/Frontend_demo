import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect, useState } from "react";

//components
import ProjectCard from "./MyProjectCard";

//mui
import {
  Stack,
  Pagination,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Grid,
  TextField,
  FormControl,
  Select,
  MenuItem,
  DialogActions,
  Box,
  useMediaQuery,
  Container,
  Fade,
  Fab,
  Tooltip,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useTheme } from "@mui/styles";

//redux
import {
  myprojectActions,
  postProject,
  removeProject,
} from "../../store/actions/myproject-actions";
import { snackbarActions } from "../../store/slice/snackbar-slice";
import { getMyProjects } from "../../store/actions/project-actions";

const MyProjects = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const matches = useMediaQuery("(max-width:600px)");

  //states
  const [location, setLocation] = useState("none");
  const [profession, setProfession] = useState("none");
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("none");
  const [projectName, setProjectName] = useState(false);
  const [addProject, setAddProject] = useState(false);
  const [page, setPage] = useState(1);

  let projectList;

  //redux states
  const { projects, count } = useSelector((state) => state.project);
  const { status, errorMessage } = useSelector((state) => state.myproject);

  //handling error and success
  useEffect(() => {
    if (status === "Project Posted Successfully") {
      setAddProject(false);
    }
    if (
      status === "Project Deleted Successfully" ||
      status === "Project Posted Successfully"
    ) {
      dispatch(
        snackbarActions.setSnackbar({
          open: true,
          severity: "success",
          message: status,
        })
      );
      dispatch(myprojectActions.setStatus({ status: "idle" }));
    }
    if (errorMessage !== "") {
      dispatch(
        snackbarActions.setSnackbar({
          open: true,
          severity: "error",
          message: errorMessage,
        })
      );
      dispatch(myprojectActions.setErrorMessage({ errorMessage: "" }));
    }
  }, [status, errorMessage, dispatch]);

  //posting project
  const SubmitHandler = (event) => {
    event.preventDefault();

    dispatch(
      postProject({
        project_name: projectName,
        description,
        profession,
        location,
        money: amount,
      })
    );
  };

  //removing project
  const removeProjectHandler = (projectId) => {
    if (window.confirm("Are You Sure You Want to Remove Project?")) {
      dispatch(removeProject({ projectId }));
      dispatch(getMyProjects({ skip: 0 }));
    }
  };

  const addProjectHandler = () => {
    setAddProject(true);
  };
  const handleClose = () => {
    setAddProject(false);
  };
  const handleChange = (event, value) => {
    setPage(value);
    dispatch(getMyProjects({ skip: (value - 1) * 10 }));
  };

  //change handlers
  const changeLocationHandler = (event) => {
    setLocation(event.target.value);
  };
  const changeAmountHandler = (event) => {
    setAmount(event.target.value);
  };
  const changeProfessionHandler = (event) => {
    setProfession(event.target.value);
  };
  const changeProjectNameHandler = (event) => {
    setProjectName(event.target.value);
  };
  const changeDescriptionHandler = (event) => {
    setDescription(event.target.value);
  };

  //getting projectlist
  useEffect(() => {
    dispatch(getMyProjects({ skip: 0 }));
  }, [dispatch]);

  //projectlist ui
  if (projects) {
    projectList = projects.map((project) => (
      <ProjectCard
        project={project}
        onClick={removeProjectHandler}
        key={project._id}
      />
    ));
  }

  return (
    <Fragment>
      <Fade in={true} timeout={1000}>
        <Container>
          <Box
            sx={{
              height: "92.5vh",
              backgroundColor: theme.palette.primary.main,
              overflow: "scroll",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {projectList && projectList}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginRight: "50px",
              }}
            >
              <Tooltip
                title="Add Project"
                placement="top"
                arrow
                componentsProps={{
                  tooltip: {
                    sx: {
                      color: theme.palette.third.light,
                      backgroundColor: "gray",
                      fontSize: "1em",
                    },
                  },
                }}
              >
                <Fab
                  onClick={addProjectHandler}
                  aria-label="dskfb"
                  color="success"
                  sx={{ position: "absolute", bottom: "40px" }}
                >
                  <Add />
                </Fab>
              </Tooltip>
            </Box>
            <Stack spacing={2} display="flex" alignItems="center">
              <Pagination
                count={Math.ceil(count / 10)}
                page={page}
                onChange={handleChange}
                variant="outlined"
                color="secondary"
                sx={{ backgroundColor: theme.palette.third.extra }}
              />
            </Stack>
            <Dialog
              fullScreen={matches}
              open={addProject}
              component="form"
              onSubmit={SubmitHandler}
            >
              <DialogTitle
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.third.light,
                  fontFamily: "Arvo",
                }}
              >
                Add Project
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please enter following details to add new project.
                </DialogContentText>
                <Grid>
                  <Grid item xs={12}>
                    <TextField
                      autoFocus
                      required
                      margin="dense"
                      id="Project Name"
                      label="Project Name"
                      type="text"
                      fullWidth
                      variant="standard"
                      onChange={changeProjectNameHandler}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      multiline
                      margin="dense"
                      id="description"
                      label="Description"
                      type="text"
                      fullWidth
                      variant="standard"
                      onChange={changeDescriptionHandler}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      margin="dense"
                      id="Amount"
                      label="amount"
                      type="Number"
                      fullWidth
                      variant="standard"
                      onChange={changeAmountHandler}
                    />
                  </Grid>
                  <Grid item xs={12} marginTop={2} marginBottom={2}>
                    <FormControl fullWidth required>
                      <Select
                        labelId="profession"
                        id="profession"
                        value={profession}
                        label="Profession"
                        variant="standard"
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
                  <Grid item xs={12} marginTop={2}>
                    <FormControl fullWidth required>
                      <Select
                        labelId="location"
                        id="location"
                        value={location}
                        label="Location"
                        onChange={changeLocationHandler}
                        variant="standard"
                      >
                        <MenuItem value={"none"} disabled>
                          {"Select Location"}
                        </MenuItem>
                        <MenuItem value={"surat"}>{"Surat"}</MenuItem>
                        <MenuItem value={"anand"}>{"Anand"}</MenuItem>
                        <MenuItem value={"vadodara"}>{"Vadodara"}</MenuItem>
                        <MenuItem value={"ahmedabad"}>{"Ahmedabad"}</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Submit</Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Container>
      </Fade>
    </Fragment>
  );
};

export default MyProjects;

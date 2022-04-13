import React, { Fragment, useEffect, useState } from "react";
import ProjectCard from "./MyProjectCard";
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
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { snackbarActions } from "../../store/snackbar-slice";

import {
  myprojectActions,
  postProject,
  removeProject,
} from "../../store/actions/myproject-actions";
import { getMyProjects } from "../../store/actions/project-actions";
import { useTheme } from "@mui/styles";

const MyProjects = () => {
  const theme = useTheme();
  const matches = useMediaQuery("(max-width:600px)");
  const [location, setLocation] = useState("none");
  const [profession, setProfession] = useState("none");
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("none");
  const [projectName, setProjectName] = useState(false);
  const [addProject, setAddProject] = useState(false);
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const { projects, count } = useSelector((state) => state.project);
  const { status, errorMessage } = useSelector((state) => state.myproject);

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
  }, [status, errorMessage]);

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
  const removeProjectHandler = (projectId) => {
    if (window.confirm("Are You Sure You Want to Remove Project?")) {
      dispatch(removeProject({ projectId }));
      dispatch(getMyProjects({ skip: 0 }));
    }
  };

  useEffect(async () => {
    dispatch(getMyProjects({ skip: 0 }));
  }, []);
  let projectList;
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
      <Container>
        <Box
          sx={{
            height: "100%",
            backgroundColor: theme.palette.primary.main,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Button
            onClick={addProjectHandler}
            sx={{
              color: "white",
              backgroundColor: theme.palette.secondary.main,
              width: "150px",
              alignSelf: "center",
              margin: "5px",
              padding: "10px",
              fontSize: "15px",
            }}
          >
            Post Project
          </Button>
          {projectList && projectList}
          <Stack spacing={2} alignSelf="center">
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
                      <MenuItem value={"electrician"}>{"Electrician"}</MenuItem>
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
    </Fragment>
  );
};

export default MyProjects;

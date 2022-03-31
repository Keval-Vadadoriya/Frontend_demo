import React, { Fragment, useEffect, useState } from "react";
import ProjectCard from "./MyProjectCard";
import classes from "./MyProjects.module.css";
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
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import {
  postProject,
  removeProject,
} from "../../store/actions/myproject-actions";
import { getMyProjects } from "../../store/actions/project-actions";

const MyProjects = () => {
  const [location, setLocation] = useState("none");
  const [profession, setProfession] = useState("none");
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("none");
  const [projectName, setProjectName] = useState(false);
  const [addProject, setAddProject] = useState(false);
  const [page, setPage] = useState(1);
  const token = useSelector((state) => state.login.token);

  const dispatch = useDispatch();
  const { status, projects, count, errorMessage } = useSelector(
    (state) => state.project
  );

  const addProjectHandler = () => {
    setAddProject(true);
  };
  const handleClose = () => {
    setAddProject(false);
  };
  const handleChange = (event, value) => {
    setPage(value);
    dispatch(getMyProjects({ skip: (value - 1) * 3 }));
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
    console.log(token);
    dispatch(removeProject({ projectId }));
    dispatch(getMyProjects({ skip: 0 }));
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
      <div className={classes.x}>
        <div>
          <Button onClick={addProjectHandler}>Add a New Project</Button>
          {projectList && projectList}
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(count / 3)}
              page={page}
              onChange={handleChange}
            />
          </Stack>
        </div>
      </div>
      <Dialog open={addProject}>
        <DialogTitle>Add Project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <Grid>
            <Grid item xs={12}>
              <TextField
                autoFocus
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
                autoFocus
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
                autoFocus
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
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
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
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={location}
                  label="Location"
                  onChange={changeLocationHandler}
                  variant="standard"
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
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={SubmitHandler}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default MyProjects;

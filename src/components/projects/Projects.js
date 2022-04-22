import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//components
import ProjectCard from "./ProjectCard";
import ProjectFilter from "./ProjectFilter";

//mui
import {
  Stack,
  Pagination,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Button,
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  TextField,
  InputAdornment,
  Fade,
} from "@mui/material";
import { SearchTwoTone } from "@mui/icons-material";
import { useTheme, makeStyles } from "@mui/styles";

//redux
import {
  filterProjects,
  getAllProjects,
} from "../../store/actions/project-actions";

const useStyles = makeStyles((theme) => ({
  searchBar: {
    width: "95%",
    marginTop: "10px",
    marginLeft: "10px",
    padding: "10px",
    borderRadius: "20px",
    outline: "none",
    backgroundColor: theme.palette.third.light,
  },
}));

const Projects = () => {
  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useDispatch();
  const matches = useMediaQuery("(max-width:600px)");

  //states
  const [location, setLocation] = useState("none");
  const [profession, setProfession] = useState("none");
  const [filtered, setFiltered] = useState(false);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("none");
  const [filter, setFilter] = useState(false);

  //redux states
  const { projects, count } = useSelector((state) => state.project);

  let projectList;

  //getting all projects
  useEffect(() => {
    dispatch(getAllProjects({ search: "null", skip: 0 }));
  }, [dispatch]);

  //sorting data
  const changeSortHandler = (event) => {
    dispatch(
      filterProjects({
        location,
        profession,
        sort: event.target.value,
        skip: 0,
      })
    );
    setSort(event.target.value);
  };

  //pages
  const handleChange = (_, value) => {
    setPage(value);
    if (filtered) {
      dispatch(
        filterProjects({
          location,
          profession,
          sort,
          skip: (value - 1) * 10,
        })
      );
    } else {
      dispatch(getAllProjects({ search: "null", skip: (value - 1) * 10 }));
    }
  };

  //change handlers
  const changeLocationHandler = (event) => {
    setLocation(event.target.value);
  };

  const changeProfessionHandler = (event) => {
    setProfession(event.target.value);
  };

  //clearing filter
  const clearFilter = () => {
    setLocation("none");
    setProfession("none");

    dispatch(
      filterProjects({
        location: "none",
        profession: "none",
        sort,
        money: 0,
        skip: 0,
      })
    );
    setFiltered(false);
  };

  //filter projects
  const filterProjectsBy = (event) => {
    event.preventDefault();
    setFiltered(true);
    setFilter(false);
    dispatch(filterProjects({ location, profession, sort, skip: 0 }));
  };

  //search project
  const searchHandler = (event) => {
    if (event.target.value === "") {
      dispatch(getAllProjects({ search: "null", skip: 0 }));
    } else {
      dispatch(getAllProjects({ search: event.target.value, skip: 0 }));
    }
  };

  //projectlist ui
  if (projects) {
    projectList = projects.map((project) => (
      <ProjectCard project={project} key={project._id} />
    ));
  }

  return (
    <Fragment>
      <Fade in={true} timeout={700}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            backgroundColor: theme.palette.primary.main,
            width: { xs: "100%", md: "99%" },
          }}
        >
          <Box
            sx={{
              height: { xs: "80px", md: "90vh" },
              display: "flex",
              justifyContent: { xs: "center", md: "flex-start" },
              alignItems: { xs: "center", md: "flex-start" },
              flexDirection: { xs: "row", md: "column" },
              position: { xs: "auto", md: "sticky" },
              top: { xs: "0", md: "79px" },
              minWidth: 300,
              maxWidth: { xs: "100%", md: 200 },
              boxSizing: "border-box",
              backgroundColor: {
                xs: theme.palette.third.extra,
              },
              padding: { xs: 0, md: 2 },
            }}
          >
            <Button
              variant="contained"
              onClick={() => {
                setFilter(true);
              }}
              sx={{
                width: "200px",
                backgroundColor: "orange",
                margin: "10px",
                display: { xs: "auto", md: "none" },
              }}
            >
              Filter
            </Button>
            <Dialog fullScreen={matches} open={filter}>
              <DialogTitle
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.third.light,
                  fontFamily: "Arvo",
                }}
              >
                Filter By
              </DialogTitle>
              <DialogContent>
                <ProjectFilter
                  profession={profession}
                  location={location}
                  clearFilter={clearFilter}
                  filterProjectsBy={filterProjectsBy}
                  changeLocationHandler={changeLocationHandler}
                  changeProfessionHandler={changeProfessionHandler}
                />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    setFilter(false);
                  }}
                >
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
            <Typography
              variant="h4"
              sx={{
                display: { xs: "none", md: "block" },
                marginBottom: "10px",
                color: theme.palette.secondary.main,
                fontFamily: "Arvo",
              }}
            >
              Filter By
            </Typography>

            {!matches && (
              <ProjectFilter
                profession={profession}
                location={location}
                clearFilter={clearFilter}
                filterProjectsBy={filterProjectsBy}
                changeLocationHandler={changeLocationHandler}
                changeProfessionHandler={changeProfessionHandler}
              />
            )}

            <Typography
              variant="h4"
              sx={{
                display: { xs: "none", md: "block" },
                color: theme.palette.secondary.main,
                marginBottom: "10px",
                fontFamily: "Arvo",
              }}
            >
              Sort By
            </Typography>
            <Grid container>
              <Grid item xs={12} md={12} sx={{ margin: "10px" }}>
                <FormControl fullWidth>
                  <InputLabel id="sortBy">Sort By</InputLabel>
                  <Select
                    labelId="sortBy"
                    id="sortBy"
                    value={sort}
                    label="SortBy"
                    onChange={changeSortHandler}
                  >
                    <MenuItem value={"none"} disabled hidden>
                      {"Select Sort Option"}
                    </MenuItem>
                    <MenuItem value="latest">Latest</MenuItem>
                    <MenuItem value="oldest">Oldest</MenuItem>
                    <MenuItem value="highestPrice">Highest Price</MenuItem>
                    <MenuItem value="lowestPrice">Lowest Price</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              width: "100%",
              paddingTop: { xs: "10px", md: "0" },
              height: "92.5vh",
              overflow: "scroll",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            <TextField
              placeholder="Search Project"
              className={classes.searchBar}
              variant="standard"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchTwoTone />
                  </InputAdornment>
                ),
                disableUnderline: true,
              }}
              onChange={searchHandler}
            />
            {projectList}
            <Stack spacing={2} sx={{ alignItems: "center" }}>
              <Pagination
                count={Math.ceil(count / 10)}
                page={page}
                onChange={handleChange}
                variant="outlined"
                color="secondary"
                sx={{ backgroundColor: theme.palette.third.extra }}
              />
            </Stack>
          </Box>
        </Box>
      </Fade>
    </Fragment>
  );
};

export default Projects;

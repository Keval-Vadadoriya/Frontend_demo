import React, { Fragment, useEffect, useState } from "react";
import WorkerCard from "./WorkerCard";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { snackbarActions } from "../../store/snackbar-slice";
import WorkerFilter from "./WorkerFilter";
import {
  Stack,
  Pagination,
  Container,
  Box,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
  Slide,
  TextField,
  InputAdornment,
  Fade,
} from "@mui/material";

import {
  workersActions,
  getAllWorkers,
  filterWorkers,
} from "../../store/actions/workers-action";
import { useTheme } from "@mui/styles";
import { makeStyles } from "@mui/styles";
import { SearchTwoTone } from "@mui/icons-material";
const useStyles = makeStyles((theme) => ({
  searchBar: {
    marginTop: "10px",
    padding: "10px",
    borderRadius: "20px",
    outline: "none",
    backgroundColor: theme.palette.third.light,
  },
}));

const Worker = () => {
  const theme = useTheme();
  const classes = useStyles();
  const matches = useMediaQuery("(max-width:600px)");
  const dispatch = useDispatch();

  let workerList;

  //states
  const [location, setLocation] = useState("none");
  const [profession, setProfession] = useState("none");
  const [review, setReview] = useState("none");
  const [availability, setAvailability] = useState("none");
  const [filtered, setFiltered] = useState(false);
  const [filter, setFilter] = useState(false);
  const [page, setPage] = useState(1);

  //redux states
  const { workers, count, errorMessage } = useSelector(
    (state) => state.workerslist
  );

  //get all workers
  useEffect(() => {
    dispatch(getAllWorkers({ search: "null", skip: 0 }));
  }, [dispatch]);

  //handling error
  useEffect(() => {
    if (errorMessage === "No Workers Found") {
      dispatch(
        snackbarActions.setSnackbar({
          open: true,
          severity: "error",
          message: errorMessage,
        })
      );
      dispatch(workersActions.setErrorMessage({ errorMessage: "" }));
    }
  }, [errorMessage, dispatch]);

  //pages
  const handleChange = (event, value) => {
    setPage(value);
    if (filtered) {
      dispatch(
        filterWorkers({
          location,
          profession,
          review,
          availability,
          skip: (value - 1) * 10,
        })
      );
    } else {
      dispatch(getAllWorkers({ search: "null", skip: (value - 1) * 10 }));
    }
  };

  //chnge handlers
  const changeLocationHandler = (event) => {
    setLocation(event.target.value);
  };
  const changeReviewHandler = (event) => {
    setReview(event.target.value);
  };
  const changeProfessionHandler = (event) => {
    setProfession(event.target.value);
  };
  const changeAvailabilityHandler = (event) => {
    setAvailability(event.target.value);
  };

  //clearing filter
  const clearFilter = () => {
    setLocation("none");
    setReview("none");
    setProfession("none");
    setAvailability("none");

    setFiltered(false);
    dispatch(getAllWorkers({ search: "null", skip: 0 }));
  };

  //filter workers
  const filterWorkersBy = (event) => {
    event.preventDefault();
    setFiltered(true);
    setFilter(false);
    dispatch(
      filterWorkers({ location, profession, review, availability, skip: 0 })
    );
  };

  //search
  const searchHandler = (event) => {
    if (event.target.value === "") {
      dispatch(getAllWorkers({ search: "null", skip: 0 }));
    } else {
      dispatch(getAllWorkers({ search: event.target.value, skip: 0 }));
    }
  };

  //workers list ui
  if (workers) {
    workerList = workers.map((worker) => (
      <Box
        key={worker._id}
        component={Link}
        to={`${worker._id}`}
        sx={{
          textDecoration: "none",
        }}
      >
        <WorkerCard
          name={worker.name}
          profession={worker.profession}
          avatar={worker.avatar}
          availability={worker.availability}
          review={worker.review}
        />
      </Box>
    ));
  }

  return (
    <Fragment>
      <Fade in={true} timeout={1000}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            backgroundColor: theme.palette.fifth.light,
          }}
        >
          <Box
            sx={{
              height: { xs: "auto", md: "91.5vh" },
              display: "flex",
              position: { xs: "auto", md: "sticky" },
              top: { xs: "60px", md: "70px" },
              flexDirection: "column",
              backgroundColor: {
                xs: theme.palette.third.light,
              },
            }}
          >
            {!matches && (
              <WorkerFilter
                profession={profession}
                location={location}
                clearFilter={clearFilter}
                filterWorkersBy={filterWorkersBy}
                changeLocationHandler={changeLocationHandler}
                changeProfessionHandler={changeProfessionHandler}
                review={review}
                changeReviewHandler={changeReviewHandler}
                availability={availability}
                changeAvailabilityHandler={changeAvailabilityHandler}
              />
            )}
            {matches && (
              <Button
                variant="contained"
                onClick={() => setFilter(true)}
                sx={{
                  color: theme.palette.secondary.main,
                  backgroundColor: theme.palette.third.extra,
                }}
              >
                Filter
              </Button>
            )}
          </Box>
          <Container
            fixed
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <TextField
              placeholder="Search Worker"
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
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              {workerList}
            </Box>

            <Stack spacing={2} sx={{}} alignSelf="center">
              <Pagination
                count={Math.ceil(count / 10)}
                page={page}
                onChange={handleChange}
                variant="outlined"
                color="secondary"
                sx={{ backgroundColor: theme.palette.third.extra }}
              />
            </Stack>
          </Container>
        </Box>
      </Fade>
      <Dialog fullScreen={matches} open={filter} TransitionComponent={Slide}>
        <DialogTitle
          sx={{
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.third.light,
            fontFamily: "Arvo",
          }}
        >
          Filter Workers
        </DialogTitle>
        <DialogContent>
          <WorkerFilter
            profession={profession}
            location={location}
            clearFilter={clearFilter}
            filterWorkersBy={filterWorkersBy}
            changeLocationHandler={changeLocationHandler}
            changeProfessionHandler={changeProfessionHandler}
            review={review}
            changeReviewHandler={changeReviewHandler}
            availability={availability}
            changeAvailabilityHandler={changeAvailabilityHandler}
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
    </Fragment>
  );
};

export default Worker;

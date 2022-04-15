import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getWorker } from "../../store/actions/workers-action";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Avatar, Rating, Grid, Fade } from "@mui/material";
import { useTheme } from "@mui/styles";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  link: {
    margin: "5px",
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.third.light,
    margin: 10,
    padding: 10,
    borderRadius: 5,
    width: "100px",
    textAlign: "center",
    textDecoration: "none",
    "&:hover": {
      backgroundColor: theme.palette.third.light,
      color: theme.palette.secondary.main,
    },
  },
  grid: {
    minWidth: { xs: 300, md: 500 },

    margin: "5px",
    borderRadius: "10px",
  },
  gridItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  gridItemDetail: {
    display: "flex",
    justifyContent: "flex-start",
  },
}));
function WorkerProfile() {
  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useDispatch();
  const workerid = useParams();

  //redux states
  const token = useSelector((state) => state.login.token);
  const { status, worker, errorMessage } = useSelector(
    (state) => state.workerslist
  );

  //get worker
  useEffect(async () => {
    dispatch(getWorker({ token, workerId: workerid.workerid }));
  }, []);

  return (
    <Fade in={true} timeout={1000}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "column",
          height: "91.5vh",
          overflowY: "scroll",
          backgroundColor: theme.palette.third.extra,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            backgroundColor: theme.palette.third.extra,
          }}
        >
          <Typography
            component={Link}
            className={classes.link}
            to={`review/${workerid.workerid}`}
          >
            Reviews
          </Typography>
          <Typography
            className={classes.link}
            component={Link}
            to={`/chats/${workerid.workerid}`}
          >
            Chat
          </Typography>
        </Box>
        {worker && (
          <Box
            sx={{
              borderRadius: "20px",
              marginTop: "20px",
              minWidth: { xs: "330px", md: "500px" },
              maxWidth: { xs: "370px", md: "900px" },
              padding: "5px",
              boxShadow: `5px 5px 10px grey`,
              backgroundColor: theme.palette.third.light,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Avatar
                src={`${process.env.REACT_APP_HOST}/${worker.avatar}`}
                sx={{
                  minWidth: "150px",
                  minHeight: "150px",
                  maxWidth: "200px",
                  maxHeight: "200px",
                  boxShadow: `0px 0px 10px ${
                    worker.availability === false
                      ? "rgb(247, 130, 35)"
                      : "green"
                  }`,
                }}
              />
              <Box
                sx={{
                  alignSelf: "flex-start",
                  marginTop: "20px",
                  minWidth: { xs: "300px", md: "450px" },
                  maxWidth: { xs: "300px", md: "900px" },
                }}
              >
                <Grid container className={classes.grid}>
                  <Grid item xs={4} className={classes.gridItem}>
                    <Typography
                      variant="body1"
                      display="inline"
                      color={theme.palette.secondary.main}
                    >
                      Name
                    </Typography>
                  </Grid>
                  <Grid item xs={1} className={classes.gridItem}>
                    :-
                  </Grid>
                  <Grid item xs={7} className={classes.gridItemDetail}>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      fontFamily="Roboto"
                      fontSize="20px"
                    >
                      {worker.name}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container className={classes.grid}>
                  <Grid item xs={4} className={classes.gridItem}>
                    <Typography
                      variant="body1"
                      display="inline"
                      color={theme.palette.secondary.main}
                    >
                      Rating
                    </Typography>
                  </Grid>
                  <Grid item xs={1} className={classes.gridItem}>
                    :-
                  </Grid>
                  <Grid item xs={7} className={classes.gridItemDetail}>
                    <Rating value={worker.review} readOnly />
                  </Grid>
                </Grid>

                <Grid container className={classes.grid}>
                  <Grid item xs={4} className={classes.gridItem}>
                    <Typography
                      variant="body1"
                      display="inline"
                      color={theme.palette.secondary.main}
                    >
                      Profession
                    </Typography>
                  </Grid>
                  <Grid item xs={1} className={classes.gridItem}>
                    :-
                  </Grid>
                  <Grid item xs={7} className={classes.gridItemDetail}>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      fontFamily="Roboto"
                      fontSize="20px"
                    >
                      {worker.profession}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container className={classes.grid}>
                  <Grid item xs={4} className={classes.gridItem}>
                    <Typography
                      variant="body1"
                      display="inline"
                      color={theme.palette.secondary.main}
                    >
                      Status
                    </Typography>
                  </Grid>
                  <Grid item xs={1} className={classes.gridItem}>
                    :-
                  </Grid>
                  <Grid item xs={7} className={classes.gridItemDetail}>
                    <Typography
                      variant="body1"
                      fontFamily="Roboto"
                      fontSize="20px"
                      color={worker.availability === true ? "green" : "red"}
                    >
                      {worker.availability === true
                        ? "Available"
                        : "Not Available"}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container className={classes.grid}>
                  <Grid item xs={4} className={classes.gridItem}>
                    <Typography
                      variant="body1"
                      display="inline"
                      color={theme.palette.secondary.main}
                    >
                      Location
                    </Typography>
                  </Grid>
                  <Grid item xs={1} className={classes.gridItem}>
                    :-
                  </Grid>
                  <Grid item xs={7} className={classes.gridItemDetail}>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      fontFamily="Roboto"
                      fontSize="20px"
                    >
                      {worker.location}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container className={classes.grid}>
                  <Grid item xs={4} className={classes.gridItem}>
                    <Typography
                      variant="body1"
                      display="inline"
                      color={theme.palette.secondary.main}
                    >
                      Contact
                    </Typography>
                  </Grid>
                  <Grid item xs={1} className={classes.gridItem}>
                    :-
                  </Grid>
                  <Grid item xs={7} className={classes.gridItemDetail}>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      fontFamily="Roboto"
                      fontSize="20px"
                    >
                      {worker.contact}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container className={classes.grid}>
                  <Grid item xs={4} className={classes.gridItem}>
                    <Typography
                      variant="body1"
                      display="inline"
                      color={theme.palette.secondary.main}
                    >
                      Email
                    </Typography>
                  </Grid>
                  <Grid item xs={1} className={classes.gridItem}>
                    :-
                  </Grid>
                  <Grid item xs={7} className={classes.gridItemDetail}>
                    {" "}
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      fontFamily="Roboto"
                      fontSize="20px"
                    >
                      {worker.email}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container className={classes.grid}>
                  <Grid item xs={4} className={classes.gridItem}>
                    <Typography
                      variant="body1"
                      display="inline"
                      color={theme.palette.secondary.main}
                    >
                      Age
                    </Typography>
                  </Grid>
                  <Grid item xs={1} className={classes.gridItem}>
                    :-
                  </Grid>
                  <Grid item xs={7} className={classes.gridItemDetail}>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      fontFamily="Roboto"
                      fontSize="20px"
                    >
                      {worker.age}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container className={classes.grid}>
                  <Grid item xs={4} className={classes.gridItem}>
                    <Typography
                      variant="body1"
                      display="inline"
                      color={theme.palette.secondary.main}
                    >
                      About
                    </Typography>
                  </Grid>
                  <Grid item xs={1} className={classes.gridItem}>
                    :-
                  </Grid>
                  <Grid item xs={7} className={classes.gridItemDetail}>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      fontFamily="Roboto"
                      fontSize="20px"
                    >
                      {worker.description}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Fade>
  );
}

export default WorkerProfile;

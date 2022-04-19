import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Button,
  Container,
  Fade,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import {
  reviewActions,
  addReview,
  getReviews,
} from "../../store/actions/review-actions";
import { snackbarActions } from "../../store/snackbar-slice";
import { makeStyles, useTheme } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  review: {
    backgroundColor: theme.palette.third.extra,
    margin: "10px",
    padding: "10px",
    borderRadius: "20px",
  },
}));

const Review = (props) => {
  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useDispatch();
  const workerid = useParams();

  //states
  const [description, setDescription] = useState("");
  const [review, setReview] = useState(0);
  const [initialRating, setInitialRating] = useState(0);

  //redux states
  const role = useSelector((state) => state.login.role);
  const { status, reviews, errorMessage } = useSelector(
    (state) => state.reviews
  );

  let reviewList;

  //getting reviews
  useEffect(() => {
    if (role === "user") {
      dispatch(getReviews({ workerId: workerid.id }));
    }
    if (role === "worker") {
      dispatch(getReviews({ workerId: props.workerId }));
    }
  }, [role, dispatch, props.workerId, workerid.id]);

  //handling success and error
  useEffect(() => {
    if (status === "Review Added Successfully") {
      dispatch(
        snackbarActions.setSnackbar({
          open: true,
          severity: "success",
          message: status,
        })
      );
      dispatch(reviewActions.setStatus({ status: "idle" }));
    }
    if (errorMessage) {
      dispatch(
        snackbarActions.setSnackbar({
          open: true,
          severity: "error",
          message: errorMessage,
        })
      );
      dispatch(reviewActions.setErrorMessage({ errorMessage: "" }));
    }
  }, [status, errorMessage, dispatch]);

  //
  const changeDescriptionHandler = (event) => {
    setDescription(event.target.value);
  };
  const changeReviewHandler = (event, value) => {
    setInitialRating(value);
    setReview(value);
  };

  //adding review
  const addReviewHandler = (event) => {
    event.preventDefault();
    setInitialRating(0);
    setDescription("");
    if (description.length > 0) {
      dispatch(
        addReview({
          description,
          review,
          workerId: workerid.id,
        })
      );
    }
  };

  //reviews ui
  if (reviews) {
    reviewList = reviews.map((review) => {
      return (
        <Box key={review._id} className={classes.review}>
          <Rating name="read-only" value={review.review} readOnly />
          <Typography variant="body1" color="black">
            {review.owner.name}
          </Typography>
          <Typography variant="body2" color="black">
            {review.description}
          </Typography>
        </Box>
      );
    });
  }
  return (
    <>
      <Fade in={true} timeout={1000}>
        <Box sx={{ backgroundColor: theme.palette.third.extra }}>
          <Container
            sx={{
              backgroundColor: {
                xs: theme.palette.third.extra,
                md: theme.palette.secondary.main,
              },
              height: "93vh",
              width: "100%",
              overflow: "scroll",
              "&::-webkit-scrollbar": {
                // width: "5px",
                display: "none",
              },
              // "&::-webkit-scrollbar-track": {
              //   boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
              //   webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
              // },
              // "&::-webkit-scrollbar-thumb": {
              //   backgroundColor: "rgba(0,0,0,.1)",
              //   outline: "1px solid slategrey",
              // },
            }}
          >
            <Box
              sx={{
                backgroundColor: {
                  md: theme.palette.third.light,
                  xs: theme.palette.primary.dark,
                },
                padding: "5px",
                boxSizing: "border-box",
                overflow: "scroll",
                height: "93vh",
                "&::-webkit-scrollbar": {
                  // width: "5px",
                  display: "none",
                },
                // "&::-webkit-scrollbar-track": {
                //   boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                //   webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                // },
                // "&::-webkit-scrollbar-thumb": {
                //   backgroundColor: "rgba(0,0,0,.1)",
                //   outline: "1px solid slategrey",
                // },
              }}
            >
              {reviews && reviewList}
              {role === "user" && (
                <Box
                  component="form"
                  onSubmit={addReviewHandler}
                  sx={{
                    position: "sticky",
                    bottom: "10px",
                    margin: "10px",
                    backgroundColor: {
                      xs: theme.palette.third.light,
                      md: theme.palette.secondary.main,
                    },
                    padding: "10px",
                    borderRadius: "10px",
                  }}
                >
                  <Typography
                    sx={{
                      color: {
                        xs: theme.palette.secondary.main,
                        md: theme.palette.third.light,
                      },
                      paddingBottom: "5px",
                      marginBottom: "5px",
                      fontSize: { xs: "20px", md: "30px" },
                    }}
                  >
                    Add Review
                  </Typography>
                  <Rating
                    value={initialRating}
                    onChange={changeReviewHandler}
                  />

                  <TextField
                    required
                    fullWidth
                    multiline
                    variant="filled"
                    name="review-description"
                    label="review-description"
                    type="text"
                    id="review-description"
                    autoComplete="review-description"
                    value={description}
                    onChange={changeDescriptionHandler}
                    sx={{
                      backgroundColor: "white",
                      borderRadius: "10px",
                      "& label.Mui-focused": {
                        color: theme.palette.secondary.main,
                      },
                    }}
                    InputProps={{
                      disableUnderline: true,
                    }}
                  />

                  <Button
                    type="submit"
                    sx={{
                      backgroundColor: "white",
                      display: "block",
                      marginTop: "5px",
                      color: theme.palette.secondary.main,
                      "&:hover": {
                        backgroundColor: theme.palette.fifth.light,
                        color: theme.palette.secondary.main,
                      },
                    }}
                  >
                    Submit
                  </Button>
                </Box>
              )}
            </Box>
          </Container>
        </Box>
      </Fade>
    </>
  );
};
export default Review;

import { useEffect, useState } from "react";
import useHttp from "../../custom-hooks/useHttp";
import ReviewCard from "../reviews/ReviewCard";
import { useParams } from "react-router-dom";
import Input from "../UI/Input";
import classes from "./Review.module.css";
import { useSelector } from "react-redux";
import Rating from "react-rating";

let reviews;
const Review = () => {
  const ownerId = useSelector((state) => state.user._id);
  const [data, setData] = useState(false);
  const [isLoading, errror, sendRequest] = useHttp();
  const [description, setDescription] = useState("");
  const [review, setReview] = useState(0);
  const [initialRating, setInitialRating] = useState(0);

  const workerid = useParams();

  const changeDescriptionHandler = (event) => {
    setDescription(event.target.value);
  };
  const changeReviewHandler = (value) => {
    console.log(value);
    setInitialRating(value);
    setReview(value);
  };
  const addReviewHandler = async (event) => {
    event.preventDefault();
    if (description.length > 0) {
      reviews = await sendRequest({
        url: `http://127.0.0.1:3001/review/${workerid.id}`,
        method: "POST",
        body: {
          description,
          review,
          owner: ownerId,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      setData(false);
    }
  };

  useEffect(async () => {
    reviews = await sendRequest({
      url: `http://127.0.0.1:3001/getreview/${workerid.id}`,
    });
    setData(true);
  }, [data]);
  let reviewList;
  if (data) {
    reviewList = reviews.map((review) => (
      // <Link to={`${worker._id}`} className={classes.link} key={worker._id}>
      <ReviewCard
        description={review.description}
        name={review.owner.name}
        rating={review.review}
        key={review._id}
      />
      // </Link>
    ));
  }
  return (
    <div className={classes.reviews}>
      {isLoading && <h1>hey</h1>}
      {data && reviewList}
      <div className={classes.addReview}>
        <form onSubmit={addReviewHandler}>
          <h1>Add Review</h1>

          <Input
            label="review"
            input={{
              placeholder: "Enter a Review",
              id: "review",
              onChange: changeDescriptionHandler,
              type: "text",
              required: true,
            }}
          />
          <Rating
            start={0}
            stop={5}
            onClick={changeReviewHandler}
            initialRating={initialRating}
          />
          <input type="submit" value="Add Review"></input>
        </form>
      </div>
    </div>
  );
};
export default Review;

import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import SingleReview from "./SingleRev";
import "./review.css";
import FormRow from "../../componets/formRow";
import Dropdown from "../../componets/Dropdown";
import { setPopup } from "../../state/user";
import Popup from "../../componets/Popup";

const Review = ({ id }) => {
  const dispatch = useDispatch();
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState({
    comment: "",
    rating: 0,
    title: "",
    product: id,
  });

  const fetchData = async () => {
    console.log(id);
    try {
      const { data } = await axios.get(`/api/v1/products/${id}/review`);
      console.log(data.reviews);
      setReview(data.reviews);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(value);
    try {
      const post = await axios.post("/api/v1/review", value);
      console.log(post);
      dispatch(
        setPopup({ value: "true", message: "Thank you for your review!!" })
      );
    } catch (error) {
      console.log(error);
      dispatch(setPopup({ value: "true", message: error.response.data.msg }));
    }
  };

  return (
    <>
      {loading === true ? (
        <div className="loading-animation" style={{ marginTop: "70px" }}>
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
        </div>
      ) : review !== null && review.length > 0 ? (
        review.map((item) => {
          return <SingleReview key={item._id} {...item} />;
        })
      ) : (
        <div>No reviews</div>
      )}
      <form onSubmit={handleSubmit} className="form_comment">
        <hr />
        <div className="Current_Review">
          <div className="current_review__title">Leave a Review</div>
          <div className="commentSection">
            {/* <label for="rating" class="form-label">
            Rating:
          </label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={value.rating}
            onChange={handleChange}
            class="form_input_comment"
          /> */}
            <Dropdown
              type="dropdown"
              name="rating"
              value={value.rating}
              handleChange={handleChange}
              options={[1, 2, 3, 4, 5]}
            />
            <FormRow
              type="text"
              name="title"
              value={value.title}
              handleChange={handleChange}
            />

            <label htmlFor="comment" className="form-label">
              Describe it a little
            </label>
            <textarea
              id="comment"
              name="comment"
              value={value.comment}
              onChange={handleChange}
              className="form_input_comment"
              rows="4"
            ></textarea>

            <button className="submit-button">Submit</button>
          </div>
        </div>
      </form>
      <Popup
        message={useSelector((state) => state.auth.message)}
        onOk={() => console.log()}
      />
    </>
  );
};

export default Review;

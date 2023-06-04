import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import "./review.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const SingleReview = ({ title, rating, comment, user }) => {
  const [image, setImage] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
  );

  const fetchUserImage = async () => {
    try {
      const { data } = await axios.get(
        `https://e-commerece-server.onrender.com/api/v1/users/${user}`,
        { withCredentials: true }
      );
      if (data.success) {
        setImage(data.msg.image);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUserImage();
  }, []);
  return (
    <>
      <div className="oldReview">
        <div className="reviewImage">
          <img className="reviewImg" src={image} alt="user" />
        </div>
        <div className="commentSection">
          <div className="flex">
            <h2 className="title_rating">
              <div className="rating">
                {Array.from(Array(rating), (_, index) => (
                  <FontAwesomeIcon key={index} icon={faStar} />
                ))}
              </div>
              <div className="title_1">{title}</div>
            </h2>
          </div>

          <p className="comment">{comment}</p>
        </div>
      </div>
    </>
  );
};

export default SingleReview;

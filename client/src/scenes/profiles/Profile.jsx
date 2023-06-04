import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { Button } from "@mui/material";
import axios from "axios";
import { setUser } from "../../state/user";
import Cookies from "js-cookie";
// import GetTokenData from "../../components/GetTokenData";
import { useGlobalContext } from "../../utils/context";
import "./profile.css";
import FormRow from "../../componets/formRow";

const Profile = () => {
  const dispatch = useDispatch();
  let user = localStorage.getItem("user");
  user = JSON.parse(user);
  const [value, setValue] = useState({
    name: user.name,
    email: user.email,
    password: "",
    "New-password": "",
    aboutme:
      "I are a dynamic and driven individual with a passion for learning and exploring new ideas. Curiosity fuels your journey, and you constantly seek knowledge and self-improvement. Your open-mindedness allows you to appreciate different perspectives and embrace diversity in all its forms.\n\n  As a natural problem solver, you approach challenges with creativity and resilience. Your analytical thinking and ability to think outside the box enable you to find innovative solutions. You thrive in collaborative environments, valuing teamwork and leveraging the strengths of others to achieve common goals.",
  });
  const [upload, setUpload] = useState(null);
  const [file, setFile] = useState();
  const onChangeFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleChange = (e) => {
    console.log(e.target.name);
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Image", file);
    const { data } = await axios.post(
      "https://e-commerece-server.onrender.com/api/v1/users/uploadProfile",
      formData
    );
    console.log(data);
    if (data) {
      const value = await axios.post(
        "https://e-commerece-server.onrender.com/api/v1/users/uploadUserv2",
        {
          image: data.image.src,
        }
      );
      setUpload(value.data);
      // Update the user data in localStorage
      const userData = localStorage.getItem("user");
      if (userData) {
        const parsedUser = JSON.parse(userData);
        const updatedUser = { ...parsedUser, ...value.data.user };
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
    }
  };

  const handleSubmitProfile = async () => {
    try {
      const { data } = await axios.post(
        "https://e-commerece-server.onrender.com/api/v1/users/uploadUserv2",
        {
          name: value.name,
          email: value.email,
          aboutme: value.aboutme,
        }
      );
      console.log(data);
      if (data) {
        alert("User info has been updated!!");
        const userData = localStorage.getItem("user");
        if (userData) {
          const parsedUser = JSON.parse(userData);
          const updatedUser = { ...parsedUser, ...data.user };
          localStorage.setItem("user", JSON.stringify(updatedUser));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmitPassword = async () => {
    try {
      const { data } = await axios.patch(
        "https://e-commerece-server.onrender.com/api/v1/users/updateUserPassword",
        {
          oldPassword: value.password,
          newPassword: value["New-password"],
        }
      );
      console.log(data);
      if (data) {
        alert("User password has been updated!!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(
        `https://e-commerece-server.onrender.com/api/v1/users/${user._id}`
      );

      console.log("Uploaded");
      dispatch(setUser(data.msg));
    };
    fetchUser();
  }, [upload]);

  return (
    <>
      <h1 className="title">Profile</h1>
      <div className="container_profile">
        <div className="image">
          <img src={user.image} alt={`${user.name}`} />
          <hr />
          <input
            type="file"
            name="file"
            onChange={onChangeFile}
            className="choose"
          />
          <button className="btn_1" onClick={handleSubmit}>
            Upload image
          </button>
        </div>
        <div className="info">
          <FormRow
            type="text"
            name="name"
            value={value.name}
            handleChange={handleChange}
          />
          <FormRow
            type="email"
            name="email"
            value={value.email}
            handleChange={handleChange}
          />

          <div className="description">
            <label htmlFor="aboutme" className="form-label">
              About me
            </label>
            <textarea
              name="aboutme"
              id="aboutme"
              cols="30"
              rows="6"
              className="text_area"
              value={value.aboutme}
              onChange={handleChange}
            ></textarea>
          </div>
          <button
            className="update_btn"
            style={{ marginBottom: "20px" }}
            onClick={handleSubmitProfile}
          >
            Update Profile
          </button>
          <div className="password">
            <FormRow
              type="password"
              name="password"
              value={value.password}
              handleChange={handleChange}
            />
            <FormRow
              type="password"
              name="New-password"
              value={value["New-password"]}
              handleChange={handleChange}
            />
            <button className="update_btn" onClick={handleSubmitPassword}>
              Update Password
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

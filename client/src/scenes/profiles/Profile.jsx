import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import axios from "axios";
import { setUser } from "../../state/user";
import Cookies from "js-cookie";
// import GetTokenData from "../../components/GetTokenData";
import { useGlobalContext } from "../../utils/context";

const Profile = () => {
  const dispatch = useDispatch();

  let user = localStorage.getItem("user");
  user = JSON.parse(user);
  const [upload, setUpload] = useState(null);
  const [file, setFile] = useState();
  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    console.log("submit");
    e.preventDefault();
    const formData = new FormData();
    formData.append("Image", file);
    const { data } = await axios.post("api/v1/users/uploadProfile", formData);
    if (data) {
      const value = await axios.post("api/v1/users/uploadUserv2", {
        image: data.image.src,
      });
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
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(`/api/v1/users/${user._id}`);

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
            onChange={handleChange}
            className="choose"
          />
          <button className="btn_1" onClick={handleSubmit}>
            Upload image
          </button>
        </div>
        <div className="info">
          <h1 className="name">Name: {user.name}</h1>
          <h1 className="email">Email: {user.email}</h1>
          <div className="button_com">
            <IconButton>
              <EditIcon />
            </IconButton>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

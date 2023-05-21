import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode"; // Assuming you have a library to decode JWT tokens
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../state/user";

const GetTokenData = () => {
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // Get token from cookies
        const token = Cookies.get("token");

        if (token) {
          // Decode the token to retrieve the user ID
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.userId;

          // Fetch user information using the user ID
          const {
            data: { userInfo },
          } = await axios.get(`/api/v1/users/ShowMe`);
          console.log(userInfo);

          // Set user in the state
          setUser(userInfo);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserInfo();
  }, []);

  return <div style={{ display: "none" }}>hello</div>;
};

export default GetTokenData;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import User from "./User";
import getCookie from "../../hooks/GetCookies";

const ManageUser = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  // const cookieValue = getCookie("")

  const fetchData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const { data } = await axios.get(
      "https://e-commerece-server.onrender.com/api/v1/users",
      {
        withCredentials: true,
      }
    );
    setUsers(data.msg);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="head_product">
        <h1 className="title">Manage User</h1>
      </div>
      <div className="product_container">
        {users === null ? (
          <div className="loading-animation" style={{ marginTop: "70px" }}>
            <div className="loading-bar"></div>
            <div className="loading-bar"></div>
            <div className="loading-bar"></div>
            <div className="loading-bar"></div>
          </div>
        ) : (
          users.map((item) => {
            return <User User={item} key={item._id} />;
          })
        )}
      </div>
    </>
  );
};

export default ManageUser;

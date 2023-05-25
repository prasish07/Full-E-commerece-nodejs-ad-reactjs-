import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import axios from "axios";
import Popup from "../../componets/Popup";

import { useSelector, useDispatch } from "react-redux";
import { setPopup } from "../../state/user";

const User = ({ User }) => {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.auth.message);

  return (
    <>
      <div className="product">
        <div className="product-image">
          <img src={User.image} alt="User" className="productImg" />
        </div>
        <div className="names">
          <h3 className="product-name">{User.name}</h3>
          <h4 className="product-brand">{User._id}</h4>
        </div>
        <div className="priceandno">
          <h4 className="product-price">{User.email}</h4>
          <h4 className="product-no">Role: {User.role}</h4>
        </div>
        <div
          className="button_com"
          style={{
            marginTop: "0px",
            display: "flex",
            alignItems: "center",
          }}
        ></div>
      </div>
      <Popup message={message} onOk={() => console.log()} />
    </>
  );
};

export default User;

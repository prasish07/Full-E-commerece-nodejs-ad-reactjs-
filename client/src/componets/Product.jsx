import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import axios from "axios";
import Popup from "./Popup";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setPopup } from "../state/user";

const Product = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const message = useSelector((state) => state.auth.message);

  const handleDelete = async ({ _id, name }) => {
    try {
      const { data } = await axios.delete(`/api/v1/products/${_id}`);
      console.log(data.success);
      if (data.success) {
        dispatch(
          setPopup({
            value: "true",
            message: `Product ${name} has been succesfully deleted!!`,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="product">
        <div className="product-image">
          <img src={product.image} alt="product" className="productImg" />
        </div>
        <div className="names">
          <h3 className="product-name">{product.name}</h3>
          <h4 className="product-brand">{product.company}</h4>
        </div>
        <div className="priceandno">
          <h4 className="product-price">₹{product.price}</h4>
          <h4 className="product-no">No. of items: {product.inventory}</h4>
        </div>
        <div
          className="button_com"
          style={{
            marginTop: "0px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={() =>
              navigate(`/manage-product/update Product?id=${product._id}`)
            }
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              handleDelete(product);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
      <Popup message={message} onOk={() => console.log()} />
    </>
  );
};

export default Product;

import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

const prod = ({ product }) => {
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
          <IconButton>
            <EditIcon />
          </IconButton>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </>
  );
};

export default prod;

import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "../../componets/Product";
import "./manage.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const ManageProduct = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const { data } = await axios.get(
      "https://e-commerece-server.onrender.com/api/v1/products"
    );
    setProducts(data.products);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="head_product">
        <h1 className="title center">Manage Product</h1>
        <button
          className="add_btn right"
          onClick={() => navigate(`/manage-product/add-product`)}
        >
          Add
        </button>
      </div>
      <div className="product_container">
        {products === null ? (
          <div className="loading-animation" style={{ marginTop: "70px" }}>
            <div className="loading-bar"></div>
            <div className="loading-bar"></div>
            <div className="loading-bar"></div>
            <div className="loading-bar"></div>
          </div>
        ) : (
          products.map((item) => {
            return <Product product={item} key={item._id} />;
          })
        )}
      </div>
    </>
  );
};

export default ManageProduct;

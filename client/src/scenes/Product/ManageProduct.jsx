import React, { useEffect, useState } from "react";
import axios from "axios";
import Prod from "../../componets/Prod";
import "./manage.css";
import { useNavigate } from "react-router-dom";

const ManageProduct = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    const { data } = await axios.get("api/v1/products");
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
          onClick={() => navigate("/manage-product/add-product")}
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
            return <Prod product={item} key={item._id} />;
          })
        )}
      </div>
    </>
  );
};

export default ManageProduct;

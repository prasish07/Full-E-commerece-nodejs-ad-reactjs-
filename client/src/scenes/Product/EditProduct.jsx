import React, { useEffect, useState } from "react";
import FormRowParallel from "../../componets/FromRowParallel";
import Dropdown from "../../componets/Dropdown";
import user from "../../state/user";
import axios from "axios";
import Popup from "../../componets/Popup";
import { setPopup } from "../../state/user";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

const EditProduct = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const searchId = new URLSearchParams(location.search);
  const id = searchId.get("id");
  const message = useSelector((state) => state.auth.message);
  const [product, setProduct] = useState(null);
  const [userEnterData, setUserEnterData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    inventory: 0,
    colors: [],
  });
  const fetchProduct = async () => {
    try {
      console.log(id);
      const value = await axios.get(`/api/v1/products/${id}`);
      console.log(value.data.product);
      setUserEnterData(value.data.product);
      setImage(value.data.product.image);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(
    "https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg"
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Image", file);
    try {
      const { data } = await axios.post(
        "/api/v1/users/uploadProfile",
        formData
      );
      console.log(data);
      if (data) {
        console.log(userEnterData);
        try {
          const value = await axios.patch(`/api/v1/products/${id}`, {
            name: userEnterData.name,
            price: userEnterData.price,
            description: userEnterData.description,
            category: userEnterData.category,
            inventory: userEnterData.inventory,
            colors: userEnterData.colors,
          });
          console.log();
          // setUpload(value.data);
          if (value.data) {
            dispatch(
              setPopup({
                value: "true",
                message: "Product is updated succesfully!!",
              })
            );
          }
        } catch (error) {
          console.log(error);
          dispatch(
            setPopup({
              value: "true",
              message: `Failed!!  (${error.response.data.msg})`,
            })
          );
        }
      }
    } catch (error) {
      console.log(error);
      dispatch(
        setPopup({
          value: "true",
          message: `Image  (${error.response.data.msg})`,
        })
      );
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "color") {
      setUserEnterData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value.split(",").map((color) => color.trim()),
      }));
    } else {
      setUserEnterData({ ...userEnterData, [e.target.name]: e.target.value });
    }
  };
  const handleChangeImage = (e) => {
    setFile(e.target.files[0]);
  };
  return (
    <>
      <h1 className="title">Update Product</h1>
      <div className="add_product_container">
        <div className="image">
          <img src={image} alt={``} />
          <hr />
          <input
            type="file"
            name="file"
            onChange={handleChangeImage}
            className="choose"
          />
          {/* <button className="btn_1" onClick={handleSubmit}>
            Upload image
          </button> */}
        </div>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group_top">
            <FormRowParallel
              type="text"
              name="name"
              value={userEnterData?.name || ""}
              handleChange={handleChange}
            />
            <FormRowParallel
              type="number"
              name="price"
              value={userEnterData?.price || ""}
              handleChange={handleChange}
            />
            <Dropdown
              type="dropdown"
              name="company"
              value={userEnterData.company || ""}
              handleChange={handleChange}
              options={["ikea", "liddy", "marcos"]}
            />
          </div>
          <div className="description">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              name="description"
              id="desciption"
              cols="30"
              rows="10"
              className="text_area"
              value={userEnterData.description || ""}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="form-group_bottom">
            <Dropdown
              type="dropdown"
              name="category"
              value={userEnterData.category || ""}
              handleChange={handleChange}
              options={["office", "kitchen", "bedroom"]}
            />
            <FormRowParallel
              type="number"
              name="inventory"
              value={userEnterData?.inventory || ""}
              handleChange={handleChange}
            />
            <FormRowParallel
              type="text"
              name="colors"
              value={userEnterData?.colors || ""}
              handleChange={handleChange}
            />
          </div>
          <button className="btn_1" type="submit">
            Update Product
          </button>
        </form>
        <Popup
          message={useSelector((state) => state.auth.message)}
          onOk={() => console.log("closed")}
        />
      </div>
    </>
  );
};

export default EditProduct;

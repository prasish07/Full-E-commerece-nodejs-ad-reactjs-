import React, { useState } from "react";
import FormRow from "../../componets/formRow";

const AddProduct = () => {
  const [userEnterData, setUserEnterData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "",
    inventory: 0,
    Color: [],
  });
  const [image, setImage] = useState(
    "https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg"
  );
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleChange = (e) => {
    setUserEnterData({ ...userEnterData, [e.target.name]: [e.target.value] });
  };
  return (
    <>
      <h1 className="title">Add Product</h1>
      <div className="add_product_container">
        <div className="image">
          <img src={image} alt={``} />
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
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <FormRow
              type="text"
              name="name"
              value={userEnterData?.name}
              handleChange={handleChange}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProduct;

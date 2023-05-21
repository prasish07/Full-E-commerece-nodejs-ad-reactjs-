import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const ItemDetails = () => {
  const dispatch = useDispatch();
  // const item = useSelector((state) => state.cart.items);
  const items = useSelector((state) => state.cart.items);
  let { itemId } = useParams();
  const itemOne = items.find((item) => item.id === parseInt(itemId));

  return (
    <div className="container">
      <img
        src={`http://localhost:1337${itemOne.attributes.Image.data.attributes.formats.medium.url}`}
        alt=""
        className="image"
      />
      <div className="info">
        <div className="name_category">
          <h2>Name:- {itemOne.attributes.name}</h2>
        </div>
        <div>
          <h2>
            Descriptions:
            <span className="para">{itemOne.attributes.longDescription}</span>
          </h2>
        </div>
        <h2>
          Price:-
          <span style={{ color: "red" }}>${itemOne.attributes.price}</span>
        </h2>
      </div>
    </div>
  );
};

export default ItemDetails;

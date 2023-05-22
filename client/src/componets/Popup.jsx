import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPopup } from "../state/user";
import "./popup.css";

const Popup = ({ message, onOk }) => {
  const popup = useSelector((state) => state.auth.popup);
  const dispatch = useDispatch();
  const handleClicked = () => {
    dispatch(setPopup({ value: "go", message: "" }));
    console.log("value", popup);
    onOk();
  };
  if (popup === "true") {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  return (
    popup === "true" && (
      <div className="model">
        <div
          className="overlay"
          onClick={() => dispatch(setPopup({ value: "go", message: "" }))}
        ></div>
        <div className="popup">
          <p className="text">{message}</p>
          <button
            className="btn_cart"
            style={{ width: "30%" }}
            onClick={handleClicked}
          >
            OK
          </button>
        </div>
      </div>
    )
  );
};

export default Popup;

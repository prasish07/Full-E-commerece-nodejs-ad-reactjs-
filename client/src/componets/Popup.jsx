import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPopup } from "../state/user";

const Popup = ({ message, onOk }) => {
  const popup = useSelector((state) => state.auth.popup);
  const dispatch = useDispatch();
  const handleClicked = () => {
    dispatch(setPopup({ value: "go", message: "" }));
    console.log("value", popup);
    onOk();
  };
  return (
    popup === "true" && (
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
    )
  );
};

export default Popup;

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setYesNoPopup } from "../state/user";

const YesNoPopup = ({ message, onYes }) => {
  const isOpen = useSelector((state) => state.auth.YesNoPopup);
  const dispatch = useDispatch();
  const handleYes = () => {
    onYes();
    dispatch(setYesNoPopup(false));
    onYes();
  };

  const handleNo = () => {
    dispatch(setYesNoPopup(false));
  };

  return (
    isOpen && (
      <div className="popup">
        <p className="text">{message}</p>
        <div
          className="button-container"
          style={{ display: "flex", width: "100%" }}
        >
          <button
            onClick={handleYes}
            className="btn_cart"
            style={{ padding: "5px", margin: "10px" }}
          >
            Yes
          </button>
          <button
            onClick={handleNo}
            className="btn_cart"
            style={{ padding: "10px", margin: "10px" }}
          >
            No
          </button>
        </div>
      </div>
    )
  );
};

export default YesNoPopup;

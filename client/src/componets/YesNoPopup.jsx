import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setYesNoPopup } from "../state/user";

const YesNoPopup = ({ message, onYes, state }) => {
  const isOpen = useSelector((state) => state.auth.YesNoPopup);

  const dispatch = useDispatch();

  const handleYes = () => {
    dispatch(setYesNoPopup(false));
  };

  const handleNo = () => {
    dispatch(setYesNoPopup(false));
  };

  return (
    isOpen === state && (
      <div className="model">
        <div
          className="overlay"
          onClick={() => dispatch(setYesNoPopup(false))}
        ></div>
        <div className="popup">
          <p className="text">{message}</p>
          <div
            className="button-container"
            style={{ display: "flex", width: "100%" }}
          >
            <button
              onClick={() => {
                console.log(onYes);
                onYes();
                handleYes();
              }}
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
      </div>
    )
  );
};

export default YesNoPopup;

import { createSlice } from "@reduxjs/toolkit";
import { useState, useEffect } from "react";
import axios from "axios";

const initialState = {
  user: null,
  isAuth: false,
  popup: "false",
  message: "",
  message2: "",
  YesNoPopup: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
    },
    setPopup: (state, action) => {
      state.popup = action.payload.value;
      state.message = action.payload.message;
    },
    setYesNoPopup: (state, action) => {
      state.YesNoPopup = action.payload.value;
      state.message2 = action.payload.message;
    },
  },
});

export const { setUser, setPopup, setYesNoPopup } = authSlice.actions;

export default authSlice.reducer;

import React from "react";
import { useState, useEffect } from "react";
import FormRow from "../../componets/formRow";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Popup from "../../componets/Popup";
import { useSelector, useDispatch } from "react-redux";
import { setPopup } from "../../state/user";

const CreateAccount = () => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = values;
    const signupUser = { name, email, password };
    try {
      const { data } = await axios.post(
        `https://e-commerece-server.onrender.com/api/v1/auth/register`,
        signupUser,
        { withCredentials: true }
      );
      console.log(data);
      if (data.success) {
        // navigate("/");
        dispatch(
          setPopup({ value: "true", message: "Account created succesfully" })
        );
      }
    } catch (error) {
      console.log(error);
      dispatch(
        setPopup({
          value: "true",
          message: `Failed!!  (${error.response.statusText})`,
        })
      );
    }
  };

  return (
    <>
      <div className="signup">
        <h1 className="Heading">Create Account</h1>
        <div className="login_container">
          <form onSubmit={handleSubmit}>
            <div className="login_input">
              <FormRow
                type="text"
                name="name"
                value={values.name}
                handleChange={handleChange}
              />
              <FormRow
                type="email"
                name="email"
                value={values.email}
                handleChange={handleChange}
              />
              <FormRow
                type="password"
                name="password"
                value={values.password}
                handleChange={handleChange}
              />
            </div>
            <button className="btn btn-block" type="submit">
              Signup
            </button>
          </form>
          <p className="navigate">
            Already have a account{" "}
            <span onClick={() => navigate("/login")} className="link">
              Login
            </span>
          </p>
        </div>
      </div>
      <Popup
        message={useSelector((state) => state.auth.message)}
        onOk={() => {
          dispatch(setPopup({ value: "false", message: "" }));
        }}
      />
    </>
  );
};

export default CreateAccount;

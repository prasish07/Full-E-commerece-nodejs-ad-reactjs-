import React from "react";
import { useState, useEffect } from "react";
import FormRow from "../../componets/formRow";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { openPopup, setUser, setPopup } from "../../state/user";
import Popup from "../../componets/Popup";
import Cookies from "js-cookie";
import { useGlobalContext } from "../../utils/context";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const { saveUser, user } = useGlobalContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const popup = useSelector((state) => state.auth.popup);
  const message = useSelector((state) => state.auth.message);
  // const user = useSelector((state) => state.auth.user);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = values;
    const loginUser = { email, password };
    try {
      const { data } = await axios.post(`/api/v1/auth/login`, loginUser);
      if (data.success) {
        dispatch(setPopup({ value: "true", message: "Login Successfully!!!" }));
        saveUser(data.data);

        // setTimeout(() => {
        //   navigate("/");
        // }, 1000);
        console.log(popup);
      }
    } catch (error) {
      console.log(error);
      dispatch(
        setPopup({
          value: "true",
          message: `Login failed!!  (${error.response.statusText})`,
        })
      );
    }
  };

  useEffect(() => {}, []);
  return (
    <>
      <div className="login">
        <h1 className="Heading">Login</h1>
        <div className="login_container">
          <form onSubmit={handleSubmit}>
            <div className="login_input">
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
                component="flex_box"
              />
            </div>
            <button className="btn btn-block" type="submit">
              Login
            </button>
          </form>
          <p className="navigate">
            Do not have a account?{" "}
            <span onClick={() => navigate("/signup")} className="link">
              Create Account
            </span>
          </p>
        </div>
      </div>
      {popup && (
        <Popup
          message={message}
          onOk={() => {
            if (user) {
              navigate("/");
            }
          }}
        />
      )}
    </>
  );
};

export default Login;

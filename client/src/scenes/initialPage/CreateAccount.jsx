import React from "react";
import { useState, useEffect } from "react";
import FormRow from "../../componets/formRow";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
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
      const { data } = await axios.post(`/api/v1/auth/register`, signupUser);
      console.log(data);
      if (data.success) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
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
            <span onClick={() => navigate("/")} className="link">
              Login
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default CreateAccount;

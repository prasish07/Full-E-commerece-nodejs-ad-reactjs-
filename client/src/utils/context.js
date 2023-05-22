import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import url from "./url";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../state/user";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const saveUser = (user) => {
    setUser(user);
    console.log("Content", user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const removeUser = () => {
    setUser(null);
    console.log("Remove");
    localStorage.removeItem("user");
  };

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`/api/v1/users/showMe`);
      console.log(data);
      saveUser(data.user.data);
      console.log("content user", user);
    } catch (error) {
      removeUser();
    }
    setIsLoading(false);
  };

  const logoutUser = async () => {
    try {
      await axios.get("/api/v1/auth/logout");
      removeUser();
    } catch (error) {
      console.log(error);
    }
  };

  //   useEffect(() => {
  //     const userData = localStorage.getItem("user");
  //     if (userData) {
  //       setUser(JSON.parse(userData));
  //     }
  //     fetchUser();
  //   }, []);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        saveUser,
        user,
        logoutUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };

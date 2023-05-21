import MainCarousel from "./MainCarousel";
import ShoopingList from "./ShoopingList";
import Subscribe from "./Subscribe";
import Cookies from "js-cookie";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  // const [token, setToken] = useState(null);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   const token = Cookies.get("token");
  //   console.log("token", token);
  //   const fetchData = async () => {
  //     const { data } = await axios.get("api/v1/users/showMe");
  //     console.log("hello");
  //     console.log(data.user.data);
  //     if (data) {
  //       dispatch(setUser(data.user.data));
  //     }
  //   };
  //   fetchData();
  //   dispatch(setUser());
  // }, [token]);
  return (
    <div className="home">
      <MainCarousel />
      <ShoopingList />
      <Subscribe />
    </div>
  );
};

export default Home;

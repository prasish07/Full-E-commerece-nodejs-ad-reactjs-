import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Checkout from "./scenes/checkout/Checkout";
import Confirmation from "./scenes/checkout/Confirmation";
import Home from "./scenes/home/Home";
import ItemDetails from "./scenes/itemDetails/ItemDetails";
import Navbar from "./scenes/global/Navbar";
import CartMenu from "./scenes/global/CartMenu";
import Footer from "./scenes/global/Footer";
import Login from "./scenes/initialPage/Login";
import CreateAccount from "./scenes/initialPage/CreateAccount";
import Profile from "./scenes/profiles/Profile";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "./state/user";
import ManageProduct from "./scenes/Product/ManageProduct";
import PrivateRoute from "./utils/PrivateRoute";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
};

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<CreateAccount />} />
        </Routes>
        <Navbar />

        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="item/:itemId" element={<ItemDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/success" element={<Confirmation />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/manage-product"
            element={<PrivateRoute component={ManageProduct} />}
          />
        </Routes>
        <CartMenu />
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;

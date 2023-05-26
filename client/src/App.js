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
import AddProduct from "./scenes/Product/AddProduct";
import ProtectedRoute from "./utils/ProtectedRoute";
import Error from "./scenes/Error/Error";
import ManageUser from "./scenes/user/ManageUser";
import EditProduct from "./scenes/Product/EditProduct";

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
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="*" element={<Error />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<CreateAccount />} />
          <Route path="/" element={<Home />} />
          <Route path="item/:itemId" element={<ItemDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/success" element={<Confirmation />} />
          <Route
            path="/profile"
            element={<ProtectedRoute component={Profile} />}
          />
          <Route
            path="/manage-product"
            element={<PrivateRoute component={ManageProduct} />}
          />
          <Route
            path="/manage-product/update Product"
            element={<PrivateRoute component={EditProduct} />}
          />
          <Route
            path="/manage-product/add-product"
            element={<PrivateRoute component={AddProduct} />}
          />
          <Route
            path="/manage-user"
            element={<PrivateRoute component={ManageUser} />}
          />
        </Routes>
        <CartMenu />
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;

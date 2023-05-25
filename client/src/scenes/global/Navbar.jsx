import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { shades } from "../../theme";
import { Badge, Box, IconButton } from "@mui/material";
import { setIsCartOpen } from "../../state";
import Cookies from "js-cookie";
import axios from "axios";

import {
  PersonOutline,
  ShoppingBagOutlined,
  MenuOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { setUser } from "../../state/user";
// import SetCookie from "../../hooks/setCookies";
import { useGlobalContext } from "../../utils/context";
import Popup from "../../componets/Popup";
import { setPopup } from "../../state/user";
import { setYesNoPopup } from "../../state/user";
import YesNoPopup from "../../componets/YesNoPopup";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [token, setToken] = useState(null);
  const cart = useSelector((state) => state.cart.cart);
  const { logoutUser } = useGlobalContext();
  let user = localStorage.getItem("user");
  user = JSON.parse(user);
  const isOpen = useSelector((state) => state.auth.YesNoPopup);
  const message = useSelector((state) => state.auth.message2);

  const [anchorE1, setAnchorE1] = useState(null);
  const handleClick = (e) => {
    setAnchorE1(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorE1(null);
  };

  const handleLogout = () => {
    navigate("/login");
    logoutUser();
  };

  // useEffect(() => {
  //   const token = Cookies.get("token");
  //   console.log("token", token);
  //   const fetchData = async () => {
  //     const { data } = await axios.get("api/v1/users/showMe");
  //     console.log("hello");
  //     console.log(data.user.data);
  //     if (data) {
  //       dispatch(setUser(data.user.data));
  //       // SetCookie("id", data.user.data._id);
  //       // SetCookie("name", data.user.data.name);
  //       // SetCookie("email", data.user.data.email);
  //       // SetCookie("image", data.user.data.image);
  //       console.log(user);
  //     }
  //   };
  //   fetchData();
  // }, [token]);
  return (
    <Box
      display="flex"
      alignItems="center"
      width="210vh"
      height="60px"
      backgroundColor="rgba(255,255,255,0.95)"
      color="black"
      position="fixed"
      top="0"
      left="0"
      zIndex="1"
    >
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          fontSize="25px"
          onClick={() => navigate("/")}
          sx={{ "&:hover": { cursor: "pointer" } }}
          color={shades.secondary[500]}
        >
          E-Commerce Website
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          columnGap="20px"
          zindex="2"
        >
          <IconButton sx={{ color: "black" }}>
            <SearchOutlined />
          </IconButton>
          <IconButton
            sx={{ color: "black" }}
            onClick={() => navigate("/profile")}
          >
            <PersonOutline />
          </IconButton>
          <Badge
            badgeContent={cart.length}
            color="secondary"
            invisible={cart.length === 0}
            sx={{
              "&:MuiBadge-badge": {
                right: 5,
                top: 5,
                padding: "0 4px",
                height: "14px",
                minWidth: "13px",
              },
            }}
          >
            <IconButton
              onClick={() => dispatch(setIsCartOpen())}
              sx={{ color: "black" }}
            >
              <ShoppingBagOutlined />
            </IconButton>
          </Badge>
          <IconButton
            sx={{ color: "black" }}
            aria-controls="dropdown-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MenuOutlinedIcon />
          </IconButton>
          <Menu
            id="dropdown-menu"
            anchorEl={anchorE1}
            open={Boolean(anchorE1)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                navigate("/manage-product");
                handleClose();
              }}
            >
              Manage product
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/manage-user");
                handleClose();
              }}
            >
              Manage User
            </MenuItem>
            <MenuItem onClick={handleClose}>Option 3</MenuItem>
          </Menu>
          {user ? (
            <IconButton
              sx={{ color: "black" }}
              onClick={() => {
                console.log("Cliked logout");
                dispatch(
                  setYesNoPopup({
                    value: "logout",
                    message: "Loging out!! Are you sure?",
                  })
                );
              }}
            >
              <LogoutIcon />
            </IconButton>
          ) : (
            <IconButton
              sx={{ color: "black" }}
              onClick={() => navigate("/login")}
            >
              <LoginIcon />
            </IconButton>
          )}
        </Box>
      </Box>
      <YesNoPopup
        message={useSelector((state) => state.auth.message2)}
        onYes={handleLogout}
        state="logout"
      />
    </Box>
  );
};

export default Navbar;

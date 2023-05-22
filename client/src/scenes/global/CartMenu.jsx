import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styled from "@emotion/styled";
import { shades } from "../../theme";
import { useState, useRef, useEffect } from "react";

import {
  decreaseCount,
  increaseCount,
  removeFromCart,
  setIsCartOpen,
} from "../../state";

import { useNavigate } from "react-router-dom";

const FlexBlox = styled(Box)`
  display: flex;
  justify-content: space-between;
  aligh-item: center;
`;

const CartMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);
  const boxRef = useRef(null);

  const total = cart.reduce((total, item) => {
    return total + item.count * item.price;
  }, 0);

  useEffect(() => {
    function handleClickOutside(event) {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        dispatch(setIsCartOpen());
        console.log("click");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [boxRef]);

  return (
    <Box
      display={isCartOpen ? "block" : "none"}
      backgroundColor="rgba(0,0,0,0.4)"
      position="fixed"
      zIndex={10}
      width="100%"
      height="100%"
      left="0"
      top="0"
      overflow="auto"
    >
      {isCartOpen && (
        <Box
          ref={boxRef}
          position="fixed"
          right="0"
          botton="0"
          width="max(400px, 30%)"
          height="100%"
          backgroundColor="white"
        >
          <Box padding="30px" overflow="auto" height="100%">
            <FlexBlox mb="15px">
              <Typography variant="h3">SHOPPING BAG ({cart.length})</Typography>
              <IconButton
                onClick={() => dispatch(setIsCartOpen())}
                sx={{
                  position: "absolute",
                  top: "0px",
                  right: "5px",
                }}
              >
                <CloseIcon />
              </IconButton>
            </FlexBlox>

            <Box>
              {cart.map((item) => (
                <Box key={`${item.name}-${item.id}`}>
                  {/* <Divider> */}
                  <FlexBlox p="15px 0">
                    <Box flex="1 1 40%">
                      <img
                        alt={item?.name}
                        width="123px"
                        height="auto"
                        src={item.image}
                      />
                    </Box>

                    <Box flex="1 1 60%">
                      <FlexBlox mb="5px">
                        <Typography fontWeight="bold">{item.name}</Typography>
                        <IconButton
                          onClick={() =>
                            dispatch(removeFromCart({ id: item.id }))
                          }
                        >
                          <CloseIcon />
                        </IconButton>
                      </FlexBlox>
                      <Typography>{item.description}</Typography>

                      <FlexBlox m="15px 0">
                        <Box
                          display="flex"
                          alignItems="center"
                          border={`1.5px solid ${shades.neutral[500]}`}
                        >
                          <IconButton
                            onClick={() => {
                              if (item.count === 1) {
                                dispatch(removeFromCart({ id: item.id }));
                              }
                              dispatch(decreaseCount({ id: item.id }));
                            }}
                          >
                            <RemoveIcon />
                          </IconButton>
                          <Typography>{item.count}</Typography>
                          <IconButton
                            onClick={() => {
                              dispatch(increaseCount({ id: item.id }));
                            }}
                          >
                            <AddIcon />
                          </IconButton>
                        </Box>
                        {/* Price */}
                        <Typography fontWeight="bold">${item.price}</Typography>
                      </FlexBlox>
                    </Box>
                  </FlexBlox>
                  <hr />
                  {/* </Divider> */}
                </Box>
              ))}
            </Box>

            {/* Action */}
            {cart.length > 0 ? (
              <Box m="20px 0">
                <FlexBlox m="20px 0">
                  <Typography fontWeight="bold">Subtotal</Typography>
                  <Typography fontWeight="bold">${total}</Typography>
                </FlexBlox>
                {cart.length > 0 ? (
                  <button
                    onClick={() => {
                      navigate("/checkout");
                      dispatch(setIsCartOpen());
                    }}
                    className="btn"
                  >
                    Checkout
                  </button>
                ) : null}
              </Box>
            ) : null}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CartMenu;

import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { IconButton, Box, Typography, Button, Tabs, Tab } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../../theme";
import { addToCart, setItem } from "../../state";
import { useParams } from "react-router-dom";
import Item from "../../componets/Item";
import Review from "../review/Review";

const ItemDetails = () => {
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const [item, setItem] = useState([]);
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(1);
  const [value, setValue] = useState("description");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function getItems() {
    const items = await fetch("http://localhost:5000/api/v1/products", {
      method: "GET",
    });
    const itemsJson = await items.json();

    setItems(itemsJson.products);
  }

  async function getItem() {
    const item = await fetch(
      `http://localhost:5000/api/v1/products/${itemId}`,
      {
        method: "GET",
      }
    );
    const itemJson = await item.json();

    setItem(itemJson.product);
  }

  useEffect(() => {
    getItem();
    getItems();
  }, [itemId]);

  return (
    <Box width="80%" m="80px auto">
      <Box display="flex" flexWrap="wrap" columnGap="40px">
        {/* Image */}
        <Box flex="1 1 40%" mb="40px">
          <img
            alt={item?.attributes?.name}
            width="100%"
            height="auto"
            src={item.image}
          />
        </Box>
        <Box flex="1 1 50%" mb="40px">
          <Box display="flex" justifyContent="space-between">
            <Box sx={{ "&:hover": { cursor: "pointer", color: "blue" } }}>
              Home/item
            </Box>
            <Box sx={{ "&:hover": { cursor: "pointer", color: "blue" } }}>
              Prev/Next
            </Box>
          </Box>
          <Box m="45px 0 25px 0">
            <Typography variant="h3">Name:- {item?.name}</Typography>
            <Typography sx={{ mt: "5px" }}>Price:- ${item?.price}</Typography>
            <Typography sx={{ mt: "20px" }} className="para">
              {item?.description}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" minHeight="50px">
            <Box
              display="flex"
              alignItems="center"
              border={`1.5px solid ${shades.neutral[300]}`}
              mr="20px"
              p="2px 5px"
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ p: "0 5px" }}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            <button
              className="btn_cart"
              style={{ minWidth: "150px", width: "150px" }}
              onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
            >
              ADD TO CART
            </button>
          </Box>
          <Box>
            <Box m="20px 0 5px 0" display="flex">
              <FavoriteBorderOutlinedIcon />
              <Typography sx={{ ml: "5px", "&:hover": { cursor: "pointer" } }}>
                ADD TO WISHLIST
              </Typography>
            </Box>
            <Typography sx={{ mt: "5px" }}>
              CATEGORIES: {item?.category}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box m="20px 0">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Description" value="description" />
          <Tab label="Reviews" value="reviews" />
        </Tabs>
      </Box>
      <Box display="flex" flexWrap="wrap" gap="15px">
        {value === "description" && <div>{item?.description}</div>}
        {value === "reviews" && <Review id={item._id} />}
      </Box>
      {/* Related items but only taking 4 item from the list */}
      <Box mt="50px" width="100%">
        <Typography variant="h3" fontWeight="bold" sx={{ mb: "20px" }}>
          Related Products
        </Typography>
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fill,300px)"
          // gridTemplateColumns="auto auto auto auto"
          justifyContent="space-between"
          columnGap="20px"
          gap="20px"
        >
          {items.slice(0, 4).map((item, i) => (
            <Item key={`${item.name}-${i}`} item={item} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ItemDetails;

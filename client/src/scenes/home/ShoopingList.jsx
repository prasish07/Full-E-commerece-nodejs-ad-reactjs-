import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { Box, Typography, Tab, Tabs, useMediaQuery } from "@mui/material";
import Item from "../../componets/Item";
import { setItem } from "../../state";
import paginate from "../../utils/utils";
import axios from "axios";

const ShoppingList = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [value, setValue] = useState("all");
  const items = useSelector((state) => state.cart.items);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function getItems() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const { data } = await axios.get(
      "https://e-commerece-server.onrender.com/api/v1/products"
    );
    console.log(data);
    const itemsJson = data;
    dispatch(setItem(itemsJson.products));
    setLoading(false);
  }

  useEffect(() => {
    getItems();
  }, []);

  const bedroomItems = items.filter((item) => item.category === "bedroom");

  const officeItems = items.filter((item) => item.category === "office");

  const kitchenItems = items.filter((item) => item.category === "kitchen");

  return (
    <Box width="80%" margin="80px auto">
      <Typography variant="h3" textAlign="center">
        Our Featured{" "}
        <u>
          <b>Products</b>
        </u>
      </Typography>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: { display: isNonMobile ? "block" : "none" } }}
        sx={{
          m: "25px",
          "& .MuiTabs-flexContainer": {
            flexWrap: "wrap",
          },
        }}
      >
        <Tab label="ALL" value="all" />
        <Tab label="BED ROOM" value="bedroom" />
        <Tab label="OFFICE" value="office" />
        <Tab label="KITCHEN" value="kitchen" />
      </Tabs>
      <Box
        margin={loading ? "50px auto" : "0 auto"}
        display={loading ? "flex" : "grid"}
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent={loading ? "center" : "space-around"}
        alignItems={loading ? "center" : "flex-start"}
        rowGap="20px"
        columnGap="1.33%"
      >
        {loading && (
          <div className="loading-animation">
            <div className="loading-bar"></div>
            <div className="loading-bar"></div>
            <div className="loading-bar"></div>
            <div className="loading-bar"></div>
          </div>
        )}
        {!loading && (
          <>
            {value === "all" &&
              items.map((item, index) => (
                <Item
                  item={item}
                  key={`${item.name}-${item.id}`}
                  style={{
                    animationDelay: `${(index + 1) * 0.1}s`, // Delay each product animation
                  }}
                />
              ))}
            {value === "bedroom" &&
              bedroomItems.map((item, index) => (
                <Item
                  item={item}
                  key={`${item.name}-${item.id}`}
                  style={{
                    animationDelay: `${(index + 1) * 0.1}s`, // Delay each product animation
                  }}
                />
              ))}
            {value === "office" &&
              officeItems.map((item, index) => (
                <Item
                  item={item}
                  key={`${item.name}-${item.id}`}
                  style={{
                    animationDelay: `${(index + 1) * 0.1}s`, // Delay each product animation
                  }}
                />
              ))}
            {value === "kitchen" &&
              kitchenItems.map((item, index) => (
                <Item
                  item={item}
                  key={`${item.name}-${item.id}`}
                  style={{
                    animationDelay: `${(index + 1) * 0.1}s`, // Delay each product animation
                  }}
                />
              ))}
          </>
        )}
      </Box>
    </Box>
  );
};

export default ShoppingList;

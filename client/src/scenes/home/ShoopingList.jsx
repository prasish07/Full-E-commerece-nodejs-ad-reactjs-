import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { Box, Typography, Tab, Tabs, useMediaQuery } from "@mui/material";
import Item from "../../componets/Item";
import { setItem } from "../../state";
import paginate from "../../utils/utils";
import axios from "axios";

const ShoopingList = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [value, setValue] = useState("all");
  const items = useSelector((state) => state.cart.items);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const data = paginate(items);
  const [paginateList, setPaginateList] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (loading) return;
    setPaginateList(data[page]);
    console.log(data[page]);
  }, [page, loading]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function getItems() {
    const items = await fetch("http://localhost:5000/api/v1/products", {
      method: "GET",
    });
    const itemsJson = await items.json();
    dispatch(setItem(itemsJson.products));
    const data = paginate(items);
    setLoading(false);
  }
  const handlePage = (index) => {
    setPage(index);
  };
  const prevPage = () => {
    setPage((oldPage) => {
      let nextPage = oldPage - 1;
      if (nextPage < 0) {
        nextPage = data.length - 1;
      }
      return nextPage;
    });
  };
  const nextPage = () => {
    setPage((oldPage) => {
      let nextPage = oldPage + 1;
      if (nextPage > data.length - 1) {
        nextPage = 0;
      }
      return nextPage;
    });
  };

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
        {value === "all" &&
          !loading &&
          paginateList.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "bedroom" &&
          bedroomItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "office" &&
          officeItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "kitchen" &&
          kitchenItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
      </Box>
      {value === "all" && (
        <div className="btn-container">
          <button className="prev-btn" onClick={prevPage}>
            prev
          </button>
          {data.map((item, index) => {
            return (
              <button
                key={index}
                className={`page-btn ${index === page ? "active-btn" : null}`}
                onClick={() => handlePage(index)}
              >
                {index + 1}
              </button>
            );
          })}
          <button className="next-btn" onClick={nextPage}>
            next
          </button>
        </div>
      )}
    </Box>
  );
};

export default ShoopingList;

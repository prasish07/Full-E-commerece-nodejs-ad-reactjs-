import React from "react";
import { Box, InputBase, Divider, Typography, IconButton } from "@mui/material";
import MarkEmailReadOutLinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import { useState } from "react";
import axios from "axios";

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const handleClick = async (e) => {
    e.preventDefault();
    const { data } = await axios.post("/api/v1/sendEmail", { to: email });
    alert("Your have successfully subscribe to our service, Thank you");
    setEmail("");
  };
  return (
    <Box width="80%" margin="80px auto" textAlign="center">
      <IconButton>
        <MarkEmailReadOutLinedIcon fontSize="large" />
      </IconButton>
      <Typography variant="h3">Subscribe to Our NewsLetter</Typography>
      <Typography>
        and receive $20 coupon for your first order when you checkout
      </Typography>
      <Box
        p="2px 4px"
        m="15px auto"
        display="flex"
        alignItems="center"
        width="75%"
        backgroundColor="#f2f2f2"
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Divider className="divider" orientation="vertical" />
        <button className="subscribe_btn" onClick={handleClick}>
          Subscribe
        </button>
      </Box>
    </Box>
  );
};

export default Subscribe;

import React from "react";
import { Box, Typography } from "@mui/material";
import { shades } from "../../theme";

const Footer = () => {
  return (
    <Box className="footer">
      <Box className="footer-info">
        <Box width="clamp(20%,30%,40%)">
          <Typography
            variant="h4"
            fontWeight="bold"
            mb="30px"
            color={shades.secondary[500]}
          >
            Ecommerce
          </Typography>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
            voluptate suscipit deserunt sit at exercitationem soluta adipisci
            iste eius?
          </div>
        </Box>
        <Box>
          <Typography variant="h4" fontWeight="bold" mb="30px">
            About us
          </Typography>
          <Typography mb="30px"> Careers</Typography>
          <Typography mb="30px"> Our Stores</Typography>
          <Typography mb="30px"> Terms & Conditions</Typography>
          <Typography mb="30px"> Privacy Policy</Typography>
        </Box>
        <Box>
          <Typography variant="h4" fontWeight="bold" mb="30px">
            Customer Care
          </Typography>
          <Typography mb="30px"> Help Center</Typography>
          <Typography mb="30px"> Track your Order</Typography>
          <Typography mb="30px"> Corporate & Bulk Purchasing</Typography>
          <Typography mb="30px"> Returns & Refunds</Typography>
        </Box>
        <Box width="clamp(20%, 25%, 30%)">
          <Typography variant="h4" fontWeight="bold" mb="30px">
            Contact Us
          </Typography>
          <Typography mb="30px">
            {" "}
            50 north Whatever Blvd, Washington, Dc 105001
          </Typography>
          <Typography mb="30px">Email: Something@gmail.com </Typography>
          <Typography mb="30px"> (98989898798)</Typography>
          <Typography mb="30px"> Bhaktapur, Thimi</Typography>
        </Box>
      </Box>
      <Box className="footer-copywrite">
        <Typography variant="h3">
          © 2023 Prasish Shrestha, All Rights Reserved
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;

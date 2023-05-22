import { Box, Checkbox, Typography } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
// import { Box, FormControlLabel, Checkbox } from "@material-ui/core";

import AddressForm from "./AddressForm";

const Shipping = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  setFieldValue,
}) => {
  return (
    <Box m="30px auto">
      <Box>
        <Typography sx={{ mb: "15px" }} fontSize="18px">
          Billing Information
        </Typography>
        <AddressForm
          type="billingAddress"
          values={values.billingAddress}
          errors={errors}
          touched={touched} // if field has be touch true/false
          handleBlur={handleBlur} //handle when click on it
          handleChange={handleChange} // value change when user is typing
        />
      </Box>
      <Box mb="20px">
        <FormControlLabel
          label="Same for Shipping Address"
          control={
            <Checkbox
              defaultChecked
              value={values.ShippingAddress?.isSameAddress}
              onChange={() =>
                setFieldValue(
                  "ShippingAddress.isSameAddress",
                  !values.ShippingAddress.isSameAddress
                )
              }
            />
          }
        />
        {console.log(values.ShippingAddress.isSameAddress)}
      </Box>
      {/* Shipping form */}
      {!values.ShippingAddress.isSameAddress && (
        <Box>
          <Typography sx={{ mb: "15px" }} fontSize="18px">
            Shipping Information
          </Typography>
          <AddressForm
            type="ShippingAddress"
            values={values.ShippingAddress}
            errors={errors}
            touched={touched} // if field has be touch true/false
            handleBlur={handleBlur} //handle when click on it
            handleChange={handleChange} // value change when user is typing
          />
        </Box>
      )}
    </Box>
  );
};

export default Shipping;

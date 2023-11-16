// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { savePaymentMethod } from "../actions/cartActions";
// import { useDispatch } from "react-redux";

// const PaymentPage = () => {
//   const [paymentMethod, setPaymentMethod] = useState("paypal");
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   return (
//     <div>
//       <h1>Payment method :{paymentMethod}</h1>
//       <button
//         onClick={() => {
//           dispatch(savePaymentMethod(paymentMethod));
//           navigate("/placeorder");
//         }}
//       >
//         Next
//       </button>
//     </div>
//   );
// };

// export default PaymentPage;
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {
  Button,
  Chip,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../actions/orderAction";
import Loader from "../components/Loader";
import OrderSummary from "../components/OrderSummary";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  // textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function OrderDetails() {
  const [paymentMethod, setPaymentMethod] = React.useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(paymentMethod);

  const handlePayment = (e) => {
    e.preventDefault();
  };
  return (
    <Box sx={{ flexGrow: 1 }} className="m-5">
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <Item>
            <Box className="mb-5 ">
              <Typography
                variant="h6"
                className="text-2xl font-medium text-gray-950"
              >
                Payment Method:
              </Typography>
              <hr className="my-2 " />
              <FormControl>
                <FormLabel>Please Select a Payment Method</FormLabel>
                <RadioGroup>
                  <FormControlLabel
                    value="ssl"
                    control={<Radio />}
                    checked={paymentMethod === "ssl"}
                    onChange={(e) => {
                      setPaymentMethod(e.target.value);
                    }}
                    label="SSL Commerce"
                  />
                  <FormControlLabel
                    value="paypal"
                    control={<Radio />}
                    checked={paymentMethod === "paypal"}
                    onChange={(e) => {
                      setPaymentMethod(e.target.value);
                    }}
                    label="Paypal"
                  />
                  <FormControlLabel
                    value="cod"
                    control={<Radio />}
                    checked={paymentMethod === "cod"}
                    onChange={(e) => {
                      setPaymentMethod(e.target.value);
                    }}
                    label="Cash on Delivery (COD)"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </Item>
        </Grid>
        <Grid item xs={12} md={3}>
          <Item>
            <OrderSummary Children={"Pay Now"} />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}

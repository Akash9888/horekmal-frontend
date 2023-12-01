import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {
  Button,
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
import {
  createOrder,
  getOrderDetails,
  sslPayment,
} from "../actions/orderAction";
import Loader from "../components/Loader";
import OrderSummary from "../components/OrderSummary";
import { v4 as uuidv4 } from "uuid";
import shortid from "shortid";
import axios from "axios";
import { ORDER_CREATE_RESET } from "../constrants/orderConstrants";
import OrderCalc from "../utils/OrderCalc";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  // textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function OrderDetails() {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const cart = useSelector((state) => state.cartR);
  const { cartItems, shippingAddress } = cart;
  const orderCreate = useSelector((state) => state.orderCreateR);
  const { order, success, error } = orderCreate;
  const sslPay = useSelector((state) => state.sslPaymentR);
  const { sslLoading, sslError, sslInfo } = sslPay;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      navigate(`/order-details/${order.order_id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [success]);

  const paymentData = {
    total_amount: cart.totalPayment,
    transId: shortid.generate(),
    successUrl: "http://127.0.0.1:8000/api/payment/success/",
    failUrl: "http://127.0.0.1:8000/api/payment/fail/",
    cancelUrl: "http://127.0.0.1:8000/api/payment/cancel/",
    ipnUrl: "http://127.0.0.1:8000/api/payment/ipn/",
    name: shippingAddress.name,
    email: shippingAddress.email,
    address: shippingAddress.address,
    city: shippingAddress.city,
    postalCode: shippingAddress.postalCode,
    country: shippingAddress.country,
    phone: shippingAddress.phone,
  };
  const orderData = OrderCalc("Cash on Delivery (COD)", false);

  const handlePayment = () => {
    if (paymentMethod == "cod") {
      dispatch(createOrder(orderData));
    } else if (paymentMethod == "ssl") {
      dispatch(sslPayment(paymentData));
      if (sslInfo) {
        window.location.replace(sslInfo.gatewayPageUrl);
      }
    }
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
            <OrderSummary />
            <hr />
            <Container className="flex justify-center my-2 ">
              <Button
                variant="outlined"
                className="w-full "
                disabled={!paymentMethod}
                onClick={handlePayment}
              >
                Place Order
              </Button>
            </Container>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}

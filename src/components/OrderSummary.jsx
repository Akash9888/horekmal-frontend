import { Box, Button, Container, Typography } from "@mui/material";
import { Children, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const OrderSummary = ({ Children }) => {
  const cart = useSelector((state) => state.cartR);
  const { cartItems } = cart;

  console.log(cartItems);

  let itemsTotal = 0;

  for (let i = 0; i < cartItems?.length; i++) {
    itemsTotal += parseFloat(cartItems[i].price) * cartItems[i].qty;
  }

  // itemsTotal,deliveryFee,vat,totalPayment
  cart.itemsTotal = itemsTotal;
  cart.deliveryFee = itemsTotal > 1000 ? 0 : 60;
  cart.vat = (0.075 * itemsTotal).toFixed(2);
  cart.totalPayment = (
    itemsTotal +
    parseFloat(cart.deliveryFee) +
    parseFloat(cart.vat)
  ).toFixed(2);

  const handlePayment = (e) => {
    e.preventDefault();
    alert("Payment done");
  };
  return (
    <>
      <Typography variant="h6" className="mb-3 text-center ">
        ORDER SUMMARY
      </Typography>
      <hr />
      <Box>
        <Container className="flex justify-between mb-1 ">
          <Typography variant="h6">Items Total:</Typography>
          <Typography variant="h6">
            {new Intl.NumberFormat("en-BD").format(cart.itemsTotal)}
          </Typography>
        </Container>
        <hr />
        <Container className="flex justify-between mb-1 ">
          <Typography variant="h6">Delivery Fee:</Typography>
          <Typography variant="h6">
            {" "}
            {new Intl.NumberFormat("en-BD").format(cart.deliveryFee)}
          </Typography>
        </Container>
        <hr />
        <Container className="flex justify-between mb-1 ">
          <Typography variant="h6">Vat (7.5%):</Typography>
          <Typography variant="h6">
            {new Intl.NumberFormat("en-BD").format(cart.vat)}
          </Typography>
        </Container>
        <hr />
        <Container className="flex justify-between mb-1 ">
          <Typography variant="h5">Total Payment:</Typography>
          <Typography variant="h5">
            ৳ {new Intl.NumberFormat("en-BD").format(cart.totalPayment)}
          </Typography>
        </Container>
        <hr />
        <Container className="flex justify-center my-2 ">
          <Button variant="outlined" className="w-full ">
            {Children}
          </Button>
        </Container>
      </Box>
    </>
  );
};

export default OrderSummary;

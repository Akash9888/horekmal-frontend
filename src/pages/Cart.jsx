import OrderSummary from "../components/OrderSummary";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { styled } from "@mui/material/styles";
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import Loader from "../components/Loader";

import CartFunc from "../components/CartFunc";
import EmptyCart from "../components/EmptyCart";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  // textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const searchParams = new URLSearchParams(useLocation().search);
  const qty = parseInt(searchParams.get("qty"));

  const cart = useSelector((state) => state.cartR);
  const { cartItems } = cart;

  console.log("cartItems length: " + cartItems.length);

  useEffect(() => {
    console.log("useEffect triggered from cart");
    if (id && qty) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <Box sx={{ flexGrow: 1 }} className="m-5">
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Item>
            <Box className="mb-5 ">
              <Typography
                variant="h6"
                className="text-2xl font-medium text-gray-950 "
              >
                My Cart ({cartItems.length})
              </Typography>
              <hr className="my-2 " />

              {cartItems.length == 0 ? (
                <EmptyCart />
              ) : (
                <Container>
                  {cartItems.map((cartItem) => (
                    <CartFunc
                      key={cartItem.productId}
                      dispatch={dispatch}
                      cartItem={cartItem}
                    />
                  ))}
                </Container>
              )}
            </Box>
          </Item>
        </Grid>
        <Grid item xs={12} md={4}>
          <Item>
            <OrderSummary Children={"Checkout Now"} />
            <hr />
            <Container className="flex justify-center my-2 ">
              <Button
                variant="outlined"
                className="w-full "
                disabled={cartItems.length === 0}
                onClick={handleCheckout}
              >
                Checkout Now
              </Button>
            </Container>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Cart;

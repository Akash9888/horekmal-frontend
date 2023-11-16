import OrderSummary from "../components/OrderSummary";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addToCart } from "../actions/cartActions";
import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  IconButton,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Loader from "../components/Loader";
import {
  Add,
  AddSharp,
  Delete,
  Remove,
  RemoveSharp,
} from "@mui/icons-material";
import CartFunc from "../components/CartFunc";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  // textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Cart = () => {
  const { id } = useParams();
  const searchParams = new URLSearchParams(useLocation().search);
  const qty = parseInt(searchParams.get("qty"));

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartR);
  const { cartItems } = cart;

  console.log(cartItems);

  useEffect(() => {
    console.log("-----");
    if (id && qty) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  // let itemsTotal = 0;

  // for (let i = 0; i < cartItems?.length; i++) {
  //   itemsTotal += parseFloat(cartItems[i].price) * cartItems[i].qty;
  // }

  // // itemsTotal,deliveryFee,vat,totalPayment
  // cart.itemsTotal = itemsTotal;
  // cart.deliveryFee = itemsTotal > 1000 ? 0 : 60;
  // cart.vat = (0.075 * itemsTotal).toFixed(2);
  // cart.totalPayment = (
  //   itemsTotal +
  //   parseFloat(cart.deliveryFee) +
  //   parseFloat(cart.vat)
  // ).toFixed(2);
  return (
    <Box sx={{ flexGrow: 1 }} className="m-5">
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <Item>
            <Box className="mb-5 ">
              <Typography
                variant="h6"
                className="text-2xl font-medium text-gray-950 "
              >
                My Cart ({cartItems.length})
              </Typography>
              <hr className="my-2 " />

              {!cartItems ? (
                <h1>Empty cart</h1>
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
        <Grid item xs={12} md={3}>
          <Item>
            <OrderSummary Children={"Checkout Now"} />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Cart;

import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Button, Chip, Container, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../actions/orderAction";
import Loader from "../components/Loader";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  // textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function OrderDetails() {
  const orderDetails = useSelector((state) => state.orderDetailsR);
  const { loading, order } = orderDetails;
  console.log(order);
  const { id } = useParams();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getOrderDetails(id));
  }, []);

  const handlePayment = (e) => {
    e.preventDefault();
    alert("Payment done");
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Box sx={{ flexGrow: 1 }} className="m-5">
          <Grid container spacing={2}>
            <Grid item xs={12} md={9}>
              <Item>
                <Typography
                  variant="h6"
                  className="mb-5 text-2xl font-medium text-gray-950 "
                >
                  Order Id: {id}
                </Typography>

                <Box className="mb-5 ">
                  <Typography
                    variant="h6"
                    className="mb-5 text-2xl font-medium text-gray-950 "
                  >
                    Shipping Address:
                  </Typography>
                  <hr className="mt-1 " />
                  <Typography variant="subtitle2" className="mt-2 ">
                    Name: {order.shippingAddress.name}
                  </Typography>
                  <Typography variant="subtitle2" className="mt-2 ">
                    Email: {order.shippingAddress.email}
                  </Typography>
                  <Typography variant="subtitle2" className="mt-2 ">
                    Address: {order.shippingAddress.address}
                  </Typography>
                  <Typography variant="subtitle2" className="mt-2 ">
                    City: {order.shippingAddress.city}
                  </Typography>
                  <Typography variant="subtitle2" className="mt-2 ">
                    Postal Code: {order.shippingAddress.postalCode}
                  </Typography>
                  <Typography variant="subtitle2" className="mt-2 ">
                    Phone: {order.shippingAddress.phone}
                  </Typography>{" "}
                  <Typography variant="subtitle2" className="mt-2 ">
                    Order Date: {new Date(order.orderDate).toLocaleString()}
                  </Typography>{" "}
                </Box>
                <Box className="mb-5 ">
                  <Typography
                    variant="h6"
                    className="mb-5 text-2xl font-medium text-gray-950 "
                  >
                    Payment Info:
                  </Typography>
                  <hr className="mt-1 " />

                  {order.isPaid ? (
                    <>
                      <Typography variant="subtitle2" className="mt-2 ">
                        Payment Status:{" "}
                        <Chip label="Paid" color="success" size="small" />
                      </Typography>
                      <Typography variant="subtitle2" className="mt-2 ">
                        Payment Method:
                        <span className="font-bold text-blue-600">
                          {" "}
                          {order.paymentMethod}
                        </span>
                      </Typography>
                      <Typography variant="subtitle2" className="mt-2 ">
                        Paid At:{" "}
                        <span className="font-bold text-blue-600">
                          {new Date(order.orderDate).toLocaleString()}
                        </span>
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Typography variant="subtitle2" className="mt-2 ">
                        Payment Action:{" "}
                        <Chip label="Unpaid" color="success" size="small" />
                      </Typography>

                      <Typography variant="subtitle2" className="mt-2 ">
                        Payment Action:{" "}
                        <Chip
                          label="Pay Now"
                          color="info"
                          // size="small"
                          onClick={handlePayment}
                        />
                      </Typography>
                    </>
                  )}
                </Box>
                <Box className="mb-5 ">
                  <Typography
                    variant="h6"
                    className="mb-5 text-xl font-medium text-gray-950 "
                  >
                    ORDER ITEMS:
                  </Typography>
                  <hr className="mt-1 " />
                  {order.orderItems.map((orderItem) => (
                    <Container
                      key={orderItem._id}
                      className="flex items-center justify-between mt-2 "
                    >
                      <Box
                        component="img"
                        alt="The house from the offer."
                        className="rounded-full w-14 h-14"
                        src={`http://127.0.0.1:8000/${orderItem.image}`}
                      />
                      <Typography variant="subtitle2">
                        {/* {orderItem.name} */}
                        <Link
                          to={`/products/${orderItem.product}`}
                          className="no-underline"
                        >
                          {orderItem.name}
                        </Link>
                      </Typography>

                      <Typography variant="subtitle2">
                        <span>{orderItem.qty}</span> x{" "}
                        <span>{orderItem.price}</span> ={" "}
                        <span>
                          ৳{" "}
                          {new Intl.NumberFormat("en-BD").format(
                            parseFloat(orderItem.price) * orderItem.qty
                          )}
                        </span>
                      </Typography>
                    </Container>
                  ))}
                </Box>
              </Item>
            </Grid>
            <Grid item xs={12} md={3}>
              <Item>
                <Typography variant="h6" className="mb-3 text-center ">
                  ORDER SUMMARY
                </Typography>
                <hr />
                <Box>
                  <Container className="flex justify-between mb-1 ">
                    <Typography variant="h6">Items Total:</Typography>
                    <Typography variant="h6">
                      {new Intl.NumberFormat("en-BD").format(order.itemsTotal)}
                    </Typography>
                  </Container>
                  <hr />
                  <Container className="flex justify-between mb-1 ">
                    <Typography variant="h6">Delivery Fee:</Typography>
                    <Typography variant="h6">
                      {" "}
                      {new Intl.NumberFormat("en-BD").format(order.deliveryFee)}
                    </Typography>
                  </Container>
                  <hr />
                  <Container className="flex justify-between mb-1 ">
                    <Typography variant="h6">Vat (7.5%):</Typography>
                    <Typography variant="h6">
                      {new Intl.NumberFormat("en-BD").format(order.vat)}
                    </Typography>
                  </Container>
                  <hr />
                  <Container className="flex justify-between mb-1 ">
                    <Typography variant="h5">Total Payment:</Typography>
                    <Typography variant="h5">
                      ৳{" "}
                      {new Intl.NumberFormat("en-BD").format(
                        order.totalPayment
                      )}
                    </Typography>
                  </Container>
                </Box>
              </Item>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
}

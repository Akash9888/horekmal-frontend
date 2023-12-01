import { Alert, AlertTitle } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ORDER_CREATE_RESET } from "../../constrants/orderConstrants";
import { createOrder } from "../../actions/orderAction";
import OrderCalc from "../../utils/OrderCalc";

const Cancel = () => {
  const orderCreate = useSelector((state) => state.orderCreateR);
  const { order, success, error } = orderCreate;

  const orderData = OrderCalc("unpaid", false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (success) {
      console.log("Already have a order");
      navigate(`/order-details/${order.order_id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    } else {
      console.log("New order has been created");
      dispatch(createOrder(orderData));
    }
  }, [success]);
  return (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      This is an error alert — <strong>check it out!</strong>
    </Alert>
  );
};

export default Cancel;

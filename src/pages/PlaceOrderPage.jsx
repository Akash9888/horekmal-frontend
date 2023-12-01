import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../actions/orderAction";
import { ORDER_CREATE_RESET } from "../constrants/orderConstrants";

const PlaceOrderPage = () => {
  const orderCreate = useSelector((state) => state.orderCreateR);
  const { order, success, error } = orderCreate;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartR);
  const { cartItems, shippingAddress, paymentMethod } = cart;

  let itemsTotal = 0;

  for (let i = 0; i < cartItems.length; i++) {
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
  const navigate = useNavigate();
  useEffect(() => {
    if (success) {
      navigate(`/order-details/${order.order_id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [success]);

  const placeorder = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress: shippingAddress,
        paymentMethod: "paypal",
        itemsTotal: cart.itemsTotal,
        deliveryFee: cart.deliveryFee,
        vat: cart.vat,
        totalPayment: cart.totalPayment,
      })
    );
  };
  return (
    <div>
      <h1>Total Price: {cart.itemsTotal}</h1>
      <h1>Shipping Charge: {cart.deliveryFee}</h1>
      <h1>Tax: {cart.vat}</h1>
      <h1>Total: {cart.totalPayment}</h1>
      <button onClick={placeorder}>Make order</button>
    </div>
  );
};

export default PlaceOrderPage;

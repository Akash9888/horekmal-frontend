import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constrants/cartConstrants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`http://127.0.0.1:8000/api/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      productId: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      stock: data.stock,
      qty,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cartR.cartItems));
};

export const removeFromCart = (_id) => async (dispatch, getState) => {
  console.log("removing from cart reducer", _id);
  dispatch({ type: CART_REMOVE_ITEM, payload: _id });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart?.cartItems));
};

export const saveShippingAddress = (data) => async (dispatch) => {
  console.log(data);
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => async (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
  localStorage.setItem("paymentMethod", JSON.stringify(data));
};

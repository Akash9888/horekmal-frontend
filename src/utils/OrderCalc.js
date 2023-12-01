import { useSelector } from "react-redux";

const OrderCalc = (method, isPaid) => {
  const cart = useSelector((state) => state.cartR);

  const { cartItems, shippingAddress } = cart;

  let itemsTotal = 0;

  for (let i = 0; i < cartItems?.length; i++) {
    itemsTotal += parseFloat(cartItems[i].price) * cartItems[i].qty;
  }
  const deliveryFee = itemsTotal > 1000 ? 0 : 60;
  const vat = (0.075 * itemsTotal).toFixed(2);
  const totalPayment = (
    itemsTotal +
    parseFloat(deliveryFee) +
    parseFloat(vat)
  ).toFixed(2);

  const orderData = {
    orderItems: cartItems,
    shippingAddress: shippingAddress,
    paymentMethod: method,
    itemsTotal: itemsTotal,
    deliveryFee: deliveryFee,
    vat: vat,
    totalPayment: totalPayment,
    isPaid,
  };
  return orderData;
};

export default OrderCalc;

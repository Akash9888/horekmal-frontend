import { Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import SignUp from "./pages/SignUp";
import SingleProduct from "./pages/SingleProduct";
import Navbar from "./components/Navbar";
import Announcement from "./components/Announcement";
import Footer from "./components/Footer";
import ErrorPage from "./pages/ErrorPage";
import Profile from "./pages/Profile";
import CheckoutPage from "./pages/CheckoutPage";
import PrivateRoutes from "./utils/PrivateRoutes";
import PaymentPage from "./pages/PaymentPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import OrderPage from "./pages/OrderPage";
import SignIn from "./pages/SignIn";
import OrderDetails from "./pages/OrderDetails";
import Success from "./pages/payment/Success";
import Cancel from "./pages/payment/Cancel";
import Fail from "./pages/payment/Fail";
import Ipn from "./pages/payment/Ipn";
// import Error from "./components/Error";

const App = () => {
  return (
    <>
      <Navbar />
      {/* <Announcement /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<SingleProduct />} />

        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart/:id?" element={<Cart />} />
        <Route path="/*" element={<PrivateRoutes />}>
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="payment" element={<PaymentPage />} />
          <Route path="placeorder" element={<PlaceOrderPage />} />
          <Route path="my-order" element={<OrderPage />} />
          <Route path="order-details/:id" element={<OrderDetails />} />

          <Route path="payment/success" element={<Success />} />
          <Route path="payment/fail" element={<Fail />} />
          <Route path="payment/cancel" element={<Cancel />} />
          <Route path="payment/ipn" element={<Ipn />} />
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;

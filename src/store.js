import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  productDetailsReducer,
  productListReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from "./reducers/userReducers";
import {
  allOrdersDetailsReducer,
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  sslPaymentReducer,
} from "./reducers/orderReducers";

const reducer = combineReducers({
  productListR: productListReducer,
  productDetailsR: productDetailsReducer,
  cartR: cartReducer,
  userLoginR: userLoginReducer,
  userRegisterR: userRegisterReducer,
  userDetailsR: userDetailsReducer,
  userUpdateProfileR: userUpdateProfileReducer,
  orderCreateR: orderCreateReducer,
  orderDetailsR: orderDetailsReducer,
  allOrdersDetailsR: allOrdersDetailsReducer,
  orderPayR: orderPayReducer,
  sslPaymentR: sslPaymentReducer,
});

// const cartItemsFromStorage = localStorage?.getItem("cartItems");
// const userInfoFromStorage = localStorage?.getItem("userInfo");

// // Check if the values are not null or undefined before parsing as JSON
// const parsedCartItems = cartItemsFromStorage
//   ? JSON.parse(cartItemsFromStorage)
//   : null;
// const parsedUserInfo = userInfoFromStorage
//   ? JSON.parse(userInfoFromStorage)
//   : null;

// const cartItemsFromStorage = localStorage?.getItem("cartItems")
//   ? JSON?.parse(localStorage?.getItem("cartItems"))
//   : [];
// const userInfoFromStorage = localStorage?.getItem("userInfo")
//   ? JSON?.parse(localStorage?.getItem("userInfo"))
//   : null;

// const initialState = {
//   cartR: { cartItems: cartItemsFromStorage },
//   userLoginR: { userInfo: userInfoFromStorage },
// };
// const initialState = {
//   cartR: { cartItems: parsedCartItems },
//   userLoginR: { userInfo: parsedUserInfo },
// };

// const middleware = [thunk];

const cartItemsFromStorage = localStorage.getItem("cartItems");
const userInfoFromStorage = localStorage.getItem("userInfo");
const shippingAddressFromStorage = localStorage.getItem("shippingAddress");

let cartItems = [];
let userInfo = null;
let shippingAddress = {};

if (cartItemsFromStorage) {
  try {
    cartItems = JSON.parse(cartItemsFromStorage);
  } catch (error) {
    console.error("Error parsing 'cartItems' from localStorage:", error);
  }
}

if (userInfoFromStorage) {
  try {
    userInfo = JSON.parse(userInfoFromStorage);
  } catch (error) {
    console.error("Error parsing 'userInfo' from localStorage:", error);
  }
}
if (shippingAddressFromStorage) {
  try {
    shippingAddress = JSON.parse(shippingAddressFromStorage);
  } catch (error) {
    console.error(
      "Error parsing 'shippingAddressFromStorage' from localStorage:",
      error
    );
  }
}

// Now you have 'cartItems' and 'userInfo' variables with valid JSON data or defaults.
const initialState = {
  cartR: { cartItems: cartItems, shippingAddress: shippingAddress },
  userLoginR: { userInfo },
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);
export default store;

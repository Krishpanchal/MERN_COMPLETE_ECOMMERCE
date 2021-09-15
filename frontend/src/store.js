import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productReducer,
  productDetailsReducer,
  newProductReducer,
  deleteProductReducer,
  updateProductReducer,
} from "./reducers/productReducer";
import {
  authReducer,
  deleteUserReducer,
  forgotAndResetPasswordReducer,
  getAllUsersReducer,
  updateUserReducer,
  userDetailsReducer,
  userReducer,
} from "./reducers/userReducers";
import {
  cartActionsReducer,
  cartReducer,
  deleteItemReducer,
} from "./reducers/cartReducer";
import {
  createOrderReducer,
  deleteOrderReducer,
  getAllOrdersReducer,
  getMyOrdersReducer,
  orderDetailsReducer,
  updateOrderReducer,
} from "./reducers/orderReducer";
import { reviewProductReducer } from "./reducers/reviewReducer";

const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  newProduct: newProductReducer,
  deleteProduct: deleteProductReducer,
  updateProduct: updateProductReducer,
  authReducer: authReducer,
  user: userReducer,
  forgotAndResetPassword: forgotAndResetPasswordReducer,
  cartReducer: cartReducer,
  cartActionsReducer: cartActionsReducer,
  deleteCartItem: deleteItemReducer,
  createOrder: createOrderReducer,
  getOrders: getMyOrdersReducer,
  allOrders: getAllOrdersReducer,
  orderDetails: orderDetailsReducer,
  updateOrder: updateOrderReducer,
  deleteOrder: deleteOrderReducer,
  newReview: reviewProductReducer,
  allUsers: getAllUsersReducer,
  deleteUser: deleteUserReducer,
  updateUser: updateUserReducer,
  userDetails: userDetailsReducer,
});

let initialState = {
  cartReducer: {
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

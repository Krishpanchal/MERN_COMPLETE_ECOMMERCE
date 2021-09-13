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
  forgotAndResetPasswordReducer,
  userReducer,
} from "./reducers/userReducers";
import {
  cartActionsReducer,
  cartReducer,
  deleteItemReducer,
} from "./reducers/cartReducer";
import {
  createOrderReducer,
  getAllOrdersReducer,
  getMyOrdersReducer,
  orderDetailsReducer,
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
  newReview: reviewProductReducer,
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

import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productReducer,
  productDetailsReducer,
} from "./reducers/productReducer";
import {
  authReducer,
  forgotAndResetPasswordReducer,
  userReducer,
} from "./reducers/userReducers";
import { cartReducer } from "./reducers/cartReducer";

const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  authReducer: authReducer,
  user: userReducer,
  forgotAndResetPassword: forgotAndResetPasswordReducer,
  cartReducer: cartReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

import React, { useEffect, useState } from "react";

import { Redirect, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./components/Home";
import ProductDetailsPage from "./screens/products/ProductDetailsPage";
import "./App.css";
import Login from "./screens/auth/Login";
import Signup from "./screens/auth/Signup";
import { useSelector, useDispatch } from "react-redux";
import { loadCurrentUser } from "./actions/userActions";
import UserProfile from "./screens/user/UserProfile";
import ProtectedRoute from "./components/route/ProtectedRoute";
import { clearErrors } from "./actions/productActions";
import UpdateUser from "./screens/user/UpdateUser";
import UpdatePassword from "./screens/user/UpdatePassword";
import ForgotPassword from "./screens/auth/ForgotPassword";
import ResetPassword from "./screens/auth/ResetPassword";
import { fetchCartItems } from "./actions/cartActions";
import { Dashboard } from "./screens/Adminpages/Dashboard";
import AdminProducts from "./screens/Adminpages/products/AdminProducts";
import CreateProduct from "./screens/Adminpages/products/CreateProduct";
import UpdateProduct from "./screens/Adminpages/products/UpdateProduct";
import Cart from "./screens/cart/Cart";
import Shipping from "./screens/cart/Shipping";
import CofirmOrder from "./screens/cart/CofirmOrder";
import axios from "axios";
import Payment from "./screens/cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentSuccess from "./screens/cart/PaymentSuccess";
import MyOrders from "./screens/orders/MyOrders";
import OrderDetails from "./screens/orders/OrderDetails";
import AllOrders from "./screens/Adminpages/Orders/AllOrders";

function App() {
  const { isAuthenticated, error } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  const [stripeApiKey, setStripeApiKey] = useState("");

  useEffect(() => {
    async function getStripeApiKey() {
      const { data } = await axios.get("/api/v1/payment/stripeApi");

      setStripeApiKey(data.stripeApiKey);
    }

    getStripeApiKey();
  }, []);

  useEffect(() => {
    dispatch(loadCurrentUser());
    console.log("From load");
  }, [dispatch]);

  useEffect(() => {
    console.log("From clear");

    dispatch(clearErrors());
  }, [error, dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCartItems());
    }
  }, [isAuthenticated, dispatch]);

  return (
    <Layout>
      <div className='container container-fluid'>
        <Route path='/' component={Home} exact />
        <Route path='/search/:keyword' component={Home} exact />
        <Route path='/product/:id' component={ProductDetailsPage} exact />
        <Route path='/login' exact>
          {isAuthenticated ? <Redirect to='/' /> : <Login />}
        </Route>
        <Route path='/signup' exact>
          {isAuthenticated ? <Redirect to='/' /> : <Signup />}
        </Route>

        <Route path='/forgotPassword' exact>
          {isAuthenticated ? <Redirect to='/' /> : <ForgotPassword />}
        </Route>

        <Route path='/resetPassword/:token' exact>
          {isAuthenticated ? <Redirect to='/' /> : <ResetPassword />}
        </Route>

        <ProtectedRoute path='/me' component={UserProfile} exact />
        <ProtectedRoute path='/update/me' component={UpdateUser} exact />
        <ProtectedRoute
          path='/updatePassword/me'
          component={UpdatePassword}
          exact
        />

        <ProtectedRoute path='/cart' component={Cart} exact />
        <ProtectedRoute path='/shipping' component={Shipping} exact />
        <ProtectedRoute path='/confirm' component={CofirmOrder} exact />
        {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <ProtectedRoute path='/payment' component={Payment} exact />
          </Elements>
        )}
        <ProtectedRoute path='/success' component={PaymentSuccess} exact />
        <ProtectedRoute path='/orders' component={MyOrders} exact />
        <ProtectedRoute path='/order/:id' component={OrderDetails} exact />
      </div>

      <ProtectedRoute
        path='/dashboard'
        isAdmin={true}
        component={Dashboard}
        exact
      />

      <ProtectedRoute
        path='/admin/products'
        isAdmin={true}
        component={AdminProducts}
        exact
      />

      <ProtectedRoute
        path='/admin/createProduct'
        isAdmin={true}
        component={CreateProduct}
        exact
      />

      <ProtectedRoute
        path='/admin/products/:id'
        isAdmin={true}
        component={UpdateProduct}
        exact
      />

      <ProtectedRoute
        path='/admin/orders'
        isAdmin={true}
        component={AllOrders}
        exact
      />
    </Layout>
  );
}

export default App;

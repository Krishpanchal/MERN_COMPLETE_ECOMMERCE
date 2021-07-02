import React, { useEffect } from "react";

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

function App() {
  const { isAuthenticated, error } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

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
      </div>
    </Layout>
  );
}

export default App;

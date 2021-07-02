import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, loading } = useSelector(
    (state) => state.authReducer
  );

  return (
    <Fragment>
      {!loading && (
        <Route
          {...rest}
          render={(props) => {
            if (!isAuthenticated) {
              return <Redirect to='/login' />;
            }

            return <Component {...props} />;
          }}
        />
      )}
    </Fragment>
  );
};

export default ProtectedRoute;

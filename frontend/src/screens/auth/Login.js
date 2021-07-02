import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Spinner } from "react-bootstrap";

import Metadata from "../../components/layout/Metadata";
import { useAlert } from "react-alert";
import { clearErrors, loginUser } from "../../actions/userActions";
import { Link } from "react-router-dom";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.authReducer
  );

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(loginUser(email, password));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [isAuthenticated, error, alert, dispatch]);

  return (
    <Fragment>
      <Metadata title={"Login"} />

      <div className='row wrapper'>
        <div className='col-10 col-lg-5'>
          <form className='shadow-lg' onSubmit={submitHandler}>
            <h1 className='mb-3'>Login</h1>
            <div className='form-group'>
              <label htmlFor='email_field'>Email</label>
              <input
                type='email'
                id='email_field'
                className='form-control'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className='form-group'>
              <label htmlFor='password_field'>Password</label>
              <input
                type='password'
                id='password_field'
                className='form-control'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Link to='/forgotPassword' className='float-right mb-4'>
              Forgot Password?
            </Link>

            <button
              id='login_button'
              type='submit'
              className='btn btn-block py-3'
              disabled={loading}>
              {loading ? (
                <Spinner
                  as='span'
                  animation='grow'
                  size='sm'
                  role='status'
                  aria-hidden='true'
                />
              ) : (
                "Login"
              )}
            </button>

            <Link to='/signup' className='float-right mt-3'>
              New User?
            </Link>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;

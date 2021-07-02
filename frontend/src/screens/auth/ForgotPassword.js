import React from "react";
import { useState } from "react";
import Metadata from "../../components/layout/Metadata";
import { useAlert } from "react-alert";
import { clearErrors, forgotUserPassword } from "../../actions/userActions";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RESET_USER_UPDATE_PROFILE } from "../../constants/userConstants";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert();

  const { isLoading, error, message } = useSelector(
    (state) => state.forgotAndResetPassword
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch, alert]);

  useEffect(() => {
    if (message) {
      alert.success(message);
      dispatch({ type: RESET_USER_UPDATE_PROFILE });
    }
  }, [message, alert, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(forgotUserPassword({ email }));
  };

  return (
    <React.Fragment>
      <Metadata title={"Forgot Password"} />

      <div className='row wrapper'>
        <div className='col-10 col-lg-5'>
          <form className='shadow-lg' onSubmit={handleSubmit}>
            <h1 className='mb-3'>Forgot Password</h1>
            <div className='form-group'>
              <label htmlFor='email_field'>Enter Email</label>
              <input
                type='email'
                id='email_field'
                className='form-control'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              id='login_button'
              type='submit'
              className='btn btn-block py-3'
              disabled={isLoading}>
              {isLoading ? (
                <Spinner
                  as='span'
                  animation='grow'
                  size='sm'
                  role='status'
                  aria-hidden='true'
                />
              ) : (
                "Send Email"
              )}
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ForgotPassword;

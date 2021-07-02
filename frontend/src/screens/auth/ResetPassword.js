import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors, resetUserPassword } from "../../actions/userActions";
import Metadata from "../../components/layout/Metadata";
import { RESET_USER_UPDATE_PROFILE } from "../../constants/userConstants";
import { Spinner } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";

const ResetPassword = () => {
  const [updateUser, setUpdatedUser] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const { token } = useParams();
  const history = useHistory();
  const { newPassword, confirmPassword } = updateUser;
  const alert = useAlert();
  const dispatch = useDispatch();
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
      alert.success("PASSWORD UPDATED SUCCESSFULLY");
      dispatch({ type: RESET_USER_UPDATE_PROFILE });
      history.push("/login");
    }
  }, [message, alert, dispatch, history]);

  const handlerUserChange = (e) => {
    setUpdatedUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return;
    }

    console.log(token);
    dispatch(
      resetUserPassword(
        {
          password: newPassword,
          confirmPassword: confirmPassword,
        },
        token
      )
    );
  };

  return (
    <React.Fragment>
      <Metadata title={"ResetPassword"} />

      <div className='row wrapper'>
        <div className='col-10 col-lg-5'>
          <form className='shadow-lg' onSubmit={handleSubmit}>
            <h1 className='mb-3'>New Password</h1>

            <div className='form-group'>
              <label htmlFor='password_field'>Password</label>
              <input
                type='password'
                id='password_field'
                className='form-control'
                name='newPassword'
                value={newPassword}
                onChange={handlerUserChange}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='confirm_password_field'>Confirm Password</label>
              <input
                type='password'
                id='confirm_password_field'
                className='form-control'
                value={confirmPassword}
                name='confirmPassword'
                onChange={handlerUserChange}
              />
            </div>

            {newPassword !== confirmPassword && (
              <p style={{ fontSize: "15px", color: "red" }}>
                Passwords do not match
              </p>
            )}

            <button
              id='register_button'
              type='submit'
              className='btn update-btn btn-block mt-4 mb-3'
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
                "Set Password"
              )}
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ResetPassword;

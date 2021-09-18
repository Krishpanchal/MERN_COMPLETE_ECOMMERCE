import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  loadCurrentUser,
  updateUserPassword,
} from "../../actions/userActions";
import Metadata from "../../components/layout/Metadata";
import { useAlert } from "react-alert";
import { Spinner } from "react-bootstrap";
import { RESET_USER_UPDATE_PROFILE } from "../../constants/userConstants";

const UpdatePassword = ({ history }) => {
  const dispatch = useDispatch();
  const { isLoading, isUpdated, error } = useSelector((state) => state.user);

  const [updateUser, setUpdatedUser] = useState({
    oldpassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { oldpassword, newPassword, confirmPassword } = updateUser;
  const alert = useAlert();

  useEffect(() => {
    console.log("Hello");
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch, alert]);

  useEffect(() => {
    console.log("from isUpdated");
    if (isUpdated) {
      alert.success("Password updated Successfully");
      dispatch(loadCurrentUser());
      history.push("/me");
      dispatch({ type: RESET_USER_UPDATE_PROFILE });
    }
  }, [isUpdated, alert, dispatch, history]);

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

    dispatch(
      updateUserPassword({
        currentPassword: oldpassword,
        newPassword: newPassword,
      })
    );
  };

  return (
    <React.Fragment>
      <Metadata title='Update Password' />
      <div className='row wrapper'>
        <div className='col-10 col-lg-5'>
          <form className='shadow-lg' onSubmit={handleSubmit}>
            <h1 className='mt-2 mb-5'>Update Password</h1>
            <div className='form-group'>
              <label htmlFor='old_password_field'>Old Password</label>
              <input
                type='password'
                id='old_password_field'
                className='form-control'
                name='oldpassword'
                value={oldpassword}
                onChange={handlerUserChange}
                required
              />
            </div>

            <div className='form-group'>
              <label htmlFor='new_password_field'>New Password</label>
              <input
                type='password'
                id='new_password_field'
                className='form-control'
                name='newPassword'
                value={newPassword}
                onChange={handlerUserChange}
                required
              />
            </div>

            <div className='form-group'>
              <label htmlFor='confirm_password_field'>Confirm Password</label>
              <input
                type='password'
                id='confirm_password_field'
                className='form-control'
                name='confirmPassword'
                value={confirmPassword}
                onChange={handlerUserChange}
                required
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
                "Update Password"
              )}
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UpdatePassword;

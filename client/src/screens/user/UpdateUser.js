import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Spinner } from "react-bootstrap";

import Metadata from "../../components/layout/Metadata";
import { useAlert } from "react-alert";
import {
  clearErrors,
  loadCurrentUser,
  updateUserProfile,
} from "../../actions/userActions";
import { RESET_USER_UPDATE_PROFILE } from "../../constants/userConstants";

const UpdateUser = ({ history }) => {
  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    email: "",
  });
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  const { user } = useSelector((state) => state.authReducer);
  const { isUpdated, error, isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (user) {
      setUpdatedUser({
        name: user.name || "",
        email: user.email || "",
      });

      if (user.avatar) setAvatarPreview(user.avatar.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("User updated Successfully");
      dispatch(loadCurrentUser());
      history.push("/me");
      dispatch({ type: RESET_USER_UPDATE_PROFILE });
    }
  }, [user, isUpdated, dispatch, history, error, alert]);

  const onInputChangeHandler = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      if (e.target.files[0]) reader.readAsDataURL(e.target.files[0]);
    } else {
      setUpdatedUser((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", updatedUser.name);
    formData.set("email", updatedUser.email);
    formData.set("avatar", avatar);

    dispatch(updateUserProfile(formData));
  };

  return (
    <Fragment>
      <Metadata title={"Update User"} />
      <div className='row wrapper'>
        <div className='col-10 col-lg-5'>
          <form
            className='shadow-lg'
            onSubmit={submitHandler}
            encType='multipart/form-data'>
            <h1 className='mt-2 mb-5'>Update Profile</h1>

            <div className='form-group'>
              <label htmlFor='email_field'>Name</label>
              <input
                type='name'
                id='name_field'
                className='form-control'
                name='name'
                value={updatedUser.name}
                onChange={onInputChangeHandler}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='email_field'>Email</label>
              <input
                type='email'
                id='email_field'
                className='form-control'
                name='email'
                value={updatedUser.email}
                onChange={onInputChangeHandler}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='avatar_upload'>Avatar</label>
              <div className='d-flex align-items-center'>
                <div>
                  <figure className='avatar mr-3 item-rtl'>
                    <img
                      src={avatarPreview}
                      className='rounded-circle'
                      alt='Avatar Preview'
                    />
                  </figure>
                </div>
                <div className='custom-file'>
                  <input
                    type='file'
                    name='avatar'
                    className='custom-file-input'
                    id='customFile'
                    accept='images/*'
                    onChange={onInputChangeHandler}
                  />
                  <label className='custom-file-label' htmlFor='customFile'>
                    Choose Avatar
                  </label>
                </div>
              </div>
            </div>

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
                "Update"
              )}
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateUser;

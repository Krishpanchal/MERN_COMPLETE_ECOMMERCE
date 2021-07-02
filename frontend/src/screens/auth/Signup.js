import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Spinner } from "react-bootstrap";

import Metadata from "../../components/layout/Metadata";
import { useAlert } from "react-alert";
import { clearErrors, signupUser } from "../../actions/userActions";

const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.png"
  );

  const { name, email, password, confirmPassword } = user;

  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.authReducer
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [isAuthenticated, error, alert, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return;
    }

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("avatar", avatar);

    dispatch(signupUser(formData));
  };

  const handlerUserChange = (e) => {
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
      setUser((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  return (
    <Fragment>
      <Metadata title={"Signup"} />

      <div className='row wrapper'>
        <div className='col-10 col-lg-5'>
          <form
            className='shadow-lg'
            encType='multipart/form-data'
            onSubmit={submitHandler}>
            <h1 className='mb-3'>Register</h1>

            <div className='form-group'>
              <label htmlFor='name_field'>Name</label>
              <input
                type='name'
                id='name_field'
                name='name'
                className='form-control'
                value={name}
                onChange={handlerUserChange}
                required
              />
            </div>

            <div className='form-group'>
              <label htmlFor='email_field'>Email</label>
              <input
                type='email'
                id='email_field'
                name='email'
                className='form-control'
                value={email}
                onChange={handlerUserChange}
                required
              />
            </div>

            <div className='form-group'>
              <label htmlFor='password_field'>Password</label>
              <input
                type='password'
                id='password_field'
                name='password'
                className='form-control'
                value={password}
                onChange={handlerUserChange}
                required
              />
            </div>

            <div className='form-group'>
              <label htmlFor='conf_password_field'>Confirm Password</label>
              <input
                type='password'
                id='conf_password_field'
                className='form-control'
                name='confirmPassword'
                value={confirmPassword}
                onChange={handlerUserChange}
                required
              />
            </div>

            {password !== confirmPassword && (
              <p style={{ fontSize: "15px", color: "red" }}>
                Passwords do not match
              </p>
            )}

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
                    onChange={handlerUserChange}
                    required
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
                "Regiser"
              )}
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Signup;

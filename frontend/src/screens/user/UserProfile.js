import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../../components/layout/Loader";

const formatDate = (date) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

const UserProfile = () => {
  const { user, loading, error } = useSelector((state) => state.authReducer);

  const content = loading ? (
    <Loader />
  ) : error ? (
    <h1>Error</h1>
  ) : (
    <div>
      <h2 className='mt-5 ml-5'>{user.name}'s Profile</h2>
      <div className='row justify-content-around mt-5 user-info'>
        <div className='col-12 col-md-3'>
          <figure className='avatar avatar-profile'>
            <img
              className='rounded-circle img-fluid'
              src={user.avatar.url}
              alt={user.name}
            />
          </figure>
          <Link
            to='/update/me'
            id='edit_profile'
            className='btn btn-primary btn-block my-5'>
            Edit Profile
          </Link>
        </div>

        <div className='col-12 col-md-5'>
          <h4>Full Name</h4>
          <p>{user.name}</p>

          <h4>Email Address</h4>
          <p>{user.email}</p>

          <h4>Joined On</h4>
          <p>{formatDate(user.createdAt)}</p>

          {user.role !== "admin" && (
            <Link to='/orders/me' className='btn btn-danger btn-block mt-5'>
              My Orders
            </Link>
          )}

          <Link
            to='/updatePassword/me'
            className='btn btn-primary btn-block mt-3'>
            Change Password
          </Link>
        </div>
      </div>
    </div>
  );

  return content;
};

export default UserProfile;

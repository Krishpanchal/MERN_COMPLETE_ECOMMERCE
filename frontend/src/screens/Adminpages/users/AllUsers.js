import React, { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getAllUsers } from "../../../actions/userActions";
import Sidebar from "../../../components/admin/Sidebar";
import Users from "../../../components/admin/users/Users";
import Loader from "../../../components/layout/Loader";
import Metadata from "../../../components/layout/Metadata";
import { DELETE_USER_RESET } from "../../../constants/userConstants";

const AllUsers = () => {
  const { loading, error, users } = useSelector((state) => state.allUsers);
  const { isDeleted } = useSelector((state) => state.deleteUser);

  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (isDeleted) {
      alert.success("User deleted successfully!");
      dispatch(getAllUsers());
      dispatch({ type: DELETE_USER_RESET });
    }
  }, [isDeleted, dispatch, alert]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      return dispatch(clearErrors());
    }
  }, [error, dispatch, alert]);

  console.log(`users, ${users}`);

  return (
    <Fragment>
      <Metadata title='All Users' />
      <div className='row'>
        <div className='col-12 col-md-2'>
          <Sidebar />
        </div>

        <div className='col-12 col-md-10'>
          <Fragment>
            <h1 className='my-5'>All Users</h1>
            {loading ? <Loader /> : <Users users={users} />}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default AllUsers;

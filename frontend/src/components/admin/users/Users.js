import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import SpinLoader from "../../layout/SpinLoader";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors, deleteUser } from "../../../actions/userActions";

const Users = ({ users }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.deleteUser);
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors(error));
    }
  }, [error, dispatch, alert]);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };
  const setUsers = () => {
    const data = {
      columns: [
        {
          label: "User ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Email",
          field: "email",
          sort: "asc",
        },
        {
          label: "Role",
          field: "role",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    users &&
      users.forEach((user) => {
        data.rows.push({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          actions: (
            <Fragment>
              <Link
                to={`/admin/users/${user._id}`}
                className='btn btn-primary py-1 px-2'>
                <i className='fa fa-pencil'></i>
              </Link>
              <button
                className='btn btn-danger py-1 px-2 ml-2'
                onClick={() => handleDelete(user._id)}>
                {loading ? <SpinLoader /> : <i className='fa fa-trash'></i>}
              </button>
            </Fragment>
          ),
        });
      });

    return data;
  };

  return (
    <MDBDataTable data={setUsers()} className='px-3' bordered striped hover />
  );
};

export default Users;

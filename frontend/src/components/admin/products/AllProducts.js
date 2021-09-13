import React from "react";
import { Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { clearErrors, deleteProduct } from "../../../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import SpinLoader from "../../../components/layout/SpinLoader";

const AllProducts = ({ products }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.deleteProduct);
  const alert = useAlert();
  const history = useHistory();

  useEffect(() => {
    console.log("Error");
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch, alert, history]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const setProducts = () => {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Price",
          field: "price",
          sort: "asc",
        },
        {
          label: "Stock",
          field: "stock",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    products.forEach((product) => {
      data.rows.push({
        id: <Link to={`/product/${product._id}`}>{product._id}</Link>,
        name: product.name,
        price: `$${product.price}`,
        stock: product.stock,
        actions: (
          <Fragment>
            <Link
              to={`/admin/products/${product._id}`}
              className='btn btn-primary py-1 px-2 '>
              <i className='fa fa-pencil'></i>
            </Link>

            <button
              className='btn btn-danger py-1 px-2 ml-2'
              disabled={loading}
              onClick={() => handleDelete(product._id)}>
              {loading ? <SpinLoader /> : <i className='fa fa-trash'></i>}
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  return (
    <MDBDataTable
      data={setProducts()}
      className='px-3'
      bordered
      striped
      hover
    />
  );
};

export default AllProducts;

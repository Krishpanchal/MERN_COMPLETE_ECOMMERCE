import React, { useState } from "react";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { clearErrors, updateProduct } from "../../../actions/productActions";
import { UPDATE_PRODUCT_RESET } from "../../../constants/productConstants";
import Sidebar from "../../admin/Sidebar";
import SpinLoader from "../../layout/SpinLoader";

const UpdateProductForm = ({ product }) => {
  const dispatch = useDispatch();
  const { error, isUpdated, loading } = useSelector(
    (state) => state.updateProduct
  );
  const alert = useAlert();
  const history = useHistory();

  const [updatedProduct, setUpdatedProduct] = useState({
    name: product.name || "",
    price: product.price || "",
    description: product.description || "",
    category: product.category || "",
    stock: product.stock || "",
    seller: product.seller || "",
    oldImages: product.images || [],
  });

  const categories = [
    "Electronics",
    "Cameras",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Clothes/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home",
  ];

  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const { name, price, description, category, stock, seller, oldImages } =
    updatedProduct;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [alert, dispatch, error]);

  useEffect(() => {
    if (isUpdated) {
      history.push("/admin/products");
      alert.success("Product updated successfully!");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [isUpdated, history, dispatch, alert]);

  const handleProductChange = (e) => {
    setUpdatedProduct((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    setImagesPreview([]);
    setImages([]);
    setUpdatedProduct((prevState) => {
      return {
        ...prevState,
        oldImages: [],
      };
    });

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", +price);
    formData.set("description", description);
    formData.set("category", category);
    formData.set("stock", +stock);
    formData.set("seller", seller);

    images.forEach((image) => {
      formData.append("images", image);
    });

    dispatch(updateProduct(product._id, formData));
  };

  return (
    <React.Fragment>
      <div className='row'>
        <div className='col-12 col-md-2'>
          <Sidebar />
        </div>

        <div className='col-12 col-md-10'>
          <React.Fragment>
            <div className='wrapper my-5'>
              <form
                className='shadow-lg'
                onSubmit={submitHandler}
                encType='multipart/form-data'>
                <h1 className='mb-4'>Update Product</h1>

                <div className='form-group'>
                  <label htmlFor='name_field'>Name</label>
                  <input
                    type='text'
                    id='name_field'
                    className='form-control'
                    value={name}
                    name={"name"}
                    onChange={handleProductChange}
                    required
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='price_field'>Price</label>
                  <input
                    type='number'
                    id='price_field'
                    className='form-control'
                    value={price}
                    name={"price"}
                    onChange={handleProductChange}
                    required
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='description_field'>Description</label>
                  <textarea
                    className='form-control'
                    id='description_field'
                    rows='8'
                    value={description}
                    name={"description"}
                    required
                    onChange={handleProductChange}></textarea>
                </div>

                <div className='form-group'>
                  <label htmlFor='category_field'>Category</label>
                  <select
                    className='form-control'
                    id='category_field'
                    value={category}
                    name={"category"}
                    onChange={handleProductChange}>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='form-group'>
                  <label htmlFor='stock_field'>Stock</label>
                  <input
                    type='number'
                    id='stock_field'
                    className='form-control'
                    value={stock}
                    name={"stock"}
                    onChange={handleProductChange}
                    required
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='seller_field'>Seller Name</label>
                  <input
                    type='text'
                    id='seller_field'
                    className='form-control'
                    value={seller}
                    name={"seller"}
                    onChange={handleProductChange}
                    required
                  />
                </div>

                <div className='form-group'>
                  <label>Images</label>

                  <div className='custom-file'>
                    <input
                      type='file'
                      name='product_images'
                      className='custom-file-input'
                      id='customFile'
                      multiple
                      onChange={onChange}
                      // required
                    />
                    <label className='custom-file-label' htmlFor='customFile'>
                      Choose Images
                    </label>
                  </div>

                  {oldImages &&
                    oldImages.map((img) => (
                      <img
                        key={img.url}
                        src={img.url}
                        alt={img.url}
                        className='mt-2 mr-2'
                        width='80'
                        height='80'
                        style={{
                          borderRadius: "10px",
                        }}
                      />
                    ))}

                  {imagesPreview.map((img) => (
                    <img
                      src={img}
                      key={img}
                      alt='Images Preview'
                      className='mt-3 mr-2'
                      width='80'
                      height='80'
                      style={{
                        borderRadius: "10px",
                      }}
                    />
                  ))}
                </div>

                <button
                  id='login_button'
                  type='submit'
                  className='btn btn-block py-3'
                  disabled={loading}>
                  {loading ? <SpinLoader /> : "Update Product"}
                </button>
              </form>
            </div>
          </React.Fragment>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UpdateProductForm;

import React, { Fragment, useEffect, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import Metadata from "./layout/Metadata";
import ProductItem from "./products/ProductItem";
import Loader from "./layout/Loader";
import { useAlert } from "react-alert";
import Pagination from "./layout/Pagination";
import { useParams } from "react-router-dom";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const categories = [
  "Electronics",
  "Cameras",
  "Laptops",
  "Accessories",
  "Headphones",
  "Food",
  "Books",
  "Cloths/Shoes",
  "Beauty/Health",
  "Sports",
  "Outdoor",
  "Home",
];

const Home = () => {
  const {
    products,
    loading,
    error,
    productsPerPage,
    productsCount,
    filteredProductsCount,
  } = useSelector((state) => state.products);
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);

  const dispatch = useDispatch();
  const alert = useAlert();

  const { keyword } = useParams();

  useEffect(() => {
    dispatch(getProducts(keyword, currentPage, price, category, rating));
  }, [alert, currentPage, keyword, price, category, rating, dispatch]);

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
  }, [dispatch, error, alert]);

  const handleCurrentPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const content =
    products &&
    products.map((product) => (
      <ProductItem key={product._id} product={product} col={4} />
    ));

  const filteredContent = (
    <Fragment>
      <div className='col-6 col-md-3 mt-5 mb-5'>
        <div className='px-5'>
          <Range
            marks={{
              1: "$1",
              1000: "$1000",
            }}
            min={1}
            max={1000}
            defaultValue={[1, 1000]}
            tipFormatter={(value) => `${value}`}
            tipProps={{
              placement: "top",
              visible: true,
            }}
            value={price}
            onChange={(price) => setPrice(price)}
          />

          <hr className='my=5' />

          <div className='mt-5'>
            <h4 className='mb-3'>Categories</h4>

            <ul className='pl-0'>
              {categories.map((category) => (
                <li
                  style={{
                    cursor: "pointer",
                    listStyleType: "none",
                  }}
                  key={category}
                  onClick={() => setCategory(category)}>
                  {category}
                </li>
              ))}
            </ul>
          </div>

          <div className='mt-5'>
            <h4 className='mb-3'>Ratings</h4>

            <ul className='pl-0'>
              {[5, 4, 3, 2, 1].map((star) => (
                <li
                  style={{
                    cursor: "pointer",
                    listStyleType: "none",
                  }}
                  key={star}
                  onClick={() => setRating(star)}>
                  <div className='rating-outer'>
                    <div
                      className='rating-inner'
                      style={{ width: `${star * 20}%` }}></div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className='col-6 col-md-9'>
        <div className='row'>
          {products &&
            products.map((product) => (
              <ProductItem key={product._id} product={product} col={4} />
            ))}
        </div>
      </div>
    </Fragment>
  );

  let count = keyword ? filteredProductsCount : productsCount;

  return (
    <Fragment>
      <Metadata title={"Buy Best Products Online"} />
      <h1 id='products-heading'>Latest Products</h1>

      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <section id='products' className='container mt-5'>
            <div className='row'>{keyword ? filteredContent : content}</div>
          </section>
          {productsPerPage < count && (
            <Pagination
              productsPerPage={productsPerPage}
              productsCount={productsCount}
              currentPage={currentPage}
              onChange={handleCurrentPageChange}
            />
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;

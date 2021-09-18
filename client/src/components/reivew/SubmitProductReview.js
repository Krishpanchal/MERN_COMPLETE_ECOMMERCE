import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Fragment } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../actions/productActions";
import { clearErrors, newProductReview } from "../../actions/reviewsAction";
import { NEW_REVIEW_RESET } from "../../constants/reviewConstants";

const SubmitProductReview = ({ id }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { user } = useSelector((state) => state.authReducer);
  const { error, success } = useSelector((state) => state.newReview);
  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch, alert]);

  useEffect(() => {
    if (success) {
      dispatch(getProductDetails(id));
      alert.success("review added successfully!");
      dispatch({ type: NEW_REVIEW_RESET });
    }
  }, [dispatch, alert, success, id]);

  function setUserRatings() {
    const stars = document.querySelectorAll(".star");

    stars.forEach((star, index) => {
      star.starValue = index + 1;

      ["click", "mouseover", "mouseout"].forEach(function (e) {
        star.addEventListener(e, showRatings);
      });
    });

    function showRatings(e) {
      stars.forEach((star, index) => {
        if (e.type === "click") {
          if (index < this.starValue) {
            star.classList.add("orange");

            setRating(this.starValue);
          } else {
            star.classList.remove("orange");
          }
        }

        if (e.type === "mouseover") {
          if (index < this.starValue) {
            star.classList.add("yellow");
          } else {
            star.classList.remove("yellow");
          }
        }

        if (e.type === "mouseout") {
          star.classList.remove("yellow");
        }
      });
    }
  }

  const reviewhandler = () => {
    const data = {
      rating: rating,
      comment: comment,
    };

    dispatch(newProductReview(data, id));
  };

  return (
    <Fragment>
      {user && (
        <button
          id='review_btn'
          type='button'
          className='btn btn-primary mt-4'
          data-toggle='modal'
          data-target='#ratingModal'
          onClick={setUserRatings}>
          Submit Your Review
        </button>
      )}

      <div className='row mt-2 mb-5'>
        <div className='rating w-50'>
          <div
            className='modal fade'
            id='ratingModal'
            tabIndex='-1'
            role='dialog'
            aria-labelledby='ratingModalLabel'
            aria-hidden='true'>
            <div className='modal-dialog' role='document'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title' id='ratingModalLabel'>
                    Submit Review
                  </h5>
                  <button
                    type='button'
                    className='close'
                    data-dismiss='modal'
                    aria-label='Close'>
                    <span aria-hidden='true'>&times;</span>
                  </button>
                </div>
                <div className='modal-body'>
                  <ul className='stars'>
                    <li className='star'>
                      <i className='fa fa-star'></i>
                    </li>
                    <li className='star'>
                      <i className='fa fa-star'></i>
                    </li>
                    <li className='star'>
                      <i className='fa fa-star'></i>
                    </li>
                    <li className='star'>
                      <i className='fa fa-star'></i>
                    </li>
                    <li className='star'>
                      <i className='fa fa-star'></i>
                    </li>
                  </ul>

                  <textarea
                    name='review'
                    id='review'
                    className='form-control mt-3'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required></textarea>

                  <button
                    className='btn my-3 float-right review-btn px-4 text-white'
                    data-dismiss='modal'
                    aria-label='Close'
                    onClick={reviewhandler}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SubmitProductReview;

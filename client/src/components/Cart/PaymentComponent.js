import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";
import SpinLoader from "../layout/SpinLoader";
import { useAlert } from "react-alert";
import { clearErrors, createOrder } from "../../actions/orderActions";

const options = {
  style: {
    base: {
      fontSize: "16px",
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

const getCartItemsString = (cart) => {
  let cartString = cart.map((item) => {
    return item.product.name;
  });

  return cartString;
};

const getOrderItems = (cart) => {
  const order = cart.map((item) => {
    return {
      name: item.product.name,
      quantity: item.totalQuantity,
      image: item.product.images[0].url,
      price: item.product.price,
      product: item.product._id,
    };
  });

  return order;
};

const PaymentComponent = () => {
  const [loading, setLoading] = useState();
  const history = useHistory();
  const alert = useAlert();
  const dispatch = useDispatch();

  const elements = useElements();
  const stripe = useStripe();

  const { user } = useSelector((state) => state.authReducer);
  const { cartTotalPrice, shippingInfo, cartItems } = useSelector(
    (state) => state.cartReducer
  );
  const { error } = useSelector((state) => state.createOrder);

  const shippingPrice = cartTotalPrice > 200 ? 25 : 0;
  const taxPrice = Number((0.05 * cartTotalPrice).toFixed(2));
  const totalPrice = cartTotalPrice + shippingPrice + taxPrice;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch, alert]);

  const order = {
    orderItems: getOrderItems(cartItems),
    shippingInfo,
    taxPrice,
    shippingPrice,
    totalPrice,
  };

  const paymentData = {
    amount: Math.round(totalPrice * 100),
    description: getCartItemsString(cartItems).toString(),
    shipping: {
      name: user.name,
      address: {
        line1: shippingInfo.address,
        postal_code: shippingInfo.postalCode,
        city: shippingInfo.city,
        state: shippingInfo.city,
        country: shippingInfo.country,
      },
    },
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    console.log(paymentData.description);
    setLoading(true);

    let res;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      res = await axios.post("/api/v1/payment/process", paymentData, config);

      const clientSecret = res.data.client_secret;

      if (!stripe || !elements) {
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });

      setLoading(false);

      if (result.error) {
        alert.error(result.error.message);
        setLoading(false);
      } else {
        // The payment is processed or not
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));

          history.push("/success");
        } else {
          alert.error("There is some issue while payment processing");
        }
      }
    } catch (error) {
      setLoading(false);
      alert.error(error.response.data.message);
    }
  };

  return (
    <div className='row wrapper'>
      <div className='col-10 col-lg-5'>
        <form className='shadow-lg' onSubmit={submitHandler}>
          <h1 className='mb-4'>Card Info</h1>
          <div className='form-group'>
            <label htmlFor='card_num_field'>Card Number</label>
            <CardNumberElement
              type='text'
              id='card_num_field'
              className='form-control'
              required
              options={options}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='card_exp_field'>Card Expiry</label>
            <CardExpiryElement
              type='text'
              id='card_exp_field'
              className='form-control'
              required
              options={options}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='card_cvc_field'>Card CVC</label>
            <CardCvcElement
              type='text'
              id='card_cvc_field'
              className='form-control'
              required
              options={options}
            />
          </div>

          <button
            id='pay_btn'
            type='submit'
            className='btn btn-block py-3'
            disabled={loading ? true : false}>
            {loading ? <SpinLoader /> : `Pay - ${totalPrice}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentComponent;

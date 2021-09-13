import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../actions/cartActions";
import Metadata from "../../components/layout/Metadata";
import CheckoutSteps from "../../components/Cart/CheckoutSteps";

import { countries } from "countries-list";

const Shipping = ({ history }) => {
  const { shippingInfo } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  const countriesList = Object.values(countries);

  const [info, setInfo] = useState({
    address: shippingInfo.address || "",
    postalCode: shippingInfo.postalCode || "",
    city: shippingInfo.city || "",
    phoneNumber: shippingInfo.phoneNumber || "",
    country: shippingInfo.country || "",
  });

  const { address, postalCode, city, phoneNumber, country } = info;

  const handleChange = (e) => {
    // const [name, value] = e.target;

    setInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      saveShippingInfo({ address, postalCode, city, phoneNumber, country })
    );
    history.push("/confirm");
  };

  return (
    <Fragment>
      <Metadata title='Shipping' />

      <CheckoutSteps shipping />

      <div className='row wrapper'>
        <div className='col-10 col-lg-5'>
          <form className='shadow-lg' onSubmit={submitHandler}>
            <h1 className='mb-4'>Shipping Info</h1>
            <div className='form-group'>
              <label htmlFor='address_field'>Address</label>
              <input
                type='text'
                id='address_field'
                className='form-control'
                value={address}
                name='address'
                onChange={handleChange}
                required
              />
            </div>

            <div className='form-group'>
              <label htmlFor='city_field'>City</label>
              <input
                type='text'
                id='city_field'
                className='form-control'
                value={city}
                name='city'
                onChange={handleChange}
                required
              />
            </div>

            <div className='form-group'>
              <label htmlFor='phone_field'>Phone No</label>
              <input
                type='phone'
                id='phone_field'
                className='form-control'
                value={phoneNumber}
                onChange={handleChange}
                name='phoneNumber'
                required
              />
            </div>

            <div className='form-group'>
              <label htmlFor='postal_code_field'>Postal Code</label>
              <input
                type='number'
                id='postal_code_field'
                className='form-control'
                value={postalCode}
                onChange={handleChange}
                name='postalCode'
                required
              />
            </div>

            <div className='form-group'>
              <label htmlFor='country_field'>Country</label>
              <select
                id='country_field'
                className='form-control'
                value={country}
                name='country'
                onChange={handleChange}
                required>
                {countriesList.map((country) => (
                  <option key={country.name} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              id='shipping_btn'
              type='submit'
              className='btn btn-block py-3'>
              CONTINUE
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;

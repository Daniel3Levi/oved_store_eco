import React, { useContext, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import CheckOutStepes from '../components/CheckOutStepes';
import { Store } from '../Store';

export default function ShippingAddressScreen() {
  // navigate hook
  const navigate = useNavigate();
  // app context
  const { state, dispatch: ctxDispatch } = useContext(Store);

  // get the last value state (if exist) from shippingAddress
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;

  //state hooks
  const [fullName, setFullName] = useState(shippingAddress.fullName || '');
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ''
  );
  const [country, setCountry] = useState(shippingAddress.country || '');

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=shipping');
    }
  }, [userInfo, navigate]);

  // form submit
  const submitHandler = (e) => {
    e.preventDefault();
    // save the shipping address in app context
    ctxDispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: {
        fullName,
        address,
        city,
        postalCode,
        country,
      },
    });
    // save the shipping address in user browser
    localStorage.setItem(
      'shippingAddress',
      JSON.stringify({
        fullName,
        address,
        city,
        postalCode,
        country,
      })
    );
    navigate('/payment');
  };
  return (
    <div>
      <Helmet>
        <title>כתובת למשלוח</title>
      </Helmet>
      <CheckOutStepes step1 step2></CheckOutStepes>
      <div className="container small-container">
        <h1 className="my-3">כתובת למשלוח</h1>
        {/* fullName */}
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="fullName">
            <Form.Label>שם מלא</Form.Label>
            <Form.Control
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          {/* fullName */}

          {/* address */}
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>כתובת</Form.Label>
            <Form.Control
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          {/* address */}
          {/* city */}
          <Form.Group className="mb-3" controlId="city">
            <Form.Label>עיר</Form.Label>
            <Form.Control
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          {/* city */}

          {/* postalCode*/}
          <Form.Group className="mb-3" controlId="postalCode">
            <Form.Label>מיקוד</Form.Label>
            <Form.Control
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          {/* postalCode */}
          {/* country */}
          <Form.Group className="mb-3" controlId="country">
            <Form.Label>מדינה</Form.Label>
            <Form.Control
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          {/* country */}
          {/* button */}
          <div className="mb-3">
            <Button variant="primary" type="submit">
              המשך
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckOutStepes from '../components/CheckOutStepes';
import { Helmet } from 'react-helmet-async';
import { Button, Form } from 'react-bootstrap';
import { Store } from '../Store';
export default function PaymentMethodScreen() {
  const navigate = useNavigate();
  // app context
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  // state hooks
  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || 'PayPal'
  );

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
    localStorage.setItem('paymentMethod', paymentMethodName);
    navigate('/placeorder');
  };
  return (
    <div>
      <CheckOutStepes step1 step2 step3></CheckOutStepes>
      <div className="container small-container">
        <Helmet>
          <title>תשלום</title>
        </Helmet>
        <h1 className="my-3">תשלום</h1>
        <Form dir="ltr" onSubmit={submitHandler}>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="PayPal"
              label="PayPal"
              value="PayPal"
              checked={paymentMethodName === 'PayPal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            <Form.Check
              type="radio"
              id="Stripe"
              label="Stripe"
              value="Stripe"
              checked={paymentMethodName === 'Stripe'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </div>
          <div dir="rtl" className="mb-3">
            <Button type="submit">המשך</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

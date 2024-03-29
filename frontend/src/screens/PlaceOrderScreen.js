import React, { useContext, useEffect, useReducer } from 'react';
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button, Card, Col, Row, ListGroup } from 'react-bootstrap';
import { Store } from '../Store';
import CheckOutStepes from '../components/CheckOutStepes';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import LoadingBox from '../components/LoadingBox';

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_REQUEST':
      return { ...state, loading: true };
    case 'CREATE_SUCCESS':
      return { ...state, loading: false };
    case 'CREATE_FAIL':
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default function PlaceOrderScreen() {
  const navigate = useNavigate();

  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.2345 => 123.23
  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 200 ? round2(0) : round2(25);
  cart.taxPrice = round2(0.17 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const placeOrderHandler = async () => {
    try {
      dispatch({ type: 'CREATE_REQUEST' });

      const { data } = await Axios.post(
        'http://localhost:5005/api/orders',
        {
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      ctxDispatch({ type: 'CART_CLEAR' });
      dispatch({ type: 'CREATE_SUCCESS' });
      localStorage.removeItem('cartItems');
      navigate(`/order/${data.order._id}`);
    } catch (error) {
      dispatch({ type: 'CREATE_FILE' });
      toast.error(getError(error.message));
    }
  };

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart, navigate]);

  return (
    <div>
      <CheckOutStepes step1 step2 step3 step4></CheckOutStepes>
      <Helmet>
        <title>סיכום הזמנה</title>
      </Helmet>
      <h1 className="my-3">סיכום הזמנה</h1>
      <Row>
        <Col md={8}>
          {/* משלוח */}
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>משלוח</Card.Title>
              <Card.Text>
                <strong>שם:</strong> {cart.shippingAddress.fullName} <br />
                <strong>כתובת:</strong> {cart.shippingAddress.address},
                {cart.shippingAddress.city},{cart.shippingAddress.postalCode},
                {cart.shippingAddress.country}
              </Card.Text>
              <Link to="/shipping">עריכה</Link>
            </Card.Body>
          </Card>
          {/* משלוח */}
          {/* תשלום */}

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>תשלום</Card.Title>
              <Card.Text>
                <strong>שיטת תשלום:</strong> {cart.paymentMethod}
              </Card.Text>
              <Link to="/payment">עריכה</Link>
            </Card.Body>
          </Card>
          {/* תשלום */}
          {/* מוצרים  */}

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>מוצרים</Card.Title>
              <ListGroup variant="flush">
                {cart.cartItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded img-thumbnail"
                        ></img>{' '}
                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                      </Col>
                      <Col md={3}>
                        <span>{item.quantity}</span>
                      </Col>
                      <Col md={3}>₪{item.price}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Link to="/cart">עריכה</Link>
            </Card.Body>
          </Card>
          {/* מוצרים  */}
        </Col>
        {/* סוף העמודה */}
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>סיכום</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>מוצרים</Col>
                    <Col>₪{cart.itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>דמי משלוח</Col>
                    <Col>₪{cart.shippingPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>מס</Col>
                    <Col>₪{cart.taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong> סה״כ</strong>
                    </Col>
                    <Col>
                      <strong>₪{cart.totalPrice.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      onClick={placeOrderHandler}
                      disabled={cart.cartItems.length === 0}
                    >
                      אישור הזמנה
                    </Button>
                  </div>
                  {loading && <LoadingBox></LoadingBox>}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

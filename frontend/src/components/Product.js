import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Store } from '../Store';
import Rating from './Rating';
import { toast } from 'react-toastify';
import axios from 'axios';

function Product(props) {
  const { product } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    //send request to backend
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);

    if (data.countInStock < quantity) {
      window.alert('מלאי המוצר אזל.');
      toast.success('🛒 המוצר נוסף לעגלה ', {
        position: 'top-center',
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img
          src={`../${product.image}`}
          className="card-img-top"
          alt={product.name}
        />
      </Link>

      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>

        <Rating rating={product.rating} numReviews={product.numReviews} />

        <Card.Text>₪{product.price}</Card.Text>
        {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            אזל המלאי
          </Button>
        ) : (
          <Button onClick={() => addToCartHandler(product)}>הוסף לעגלה</Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default Product;

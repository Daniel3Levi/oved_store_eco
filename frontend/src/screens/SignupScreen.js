import React, { useContext, useState, useEffect } from 'react';
import Axios from 'axios';
import { Button, Container, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import { Store } from '../Store';

function SignupScreen() {
  //navigate to another route
  const navigate = useNavigate();

  // get the url param
  // useLocation is a hook from react-dom -  search is an object from the useLocation
  const { search } = useLocation();

  // redirectInUrl (param) = ('/shipping')
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  //User state hooks
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // App context
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  // e(event)
  const submitHandler = async (e) => {
    e.preventDefault(); // prevent page refreshing

    // confirm password
    if (password !== confirmPassword) {
      toast.error('סיסמאות לא תואמות');
      return;
    }
    try {
      // sending ajax req to backend ('http://localhost:5000/api/users/signup')
      const { data } = await Axios.post('/api/users/signup', {
        name,
        email,
        password,
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      // save user info in browser
      localStorage.setItem('userInfo', JSON.stringify(data));
      //redirect user
      navigate(redirect || '/');
    } catch (error) {
      toast.error(getError(error));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <Container className="small-container">
      <Helmet>
        <title>הרשמה</title>
      </Helmet>
      <h1 className="my-3">הרשמה</h1>
      <Form onSubmit={submitHandler}>
        {/* name */}
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>שם</Form.Label>

          <Form.Control required onChange={(e) => setName(e.target.value)} />
        </Form.Group>
        {/* name */}

        {/* email */}
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>אימייל</Form.Label>

          <Form.Control
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        {/* email */}
        {/* password */}
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>סיסמא</Form.Label>

          <Form.Control
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>אימות סיסמא</Form.Label>

          <Form.Control
            type="password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        {/* password */}
        {/* button */}
        <div className="mb-3">
          <Button type="submit">אישור</Button>
        </div>
        {/* button */}
        <div className="mb-3">
          יש לך כבר חשבון?{' '}
          <Link to={`/signin?redirect=${redirect}`}>התחבר/י</Link>
        </div>
      </Form>
    </Container>
  );
}

export default SignupScreen;

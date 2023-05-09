import React, { useContext, useState, useEffect } from 'react';
import Axios from 'axios';
import { Button, Container, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import { Store } from '../Store';

function SigninScreen() {
  //navigate to another route
  const navigate = useNavigate();

  // get the url param
  // useLocation is a hook from react-dom -  search is an object from the useLocation
  const { search } = useLocation();

  // redirectInUrl (param) = ('/shipping')
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  //User state hooks
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // App context
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  // e(event)
  const submitHandler = async (e) => {
    e.preventDefault(); // prevent page refreshing
    try {
      // sending ajax req to backend ('http://localhost:5000/api/users/signin')
      const { data } = await Axios.post('/api/users/signin', {
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
        <title>התחברות</title>
      </Helmet>
      <h1 className="my-3">התחברות</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>אימייל</Form.Label>

          <Form.Control
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>סיסמא</Form.Label>

          <Form.Control
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <div className="mb-3">
          <Button type="submit">התחבר/י</Button>
        </div>
        <div className="mb-3">
          לקוח/ה חדש/ה?{' '}
          <Link to={`/signup?redirect=${redirect}`}>ליצירת חשבון חדש</Link>
        </div>
      </Form>
    </Container>
  );
}

export default SigninScreen;

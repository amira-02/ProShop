import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    console.log('UserInfo:', userInfo); // Log the userInfo object
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      console.log('Login Mutation Response:', res); // Log the response
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Container className="py-5">
      <FormContainer>

        <Form onSubmit={submitHandler} className="shadow p-4 bg-white rounded">
        <h1 
          className="italic-text italiana-font text-center"
          style={{ fontSize: '50px', color: 'black' }}>
          Welcome Back
        </h1>
          <Form.Group className='my-3' controlId='email'>
            <Form.Label>Email ù</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className='my-3' controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button disabled={isLoading} type='submit' variant='primary' className="w-100">
            Sign In
          </Button>

          {isLoading && <Loader />}
        </Form>

        <Row className='py-3'>
          <Col className="text-center">
            New Customer?{' '}
            <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
              Register
            </Link>
          </Col>
        </Row>

        {/* Display the token */}
        {userInfo && userInfo.token && (
          <div className="mt-4">
            <h2>Your Token:</h2>
            <p className="text-break">{userInfo.token}</p>
          </div>
        )}
      </FormContainer>
    </Container>
  );
};

export default LoginScreen;

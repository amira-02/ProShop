import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('regular'); // Default to 'Regular User'
  const [showAlert, setShowAlert] = useState(false); // For showing the alert

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      setShowAlert(true); // Show the alert before registration
    }
  };

  const handleRegistration = async () => {
    try {
      const res = await register({ name, email, password, Type: userType }).unwrap(); // Ensure 'Type' is sent
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1>Register</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className='my-2' controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2'>
          <Form.Label>User Type</Form.Label>
          <div>
            <Form.Check
              inline
              style={{ marginRight: '10px' }}
              type='radio'
              label='Regular User'
              name='userType'
              value='regular'
              checked={userType === 'regular'}
              onChange={(e) => setUserType(e.target.value)}
            />
            <Form.Check
              inline
              style={{ marginRight: '10px' }}
              type='radio'
              label='Shop'
              name='userType'
              value='shop'
              checked={userType === 'shop'}
              onChange={(e) => setUserType(e.target.value)}
            />
            <Form.Check
              inline
              style={{ marginRight: '10px' }}
              type='radio'
              label='Insurance Company'
              name='userType'
              value='insurance'
              checked={userType === 'insurance'}
              onChange={(e) => setUserType(e.target.value)}
            />
            <Form.Check
              inline
              type='radio'
              label='Repairer'
              name='userType'
              value='repairer'
              checked={userType === 'repairer'}
              onChange={(e) => setUserType(e.target.value)}
            />
          </div>
        </Form.Group>

        <Button disabled={isLoading} type='submit' variant='primary'>
          Register
        </Button>

        {isLoading && <Loader />}
      </Form>

      <Row className='py-3'>
        <Col>
          Already have an account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Col>
      </Row>

      {/* Alert for showing user info before registration */}
      <Alert show={showAlert} variant="info">
        <Alert.Heading>Confirm User Info</Alert.Heading>
        <p>Name: {name}</p>
        <p>Email: {email}</p>
        <p>User Type: {userType}</p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={handleRegistration} variant="success">
            Register
          </Button>
          <Button onClick={() => setShowAlert(false)} variant="outline-danger" style={{ marginLeft: '10px' }}>
            Cancel
          </Button>
        </div>
      </Alert>
    </FormContainer>
  );
};

export default RegisterScreen;

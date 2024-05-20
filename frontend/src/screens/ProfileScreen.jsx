import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col, Form } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FaTimes } from 'react-icons/fa';

import { toast } from 'react-toastify';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useProfileMutation } from '../slices/usersApiSlice';
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice';
import { setCredentials } from '../slices/authSlice';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { userInfo } = useSelector((state) => state.auth);

  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.name]);

  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await updateProfile({
          // NOTE: here we don't need the _id in the request payload as this is
          // not used in our controller.
          // _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success('Profile updated successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>

        <Form onSubmit={submitHandler}>
          <Form.Group className='my-2' controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
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

          <Button type='submit' variant='primary'>
            Update
          </Button>
          {loadingUpdateProfile && <Loader />}
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <>
            {orders.map((order) => (
              <div key={order._id}>
                <h3>Order ID: {order._id}</h3>
                <LinkContainer to={`/order/${order._id}`}>
                  <Button className='btn-sm' variant='light'>
                    Details
                  </Button>
                </LinkContainer>

                <p
                  className='jura-text'
                  style={{
                    fontSize: '15px',
                    fontWeight: '599',
                    color: 'black',
                  }}
                >
                  {order.createdAt.substring(0, 10)}
                </p>
                <p
                  className='jura-text'
                  style={{
                    fontSize: '15px',
                    fontWeight: '599',
                    color: 'black',
                  }}
                >
                  {order.totalPrice}
                </p>

                <Row>
                  {order.orderItems.map((item) => (
                    <Col key={item._id} sm={12} md={6} lg={4} xl={12}>
                      <Card
                        className='my-3 p-0 rounded'
                        style={{
                          border: '1.8px solid black',
                          borderRadius: '8px',
                        }}
                      >
                        <Card.Body>
                          <Card.Text>name: {item.name}</Card.Text>
                          <Card.Text>Price: ${item.price}</Card.Text>
                          <Card.Text>Quantity: {item.qty}</Card.Text>
                          <Card.Text>policy: {item.policy}</Card.Text>
                          <Card.Text>
                            policy price : {item.policyprice}
                          </Card.Text>
                          <Card.Text>Start Date : {item.startDate}</Card.Text>
                          <Card.Text>End Date : {item.endDate}</Card.Text>
                          {/* Button appears on hover */}
                          <div className='card-button-container'>
                            <Button
                              variant='primary'
                              className='card-button'
                              style={{ margin: '5px' }}
                            >
                              Add Reclamation
                            </Button>
                            <LinkContainer to={`/order/${order._id}`}>
                              <Button variant='primary' className='card-button'>
                                Details
                              </Button>
                            </LinkContainer>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            ))}
          </>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;

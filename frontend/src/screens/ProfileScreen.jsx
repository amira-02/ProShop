import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col, Form, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useProfileMutation } from '../slices/usersApiSlice';
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice';
import { setCredentials } from '../slices/authSlice';
import Modal from 'react-bootstrap/Modal';
function MyVerticallyCenteredModal(props) {
  return (
    <Modal
  {...props}
  size="lg"
  aria-labelledby="contained-modal-title-vcenter"
  centered
  className="custom-modal"
>
  <Modal.Header closeButton>
    <Modal.Title id="contained-modal-title-vcenter">
    Add Claim
      {/* Add Claim for Order ID: {props.orderId}, Item Index: {props.itemIndex} */}
    </Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description <span className="text-danger"></span></Form.Label>
        <Form.Control as="textarea" rows={3} required />
      </Form.Group>
      {props.item && (
        <div>
          <Form.Group className="mb-3" controlId="exampleForm.ControlCheckbox1">
            <Form.Check
              type="checkbox"
              label="Theft Incidence"
              // disabled={!props.item.theftProtection}
              onChange={(e) => {
                if (!props.item.theftProtection) {
                  e.preventDefault();
                  // toast.error("You cannot select this option for this item.");
                }
              }}
              onClick={(e) => {
                if (!props.item.theftProtection) {
                  e.preventDefault();
                  toast.error("You cannot select this option for this item.");
                }
              }}
            />
          </Form.Group>
          {/* <p>Item Name: {props.item.name}</p>
          <p>Start Date : {props.item.startDate}</p>
          <p>Price: ${props.item.price}</p>
          <p>Quantity:   {props.item.qty}</p>
          <p>theftProtection: {props.item.theftProtection === true ? 'true' : props.item.theftProtection === false ? 'false' : null}</p> */}
          {/* Add more attributes as needed */}
        </div>
      )}
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button onClick={props.onHide}>Close</Button>
    <Button variant="primary">Submit</Button>
  </Modal.Footer>
</Modal>

  );
}


const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [modalShow, setModalShow] = React.useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const [selectedOrder, setSelectedOrder] = useState({ orderId: '', index: '' });
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();
  const [selectedItem, setSelectedItem] = useState(null);
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

  const handleAddReclamation = (orderId, itemIndex) => {
    toast.info(`Added reclamation for Order ID: ${orderId}, Item Index: ${itemIndex}`);
    
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
                <Card className='my-4 p-4'>
                  <h3 className='mb-4'>Order ID: {order._id}</h3>
                  <Row>
                  <p className='text-muted'>
  <strong>Date:</strong> {order.createdAt.substring(0, 10)}
  <span style={{ marginRight: '260px' }}></span>
  <strong>Total Price:</strong> ${order.totalPrice}
  <span style={{ marginRight: '250px' }}></span>
  <strong>Status:</strong> 
  <Badge className='ml-2' variant={order.isDelivered ? 'success' : 'danger'}>
    {order.isDelivered ? 'Delivered' : 'Not Delivered'}
  </Badge>
  </p>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button className='btn-sm' variant='light'>
                          Details
                        </Button>
                      </LinkContainer>
                    
                  </Row>
                  <Row className='mt-4'>
                    {order.orderItems.map((item, index) => (
                      <Col key={item._id} sm={12} md={6} lg={4} xl={6}>
                        <Card className='my-3 p-3 rounded'>
                          <Card.Body>
                            <Card.Title>{item.name}</Card.Title>
                            <Card.Text className='text-muted'>
                              <strong>Price:</strong> ${item.price}
                            </Card.Text>
                            <Card.Text className='text-muted'>
                              <strong>Quantity:</strong> {item.qty}
                            </Card.Text>
                            <Button
  variant='primary'
  onClick={() => {
    setSelectedItem(order.orderItems[index]);
    setSelectedOrder({ orderId: order._id, index });
    setModalShow(true);
  }}
>
  Add Reclamation
</Button>


                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Card>
              </div>
            ))}
          </>
        )}
      </Col>
      <MyVerticallyCenteredModal
  show={modalShow}
  onHide={() => setModalShow(false)}
  orderId={selectedOrder.orderId}
  itemIndex={selectedOrder.index}
  item={selectedItem}
/>

    </Row>
  );
};

export default ProfileScreen;

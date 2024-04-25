import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'; // Supprimez useNavigate
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import { useGetShopDetailsQuery, useUpdateShopMutation } from '../../slices/ShopApiSlice';
import mongoose from 'mongoose';




const ShopEditScreen = () => {
  const { id: shopId } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');

  const { data: shop, isLoading, refetch, error } = useGetShopDetailsQuery(shopId);
  const [updateShop, { isLoading: loadingUpdate }] = useUpdateShopMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!shopId) {
        throw new Error('Shop ID is missing');
      }
  
      const updatedData = {
        name,
        email,
        address,
        contact,
        password: password !== '' ? password : null,
      };
  
      // Vérifiez si shopId est une chaîne non vide et un ObjectId valide
      if (!shopId.trim() || !mongoose.Types.ObjectId.isValid(shopId)) {
        throw new Error('Invalid Shop ID');
      }
  
      // Utilisez shopId seulement si les vérifications sont réussies
      await updateShop({ id: shopId, ...updatedData }).unwrap();
      toast.success('Shop updated');
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.message || err.error);
    }
  };
  

  useEffect(() => {
    if (shop) {
      setName(shop.name);
      setEmail(shop.email);
      setAddress(shop.address);
      setContact(shop.contact);
    }
  }, [shop]);

  return (
    <>
      <Link to='/admin/shoplist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Shop</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error.data.message}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='address'>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='contact'>
              <Form.Label>Contact</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter contact'
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button type='submit' variant='primary' style={{ marginTop: '1rem' }}>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ShopEditScreen;

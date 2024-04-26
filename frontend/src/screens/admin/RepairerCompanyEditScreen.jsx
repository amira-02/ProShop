import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import {
  useGetRepairerCompanyDetailsQuery,
  useUpdateRepairerCompanyMutation,
} from '../../slices/RepairerCompanyApiSlice';

const RepairerCompanyEditScreen = () => {
  const { id: companyId } = useParams();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setaddress] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');

  const { data: company, isLoading, refetch, error } = useGetRepairerCompanyDetailsQuery(companyId);
  const [updateCompany, { isLoading: loadingUpdate }] = useUpdateRepairerCompanyMutation();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        companyId,
        name,
        email,
        address,
        contact,
      };

      // Vérifier si un nouveau mot de passe a été fourni
      if (password !== '') {
        // Mettre à jour le mot de passe dans les données à envoyer
        updatedData.password = password;
      }

      // Mettre à jour la compagnie d'assurance
      await updateCompany(updatedData).unwrap();
      toast.success('Company updated');
      refetch();
      // navigate('/admin/companylist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (company) {
      setName(company.name);
      setEmail(company.email);
      setaddress(company.address);
      setContact(company.contact);
    }
  }, [company]);

  return (
    <>
      <Link to='/admin/RepairerCompanylist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Company</h1>
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
              <Form.Label>address</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter address'
                value={address}
                onChange={(e) => setaddress(e.target.value)}
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

export default RepairerCompanyEditScreen;

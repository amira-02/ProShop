import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import {
  useGetInsuranceCompanyDetailsQuery,
  useUpdateInsuranceCompanyMutation,
} from '../../slices/InsuranceCompanyApiSlice';

const InsuranceCompanyEditScreen = () => {
  const { id: companyId } = useParams();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');

  const { data: company, isLoading, refetch, error } = useGetInsuranceCompanyDetailsQuery(companyId);
  const [updateCompany, { isLoading: loadingUpdate }] = useUpdateInsuranceCompanyMutation();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateCompany({
        companyId,
        name,
        email,
        address,
        contact,
      }).unwrap();
      toast.success('Company updated');
      refetch();
      navigate('/admin/companylist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (company) {
      setName(company.name);
      setEmail(company.email);
      setAddress(company.address);
      setContact(company.contact);
    }
  }, [company]);

  return (
    <>
      <Link to='/admin/companylist' className='btn btn-light my-3'>
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

            <Button type='submit' variant='primary' style={{ marginTop: '1rem' }}>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default InsuranceCompanyEditScreen;

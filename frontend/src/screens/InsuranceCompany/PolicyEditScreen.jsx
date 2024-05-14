import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  useGetPolicyByIdQuery,
  useUpdatePolicyMutation,
} from '../../slices/PolicyApiSlice';

const EditPolicy = () => {
  const { id: policyId } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [endDate, setEndDate] = useState('');
  const [type, setType] = useState('');
  const [terms, setTerms] = useState('');

  const { data: policy } = useGetPolicyByIdQuery(policyId);
  const [updatePolicy, { isLoading: loadingUpdate }] =
    useUpdatePolicyMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!policy) {
        toast.error('Policy not found');
        return;
      }

      await updatePolicy({
        PolicyId: policyId, // Ensure it's PolicyId instead of policyId
        CompanyId: policy.CompanyId, // Include CompanyId if needed
        name,
        price,
        EndDate: endDate,
        type,
        terms,
      }).unwrap();
      toast.success('Policy updated');
      navigate('/InsuranceCompany/InsuranceHome');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (policy) {
      setName(policy.name);
      setPrice(policy.price);
      setEndDate(policy.EndDate.substring(0, 10)); // Format date for input
      setType(policy.type);
      setTerms(policy.terms);
    }
  }, [policy]);

  return (
    <div>
      <p
        className='italic-text italiana-font'
        style={{ fontSize: '65px', color: 'black', textAlign: 'center' }}
      >
        Edit Policy
      </p>
      {policy ? (
        <Form onSubmit={handleSubmit}>
          <div
            style={{
              border: '1px solid black',
              padding: '30px',
              borderRadius: '8px',
            }}
          >
            <p
              className='jura-text'
              style={{ fontSize: '32px', fontWeight: '580', color: 'black' }}
            >
              Policy Information
            </p>
            <br />
            <Form.Group className='mb-3'>
              <Form.Group as={Col} controlId='formGridName' className='mb-3'>
                <Form.Label>
                  <p
                    className='jura-text'
                    style={{ fontSize: '20px', color: 'black' }}
                  >
                    Name
                  </p>
                </Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
            </Form.Group>
            <br />
            <Form.Group className='mb-3' controlId='formGridPrice'>
              <Form.Label>
                <p
                  className='jura-text'
                  style={{ fontSize: '20px', color: 'black' }}
                >
                  Price / Day
                </p>
              </Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <br />
            <Form.Group className='mb-3' controlId='formGridTerms'>
              <Form.Label>
                <p
                  className='jura-text'
                  style={{ fontSize: '20px', color: 'black' }}
                >
                  Terms and Conditions
                </p>
              </Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                value={terms}
                onChange={(e) => setTerms(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} controlId='formGridType'>
              <Form.Label>
                <p
                  className='jura-text'
                  style={{ fontSize: '20px', color: 'black' }}
                >
                  Type
                </p>
              </Form.Label>
              <Form.Select
                aria-label='Default select example'
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value=''>Choose type</option>
                <option value='Auto'>Auto</option>
                <option value='Telephone'>Telephone</option>
                <option value='TV'>TV</option>
                <option value='Refrigerator'>Refrigerator</option>
                <option value='Laptop'>Laptop</option>
                <option value='Smartphone'>Smartphone</option>
                <option value='Tablet'>Tablet</option>
                <option value='Camera'>Camera</option>
                <option value='Drone'>Drone</option>
                <option value='Gaming Console'>Gaming Console</option>
              </Form.Select>
            </Form.Group>
            <br />
            <Row className='mb-3'>
              <Form.Group as={Col} controlId='formGridEndDate'>
                <Form.Label>
                  <p
                    className='jura-text'
                    style={{ fontSize: '20px', color: 'black' }}
                  >
                    End Date
                  </p>
                </Form.Label>
                <Form.Control
                  type='date'
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </Form.Group>
            </Row>
          </div>
          <div style={{ height: '50px' }}></div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant='primary' type='submit' style={{ width: '100%' }}>
              {loadingUpdate ? 'Updating...' : 'Update'}
            </Button>
          </div>
        </Form>
      ) : (
        <p>Loading...</p>
      )}
      <br />
    </div>
  );
};

export default EditPolicy;

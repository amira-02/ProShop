import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddPolicy() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [termsAndConditions, setTermsAndConditions] = useState('');
  const [endDate, setEndDate] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('/api/users/profile');
        const { name, email, _id } = response.data;
        setName(name);
        setEmail(email);
        setUserId(_id);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);


  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const navigateToShipping = () => {
    navigate('/login?redirect=/shipping');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
  };

  return (
    <div>
      <p
        className='italic-text italiana-font'
        style={{ fontSize: '65px', color: 'black', textAlign: 'center' }}
      >
        Add Policy
      </p>
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
            Company Information
          </p>
          <br />
          <Row className='mb-3'>
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
                readOnly
              />
            </Form.Group>
            <Form.Group as={Col} controlId='formGridEmail' className='mb-3'>
              <Form.Label>
                <p
                  className='jura-text'
                  style={{ fontSize: '20px', color: 'black' }}
                >
                  Email
                </p>
              </Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                readOnly
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId='formGridName' className='mb-3'>
              <Form.Label>
                <p
                  className='jura-text'
                  style={{ fontSize: '20px', color: 'black' }}
                >
                  ID
                </p>
              </Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter name'
                value={userId}
                readOnly
              />
            </Form.Group>
          </Row>
        </div>
        <br />
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
              <Form.Control type='text' placeholder='Enter name' />
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
            <Form.Control type='text' placeholder='Enter price' />
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
              value={termsAndConditions}
              onChange={(e) => setTermsAndConditions(e.target.value)}
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
              <option value='telephone'>Telephone</option>
              <option value='gadgets'>Gadgets</option>
              <option value='electronics'>Electronics</option>
              <option value='appliances'>Appliances</option>
              <option value='furniture'>Furniture</option>
              <option value='vehicles'>Vehicles</option>
              <option value='books'>Books</option>
              {/* Add more types as needed */}
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
                onChange={handleEndDateChange}
              />
            </Form.Group>
          </Row>
        </div>
        <div style={{ height: '50px' }}></div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant='primary'
            onClick={navigateToShipping}
            style={{ width: '100%' }}
          >
            Submit
          </Button>
        </div>
      </Form>
      <br />
    </div>
  );
}

export default AddPolicy;
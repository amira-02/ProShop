// import React, { useState, useEffect } from 'react';
// import { Button, Form, Row, Col } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function Contract() {
//   const navigate = useNavigate();
//   const [startDate, setStartDate] = useState('');
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   useEffect(() => {
//     const fetchUserInfo = async () => {
//       try {
//         const response = await axios.get('/api/users/profile'); // Fetch user info from backend
//         const { name, email } = response.data;
//         setName(name);
//         setEmail(email);
//       } catch (error) {
//         console.error('Error fetching user info:', error);
//       }
//     };

//     fetchUserInfo();
//   }, []);

//   const handleStartDateChange = (e) => {
//     setStartDate(e.target.value);
//   };

//   const navigateToShipping = () => {
//     navigate('/shipping');
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Add form submission logic here
//   };

//   return (
//     <Row>
//       <Col md={10} className='mx-auto'>
//         <p
//           className='italic-text italiana-font'
//           style={{ fontSize: '65px', color: 'black', textAlign: 'center' }}
//         >
//           Check out
//         </p>
//         <Form onSubmit={handleSubmit}>
//           <div style={{ border: '1px solid black', padding: '30px', borderRadius: '8px' }}>
//             <p className='jura-text' style={{ fontSize: '32px', fontWeight: 'bold', color: 'black', textAlign: 'center' }}>
//               Personal Information
//             </p>
//             <br />
//             <Row className='mb-3'>
//               <Form.Group as={Col} controlId='formGridName' className='mb-3'>
//                 <Form.Label>
//                   <p className='jura-text' style={{ fontSize: '20px', color: 'black' }}>
//                     Name
//                   </p>
//                 </Form.Label>
//                 <Form.Control type='text' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)} />
//               </Form.Group>

//               <Form.Group as={Col} controlId='formGridEmail' className='mb-3'>
//                 <Form.Label>
//                   <p className='jura-text' style={{ fontSize: '20px', color: 'black' }}>
//                     Email
//                   </p>
//                 </Form.Label>
//                 <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} />
//               </Form.Group>
//             </Row>

//             <Row className='mb-3'>
//               <Form.Group as={Col} controlId='formGridPassword' className='mb-3'>
//                 <Form.Label>
//                   <p className='jura-text' style={{ fontSize: '20px', color: 'black' }}>
//                     Password
//                   </p>
//                 </Form.Label>
//                 <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} />
//               </Form.Group>

//               <Form.Group as={Col} controlId='formGridConfirmPassword' className='mb-3'>
//                 <Form.Label>
//                   <p className='jura-text' style={{ fontSize: '20px', color: 'black' }}>
//                     Confirm Password
//                   </p>
//                 </Form.Label>
//                 <Form.Control type='password' placeholder='Confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
//               </Form.Group>
//             </Row>
//           </div>
//           <br />
//           <div style={{ border: '1px solid black', padding: '30px', borderRadius: '8px' }}>
//             <p className='jura-text' style={{ fontSize: '32px', fontWeight: 'bold', color: 'black', textAlign: 'center' }}>
//               Contract Information
//             </p>
//             <br />
//             {/* Add contract information fields here */}
//           </div>
//           <div style={{ height: '50px' }}></div>
//           <div style={{ display: 'flex', justifyContent: 'center' }}>
//             <Button variant='primary' onClick={navigateToShipping} style={{ width: '800px' }}>
//               Submit
//             </Button>
//           </div>
//         </Form>
//         <br />
//       </Col>
//     </Row>
//   );
// }

// export default Contract;

import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Contract() {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('/api/users/profile'); // Fetch user info from backend
        const { name, email } = response.data;
        setName(name);
        setEmail(email);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
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
        Check out
      </p>
      <Form>
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
            Personal Information
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
                readOnly // Set readOnly to prevent user input
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
                readOnly // Set readOnly to prevent user input
              />
            </Form.Group>
          </Row>
        </div>
      </Form>
      <br />{' '}
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
            Contract Information
          </p>
          <br />
          <Form.Group className='mb-3'>
            <Form.Label>
              <p
                className='jura-text'
                style={{ fontSize: '20px', color: 'black' }}
              >
                Contract Information
              </p>
            </Form.Label>
            <Form.Select aria-label='Default select example'>
              <option>Choose an offer </option>
              <option value='1'>One</option>
              <option value='2'>Two</option>
              <option value='3'>Three</option>
            </Form.Select>
          </Form.Group>
          <br />
          <Form.Group className='mb-3' controlId='formGridAddress1'>
            <Form.Label>
              <p
                className='jura-text'
                style={{ fontSize: '20px', color: 'black' }}
              >
                Price / Day
              </p>
            </Form.Label>
            <Form.Control placeholder='1234 Main St' />
          </Form.Group>
          <br />
          <Form.Group
            className='mb-3'
            controlId='formGridAddress2'
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Form.Label>
              <p
                className='jura-text'
                style={{ fontSize: '20px', color: 'black' }}
              >
                Theft Protection
              </p>
            </Form.Label>
            <Form.Check
              style={{ transform: 'scale(1.5)', marginLeft: '-200px' }} // Adjust the margin as needed
              aria-label='option 1'
            />
          </Form.Group>

          <Row className='mb-3'>
            <Form.Group
              className='mb-3'
              controlId='exampleForm.ControlTextarea1'
            >
              <Form.Label>
                <p
                  className='jura-text'
                  style={{ fontSize: '20px', color: 'black' }}
                >
                  Terms and Conditions
                </p>
              </Form.Label>
              <Form.Control as='textarea' rows={3} />
            </Form.Group>

            <Form.Group as={Col} controlId='formGridState'>
              <Form.Label>
                <p
                  className='jura-text'
                  style={{ fontSize: '20px', color: 'black' }}
                >
                  Start Date
                </p>
              </Form.Label>
              <Form.Control
                type='date'
                min={new Date().toISOString().split('T')[0]}
                value={startDate}
                onChange={handleStartDateChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId='formGridZip'>
              <Form.Label>
                <p
                  className='jura-text'
                  style={{ fontSize: '20px', color: 'black' }}
                >
                  End Date
                </p>
              </Form.Label>
              <Form.Control type='date' />
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

export default Contract;

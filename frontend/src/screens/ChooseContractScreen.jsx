// import React, { useState, useEffect } from 'react';
// import { Button, Form, Row, Col } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// function Contract() {
//   const navigate = useNavigate();
//   const [startDate, setStartDate] = useState('');
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   // const [password, setPassword] = useState('');
//   // const [confirmPassword, setConfirmPassword] = useState('');

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
//     navigate('/login?redirect=/shipping');
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Add form submission logic here
//   };

//   return (
//     <div>
//       <p
//         className='italic-text italiana-font'
//         style={{ fontSize: '65px', color: 'black', textAlign: 'center' }}
//       >
//         Check out
//       </p>
//       <Form>
//         <div
//           style={{
//             border: '1px solid black',
//             padding: '30px',
//             borderRadius: '8px',
//           }}
//         >
//           <p
//             className='jura-text'
//             style={{ fontSize: '32px', fontWeight: '580', color: 'black' }}
//           >
//             Personal Information
//           </p>
//           <br />
//           <Row className='mb-3'>
//             <Form.Group as={Col} controlId='formGridName' className='mb-3'>
//               <Form.Label>
//                 <p
//                   className='jura-text'
//                   style={{ fontSize: '20px', color: 'black' }}
//                 >
//                   Name
//                 </p>
//               </Form.Label>
//               <Form.Control
//                 type='text'
//                 placeholder='Enter name'
//                 value={name}
//                 readOnly // Set readOnly to prevent user input
//               />
//             </Form.Group>

//             <Form.Group as={Col} controlId='formGridEmail' className='mb-3'>
//               <Form.Label>
//                 <p
//                   className='jura-text'
//                   style={{ fontSize: '20px', color: 'black' }}
//                 >
//                   Email
//                 </p>
//               </Form.Label>
//               <Form.Control
//                 type='email'
//                 placeholder='Enter email'
//                 value={email}
//                 readOnly // Set readOnly to prevent user input
//               />
//             </Form.Group>
//           </Row>
//         </div>
//       </Form>
//       <br />{' '}
//       <Form onSubmit={handleSubmit}>
//         <div
//           style={{
//             border: '1px solid black',
//             padding: '30px',
//             borderRadius: '8px',
//           }}
//         >
//           <p
//             className='jura-text'
//             style={{ fontSize: '32px', fontWeight: '580', color: 'black' }}
//           >
//             Contract Information
//           </p>
//           <br />
//           <Form.Group className='mb-3'>
//             <Form.Label>
//               <p
//                 className='jura-text'
//                 style={{ fontSize: '20px', color: 'black' }}
//               >
//                 Contract Information
//               </p>
//             </Form.Label>
//             <Form.Select aria-label='Default select example'>
//               <option>Choose an offer </option>
//               <option value='1'>One</option>
//               <option value='2'>Two</option>
//               <option value='3'>Three</option>
//             </Form.Select>
//           </Form.Group>
//           <br />
//           <Form.Group className='mb-3' controlId='formGridAddress1'>
//             <Form.Label>
//               <p
//                 className='jura-text'
//                 style={{ fontSize: '20px', color: 'black' }}
//               >
//                 Price / Day
//               </p>
//             </Form.Label>
//             <Form.Control placeholder='1234 Main St' />
//           </Form.Group>
//           <br />
//           <Form.Group
//             className='mb-3'
//             controlId='formGridAddress2'
//             style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//             }}
//           >
//             <Form.Label>
//               <p
//                 className='jura-text'
//                 style={{ fontSize: '20px', color: 'black' }}
//               >
//                 Theft Protection
//               </p>
//             </Form.Label>
//             <Form.Check
//               style={{ transform: 'scale(1.5)', marginLeft: '-200px' }} // Adjust the margin as needed
//               aria-label='option 1'
//             />
//           </Form.Group>

//           <Row className='mb-3'>
//             <Form.Group
//               className='mb-3'
//               controlId='exampleForm.ControlTextarea1'
//             >
//               <Form.Label>
//                 <p
//                   className='jura-text'
//                   style={{ fontSize: '20px', color: 'black' }}
//                 >
//                   Terms and Conditions
//                 </p>
//               </Form.Label>
//               <Form.Control as='textarea' rows={3} />
//             </Form.Group>

//             <Form.Group as={Col} controlId='formGridState'>
//               <Form.Label>
//                 <p
//                   className='jura-text'
//                   style={{ fontSize: '20px', color: 'black' }}
//                 >
//                   Start Date
//                 </p>
//               </Form.Label>
//               <Form.Control
//                 type='date'
//                 min={new Date().toISOString().split('T')[0]}
//                 value={startDate}
//                 onChange={handleStartDateChange}
//               />
//             </Form.Group>

//             <Form.Group as={Col} controlId='formGridZip'>
//               <Form.Label>
//                 <p
//                   className='jura-text'
//                   style={{ fontSize: '20px', color: 'black' }}
//                 >
//                   End Date
//                 </p>
//               </Form.Label>
//               <Form.Control type='date' />
//             </Form.Group>
//           </Row>
//         </div>
//         <div style={{ height: '50px' }}></div>
//         <div style={{ display: 'flex', justifyContent: 'center' }}>
//           <Button
//             variant='primary'
//             onClick={navigateToShipping}
//             style={{ width: '100%' }}
//           >
//             Submit
//           </Button>
//         </div>
//       </Form>
//       <br />
//     </div>
//   );
// }

// export default Contract;
import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
=======
import { useDispatch } from 'react-redux';

>>>>>>> 937851a58c8dc4ed65e5f29dc8f462c116de21ff
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import CheckoutSteps from '../components/CheckoutSteps';
import { addToCart } from '../slices/cartSlice';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';

const Contract = () => {
  // State variables
  const navigate = useNavigate();
  const { id: productId } = useParams();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [policies, setPolicies] = useState([]);
  const [selectedPolicy, setSelectedPolicy] = useState('');
  const [qty, setQty] = useState(1);
  const [product, setProduct] = useState(null);
  const [policyData, setPolicyData] = useState({ price: '', terms: '' });
  const [theftProtection, setTheftProtection] = useState(false);
  const [formError, setFormError] = useState('');

  // Fetching user information
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('/api/users/profile');
        const { name, email } = response.data;
        setName(name);
        setEmail(email);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  // Fetching product information
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product info:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  // Fetch policies based on product category
  useEffect(() => {
    if (product) {
      const fetchPolicies = async () => {
        try {
          const response = await axios.get(`/api/Policy/type/${product.category}`);
          setPolicies(response.data.policies);
        } catch (error) {
          console.error('Error fetching policies:', error);
        }
      };

      fetchPolicies();
    }
  }, [product]);

  // Fetch selected policy data
  useEffect(() => {
    if (selectedPolicy) {
      const fetchPolicyData = async () => {
        try {
          const response = await axios.get(`/api/Policy/${selectedPolicy}`);
          setPolicyData(response.data);
        } catch (error) {
          console.error('Error fetching policy data:', error);
        }
      };

      fetchPolicyData();
    }
  }, [selectedPolicy]);

  // Event handlers
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedPolicy) {
      setFormError('Please select an offer');
    } else if (!startDate || !endDate) {
      setFormError('Please select both start and end dates');
    } else {
      const contractDetails = {
        policy: selectedPolicy,
        startDate,
        endDate,
        theftProtection,
        policyprice: policyData.price,
      };
      
      // Display alert with all the data
      // alert(JSON.stringify({ ...product, qty, ...contractDetails }));
  
      dispatch(addToCart({ ...product, qty, ...contractDetails }));
      navigate('/cart');
      setFormError(''); // Reset form error on successful submission
    }
  };
  

  return (
    <div>
      <CheckoutSteps step1 step2 />
      {/* Personal Information */}
      <Form>
        <div style={{ border: '1px solid black', padding: '30px', borderRadius: '8px' }}>
          <p className='jura-text' style={{ fontSize: '32px', fontWeight: '580', color: 'black' }}>Personal Information</p>
          <br />
          <Row className='mb-3'>
            <Form.Group as={Col} controlId='formGridName' className='mb-3'>
              <Form.Label>
                <p className='jura-text' style={{ fontSize: '20px', color: 'black' }}>Name</p>
              </Form.Label>
              <Form.Control type='text' placeholder='Enter name' value={name} readOnly />
            </Form.Group>
            <Form.Group as={Col} controlId='formGridEmail' className='mb-3'>
              <Form.Label>
                <p className='jura-text' style={{ fontSize: '20px', color: 'black' }}>Email</p>
              </Form.Label>
              <Form.Control type='email' placeholder='Enter email' value={email} readOnly />
            </Form.Group>
          </Row>
        </div>
      </Form>
      <br />

      {/* Contract Information */}
      <Form onSubmit={handleSubmit}>
        <div style={{ border: '1px solid black', padding: '30px', borderRadius: '8px' }}>
          <p className='jura-text' style={{ fontSize: '32px', fontWeight: '580', color: 'black' }}>Contract Information</p>
          <br />
          <Form.Group className='mb-3'>
            <Form.Label>
              <p className='jura-text' style={{ fontSize: '20px', color: 'black' }}>Contract Information</p>
            </Form.Label>
            <Form.Select aria-label='Default select example' value={selectedPolicy} onChange={(e) => setSelectedPolicy(e.target.value)}>
              <option>Choose an offer</option>
              {policies.map((policy) => (
                <option key={policy._id} value={policy._id}>{policy.name}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <br />
          <Form.Group className='mb-3' controlId='formGridAddress1'>
            <Form.Label>
              <p className='jura-text' style={{ fontSize: '20px', color: 'black' }}>Price / Day</p>
            </Form.Label>
            <Form.Control placeholder='100 DT' value={policyData.price} readOnly />
          </Form.Group>
          <br />
          <Form.Group className='mb-3' controlId='formGridAddress2'>
            <Form.Label>
              <p className='jura-text' style={{ fontSize: '20px', color: 'black' }}>Terms and Conditions</p>
            </Form.Label>
            <Form.Control as='textarea' rows={3} value={policyData.terms} readOnly />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formGridAddress2' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Form.Label>
              <p className='jura-text' style={{ fontSize: '20px', color: 'black' }}>Theft Protection</p>
            </Form.Label>
            <Form.Check style={{ transform: 'scale(1.5)', marginLeft: '-200px' }} aria-label='option 1' checked={theftProtection} onChange={(e) => setTheftProtection(e.target.checked)} />
          </Form.Group>

          <Row className='mb-3'>
            <Form.Group className='mb-3' controlId='formGridState'>
              <Form.Label>
                <p className='jura-text' style={{ fontSize: '20px', color: 'black' }}>Start Date</p>
              </Form.Label>
              <Form.Control type='date' min={new Date().toISOString().split('T')[0]} value={startDate} onChange={handleStartDateChange} />
            </Form.Group>
            <Form.Group as={Col} controlId='formGridZip'>
              <Form.Label>
                <p className='jura-text' style={{ fontSize: '20px', color: 'black' }}>End Date</p>
              </Form.Label>
              <Form.Control type='date' value={endDate} onChange={handleEndDateChange} min={startDate || new Date().toISOString().split('T')[0]} />
            </Form.Group>
          </Row>
          {formError && <p style={{ color: 'red' }}>{formError}</p>}
        </div>
        <br />

        {/* Product Information */}
        {product && (
          <div style={{ border: '1px solid black', padding: '30px', borderRadius: '8px' }}>
            <p className='jura-text' style={{ fontSize: '32px', fontWeight: '580', color: 'black' }}>Product Information</p>
            <br />
            <Row>
              <Col>
                <p className='jura-text' style={{ fontSize: '20px', color: 'black' }}>Product Name</p>
                <p>{product.name}</p>
              </Col>
              <Col>
                <p className='jura-text' style={{ fontSize: '20px', color: 'black' }}>Price</p>
                <p>{product.price}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className='jura-text' style={{ fontSize: '20px', color: 'black' }}>Category</p>
                <p>{product.category}</p>
              </Col>
              <Col>
                <p className='jura-text' style={{ fontSize: '20px', color: 'black' }}>Brand</p>
                <p>{product.brand}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className='jura-text' style={{ fontSize: '20px', color: 'black' }}>Description</p>
                <p>{product.description}</p>
              </Col>
              <Col>
                {product.countInStock > 0 && (
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <Form.Control as='select' value={qty} onChange={(e) => setQty(Number(e.target.value))}>
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>{x + 1}</option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                )}
              </Col>
            </Row>
          </div>
        )}
        {/* Submit Button */}
        <div style={{ height: '50px' }}></div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant='primary' type='submit' style={{ width: '100%' }}>Submit</Button>
        </div>
      </Form>
      <br />
    </div>
  );
};

export default Contract;

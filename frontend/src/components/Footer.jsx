import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleNavigation = (route) => {
    // Handle navigation logic
    console.log('Navigate to: ', route);
  };

  return (
    <footer className='bg-light text-black py-1'>
      {' '}
      {/* Reduced padding */}
      <Container>
        <Row className='align-items-center'>
          {/* Logo and Contact Information */}
          <Col className='d-flex flex-column justify-content-between align-items-start'>
            <img
              src={logo}
              alt='ProShop'
              style={{ width: '150px', marginBottom: '0px' }} // Reduced logo size
            />
          </Col>
          {/* Replace with your contact address */}
          <Col>
            <p className='jura-text' style={{ fontSize: '14px' }}>
              {' '}
              {/* Reduced font size */}
              <span style={{ fontWeight: 500, fontSize: '1.2rem' }}>
                Contact
              </span>
              <br />
              +216 22 333 555
              <br />
              Tunisa, Tunis
              <br />
              <a href='mailto:ASInsurance@email.com' className='text-black'>
                ASInsurance@email.com
              </a>
            </p>
          </Col>
          <Col>
            {/* Navigation Links */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                fontSize: '14px', // Reduced font size
                fontWeight: 'bold', // Make the links bold
              }}
              className='jura-text'
            >
              <Link
                to='/'
                style={{ cursor: 'pointer', marginLeft: '10px' }} // Reduced margin
                onClick={() => handleNavigation('/')}
              >
                Home
              </Link>
              <Link
                to='/about'
                style={{ cursor: 'pointer', marginLeft: '10px' }} // Reduced margin
                onClick={() => handleNavigation('/about')}
              >
                About Us
              </Link>
              <Link
                to='/contact'
                style={{ cursor: 'pointer', marginLeft: '10px' }} // Reduced margin
                onClick={() => handleNavigation('/contact')}
              >
                Contact
              </Link>
            </div>
          </Col>
        </Row>
        <div style={{ borderTop: '1px solid black', marginTop: '5px' }}></div>{' '}
        {/* Reduced margin */}
      </Container>
      <div className='text-center mt-1'>
        {' '}
        {/* Reduced margin */}
        <p style={{ fontSize: '12px' }}>
          {' '}
          {/* Reduced font size */}
          Designed <i className='fas fa-heart text-danger'></i> by{' '}
          <span
            className='fancy-font'
            style={{ fontWeight: '600', color: 'darkgray', fontSize: '20px' }} // Reduced font size
          >
            AS
          </span>
          <br></br>
          AS Insurance &copy; {currentYear}
        </p>
      </div>
    </footer>
  );
};

export default Footer;

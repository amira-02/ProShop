import { Container, Row, Col } from 'react-bootstrap';
import logo from '../assets/logo.png';
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white py-4">
      <Container>
        <Row className="align-items-center">
          {/* Left Column - Contact Information */}
          <Col md={4} className="text-center text-md-start mb-3 mb-md-0">
            <p>
              {/* Replace with your contact address */}
              123 Main Street<br />
              Anytown, CA 12345<br />
              (555) 555-5555<br />
              <a href="mailto:youremail@email.com" className="text-white">
                youremail@email.com
              </a>
            </p>
          </Col>

          {/* Center Column - Legal Information (replace with your content) */}
          <Col md={4} className="text-center">
            <a href="www.instagram.com">Privacy Policy</a>
            <br />
            <a href="www.instagram.com">Terms of Service</a>
          </Col>

          {/* Right Column - Navigation Links */}
          <Col md={4} className="text-center text-md-end">
            <a href="www.instagram.com">Home</a>
            <br />
            <a href="www.instagram.com">Shop</a>
            <br />
            <a href="www.instagram.com">About Us</a>
            <br />
            <a href="www.instagram.com">Contact</a>
          </Col>
        </Row>
      </Container>
      <div className="text-center mt-4">
        <p>Designed with <i className="fas fa-heart text-danger"></i> by Your Company</p>
        <p>ProShop &copy; {currentYear}</p>
      </div>
    </footer>
  );
};

export default Footer;

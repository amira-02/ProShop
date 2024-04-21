import { Container, Row, Col } from 'react-bootstrap';
import logo from '../assets/logo.png';
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white py-4">
      <Container>
        <Row className="align-items-center">
          {/* First Column - Logo */}
          <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
          <img src={logo} alt='ProShop' style={{ width: '50px', marginRight: '10px' }} />
          </Col>

          {/* Second Column - Follow Us */}
          <Col md={6} className="text-center text-md-end">
            <p>Follow us on:</p>
            <div>
              <a href="https://twitter.com/your_twitter" className="text-white mx-2" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://facebook.com/your_facebook" className="text-white mx-2" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://instagram.com/your_instagram" className="text-white mx-2" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
            <p className="mt-2">Designed with <i className="fas fa-heart text-danger"></i> by Your Company</p>
            <p>ProShop &copy; {currentYear}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

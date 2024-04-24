import { useState } from 'react';
import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { FaShoppingCart, FaUser, FaTimes } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import SearchBox from './SearchBox';
import logo from '../assets/logo.png';
import { resetCart } from '../slices/cartSlice';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();
  const [showPromotion, setShowPromotion] = useState(true);
  
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(resetCart());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };
  
  const handleClosePromotion = () => {
    setShowPromotion(false);
  };

  return (
    <>
      {showPromotion && (
        <div className="promotion-bar">
          <p>30% off storewide — Limited time! Shop now</p>
          <button className="close-button" onClick={handleClosePromotion}>
            <FaTimes className="close-icon" />
          </button>
        </div>
      )}
      <header>
        <Navbar bg='light' variant='dark' expand='lg' collapseOnSelect>
          <Container>
            <LinkContainer to='/'>
              <Navbar.Brand>
                <img src={logo} alt='ProShop' style={{ width: '50px', marginRight: '10px' }} />
              </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='mr-auto'>
                <SearchBox />
                <LinkContainer to='/'>
                  <Nav.Link className="text-black">Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/about'>
                  <Nav.Link className="text-black">About Us</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/repair'>
                  <Nav.Link className="text-black">Atelier de réparation</Nav.Link>
                </LinkContainer>
              </Nav>
              <Nav className='ms-auto'>
                <LinkContainer to='/cart'>
                  <Nav.Link>
                    <FaShoppingCart className="text-black" /> <span className="text-black">Cart</span>
                    {cartItems.length > 0 && (
                      <Badge pill bg='success' style={{ marginLeft: '5px' }}>
                        {cartItems.reduce((a, c) => a + c.qty, 0)}
                      </Badge>
                    )}
                  </Nav.Link>
                </LinkContainer>
                {userInfo ? (
                  <NavDropdown title={<span className="text-black">{userInfo.name}</span>} id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item><span className="text-black">Profile</span></NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                      <span className="text-black"></span>
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer to='/login'>
                    <Nav.Link>
                      <FaUser className="text-black" /><span className="text-black">Sign In</span>
                    </Nav.Link>
                  </LinkContainer>
                )}
                {userInfo && userInfo.isAdmin && (
                  <NavDropdown title='Admin' id='adminmenu'>
                    <LinkContainer to='/admin/productlist'>
                      <NavDropdown.Item className="text-black">Products</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/admin/orderlist'>
                      <NavDropdown.Item className="text-black">Orders</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/admin/userlist'>
                      <NavDropdown.Item className="text-black">Users</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div style={{ borderBottom: '1px solid black' }}></div>
      </header>
    </>
  );
};

export default Header;

import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { logout } from '../redux/action/userAction';

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const logoutHandler = () => {
    dispatch(logout());
  };

  const [main, setMain] = useState();

  useEffect(() => {
    window.scrollTo({ top: 0 });
    if (location.pathname === '/') {
      setMain(true);
    } else {
      setMain(false);
    }
    // eslint-disable-next-line
  }, [location]);

  return (
    <header>
      {!main && (
        <Navbar bg='dark' variant='dark' expand='lg'>
          <Container>
            <Navbar.Brand href='/'>Home</Navbar.Brand>

            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='me-auto'>
                <NavDropdown title='Projects' id='basic-nav-dropdown'>
                  <NavDropdown.Item href='/projects/movierent'>
                    Movie Rent
                  </NavDropdown.Item>
                  <NavDropdown.Item href='/projects/ecommerce'>
                    E-Commerce
                  </NavDropdown.Item>
                  <NavDropdown.Item href='/projects/cryptoinfo'>
                    Crypto Info
                  </NavDropdown.Item>
                </NavDropdown>
                {/* <Nav.Link href='/contact'>Contact</Nav.Link> */}
              </Nav>
              <Nav>
                {cartItems[0] && (
                  <Nav.Link href='/projects/ecommerce/cart'>
                    <i className='fas fa-shopping-cart'></i> Cart
                  </Nav.Link>
                )}
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id='username'>
                    <NavDropdown.Item href='/profile'>Profile</NavDropdown.Item>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Sign out
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <Nav.Link href='/login'>
                    <i className='fas fa-user'></i>Log in
                  </Nav.Link>
                )}
                {userInfo && userInfo.isAdmin && (
                  <NavDropdown title='Admin' id='adminmenu'>
                    <NavDropdown.Item href='/admin/userlist'>
                      Users
                    </NavDropdown.Item>
                    <NavDropdown.Item href='/admin/movieList'>
                      Movies
                    </NavDropdown.Item>
                    <NavDropdown.Item href='/admin/productlist'>
                      Products
                    </NavDropdown.Item>
                    <NavDropdown.Item href='/admin/orderlist'>
                      Orders
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </header>
  );
};

export default Header;

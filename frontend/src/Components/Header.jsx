import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

const Header = () => {
  return (
    <header className='mb-5'>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container>
          <Navbar.Brand href='/'>Home</Navbar.Brand>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <NavDropdown title='Projects' id='basic-nav-dropdown'>
                <NavDropdown.Item href='/1'>1</NavDropdown.Item>
                <NavDropdown.Item href='/2'>2</NavDropdown.Item>
                <NavDropdown.Item href='/3'>3</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href='/contact'>Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

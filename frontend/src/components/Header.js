import React from "react";

// Style Bootstrap
import { Container, Navbar, Nav } from "react-bootstrap";

const Header = () => {
  return (
    <header>
      <Navbar bg='secondary' variant='dark' expand='md' collapseOnSelect>
        <Container>
          <Navbar.Brand href='/'>
            <img
              style={{ width: 200 }}
              className='header-img'
              src='https://static.wixstatic.com/media/dacd3c_9c59fc58518c4d3583ad8ec982d036b1~mv2.png/v1/crop/x_0,y_408,w_1730,h_356/fill/w_332,h_68,al_c,q_85,usm_0.66_1.00_0.01/Hawksbill_logo_vector-01%20(2).webp'
              alt='hakwsbill'
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <Nav.Link href='/card'>
                <i className='fas fa-shopping-cart'></i> Cart
              </Nav.Link>
              <Nav.Link href='/login'>
                <i className='fas fa-user'></i>Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

import React from "react";

import { LinkContainer } from "react-router-bootstrap";

// Style Bootstrap
import { Container, Navbar, Nav, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = ({ color }) => {
  return (
    <header>
      <Navbar bg='light' variant='dark' expand='md' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <Image
                style={{ width: 200 }}
                className='header-img'
                src='https://static.wixstatic.com/media/dacd3c_9c59fc58518c4d3583ad8ec982d036b1~mv2.png/v1/crop/x_0,y_408,w_1730,h_356/fill/w_332,h_68,al_c,q_85,usm_0.66_1.00_0.01/Hawksbill_logo_vector-01%20(2).webp'
                alt='hakwsbill'
              />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <LinkContainer to='/card' style={{ color }}>
                <Nav.Link>
                  <i
                    style={{ color }}
                    className='fas fa-shopping-cart mr-1'
                  ></i>
                  Cart
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/login' style={{ color }}>
                <Nav.Link>
                  <i style={{ color }} className='fas fa-user mr-1'></i>Login
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

Header.defaultProps = {
  color: "rgb(14,72,120)",
};

export default Header;

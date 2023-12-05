import React from 'react';
import { Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import {Navbar, Nav, Container, NavDropdown,ThemeProvider, Button, ToggleButton } from 'react-bootstrap';


const Header = () => {
    return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect className='py-3'>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Occupancy Management System  @IIITA</Navbar.Brand>
          </LinkContainer>
          <div className='float-right '>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <LinkContainer to='/'>
                <Nav.Link>
                <Button type='submit' variant='outline-light' className='p-2'>
                  Entry
                </Button>
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to='/admin'>
                <Nav.Link>
                  <Button type='submit' variant='outline-light' className='p-2'>
                    Admin
                  </Button>
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>

          </div>
        </Container>
      </Navbar>
    </header>
    )
}

export default Header
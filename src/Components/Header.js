import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Headers() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSignUpSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="/"></Navbar.Brand>

        <Nav>
          {isLoggedIn ? (
            <Link to="/" onClick={handleSignOut}>Sign Out</Link>
          ) : (
            <>
              <Link to={`/auth/Sign-up`} onClick={handleSignUpSuccess}>Sign Up</Link>
              <Link to={`/auth/Sign-in`}>Sign In</Link>
            </>
          )}
        </Nav>

      </Container>
    </Navbar>
  );
}

export default Headers;

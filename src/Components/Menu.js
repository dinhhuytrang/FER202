import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

function BasicExample() {
  return (
    <Nav>
      <Nav.Item style={{ marginRight: '10px', marginLeft: '40px' }}>
        <Link to="/">Home</Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/products">Product</Link> 
      </Nav.Item>
      <Nav.Item style={{ marginLeft: '10px' }}>
        <Link to="#">Contact</Link>
      </Nav.Item>
      <Nav.Item style={{ marginLeft: '10px' }}>
        <Link to="#">About</Link>
      </Nav.Item>
      <Nav.Item></Nav.Item>
    </Nav>
  );
}

export default BasicExample;

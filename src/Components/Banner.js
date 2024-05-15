import React from 'react';
import { Carousel, Nav } from 'react-bootstrap';

function Banner ()  {
  return (
    <Nav>
      <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="assets/b1.png" 
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="assets/b2.png"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="assets/b3.png"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
    </Nav>
    
  );
};

export default Banner;

import React from 'react';
import { Container } from 'react-bootstrap'; // Import Container from react-bootstrap

function Footer() {
  return (
    <div className='container-fluid'>
    
      <Container fluid className="my-5"> {/* Add fluid prop to make the Container fluid */}
        <footer className="text-center text-lg-start text-white" style={{ backgroundColor: '#1c2331' }}>
          <section className="d-flex justify-content-between p-4" style={{ backgroundColor: '#6351ce' }}>
            {/* Left */}
            <div className="me-5">
              <span>Get connected with us on social networks:</span>
            </div>
            <div>
              <a href="" className="text-white me-4">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="" className="text-white me-4">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="" className="text-white me-4">
                <i className="fab fa-google"></i>
              </a>
              <a href="" className="text-white me-4">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="" className="text-white me-4">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="" className="text-white me-4">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </section>

          <section className="">
            <Container> {/* Nested Container */}
              <div className="text-center text-md-start mt-5">
                <div className="row mt-3">
                    
                </div>
              </div>
            </Container>
          </section>

          <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
            © 2024 Copyright:
            <a className="text-white" href="https://mdbootstrap.com/">MDBootstrap.com</a>
          </div>
        </footer>
      </Container>
    </div>
  );
}

export default Footer;

import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Headers from './Components/Header';
import Banner from './Components/Banner';
import Hotnews from './Components/Hotnews';
import BasicExample from './Components/Menu';
import Home from './Components/Homepage';
import CardProduct from './Components/Card';
import Footer from './Components/Footer';
import Menuproduct from './Components/Menuproduct';
import DetailProduct from './Components/DetailProduct';
import SignUp from './Components/SignUp';
import SignIn from './Components/SignIn';
import ViewProductAdmin from './Components/ViewProductAdmin';
import AddProduct from './Components/AddProduct';
import AddToCart from './Components/AddToCart';
import VerifyOrder from './Components/VerifyOrder';
import HistoryOrder from './Components/HistoryOrder';

function App() {
  return (
    <Router>
      <Container fluid>


        <Routes>
          <Route path="/auth/Sign-up" element={<SignUp />} />
          <Route path='/auth/Sign-in' element={<SignIn/>}/>
          <Route path='/admin/products' element={<ViewProductAdmin/>}/>
          <Route path='/admin/product/create' element={<AddProduct/>}/>
          <Route path='/product/:id/viewdetail' element={<DetailProduct/>}/>
          <Route path='/add/to/cart' element={<AddToCart/>}/>
          <Route path='/Order/verify' element={<VerifyOrder/>}/>
          <Route path='/history'element={<HistoryOrder/>}/>
 
          
          <Route
            path="/"
            element={
              <>
                <Row>
                  <Col sm={12} xs={12}>
                    <Headers />
                  </Col>
                </Row>
                <Row>
                  <Col sm={9} xs={12}>
                    <Banner />
                  </Col>
                  <Col sm={3} xs={12}>
                    <Hotnews />
                  </Col>
                </Row>
                <Row>
                  <Col className="d-flex justify-content-center" sm={12} xs={12}>
                    <BasicExample />
                  </Col>
                </Row>
                <Row>
                  
                  <Col sm={2}>
                    <Menuproduct />
                  </Col>
                  <Col sm={10}>
                    <Home />
                  </Col>
                </Row>
                <Row>
                  <Col sm={12}>
                    <Footer />
                  </Col>
                </Row>
              </>
            }
          />

        
        </Routes>
      </Container>
    </Router>
  );
}

export default App;

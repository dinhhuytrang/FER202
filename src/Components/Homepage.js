import React, { useState, useEffect } from 'react';
import { Col, Row, Container, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home() {
  const [products, setProducts] = useState([]);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    fetch('http://localhost:9999/products')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      });

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserName(user.name);
      setUserEmail(user.email);
    }
  }, []);

  return (
    <div>
      <Row>
        <Col style={{ marginLeft: "960px" }} sm={3}>
          <Link to={`/history`}>
            <Button> History order</Button>
          </Link>

        </Col>
      </Row>
      <div>


        <h1 style={{ textAlign: "center" }}> Welcome to Store</h1>


      </div>
      <Container fluid>
        <Row>

          {products.map((p) => (
            <Col sm={3} key={p.id}>
              <Card style={{ width: '18rem', marginBottom: "10px" }}>
                <Card.Img variant="top" src={p.image} />
                <Card.Body>
                  <Card.Title>{p.name}</Card.Title>
                  <Card.Text>{p.description}</Card.Text>
                  <Card.Text style={{ fontWeight: 'bold', color: 'red' }}>Price: {p.price} VND</Card.Text>

                  <Link to={`/product/${p.id}/viewdetail`}> 
                    <Button variant="primary">View Detail</Button>
                  </Link>



                </Card.Body>
              </Card>
            </Col>
          ))}

        </Row>
      </Container>
    </div>
  );
}

export default Home;

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import Headers from './Header';
import Banner from './Banner';
import Hotnews from './Hotnews';
import BasicExample from './Menu';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

function DetailProduct() {
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:9999/products/${id}`)
            .then(res => res.json())
            .then(result => setProduct(result));
    }, []);

    const addToCart = () => {
        // Check if product already exists in the cart
        fetch('http://localhost:9999/cart')
            .then(res => res.json())
            .then(cartItems => {
                const existingProduct = cartItems.find(item => item.id === product.id);
                if (existingProduct) {
                    // If product already exists, increase quantity by 1
                    const updatedProduct = { ...existingProduct, quantity: existingProduct.quantity + 1 };
                    updateCart(updatedProduct);
                } else {
                    // If product doesn't exist, add it to cart with quantity 1
                    const newProduct = { ...product, quantity: 1 };
                    addToCartApi(newProduct);
                }
            })
            .catch(error => {
                console.error('Error checking cart:', error);
                alert('Failed to add product to cart.');
            });
    };

    const addToCartApi = (product) => {
        fetch('http://localhost:9999/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
            .then(response => handleCartResponse(response))
            .catch(error => {
                console.error('Error adding product to cart:', error);
                alert('Failed to add product to cart.');
            });
    };

    const updateCart = (product) => {
        fetch(`http://localhost:9999/cart/${product.id}`, {
            method: 'PUT', // or PATCH depending on your API
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
            .then(response => handleCartResponse(response))
            .catch(error => {
                console.error('Error updating cart:', error);
                alert('Failed to update cart.');
            });
    };

    const handleCartResponse = (response) => {
        if (response.ok) {
            alert('Product added to cart successfully!');
            navigate('/add/to/cart');
        } else {
            throw new Error('Failed to add product to cart.');
        }
    };
    return (
        <div>
            <Container fluid>
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
                    <Col sm={5}>
                        <Card>
                            <Card.Img variant="top" src={product.image} style={{ width: "500px", height: "500px", justifyContent: "center" }} />
                        </Card>
                    </Col>
                    <Col sm={5}>
                        <Card.Body>
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Title style={{ fontWeight: 'bold', color: 'red' }}>Price: {product.price} VND</Card.Title>
                            <Card.Text>
                                {product.description}
                            </Card.Text>
                            <Card.Text>
                                Create At: {product.createdAt}
                            </Card.Text>
                            <Button style={{ marginRight: "10px" }} variant="primary" onClick={addToCart}>
                                <FaShoppingCart style={{ marginRight: "5px" }} /> Add to Cart
                            </Button>
                            <Button variant="outline-primary">
                                <FaShoppingCart /> Buy
                            </Button>
                        </Card.Body>
                    </Col>
                </Row>

                <Row>
                    <Col xs={12}>
                        <Footer />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default DetailProduct;

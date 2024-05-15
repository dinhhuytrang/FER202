import React, { useState, useEffect } from 'react';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function VerifyOrder() {
    const [orderDate, setOrderDate] = useState('');
    const [requireDate, setRequireDate] = useState('');
    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    
    const navigate = useNavigate();

    useEffect(() => {
        // Lấy dữ liệu từ localStorage nếu có
        const userData = localStorage.getItem('user');
        if (userData) {
            const { orderDate, requireDate, fullName, address, phone, email } = JSON.parse(userData);
            setOrderDate(orderDate);
            setRequireDate(requireDate);
            setFullName(fullName);
            setAddress(address);
            setPhone(phone);
            setEmail(email);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProduct = { orderDate, requireDate, fullName, address, phone, email };
        if (validProduct(newProduct)) {
            fetch("http://localhost:9999/orders", {
                method: "POST",
                body: JSON.stringify(newProduct),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
                .then(res => res.json())
                .then(result => {
                    if (result) {
                        alert(`create success`);
                        navigate('/'); // Go to Home page
                    }
                })
        }
    };

    const validProduct = ({ orderDate, requireDate, fullName, address, phone, email }) => {
        let errorMsg = '';
        if (!orderDate || !requireDate || !fullName || !email) {
            errorMsg += "Please fill in all required fields.\n";
        }
        if (!email.includes('@')) {
            errorMsg += "Invalid email address.\n";
        }

        // Set orderDate to the current date if it's not provided
        if (!orderDate) {
            const currentDate = new Date();
            const formattedDate = currentDate.toISOString().split('T')[0]; // Format: YYYY-MM-DD
            orderDate = formattedDate;
        }

        if (errorMsg) {
            alert(errorMsg);
            return false;
        }
        return true;
    };

    return (
        <Container>
            <Row>
                <Col>
                    <h3 style={{ textAlign: "center", textTransform: "uppercase" }}>Verify Order</h3>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Require Date (*)</Form.Label>
                            <Form.Control type="date" value={requireDate} onChange={(e) => setRequireDate(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Order Date (*)</Form.Label>
                            <Form.Control type="date" value={orderDate} onChange={(e) => setOrderDate(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Full Name (*)</Form.Label>
                            <Form.Control value={fullName} onChange={(e) => setFullName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control value={address} onChange={(e) => setAddress(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email (*)</Form.Label>
                            <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Button type='submit' variant='success'>Verify</Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default VerifyOrder;

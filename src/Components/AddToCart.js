import React, { useState, useEffect } from 'react';
import { Row, Container, Col, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function AddToCart() {
    const [carts, setCarts] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:9999/cart`)
            .then(res => res.json())
            .then(result => setCarts(result));
    }, []);

    const handleVerifyOrder = () => {
        const orderData = {
            id: 1, // Thay đổi id đơn hàng tùy thuộc vào cách bạn quản lý id
            orderDate: new Date().toISOString().slice(0, 10),
            requireDate: new Date().toISOString().slice(0, 10),
            customers: {
                cusId: "", // Thêm thông tin khách hàng từ form nếu cần
                fulname: "",
                address: "",
                phone: "",
                email: ""
            },
            products: carts.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                vat: item.price * item.quantity * 0.08, // Tính VAT
                discount: 0 // Giả sử không có giảm giá
            }))
        };

        fetch('http://localhost:9999/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        }).then(response => {
            if (response.ok) {
                // Xử lý khi đơn hàng được lưu thành công
                console.log("Order verified and saved successfully!");
            } else {
                // Xử lý khi có lỗi xảy ra
                console.error("Error verifying order:", response.statusText);
            }
        }).catch(error => {
            console.error("Error verifying order:", error);
        });
    };
    const handleRemoveAll = () => {
        setCarts([]);
    };
    return (
        <Container>
            <h3 style={{ textAlign: "center" }}>Cart</h3>
            <br></br>
            <Link to={`/`}>Home</Link>
            <br></br>
            <Button style={{ marginBottom: "10px" }} onClick={handleRemoveAll}>Remove All</Button>

            <Row>
                <Col>
                    <Table striped hover bordered>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Description</th>
                                <th>Quantity</th>
                                <th>Image</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {carts.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.description}</td>
                                    <td>{item.quantity}</td>
                                    <td>
                                        <img src={item.image} alt={item.name} style={{ width: "100px", height: "100px" }} />
                                    </td>
                                    <td>{item.price * item.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div style={{ color: "red", fontWeight: "bold", fontSize: "24px" }}>VAT = {carts.reduce((acc, item) => acc + (item.price * item.quantity * 0.08), 0)} VND</div>
                    <div style={{ color: "red", fontWeight: "bold", fontSize: "24px" }}>Discount = 0 VND</div>
                    <div style={{ color: "blue", fontWeight: "bold", fontSize: "24px" }}>Total = {carts.reduce((acc, item) => acc + (item.price * item.quantity), 0) - carts.reduce((acc, item) => acc + (item.price * item.quantity * 0.08), 0)} VND</div>
                </Col>
            </Row>
            <Row>
                <Col xs={5}>
                    <Link to={`/Order/verify`}>
                        <Button style={{ marginBottom: "10px", marginTop: "10px" }} onClick={handleVerifyOrder}>Verify Order</Button>
                        <br></br>
                    </Link>

                </Col>
                <Col xs={5}>
                    <Link to={`https://sandbox.vnpayment.vn/tryitnow/Home/CreateOrder`}>
                        <Button style={{ marginBottom: "10px", marginTop: "10px" }}>Payment</Button>

                    </Link>
                </Col>
            </Row>
        </Container>
    );
}

export default AddToCart;

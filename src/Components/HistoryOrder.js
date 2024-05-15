import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'

function HistoryOrder() {
    const [carts, setCarts] = useState([]);
    const [oders, setOders] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:9999/cart`)
            .then(res => res.json())
            .then(result => setCarts(result));
        fetch(`http://localhost:9999/orders/?id=2`)
            .then(res => res.json())
            .then(result => setOders(result));
    }, []);

    return (
        <Container>
            <Row>
                <Col xs={6}>
                    <h3>Customer Info</h3>
                    {oders?.map((data, index) => (
                        <div key={index}>
                            <h5>Name: {data.fullName} </h5>
                            <h5>Address: {data.address} </h5>
                            <h5>Phone: {data.phone} </h5>
                            <h5>Email: {data.email} </h5>
                            <h5>Order date: {data.orderDate} </h5>
                            <h5>Require date: {data.requireDate} </h5>
                        </div>
                    ))}
                </Col>

                <Col xs={6} >
                    <Table>
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
        </Container>
    )
}

export default HistoryOrder

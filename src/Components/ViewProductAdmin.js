import React, { useState, useEffect } from 'react';
import { Container, Button, Table, Row, Col } from 'react-bootstrap';
import { FaEye, FaTrash, FaEdit, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function ViewProductAdmin() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        fetch('http://localhost:9999/products')
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((error) => console.log('Error fetching products:', error));
    };

    const deleteProduct = (productId) => {
        fetch(`http://localhost:9999/products/${productId}`, {
            method: 'DELETE'
        })
        .then((res) => {
            if (res.ok) {
                // Remove the deleted product from the state
                setProducts(products.filter(product => product.id !== productId));
            } else {
                console.error('Failed to delete product');
            }
        })
        .catch((error) => console.error('Error deleting product:', error));
    };

    return (
        <Container fluid>
            <h3 style={{ textAlign: "center", textTransform: "uppercase" }}>List Of Product</h3>
            <Row>
                <Col sm={12} xs={12}>
                    <Link to={`/admin/product/create`}>
                        <Button variant="primary" style={{ marginRight: "10px", marginBottom: "10px" }}>
                            <FaPlus /> Add Product
                        </Button>
                    </Link>
                </Col>
            </Row>
            <Table striped hover bordered>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Images</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>CreatedAt</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={index}>
                            <td>{product.id}</td>
                            <td>
                                <img src={product.image} style={{ width: "100px", height: "100px" }} alt={product.name} />
                            </td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.description}</td>
                            <td>{product.createdAt}</td>
                            <td>
                                <Link to={`/product/${product.id}`}>
                                    <Button variant="primary" style={{ marginRight: "10px" }}>
                                        <FaEye /> View Detail
                                    </Button>
                                </Link>
                                <Button variant="danger" style={{ marginRight: "10px" }} onClick={() => deleteProduct(product.id)}>
                                    <FaTrash /> Delete
                                </Button>
                                <Button style={{ marginTop: "10px" }} variant="warning" >
                                    <FaEdit /> Update
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default ViewProductAdmin;

import React, { useState, useEffect } from 'react';
import { Form, Container, Row, Col, Button, Image } from 'react-bootstrap'; //Thêm Image từ react-bootstrap
import { useNavigate } from 'react-router-dom';

function AddProduct({ categories = [] }) {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [createAt, setCreateAt] = useState('');
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(''); //Thêm state để lưu URL của hình ảnh

    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:9999/products")
            .then(res => res.json())
            .then(result => setProducts(result));
    }, []);

    // Xử lý save to DB
    const handleSubmit = (e) => {
        e.preventDefault();
        const newProduct = { id, name, price, description, createAt, image };
        if (validProduct(newProduct)) {
            fetch("http://localhost:9999/products", {
                method: "POST",
                body: JSON.stringify(newProduct),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
                .then(res => res.json())
                .then(result => {
                    if (result) {
                        alert(`${result.name} create success`);
                        navigate('/admin/products'); // Go to Home page
                    }
                })
        }
    };

    function validProduct({ id, name, price, description, createAt, image }) {
        let msg = '';
        if (id === "") {
            msg += "ProductId is required\n";
        } else if (!id.match(/^P\d{3}$/)) {
            msg += "Invalid ProductId. Ex: P123";
        } else {
            const product = products.find(p => p.id === id);
            if (product) {
                msg += "This ProductId existed.";
            }
        }
        if (name === "") {
            msg += "Product name is required";
        }
        if (price === "") {
            msg += "Price is required";
        } else {
            if (price <= 0) {
                msg += "Price must be greater than 0";
            }
            if (price % 1 !== 0) {
                msg += "Price must be an integer";
            }
        }
        if (description === "") {
            msg += "Description is required";
        } else {
            if (description.length < 10) {
                msg += "Description must be at least 10 characters";
            }
        }
        if (createAt === "") {
            msg += "CreateAt is required";
        } else {
            const datePattern = /^\d{4}-\d{2}-\d{2}$/;
            if (!datePattern.test(createAt)) {
                msg += "CreateAt must be in YYYY-MM-DD format";
            }
        }
        if (!image || image.length === 0) {
            msg += "Image is required";
        }
        if (msg.length !== 0) {
            alert(msg);
            return false;
        }

        return true;
    }

    // Thay đổi hình ảnh
    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
        const imageUrl = URL.createObjectURL(selectedImage); // Tạo URL cho hình ảnh
        setImageUrl(imageUrl); // Lưu URL của hình ảnh vào state
    };

    return (
        <Container>
            <Row>
                <Col>
                    <h3 style={{ textAlign: "center", textTransform: "uppercase" }}>Create new product</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Id (*)</Form.Label>
                            <Form.Control onChange={e => setId(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Product name (*)</Form.Label>
                            <Form.Control onChange={e => setName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type='number' min={0} onChange={e => setPrice(parseInt(e.target.value))} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type='text' onChange={e => setDescription(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Create At</Form.Label>
                            <Form.Control type='date' onChange={e => setCreateAt(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Images</Form.Label>
                            <Form.Control type='file' onChange={handleImageChange} />
                        </Form.Group>
                        {/* Hiển thị hình ảnh */}
                        {imageUrl && (
                            <Image src={imageUrl} alt="Product Image" fluid />
                        )}
                        <Form.Group className='mb-3'>
                            <Button type='submit' variant='success'>Create</Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default AddProduct;

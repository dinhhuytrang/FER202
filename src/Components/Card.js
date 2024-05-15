import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Row, Col, Container, Pagination } from 'react-bootstrap';

const products = [
  { "id": "001", "name": "SamSung Untra21", "price": 30000000, "description": "iPhone 15 Pro Max là một chiếc điện thoại thông minh cao cấp được mong đợi nhất năm 2023.", "createdAt": "11/4/2024", "image": "./assets/p1.png" },
  { "id": "002", "name": "Apple 15", "price": 25000000, "description": "iPhone 14 Pro là một trong những chiếc điện thoại di động hàng đầu của Apple.", "createdAt": "11/4/2024", "image": "./assets/p2.png" },
  { "id": "003", "name": "SamSung Untra24", "price": 15000000, "description": "Tai nghe Sony WH-1000XM5 với chất lượng âm thanh tuyệt vời và tính năng chống ồn hiệu quả.", "createdAt": "11/4/2024", "image": "./assets/p3.png" },
  { "id": "004", "name": "SamSungS24", "price": 12000000, "description": "Máy ảnh Canon EOS R5 với khả năng quay video 8K và cảm biến CMOS Full-Frame 45MP.", "createdAt": "11/4/2024", "image": "./assets/p4.png" },
  { "id": "005", "name": "SamSung Z-Flix23", "price": 2000000, "description": "Giày thể thao Nike Air Zoom Pegasus 38 với thiết kế thoải mái và hiệu suất tốt.", "createdAt": "11/4/2024", "image": "./assets/p5.png" },
  { "id": "006", "name": "Apple 14 Promax", "price": 1800000, "description": "Áo khoác Adidas Terrex với công nghệ giữ ấm và chống nước hiệu quả.", "createdAt": "11/4/2024", "image": "./assets/p6.png" },
  { "id": "007", "name": "Samsung F15", "price": 5000000, "description": "Màn hình cong Samsung Odyssey G7 với tần số làm mới cao và độ phân giải QHD.", "createdAt": "11/4/2024", "image": "./assets/p7.png" },
  { "id": "008", "name": "Iphone 16 Promax", "price": 7000000, "description": "Tivi LG OLED C1 với công nghệ OLED và hỗ trợ định dạng video HDR.", "createdAt": "11/4/2024", "image": "./assets/p8.png" }
];

function CardProduct() {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6; // Số sản phẩm hiển thị trên mỗi trang

  // Tính chỉ số của sản phẩm đầu tiên và cuối cùng trên mỗi trang
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Thay đổi trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container>
      <Row xs={12} md={2} lg={3} className="g-4">
        {currentProducts.map((product) => (
          <Col key={product.id}>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={product.image} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>{product.price} USD</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Row className="justify-content-center mt-4">
        <Pagination>
          {[...Array(Math.ceil(products.length / productsPerPage)).keys()].map((number) => (
            <Pagination.Item key={number + 1} onClick={() => paginate(number + 1)} active={number + 1 === currentPage}>
              {number + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </Row>
    </Container>
  );
}

export default CardProduct;

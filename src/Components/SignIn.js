import { useState, useEffect } from 'react';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const [account, setAccount] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch account data from server on component mount
    fetch("http://localhost:9999/accounts")
      .then(res => res.json())
      .then(result => setAccount(result));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if email and password match any account
    const user = account.find(acc => acc.email === email && acc.password === password);
    if (user) {
      // Store user data in local storage
      localStorage.setItem('user', JSON.stringify(user));
      // Redirect based on user role
      if (user.Role.toLowerCase() === 'admin') {
        navigate('/admin/products');
      } else {
        navigate('/');
      }
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <Container>
      <Row>
        <Col sm={12} xs={12}>
          <h3 style={{ textAlign: "center", textTransform: "uppercase" }}> Sign In</h3>
        </Col>
      </Row>
      <Row>
        <Col sm={7} xs={7}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Button type="submit">Sign In</Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default SignIn;

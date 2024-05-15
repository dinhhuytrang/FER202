import { useState, useEffect } from 'react';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [account, setAccount] = useState('');
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const Role = 'user'; // Default role

  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:9999/accounts")  // de y 2 cho database
      .then(res => res.json())
      .then(result => setAccount(result));
  }, []);

  const handleSubmit = (e) => {
    // Ngăn chặn hoạt động re-load form sau khi submit
    e.preventDefault();
    const newProduct = { id, email, password, dateOfBirth, gender, Role };
    if (validProduct(newProduct)) {
      // Create
      fetch("http://localhost:9999/accounts", {   //fetch data from server
        method: "POST",
        body: JSON.stringify(newProduct),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
        .then(res => res.json())
        .then(result => {
          if (result) {
            alert(`${result.email} create success`);
            navigate('/auth/Sign-in'); // Go to Home page
          }
        })
    }
  };
  function validProduct({ id, email, password, dateOfBirth, gender, Role }) {
    let msg = '';

    // Check if account has been initialized
    if (!account) {
      msg += "Account information is not available yet. Please try again later.";
      return false; // Exit early since we can't validate without account information
    }

    // Check Email:
    if (email === "") {
      msg += "Email is required.\n";
    } else {
      const existingAccount = account.find(p => p.email === email);
      if (existingAccount) {
        msg += "This email already exists.";
      }
    }

    // Check Password:
    if (password === "") {
      msg += "Password is required.\n";
    } else {
      if (password.length < 8) {
        msg += "Password must be at least 8 characters long.\n";
      }
    }

    // Check date of birth:
    if (dateOfBirth === "") {
      msg += "Date of Birth is required.\n";
    } else if (!dateOfBirth.match(/^\d{4}-\d{2}-\d{2}$/)) {
      msg += "Invalid Date of Birth format. Please use YYYY-MM-DD format.\n";
    }

    // Check gender:
    if (gender === "") {
      msg += "Gender is required.\n";
    } else if (!["male", "female", "other"].includes(gender)) {
      msg += "Invalid gender. Please select from 'male', 'female', or 'other'.\n";
    }

    // Display error message if any
    if (msg.length !== 0) {
      alert(msg);
      return false;
    }

    return true;
  }


  return (
    <Container>
      <Row>
        <Col sm={12} xs={12}>
          <h3 style={{ textAlign: "center", textTransform: "uppercase" }}> Sign Up</h3>
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
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="male"
                  value="male"
                  onChange={(e) => setGender(e.target.value)}
                />
                <label className="form-check-label" htmlFor="male">Male</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="female"
                  value="female"
                  onChange={(e) => setGender(e.target.value)}
                />
                <label className="form-check-label" htmlFor="female">Female</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="other"
                  value="other"
                  onChange={(e) => setGender(e.target.value)}
                />
                <label className="form-check-label" htmlFor="other">Other</label>
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Button type="submit">Register</Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUp;

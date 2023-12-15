import React from "react";
import {
  Card,
  Button,
  Col,
  Row,
  Form,
  InputGroup,
  Image,
} from "react-bootstrap";
import "../../css/LoginCard.css";
import { useState } from "react";

const LoginCard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    // Check if the email and password are correct
    if (email === "patient@example.com" && password === "123") {
      window.location.href = "/exerciselist";
    } else if (email === "therapist@example.com" && password === "123") {
      window.location.href = "/therapist-patientlist";
    } else {
      setError("Invalid email or password");
    }
    console.log("Email:", email);
    console.log("Password:", password);
  };
   
 

  return (
    <div>
      <Card className="" style={{ maxWidth: "64rem", borderRadius: "16px" }}>
        <Row className="">
          <Col>
            <Image src="/images/loginpic.png" fluid style={{ borderRadius: "16px" }} />
          </Col>
          <Col>
            <div className="px-5 py-5">
              <h1>Login</h1>
              <h5 className="text-start custom-font">Email:</h5>
              <InputGroup className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Type your email"
                  aria-label="Type your email"
                  className="input"
                  value={email}
                  onChange={handleEmailChange}
                />
              </InputGroup>
              <h5 className="text-start custom-font">Password:</h5>
              <InputGroup className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Type your password"
                  aria-label="Type your password"
                  aria-describedby="basic-addon2"
                  className="input"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </InputGroup>
              <h6 className="text-end">Forget password?</h6>
              <div className="d-grid gap-2">
                <Button
                  variant="primary"
                  size="lg"
                  className="login-bt my-4"
                  onClick={handleLogin}
                >
                  Login
                </Button>
              </div>
              <div className="flex">
                <h6 className="custom-font">
                  <span>Don’t have an account? </span>
                  <span style={{ color: "#FF5757" }}>SIGN UP</span>
                </h6>
              </div>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default LoginCard;

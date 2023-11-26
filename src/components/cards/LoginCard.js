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
import "./LoginCard.css";
import "../buttons/Button.css";

const LoginCard = () => {
  return (
    <div>
      {" "}
      <Card className=" " style={{ maxWidth: "64rem", borderRadius: "16px" }}>
        <Row className="">
          <Col>
            {" "}
            <Image src="loginpic.png" fluid />
          </Col>
          <Col className="">
            <div className="px-5 py-5">
              <h1>Login</h1>
              <h5 className="text-start">Email:</h5>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Type your email"
                  aria-label="Type your email"
                  className="input"
                />
              </InputGroup>
              <h5 className="text-start">Password:</h5>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Type your password"
                  aria-label="Type your password"
                  aria-describedby="basic-addon2"
                  className="input"
                />
              </InputGroup>
              <h6 className="text-end"> forget password?</h6>
              <div className="d-grid gap-2">
                <Button variant="primary" size="lg" className="login-bt my-4">
                  Login{" "}
                </Button>
              </div>
              <div className="flex">
                {" "}
                <h6>
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

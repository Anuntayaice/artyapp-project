import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import "../../css/SignupCard.css";
function TherapistSignupCard() {
  return (
    <Form
      className="px-5 py-5 mb-4"
      style={{
        background: "rgba(255, 254, 254, 0.2)",
        borderRadius: "0.5rem",
        border: "1px solid rgba(255, 254, 254, 0.4)",
      }}
    >
      <Row className="mb-3">
        <Col md={5}>
          <Form.Label style={{ float: "left", paddingLeft: "1px" }}>
            Front Name
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            className="custom-input"
          />
          <Form.Label style={{ float: "left", paddingLeft: "1px" }}>
            Date of Birth
          </Form.Label>
          <Form.Control type="date" className="custom-input" />
          <Form.Label style={{ float: "left", paddingLeft: "1px" }}>
            Email
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email address"
            className="custom-input"
          />
        </Col>
        <Col md={2}></Col>
        <Col md={5}>
          <Form.Label style={{ float: "left", paddingLeft: "1px" }}>
            Last Name
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            className="custom-input"
          />
          <Form.Label style={{ float: "left", paddingLeft: "1px" }}>
            Phone number
          </Form.Label>
          <Form.Control
            type="phone"
            placeholder="Enter phone number"
            style={{
              background: "transparent",
              borderBottom: "1px solid hsla(120, 100%, 99%, 0.4)",
              borderLeft: "None",
              borderRight: "None",
              borderTop: "None",
              marginBottom: "30px",
              borderRadius: "0",
              padding: "1px",
              outline: "none", // Added to remove outline on focus
            }}
          />
          <Form.Label style={{ float: "left", paddingLeft: "1px" }}>
            Name of company/clinic
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            style={{
              background: "transparent",
              borderBottom: "1px solid hsla(120, 100%, 99%, 0.4)",
              borderLeft: "None",
              borderRight: "None",
              borderTop: "None",
              marginBottom: "20px",
              borderRadius: "0",
              padding: "1px",
            }}
          />
        </Col>
      </Row>
      <Form.Label style={{ display: "flex", paddingLeft: "1px" }}>
        Occupation
      </Form.Label>
      <div
        style={{ display: "flex", paddingLeft: "1px", marginBottom: "12px" }}
      >
        <Form.Check
          inline
          type="checkbox"
          id="checkbox1"
          label="Doctor"
          style={{ width: "100%", textAlign: "left", paddingRight: "0px" }}
        />
        <Form.Check
          inline
          type="checkbox"
          id="checkbox2"
          label="Voice Coach"
          style={{ width: "100%", textAlign: "left", paddingRight: "0px" }}
        />
        <Form.Check
          inline
          type="checkbox"
          id="checkbox3"
          label="Pediatric Speech Pathologist"
          style={{ width: "100%", textAlign: "left", paddingRight: "0px" }}
        />
      </div>
      <div
        style={{ display: "flex", paddingLeft: "1px", paddingBottom: "50px" }}
      >
        <Form.Check
          inline
          type="checkbox"
          id="checkbox4"
          label="Researcher"
          style={{ width: "100%", textAlign: "left", paddingRight: "0px" }}
        />
        <Form.Check
          inline
          type="checkbox"
          id="checkbox5"
          label="SLP"
          style={{ width: "100%", textAlign: "left", paddingRight: "0px" }}
        />
        <Form.Check
          inline
          type="checkbox"
          id="checkbox6"
          label="Other"
          style={{ width: "100%", textAlign: "left", paddingRight: "0px" }}
        />
      </div>

      <Button
        variant="primary"
        type="submit"
        style={{ width: "200px", marginBottom: "5px" }}
      >
        Sign up
      </Button>
      <p style={{ color: "white" }}>
        By clicking sign up you agree to our terms and conditions
      </p>
    </Form>
  );
}

export default TherapistSignupCard;

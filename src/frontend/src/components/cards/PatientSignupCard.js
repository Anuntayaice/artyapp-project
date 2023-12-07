import React from "react";
import { Form, Row, Col, Button, Image } from "react-bootstrap";
import "../../css/SignupCard.css";
import { useState } from "react";
function PatientSignupCard() {
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const avatars = [
    { id: 1, src: "/panda.png" },
    { id: 2, src: "/cat.png" },
    { id: 3, src: "/bear.png" },
  ];
  const handleAvatarClick = (avatarId) => {
    setSelectedAvatar(avatarId);
  };
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
            Name
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            className="custom-input"
          />
          <Form.Label
            style={{ float: "left", paddingLeft: "1px" }}
            className="text-black"
          >
            Date of Birth
          </Form.Label>
          <Form.Control type="date" className="custom-input text-dark" />
          <Form.Label style={{ float: "left", paddingLeft: "1px" }}>
            Parent Email Address
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email address"
            className="custom-input"
          />
          <Form.Label style={{ display: "flex", paddingLeft: "1px" }}>
            Symptoms
          </Form.Label>
          <div
            style={{
              display: "flex",
              paddingLeft: "1px",
              marginBottom: "12px",
            }}
          >
            <Form.Check
              inline
              type="checkbox"
              id="checkbox1"
              label="Slurred speech"
              style={{ width: "100%", textAlign: "left", paddingRight: "12px" }}
            />
            <Form.Check
              inline
              type="checkbox"
              id="checkbox2"
              label="Mumbling"
              style={{ width: "100%", textAlign: "left", paddingRight: "12px" }}
            />
            <Form.Check
              inline
              type="checkbox"
              id="checkbox3"
              label="Stuttering"
              style={{ width: "100%", textAlign: "left", paddingRight: "12px" }}
            />
          </div>
          <div style={{ display: "flex", paddingLeft: "1px" }}>
            <Form.Check
              inline
              type="checkbox"
              id="checkbox4"
              label="Soft or quiet speech"
              style={{ width: "100%", textAlign: "left", paddingRight: "12px" }}
            />
            <Form.Check
              inline
              type="checkbox"
              id="checkbox5"
              label="Speaking too slowly"
              style={{ width: "100%", textAlign: "left", paddingRight: "12px" }}
            />
            <Form.Check
              inline
              type="checkbox"
              id="checkbox6"
              label="Other"
              style={{ width: "100%", textAlign: "left", paddingRight: "12px" }}
            />
          </div>
        </Col>
        <Col md={2}></Col>
        <Col md={5}>
          <Form.Label style={{ float: "left", paddingLeft: "1px" }}>
            Email
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email address"
            className="custom-input"
          />
          <Form.Label style={{ float: "left", paddingLeft: "1px" }}>
            Parent Name
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email"
            className="custom-input"
          />
          <Form.Label style={{ float: "left", paddingLeft: "1px" }}>
            Parent Phone Number
          </Form.Label>
          <Form.Control
            type="phone"
            placeholder="Enter phone number"
            className="custom-input"
          />
          <Form.Label style={{ display: "flex", paddingLeft: "1px" }}>
            Choose Digital Avatar
          </Form.Label>
          <div style={{ marginBottom: "20px", display: "flex" }}>
            {avatars.map((avatar) => (
              <Image
                key={avatar.id}
                src={avatar.src}
                alt={`Digital Avatar ${avatar.id}`}
                style={{
                  marginBottom: "20px",
                  float: "left",
                  paddingRight: "15px",
                  border:
                    selectedAvatar === avatar.id ? "2px solid blue" : "none",
                  cursor: "pointer",
                  maxWidth:'7em',
                }}
                onClick={() => handleAvatarClick(avatar.id)}
                roundedCircle
              />
            ))}
          </div>
        </Col>
      </Row>

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

export default PatientSignupCard;

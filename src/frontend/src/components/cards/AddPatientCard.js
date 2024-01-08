import React from "react";
import {
  Row,
  Col,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import "../../css/SignupCard.css";
import { useState } from "react";
const AddPatientCard = () => {

  const rows = 6;
  const inputClass = `custom-input${rows === 6 ? " multi-row" : ""}`;
  return (
    <Card
      className="px-5 pb-4 pt-5 mb-2 w-100"
      style={{
        background: "rgba(255, 254, 254, 0.2)",
        borderRadius: "0.5rem",
        border: "1px solid rgba(255, 254, 254, 0.4)",
      }}
    >
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          const form = new FormData(e.target);
          let data = Object.fromEntries(form.entries());
          
          // get age from data.birthDate
          const today = new Date();
          const birthDate = new Date(data.birthDate);
          let age = today.getFullYear() - birthDate.getFullYear();
          const m = today.getMonth() - birthDate.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
          }

          data = {
            "role": "patient",
            "password": "123",
            "email": data.email,
            "name": data.firstName + " " + data.lastName,
            "age": age,
            "condition": data.condition,
            "symptoms": data.symptoms.split("\n"),
            "img": `profile${Math.floor(Math.random() * 3) + 1}.png`,
          }

          fetch("http://localhost:5000/profile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Success:", data);
              if (!data.error) {
                window.location.href = "/therapist-patientlist";
              }
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }}
      >
        <Row className="mb-3 text-white">
          <h4 className="text-start mx-4">Personal Information</h4>
          <Col md={6} className="px-5 my-3">
            <Form.Label style={{ float: "left", paddingLeft: "1px" }}>
              First Name
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              className="custom-input"
              name="firstName"
              required
            />
            <Form.Label style={{ float: "left", paddingLeft: "1px" }}>
              Date of Birth
            </Form.Label>
            <Form.Control type="date" className="custom-input text-white" name="birthDate" required/>
          </Col>
          <Col md={6} className="px-5 my-3">
            <Form.Label style={{ float: "left", paddingLeft: "1px" }}>
              Last Name
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              className="custom-input"
              name="lastName"
              required
            />
            <Form.Label style={{ float: "left", paddingLeft: "1px" }}>
              Email
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              className="custom-input"
              name="email"
              required
            />
          </Col>
        </Row>
        <Row className="mb-3 text-white">
          <h4 className="text-start mx-4">Speech Assessment</h4>
          <Col md={6} className="px-5 my-3">
            <Form.Label
              style={{ float: "left", paddingLeft: "1px" }}
              className="mt-3"
            >
              Speech Condition
            </Form.Label>
            <Form.Control as="textarea" className={inputClass} row={6} name="condition"/>
          </Col>
          <Col md={6} className="px-5 my-3">
            <Form.Label
              style={{ float: "left", paddingLeft: "1px" }}
              className="mt-3"
            >
              Symptoms
            </Form.Label>
            <Form.Control as="textarea" className={inputClass} row={12} name="symptoms"/>
          </Col>
        </Row>
        <Button
          variant="primary"
          type="submit"
          style={{ width: "200px", marginBottom: "5px" }}
          className="my-2 m-auto"
        >
          Add
        </Button>
      </Form>
    </Card>
  );
};

export default AddPatientCard;

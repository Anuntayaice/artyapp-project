import React from "react";
import {
  Row,
  Col,
  Form,
  Image,
  Button,
  Card,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import "../../css/SignupCard.css";
import { useState } from "react";
const AddPatientCard = () => {
  const [selectedOption, setSelectedOption] = useState(1);

  const handleToggle = (value) => {
    setSelectedOption(value);
  };

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
      <Row className="mb-3 text-white">
        <h4 className="text-start mx-4">Personal Information</h4>
        <Col md={6} className="px-5 my-3">
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
          <Form.Control type="date" className="custom-input text-white" />
        </Col>
        <Col md={6} className="px-5 my-3">
          <Form.Label style={{ float: "left", paddingLeft: "1px" }}>
            Last Name
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            className="custom-input"
          />
          <Form.Label style={{ float: "left", paddingLeft: "1px" }}>
            Parent's Contact
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            className="custom-input"
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
          <Form.Control as="textarea" className={inputClass} row={6} />
          <Form.Label style={{ float: "left", paddingLeft: "1px" }}>
            Speech Level
          </Form.Label>
          <Form.Control as="textarea" className={inputClass} row={6} />
        </Col>
        <Col md={6} className="px-5 my-3">
          <Form.Label
            style={{ float: "left", paddingLeft: "1px" }}
            className="mt-3"
          >
            Previous Therapy history
          </Form.Label>
          <Form.Control as="textarea" className={inputClass} row={6} />
          <div className="d-flex mb-3">
            Goal
          </div>
          <div className="checkbox-container d-flex ">
            <div className="checkbox d-flex" onClick={() => handleToggle(1)}>
           
              <div
                className={`checkbox-check${
                  selectedOption === 1 ? " checked" : ""
                }`}
              >
                &#10003;
              </div>
              <label className="checkbox-label">Short term</label>
            </div>
            <div className="checkbox d-flex" onClick={() => handleToggle(2)}>
           
              <div
                className={`checkbox-check${
                  selectedOption === 2 ? " checked" : ""
                }`}
              >
                &#10003;
              </div>
              <label className="checkbox-label">Long term</label>
            </div>
          </div>
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
    </Card>
  );
};

export default AddPatientCard;

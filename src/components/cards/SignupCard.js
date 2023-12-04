import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";


function BasicExample() {
  return (
    <Form
      style={{
        width: "80%",
        height: "78%",
        background: "rgba(255, 254, 254, 0.2)",
        borderRadius: "0.5rem",
        border: "1px solid rgba(255, 254, 254, 0.4)",
        paddingRight: "70px",
        paddingLeft: "70px",
        paddingTop: "50px",
        fontFamily:"'OpenDyslexic', sans-serif",
      }}
    >
      <Row className="mb-3">
        <Col md={5}>
          <Form.Label style={{float: "left", paddingLeft:"1px"}}>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            style={{
              background: "transparent",
              borderBottom: "1px solid hsla(120, 100%, 99%, 0.4)",
              borderLeft: "None",
              borderRight: "None",
              borderTop: "None",
              marginBottom: "30px",
              borderRadius: "0",
              padding:"1px"
            }}
          />
          <Form.Label style={{float: "left", paddingLeft:"1px" }}>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            style={{
              background: "transparent",
              borderBottom: "1px solid hsla(120, 100%, 99%, 0.4)",
              borderLeft: "None",
              borderRight: "None",
              borderTop: "None",
              marginBottom: "30px",
              borderRadius: "0",
              padding:"1px",
            }}
          />
          <Form.Label style={{float: "left", paddingLeft:"1px" }}>Parent Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email address"
            style={{
              background: "transparent",
              borderBottom: "1px solid hsla(120, 100%, 99%, 0.4)",
              borderLeft: "None",
              borderRight: "None",
              borderTop: "None",
              marginBottom: "30px",
              borderRadius: "0",
              padding:"1px"
            }}
          />
          <Form.Label style={{display: "flex", paddingLeft:"1px" }}>Symptoms</Form.Label>
          <div style={{ display: "flex", paddingLeft: "1px", marginBottom: "12px",}}>
            <Form.Check inline type="checkbox" id="checkbox1" label="Slurred speech" style={{width: "100%", textAlign:"left", paddingRight: "12px" }} />
            <Form.Check inline type="checkbox" id="checkbox2" label="Mumbling" style={{width: "100%", textAlign:"left", paddingRight: "12px" }} />
            <Form.Check inline type="checkbox" id="checkbox3" label="Stuttering" style={{width: "100%", textAlign:"left", paddingRight: "12px" }} />
          </div>
          <div style={{display: "flex", paddingLeft: "1px" }}>
            <Form.Check inline type="checkbox" id="checkbox4" label="Soft or quiet speech" style={{width: "100%", textAlign:"left", paddingRight: "12px" }} />
            <Form.Check inline type="checkbox" id="checkbox5" label="Speaking too slowly" style={{width: "100%", textAlign:"left", paddingRight: "12px" }} />
            <Form.Check inline type="checkbox" id="checkbox6" label="Other" style={{width: "100%", textAlign:"left", paddingRight: "12px" }} />
          </div>
        </Col>
        <Col md={2}></Col>
        <Col md={5}>
          <Form.Label style={{float: "left", paddingLeft:"1px" }}>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email address"
            style={{
              background: "transparent",
              borderBottom: "1px solid hsla(120, 100%, 99%, 0.4)",
              borderLeft: "None",
              borderRight: "None",
              borderTop: "None",
              marginBottom: "30px",
              borderRadius: "0",
              padding:"1px"
            }}
          />
          <Form.Label style={{float: "left", paddingLeft:"1px" }}>Parent Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email"
            style={{
              background: "transparent",
              borderBottom: "1px solid hsla(120, 100%, 99%, 0.4)",
              borderLeft: "None",
              borderRight: "None",
              borderTop: "None",
              marginBottom: "30px",
              borderRadius: "0",
              padding:"1px",
              outline: "none" // Added to remove outline on focus
            }}
          />
          <Form.Label style={{float: "left", paddingLeft:"1px" }}>Parent Phone Number</Form.Label>
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
              padding:"1px",
            }}
          />
          <Form.Label style={{display: "flex", paddingLeft:"1px" }}>Choose Digital Avatar</Form.Label>
          <img  src={"/panda.png"}
          alt="Digital Avatar"
          style={{ Width: "100px", height: "100px", marginBottom: "20px", float: "left", paddingRight:"15px"}}  
          />
           <img  src={"/cat.png"}
          alt="Digital Avatar"
          style={{ Width: "100px", height: "100px", marginBottom: "20px", float: "left", paddingRight:"15px" }}  
          />
           <img  src={"/bear.png"}
          alt="Digital Avatar"
          style={{ Width: "100px", height: "100px", marginBottom: "20px", float: "left", paddingRight:"15px" }}  
          />
        </Col>
      </Row>

      <Button variant="primary" type="submit" style={{ width: "200px", marginBottom:"5px" }}>
        Sign up
      </Button>
      <p style={{color:"white"}}>By clicking sign up you agree to our terms and conditions</p>
    </Form>
  );
}

export default BasicExample;
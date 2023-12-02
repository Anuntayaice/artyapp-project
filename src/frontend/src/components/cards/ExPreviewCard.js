import React from "react";
import { Image, Card, Button, Row, Col } from "react-bootstrap";

const ExPreviewCard = ({ title, time, level, img, status }) => {
  const isClickable = status === "START";
  const buttonVariant = isClickable ? "success" : "danger";
  const backgroundColor = isClickable ? "" : "rgba(255, 255, 255, 0.5)"; 

  const handleClick = () => {
    if (isClickable) {
      window.location.href = "/sampleexercise";
    }
  };
  return (
    <Card
      style={{ width: "18rem", backgroundColor }} 
      className="d-flex flex-column align-items-center justify-content-center custom-font border-0"
    >
      <Card.Img
        variant="top"
        src={img}
        style={{ maxWidth: "7em" }}
        className="mt-5 mb-4"
      />
      <Card.Body>
        <Card.Title className="mb-4">{title}</Card.Title>
        <Row className="px-5">
          <Col lg={12} className="border-bottom d-inline-block  mb-2">
            {time}
          </Col>
          <Col lg={12} className="border-bottom d-inline-block  mb-2">
            {level}
          </Col>
          <Col lg={12} className="border-bottom d-inline-block mb-2">
            {" "}
            <Image src="medal.png" style={{ maxWidth: "1.5em" }} />
          </Col>
        </Row>
      </Card.Body>
      <Button
        variant={buttonVariant}
        className="my-4"
        style={{ width: "7em" }}
        onClick={handleClick}
        disabled={!isClickable}
      >
        {status}
      </Button>
    </Card>
  );
};

export default ExPreviewCard;

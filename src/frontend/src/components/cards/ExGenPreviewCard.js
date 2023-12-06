import React from "react";
import { Image, Card, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ExGenPreviewCard = ({ id, title, time, level, img }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/exercise/${id}`);
  };

  return (
    <Card
      style={{
        width: "19rem",
        height: "28rem",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
      }}
      className="d-flex flex-column align-items-center justify-content-center border-0 mx-4 text-white"
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
            <Image src="/images/medal.png" style={{ maxWidth: "1.5em" }} />
          </Col>
        </Row>
      </Card.Body>
      <Button
        className="my-4 bg-primary border-o"
        style={{ width: "7em" }}
        onClick={handleClick}
      >
        PREVIEW{" "}
      </Button>
    </Card>
  );
};

export default ExGenPreviewCard;

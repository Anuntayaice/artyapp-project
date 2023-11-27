import React from "react";
import { Card, Button, Row, Col, Image } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useState } from "react";
const ExCard = ({ imageSrc, textSets }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progressValue, setProgressValue] = useState(0);

  const handleNextClick = () => {
    const newIndex = (currentIndex + 1) % textSets.length;

    setCurrentIndex((prevIndex) => (prevIndex + 1) % textSets.length);
    const newProgressValue = (newIndex + 1) * (100 / textSets.length);

    setCurrentIndex(newIndex);
    setProgressValue(newProgressValue);
  };

  return (
    <Card
      className="text-center "
      style={{
        width: "80rem",
        minWidth: "75em",
        maxHeight: "45rem",
        borderRadius: "16px",
        backgroundColor: "rgba(232, 230, 230, 0.2)",
      }}
    >
      <Card.Header
        className="border-0 d-flex justify-content-center align-items-center"
        style={{ height: "4em" }}
      >
        <Row className="w-100 align-content-center align-items-center flex-fill">
          <Col xs={1} className="text-start px-3">
            <Button
              variant="link"
              className="text-white text-decoration-none "
              style={{ fontSize: "2em" }}
            >
              X
            </Button>
          </Col>
          <Col xs={10} className="">
            <ProgressBar
              striped
              now={progressValue}
              className="w-100"
              style={{ height: "30px", borderRadius: "20px" }}
            />
          </Col>
          <Col xs={1} className="px-3">
            <Image src="medal.png" />
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col>
            {" "}
            <Image src={imageSrc} fluid style={{ maxHeight: "90%" }} />
          </Col>
          <Col className="d-flex flex-column ">
            <Card
              className="px-5 text-start pt-3 pb-5 border-0 mb-2 custom-font "
              style={{ lineHeight: "2.5", borderRadius: "20px" }}
            >
              {textSets[currentIndex]}
            </Card>
            <Button
              className="align-self-end mt-auto "
              style={{ width: "9em" }}
              onClick={handleNextClick}
            >
              Next
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ExCard;

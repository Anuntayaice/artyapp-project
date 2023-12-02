import React from "react";
import { Card, Button, Row, Col, Image } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useState } from "react";

const ExCard = ({ imageSrc, textSets }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progressValue, setProgressValue] = useState(0);
  const [showCongratulations, setShowCongratulations] = useState(false);

  const handleClick = () => {
    window.location.href = "/exerciselist";
  };

  const handleNextClick = () => {
    const newIndex = (currentIndex + 1) % textSets.length;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % textSets.length);
    const newProgressValue = (newIndex + 1) * (100 / textSets.length);

    setCurrentIndex(newIndex);
    setProgressValue(newProgressValue);
    if (newProgressValue === 100) {
      setShowCongratulations(true);
    }
  };

  return (
    <Card
      className="text-center "
      style={{
        width: "80rem",
        minWidth: "75em",
        maxHeight: "42rem",
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
              onClick={handleClick}
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
        {showCongratulations ? (
          <div className="d-flex flex-column justify-content-center align-items-center custom-font">
            <Image
              src="bigmedal.png"
              className="my-5"
              style={{ maxWidth: "13em" }}
            />
            <div className="w-50">
              {" "}
              <h4 style={{ lineHeight: "2em" }}>
                Congratulations! You have just received your first badge! Click
                here to see all your badges or move on to the next exersize
              </h4>
            </div>
            <Button
              className="my-4"
              style={{ width: "15em", fontSize: "1.5em" }}
            >
              Next Exercise
            </Button>
          </div>
        ) : (
          <Row>
            <Col>
              {" "}
              <Image src={imageSrc} fluid style={{ maxHeight: "90%"}} />
            </Col>
            <Col className="d-flex flex-column justify-content-center align-items-center custom-font ">
              {" "}
              <div className="align-self-center">
                {" "}
                <Card
                  className="px-5 text-start pt-3 pb-5 border-0 mb-2 "
                  style={{ lineHeight: "2.5", borderRadius: "20px" }}
                >
                  {textSets[currentIndex]}
                </Card>
              </div>
              <Button
                className="align-self-end mt-auto mb-5"
                style={{ width: "9em" }}
                onClick={handleNextClick}
              >
                Next
              </Button>
            </Col>
          </Row>
        )}
      </Card.Body>
    </Card>
  );
};

export default ExCard;

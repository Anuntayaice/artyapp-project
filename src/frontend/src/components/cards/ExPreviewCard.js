import React from "react";
import { Image, Card, Button, Row, Col, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ExPreviewCard = ({ title, time, level, img, status, exerciseId, selectedItem, setSelectedItem, availableExerciseIds }) => {
  const navigate = useNavigate();

  const isClickable = status === "START";
  const buttonVariant = isClickable ? "success" : "";
  const backgroundColor = isClickable ? "" : "rgba(255, 255, 255, 0.5)";

  const handleClick = () => {
    if (isClickable) {
      navigate(`/exercise/${exerciseId}`)
    }
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };
  return (
    <Card
      style={{ width: "18rem", backgroundColor }}
      className="d-flex flex-column align-items-center justify-content-center  border-0"
    >
      <Card.Img
        variant="top"
        src={img}
        style={{ maxWidth: "7em" }}
        className="mt-5 mb-4"
      />
      <Card.Body>
        <Card.Title className="mb-2">{title}</Card.Title>
        <Row className="px-5">
          <Col lg={12} className="border-bottom d-inline-block  mb-2">
            {time}
          </Col>
          <Dropdown className="custom-font">
              <Dropdown.Toggle
                variant="none"
                style={{
                  background: "none",
                  border: "2px solid black",
                  width: "12em",
                }}
                className="mt-2"
              >
                {selectedItem ? `Exercise ${selectedItem}` : "Select Exercise"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {availableExerciseIds?.map((item) => (
                  <Dropdown.Item
                    key={item}
                    onClick={() => handleItemClick(item)}
                    className="custom-font"
                  >
                    Exercise {item}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>{" "}
        </Row>
      </Card.Body>
      {exerciseId && (<Button
        variant={buttonVariant}
        className="my-4"
        style={{
          width: "7em",
          backgroundColor: isClickable ? "success" : "#BBBBBB",
          border : 'none',
        }}
        onClick={handleClick}
        disabled={!isClickable}
      >
        {status}
      </Button>)}
    </Card>
  );
};

export default ExPreviewCard;

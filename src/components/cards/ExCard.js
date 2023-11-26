import React from "react";
import { Card, Button, Row, Col, Image } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
const ExCard = () => {
  return (
    <Card
      className="text-center "
      style={{
        maxWidth: "64rem",
        borderRadius: "16px",
        backgroundColor: "rgba(232, 230, 230, 0.2)",
      }}
    >
      <Card.Header className="border-0 d-flex justify-content-center align-items-center">
        <Row className="w-100 align-content-center align-items-center">
          <Col xs={1} className="text-start px-3">
            <Button variant="link" className="text-white text-decoration-none">
              X
            </Button>
          </Col>
          <Col xs={10} className="">
            <ProgressBar
              striped
              now={60}
              className="w-100"
              style={{ height: "30px", borderRadius: "20px" }}
            />
          </Col>
          <Col xs={1} className="text-start px-3">
            <Button variant="link" className="text-white text-decoration-none">
              X
            </Button>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col>
            {" "}
            <Image src="loginpic.png" fluid />
          </Col>
          <Col className="d-flex flex-column">
            <Card
              className="px-5 text-start pt-3 pb-5 border-0"
              style={{ lineHeight: "2" }}
            >
              Once upon a time, in a magical garden filled with the most
              enchanting flowers, there lived a kind squirrel named Sam. Sam
              loved spending his days on a cozy wooden bench nestled amidst the
              blossoms. One sunny morning, as Sam sat on his favorite spot, he
              noticed a charismatic butterfly gracefully gliding through the
              air. Mesmerized by its colorful wings, Sam couldn't help but feel
              a sense of wonder. Little did he know that this encounter would
              turn into an extraordinary friendship, filled with exciting
              adventures and heartwarming moments.
            </Card>
            <Button className="align-self-end mt-4" style={{ width: "9em" }}>
              Next
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ExCard;

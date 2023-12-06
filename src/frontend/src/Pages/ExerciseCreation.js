import React from "react";
import { Card, Button, Row, Col, Image } from "react-bootstrap";


const ExerciseCreation = () => {
    const text =
"In the image, there is a vibrant scene featuring a red radio, a green striped scarf, a rustic ladder, a silver star, a small mirror, and a shiny silver spoon. The radio is placed on a wooden table, and the scarf is draped over the ladder. The star is hanging from the ceiling, and the mirror reflects the colorful surroundings. The spoon rests beside the radio, adding a touch of brightness to the composition.Please repeat the following (display one at a time):The red radio is playing a lively tune.The green striped scarf adds a pop of color to the scene.The rustic ladder leans against the wall.The silver star shines brightly above.Let's get tougher! Please repeat very clearly the following: The red radio is playing a lively tune.The green striped scarf adds a pop of color to the scene.The rustic ladder leans against the wall.The silver star shines brightly above.The small mirror reflects the vibrant colors." 
const textArray = text ? text.split(".") : [];

  return (
    <div
      className="bg-black vh-100 pt-4 px-4 text-white d-flex justify-content-center align-items-center"
      style={{ background: "linear-gradient(to top, #000000, #999292)" }}
    >
      <Card
        className="text-center mb-5 pt-4 mt-3"
        style={{
          width: "80rem",
          minWidth: "75em",
          maxHeight: "42rem",
          borderRadius: "16px",
          backgroundColor: "rgba(232, 230, 230, 0.2)",
        }}
      >
        <Card.Body>
          <Row>
            <Col>
              {" "}
              <Image
                src="/images/expic.png"
                fluid
                style={{ maxHeight: "90%" }}
              />
            </Col>
            <Col className="d-flex flex-column justify-content-center align-items-center ">
              {" "}
              <div className="align-self-center">
                {" "}
                <Card
                  className="px-4 text-start py-4 mb-3 border-0 text-white"
                  style={{
                    borderRadius: "20px",
                    backgroundColor: "rgba(232, 230, 230, 0.2)",
                  }}
                >
                  {textArray.map((paragraph, index) => {
                    const trimmedParagraph = paragraph.trim();
                    return trimmedParagraph.length > 0 ? (
                      <h6 key={index}>
                        {trimmedParagraph}.
                        {index !== textArray.length - 1 && <br />}
                      </h6>
                    ) : null;
                  })}
                </Card>
              </div>{" "}
              <div
                className="d-flex justify-content-between mt-auto mb-5"
                style={{ width: "100%" }}
              >
                <Button
                  className="btn-success"
                  style={{ width: "49%", height: "3em" }}
                >
                  Add to list
                </Button>
                <Button className="btn-danger" style={{ width: "49%" }}>
                  Regenerate{" "}
                </Button>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ExerciseCreation;

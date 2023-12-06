import React from "react";
import { Card, Button, Row, Col, Image } from "react-bootstrap";


const ExerciseCreation = () => {
  return (
    <div
      className="bg-black vh-full pt-4 px-4 text-white d-flex justify-content-center align-items-center"
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
                  className="px-5 text-start pt-3 pb-4 border-0 mb-2 h-100"
                  style={{ lineHeight: "2.8", borderRadius: "20px" }}
                >
                  <h5>
                    "In the image, there is a vibrant scene featuring a red
                    radio, a green striped scarf, a rustic ladder, a silver
                    star, a small mirror, and a shiny silver spoon. The radio is
                    placed on a wooden table, and the scarf is draped over the
                    ladder. The star is hanging from the ceiling, and the mirror
                    reflects the colorful surroundings.
                  </h5>
                  <h5>
                    The spoon rests beside the radio, adding a touch of
                    brightness to the composition.
                    <br />
                    Please repeat the following (display one at a time):
                    <br />
                    The red radio is playing a lively tune.
                    <br />
                    The green striped scarf adds a pop of color to the scene.
                    <br />
                    The rustic ladder leans against the wall.
                    <br />
                    The silver star shines brightly above.
                    <br />
                    The small mirror reflects the vibrant colors.
                  </h5>
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
                <Button className="btn-danger"  style={{ width: "49%" }}>
Regenerate                </Button>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ExerciseCreation;

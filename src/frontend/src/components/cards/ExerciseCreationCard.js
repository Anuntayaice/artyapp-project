// ExerciseCreationCard.js
import React, { useState } from "react";
import { Card, Form, Button ,Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../css/CreationCard.css";

const ExerciseCreationCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const createExercise = () => {
    console.log("Create exercise clicked");
  };

  return (
    <div>
      <Card
        className={`card exercise-creation-card d-flex flex-column align-items-center justify-content-center border-0 mx-4 px-5 ${
          isFlipped ? "card-hover" : ""
        }`}
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
        style={{
          width: "19rem",
          height: "28rem",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
        }}
      >
        <div className="front d-flex align-items-center justify-content-center ">
          <h4 className="text-white" onClick={createExercise}>
            Generate new exercise
          </h4>
        </div>
        <div className="back text-start d-flex align-items-center justify-content-start pt-5 px-3">
          <Form>
            <Form.Group controlId="speechFocus">
              <Form.Label>Speech sounds need to be the focus</Form.Label>
              <Form.Control
                as="textarea"
                className="border-2 border-black"
                rows={3}
              />
            </Form.Group>
            <Form.Group controlId="patientInterest">
              <Form.Label>Patient’s interest</Form.Label>
              <Form.Control
                as="textarea"
                className="border-2 border-black"
                rows={6}
              />
            </Form.Group>
            <Link
              to="/therapist/create-exercise"
              className="text-decoration-none"
            >
              <div class="d-grid my-3">
                <Button
                  class="btn btn-black border-none"
                  style={{ backgroundColor: "black", color: "white" }}
                >
                  Generate{" "}
                </Button>
              </div>
            </Link>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default ExerciseCreationCard;

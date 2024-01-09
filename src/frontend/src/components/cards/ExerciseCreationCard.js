import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { ColorRing } from  'react-loader-spinner'
import { useNavigate } from "react-router-dom";
import "../../css/CreationCard.css";

const ExerciseCreationCard = ({ exercise }) => {
  const navigate = useNavigate();

  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const createExercise = (e) => {
    e.preventDefault()
    setIsLoading(true);
    const formData = new FormData(e.target),
        formDataObj = Object.fromEntries(formData.entries())
    console.log(formDataObj);

    fetch("http://localhost:5000/gen_description_exercise", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataObj),
    }).then((response) => response.json())
      .then((data) => {
        console.log(data);
        setIsLoading(false);
        // navigate to the exercise page
        navigate(`/therapist/create-exercise`, { state: { exercise: data.content } });
      });
    }

  return (
    <div>
      {isLoading && (
        <>
          <div>
            Please wait patiently while the exercise is generated...
          </div>
          <ColorRing
            visible={isLoading}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#6b89b2', '#9ac5ff', '#6b89b2', '#9ac5ff', '#6b89b2']}
          />
        </>
      )}
      {!isLoading && (
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
        <div className="front d-flex align-items-center justify-content-center px-3">
          <div className="d-flex flex-column align-items-center justify-content-center">
            <div className="d-flex align-items-center justify-content-center">
              <img
                src={exercise.img}
                alt="exercise"
                style={{ maxWidth: "7em" }}
              />

              <div className="d-flex flex-column align-items-center justify-content-center">
                <div className="d-flex align-items-center justify-content-center">
                  <h5 className="text-center">{exercise.title}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="back text-start d-flex align-items-center justify-content-start pt-5 px-3">
          <Form onSubmit={createExercise}>
            <Form.Group controlId="speechFocus">
              <Form.Label>Speech sounds need to be the focus</Form.Label>
              <Form.Control
                type="text"
                name="speech_focus"
                as="textarea"
                className="border-2 border-black"
                rows={3}
              />
            </Form.Group>
            <Form.Group controlId="patientInterest">
              <Form.Label>Patient’s interest</Form.Label>
              <Form.Control
                as="textarea"
                type="text"
                name="patient_interests"
                className="border-2 border-black"
                rows={6}
              />
            </Form.Group>
            {/*<Link
              to="/therapist/create-exercise"
              className="text-decoration-none"
      >*/}
              <div class="d-flex my-3 align-items-center justify-content-center">
                <Button
                  class="btn btn-black border-none"
                  style={{ backgroundColor: "black", color: "white" }}
                  type="submit"
                >
                  Generate{" "}
                </Button>
              </div>
            {/*</Link>*/}
          </Form>
        </div>
      </Card>)}
    </div>
  );
};

export default ExerciseCreationCard;

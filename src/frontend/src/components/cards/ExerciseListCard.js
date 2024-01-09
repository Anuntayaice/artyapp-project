import React, { useState } from "react";
import { Button, Image, Row, Col, Accordion, Form } from "react-bootstrap";
import "../../css/PatientCard.css";
import { useNavigate } from "react-router-dom";
import { ColorRing } from  'react-loader-spinner'

const ExerciseListCard = ({ exercise }) => {
  const navigate = useNavigate();

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
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header className="my-1 patient-card">
          <Row className="my-2 d-flex align-items-center justify-content-start mx-3 w-100">
            <Col md={2}>
              <Image
                src={exercise.img}
                style={{ maxWidth: "6em" }}
              />
            </Col>
            <Col md={6} className="d-flex flex-column align-items-start">
              {" "}
              <h4>{exercise.title}</h4> <h6 style={{ color: "grey" }}>{exercise.level}</h6>{" "}
            </Col>
            <Col md={4} style={{ maxHeight: "3em", overflow: "hidden" }}>
              {" "}
              <h5>
                {exercise.time}
              </h5>
            </Col>
          </Row>
        </Accordion.Header>
        <Accordion.Body>
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
          {(!isLoading && exercise.available) && (
            <div className="text-start d-flex align-items-center justify-content-start px-3 flex-row">
          <Form onSubmit={createExercise} className="d-grid w-100">
            <Form.Group controlId="speechFocus" className="my-2">
              <Form.Label>Describe what the exercise should tackle, such as sounds or specific words:</Form.Label>
              <Form.Control
                type="text"
                name="speech_focus"
                as="textarea"
                className="border-2 border-black"
                rows={6}
              />
            </Form.Group>
            <Form.Group controlId="patientInterest" className="my-2">
              <Form.Label>Describe the exercise theme (having in mind the child's interests, for example):</Form.Label>
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
                  style={{ backgroundColor: "black", color: "white", height: "3em"}}
                  type="submit"
                >
                  Generate{" "}
                </Button>
              </div>
            {/*</Link>*/}
          </Form>
        </div>)}
        {(!isLoading && !exercise.available) && (
          <div className="w-100 d-flex justify-content-center align-items-center">
            Not available yet.
          </div>
        )}
        
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default ExerciseListCard;

import React from "react";
import { Card, Image, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../css/PatientCard.css";
const ExerciseCard = ({ exercise_id, interests, speech_focus, description, phrases, compound_nouns, story }) => {
  const navigate = useNavigate();

  const exercise = {
    exerciseId: exercise_id,
    exerciseInterests: interests,
    exerciseSpeechFocus: speech_focus,
    exerciseDescription: description,
    exercisePhrases: phrases,
    exerciseCompoundNouns: compound_nouns,
    exerciseStory: story,
    exerciseType: 'Talk Tales',
    exerciseImg: 'details3.png'
  };

  const handleClick = () => {
    fetch("http://localhost:5000/get_exercise_for_edit?exercise_id=" + exercise_id, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((exercise_data) => {
        fetch("http://localhost:5000/get_exercise_image?exercise_id=" + exercise_id, {
          method: "GET",
        }).then((response) => response.blob())
          .then((data) => {
            exercise_data.exercise["image_url"] = URL.createObjectURL(data)
            navigate(`/therapist/create-exercise`, { state: { ...exercise_data } });
          });
      })
    //navigate(`/therapist/create-exercise`, { state: { exercise: exercise } });
  }
  
  return (
   <Card className="my-1 patient-card" onClick={handleClick}>
      <Row className="my-2 d-flex align-items-center justify-content-start mx-3">
        <Col md={2}>
          <Image
            src={`/images/${exercise.exerciseImg}`}
            roundedCircle
            style={{ maxWidth: "6em" }}
          />
        </Col>
        <Col md={2} className="d-flex flex-column align-items-start">
          {" "}
          <h4>{exercise.exerciseType}</h4>
        </Col>
        <Col md={3} style={{ maxHeight: "3em", overflow: "hidden" }}>
          {" "}
          <h5>
            {exercise.exerciseSpeechFocus}
          </h5>
        </Col>
        <Col md={4} style={{ maxHeight: "3em", overflow: "hidden"}}>
          {" "}
          <p className="overflow-text">{exercise.exerciseDescription}</p>
        </Col>{" "}
        <Col className="d-flex align-items-end justify-content-end " md={1}>
          {" "}
          <Image src="images/info.png" style={{ maxWidth: "2em" }} />{" "}
        </Col>
      </Row>
    </Card>
  );
};

export default ExerciseCard;

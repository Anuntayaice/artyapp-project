// ExerciseOverviewforTherapist.js
import React, { useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import ExGenPreviewCard from "../components/cards/ExGenPreviewCard";
import ExerciseCreationCard from "../components/cards/ExerciseCreationCard";
import { Link } from "react-router-dom";
import ExerciseCreation from "./ExerciseCreation";

const ExerciseOverviewforTherapist = () => {
  const [exerciseData, setExerciseData] = useState([
    {
      id: 3,
      title: "Flash card",
      time: "12 minutes",
      level: "beginner",
      img: "/images/details1.png",
    },
    {
      id: 2,
      title: "Flash card",
      time: "12 minutes",
      level: "beginner",
      img: "/images/details1.png",
    },
  ]);

  const onCreateExercise = (newExercise) => {
    setExerciseData((prevExerciseData) => [...prevExerciseData, newExercise]);
    console.log(exerciseData);
  };

  const location = useLocation();
  const { patient } = location.state;

  if (!patient) {
    return <p>Error loading patient data.</p>;
  }

  const renderExerciseCards = () => {
    return exerciseData.map((exercise) => (
      <Col key={exercise.id} md={4} sm={6} xs={12} className="mb-3">
        <ExGenPreviewCard
          id={exercise.id}
          title={exercise.title}
          time={exercise.time}
          level={exercise.level}
          img={exercise.img}
          status={exercise.status}
        />
      </Col>
    ));
  };

  return (
    <div
      className="bg-black vh-100 pt-4 px-4 text-white"
      style={{ background: "linear-gradient(to top, #000000, #999292)" }}
    >
      <h2>Select Exercise for {patient.patientName}</h2>
      <div className="container d-flex justify-content-center align-items-center ">
        <Row className="mt-5 d-flex justify-content-around">
          {renderExerciseCards()}
          <Col md={4} sm={6} xs={12} className="mb-3">
            <ExerciseCreationCard />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ExerciseOverviewforTherapist;

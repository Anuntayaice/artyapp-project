import React, { useState } from "react";
import { Col, Row, Card } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import ExerciseListCard from "../components/cards/ExerciseListCard";

const ExerciseOverviewforTherapist = () => {
  const [exerciseData, setExerciseData] = useState([
    {
      id: 1,
      title: "Talk Tales",
      time: "10 minutes",
      level: "beginner",
      img: "/images/details3.png",
      available: true,
    },
    {
      id: 3,
      title: "Flash card",
      time: "12 minutes",
      level: "beginner",
      img: "/images/details1.png",
      available: false,
    },
    {
      id: 2,
      title: "Role play",
      time: "12 minutes",
      level: "beginner",
      img: "/images/details2.png",
      available: false,
    }
    ,
  ]);


  const location = useLocation();
  const { patient } = location.state;

  if (!patient) {
    return <p>Error loading patient data.</p>;
  }

  const renderExerciseCards = () => {
    return exerciseData.map((exercise) => (
      <Row>
        <Col key={exercise.id} md={12} className="mb-3 therapist-font">
          <ExerciseListCard exercise={exercise} />
        </Col>
      </Row>
    ));
  };

  return (
    <div
      className="bg-dark pt-4  px-4 text-white"
    >
      <h2>Select Exercise Type for {patient.patientName}</h2>
      <div className="container d-flex justify-content-center align-items-center ">
        <Row className="mt-5 d-flex justify-content-around">
          {renderExerciseCards()}
        </Row>
      </div>
    </div>
  );
};

export default ExerciseOverviewforTherapist;

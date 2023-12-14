import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import ExerciseCreationCard from "../components/cards/ExerciseCreationCard";

const ExerciseOverviewforTherapist = () => {
  const [exerciseData, setExerciseData] = useState([
    /*{
      id: 3,
      title: "Flash card",
      time: "12 minutes",
      level: "beginner",
      img: "/images/details1.png",
    },
    {
      id: 2,
      title: "Role play",
      time: "12 minutes",
      level: "beginner",
      img: "/images/details2.png",
    },*/
    {
      id: 1,
      title: "Talk Tales",
      time: "10 minutes",
      level: "beginner",
      img: "/images/details3.png",
    },
  ]);


  const location = useLocation();
  const { patient } = location.state;

  if (!patient) {
    return <p>Error loading patient data.</p>;
  }

  const renderExerciseCards = () => {
    return exerciseData.map((exercise) => (
      <Col key={exercise.id} md={12} sm={12} xs={12} className="mb-3">
        <ExerciseCreationCard exercise={exercise}/>
      </Col>
    ));
  };

  return (
    <div
      className="bg-dark vh-100 pt-4 px-4 text-white"
    >
      <h2>Select Exercise for {patient.patientName}</h2>
      <div className="container d-flex justify-content-center align-items-center ">
        <Row className="mt-5 d-flex justify-content-around">
          {renderExerciseCards()}
        </Row>
      </div>
    </div>
  );
};

export default ExerciseOverviewforTherapist;

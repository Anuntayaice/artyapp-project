import React, { useEffect } from "react";
import { Row } from "react-bootstrap";
import ExPreviewCard from "../components/cards/ExPreviewCard";
import { useState } from "react";

const ExerciseList = ({user}) => {
  const [selectedItem, setSelectedItem] = useState(undefined);

  const exerciseData = [
    {
      id: 1,
      title: "Talk Tales",
      time: "5 minutes",
      img: "/images/details3.png",
      status: "START",
    },
    /*{
      id: 2,
      title: "Role play",
      time: "15 minutes",
      level: "intermediate",
      img: "/images/details2.png",
      status: "LOCKED",
    },
    {
      id: 3,
      title: "Flash card",
      time: "12 minutes",
      level: "beginner",
      img: "/images/details1.png",
      status: "LOCKED",
    },*/
  ];

  return (
    <div className="bg-secondary vh-100 ">
      <div className="container d-flex justify-content-center align-items-center ">
        <Row className="mt-5 ">
          {exerciseData.map((exercise) => (
            <div key={exercise.id} className="col-md-4 mt-3">
              <ExPreviewCard
                id={exercise.id}
                title={exercise.title}
                time={exercise.time}
                level={exercise.level}
                img={exercise.img}
                status={exercise.status}
                exerciseId={selectedItem}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                availableExerciseIds={user.exercises || []}
              />
            </div>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default ExerciseList;

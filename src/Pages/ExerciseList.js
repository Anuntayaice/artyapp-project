import React from "react";
import { Row, Dropdown } from "react-bootstrap";
import ExPreviewCard from "../components/cards/ExPreviewCard";
import { useState } from "react";

const ExerciseList = () => {
  const [selectedItem, setSelectedItem] = useState("Select week");
  const exerciseData = [
    {
      id: 1,
      title: "Talk Tales",
      time: "10 minutes",
      level: "beginner",
      img: "details1.png",
      status: "start",
    },
    {
      id: 2,
      title: "Role play",
      time: "15 minutes",
      level: "intermediate",
      img: "details2.png",
      status: "locked",
    },
    {
      id: 3,
      title: "Flash card",
      time: "12 minutes",
      level: "beginner",
      img: "details3.png",
      status: "locked",
    },
  ];
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="bg-secondary vh-100 ">
      <Dropdown className="custom-font">
        <Dropdown.Toggle
          variant="none"
          style={{
            background: "none",
            border: "2px solid white",
            color: "white",
            width: "12em",
          }}
          className="mt-5"
        >
          {selectedItem}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleItemClick("Week 1")}>
            Week 1
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleItemClick("Week 2")}>
            Week 2
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleItemClick("Week 3")}>
            Week 3
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>{" "}
      <div className="container d-flex justify-content-center align-items-center ">
        <Row className="mt-5 ">
          {exerciseData.map((exercise) => (
            <div key={exercise.id} className="col-md-4 mt-3">
              <ExPreviewCard
                title={exercise.title}
                time={exercise.time}
                level={exercise.level}
                img={exercise.img}
                status={exercise.status}
              />
            </div>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default ExerciseList;

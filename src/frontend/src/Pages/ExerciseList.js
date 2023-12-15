import React, { useEffect } from "react";
import { Row, Dropdown } from "react-bootstrap";
import ExPreviewCard from "../components/cards/ExPreviewCard";
import { useState } from "react";

const ExerciseList = () => {
  const [selectedItem, setSelectedItem] = useState(undefined);
  const [availableWeeks, setAvailableWeeks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/get_exercise_ids", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setAvailableWeeks(data);
      });
  }, []);

  const exerciseData = [
    {
      id: 1,
      title: "Talk Tales",
      time: "10 minutes",
      level: "beginner",
      img: "/images/details3.png",
      status: "START",
    },
    {
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
          {selectedItem ? `Week ${selectedItem}` : "Select week"}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {availableWeeks?.map((item) => (
            <Dropdown.Item
              key={item}
              onClick={() => handleItemClick(item)}
              className="custom-font"
            >
              Week {item}
            </Dropdown.Item>
          ))}
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
                week={selectedItem}
              />
            </div>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default ExerciseList;

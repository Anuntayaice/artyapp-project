import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const ExerciseCreation = ({ onCreateExercise }) => {
  const [exerciseData, setExerciseData] = useState({
    title: "",
    time: "",
    level: "",
    img: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExerciseData({ ...exerciseData, [name]: value });
  };

  const handleCreateExercise = () => {
    if (exerciseData.title && exerciseData.time && exerciseData.level) {
      onCreateExercise(exerciseData);
      console.log(exerciseData);
    }
  };

  return (
    <div>
      <h2>Create New Exercise</h2>
      <Form>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter exercise title"
            name="title"
            value={exerciseData.title}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="time">
          <Form.Label>Time</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter exercise time"
            name="time"
            value={exerciseData.time}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="level">
          <Form.Label>Level</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter exercise level"
            name="level"
            value={exerciseData.level}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="img">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter image URL"
            name="img"
            value={exerciseData.img}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleCreateExercise}>
          Create Exercise
        </Button>
      </Form>
    </div>
  );
};

export default ExerciseCreation;

import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ExerciseCreationCard = () => {
  return (
    <Card style={{ width: "18rem" }} className="mb-3">
      <Card.Body>
        <Card.Title>Create New Exercise</Card.Title>
        <Card.Text>Click here to create a new exercise.</Card.Text>
        <Link to="/create-exercise">
          <Button variant="primary">Create Exercise</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ExerciseCreationCard;

import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import ExerciseCard from "../components/cards/ExerciseCard";
import { useNavigate } from "react-router-dom";

const ExerciseListOverview = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/therapist/new-exercise-overview`);
  };
  
  const [allExercises, setAllExercises] = useState(undefined);

  useEffect(() => {
    fetch("http://localhost:5000/get_exercises_data")
      .then((response) => response.json())
      .then((data) => {
        setAllExercises(data);
        setFilteredExercises(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredExercises, setFilteredExercises] = useState(allExercises);

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = allExercises.filter((exercise) =>
      exercise.data.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredExercises(filtered);
  };

  const handleReset = () => {
    setSearchTerm("");
    setFilteredExercises(allExercises);
  };

  return (
    <div
      className="pt-5"
    >
      <Container>
        <Row className="mb-3 d-flex align-items-center">
          <Col md={9} className="position-relative">
            <Form onSubmit={handleSearch}>
              <Form.Control
                type="text"
                placeholder="Search by description"
                className="mr-sm-2 pr-5 mb-3"
                value={searchTerm}
                style={{ height: "3em", borderRadius: "16px" }}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button
                variant="link"
                type="submit"
                className="position-absolute top-50 end-0 translate-middle-y "
                //onClick={handleSearch}
              >
                <Image
                  src="images/searchIcon.png"
                  style={{ maxWidth: "2em" }}
                  className="mb-3 mx-2"
                />
              </Button>
            </Form>
            
          </Col>
          <Col md={1}>
            <Button
              className="w-100 bg-black text-white border-0 mb-3 "
              onClick={handleReset}
              style={{ height: "3em", borderRadius: "12px" }}
            >
              Reset
            </Button>
          </Col>
          <Col md={2} className="position-relative">
            <Button
              variant=""
              className="w-100 border-none text-black mb-3 bg-primary "
              style={{ height: "3em", borderRadius: "12px" }}
              onClick={handleClick}
            >
              Add Exercise
            </Button>
          </Col>
        </Row>

        <Row>
          {filteredExercises && filteredExercises.map((exercise) => (
            <Col key={exercise.exercise_id} md={12} className="mb-3 therapist-font">
              <ExerciseCard exercise_id={exercise.exercise_id} {...exercise.data} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default ExerciseListOverview;

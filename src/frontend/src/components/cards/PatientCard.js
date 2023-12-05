import React from "react";
import { Card, Image, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../css/PatientCard.css";
const PatientCard = ({ id, name, symptoms, exercise, img, description ,age }) => {
  const patient = {
    patientId: id,
    patientName: name,
    patientSymptoms: symptoms,
    patientExercise: exercise,
    patientImg: img,
    patientDescription: description,
    patientAge: age,
  };
  return (
    <Link
      to={`/therapist/${id}`}
      className="text-decoration-none"
      state={{ patient }}
    >
      <Card className="my-1 patient-card">
        <Row className="my-2 d-flex align-items-center justify-content-start mx-3">
          <Col md={2}>
            <Image
              src={`/images/${img}`}
              roundedCircle
              style={{ maxWidth: "6em" }}
            />
          </Col>
          <Col md={2} className="d-flex flex-column align-items-start">
            {" "}
            <h4>{name}</h4> <h6 style={{ color: "grey" }}>{description}</h6>{" "}
          </Col>
          <Col md={2} style={{ maxHeight: "3em", overflow: "hidden" }}>
            {" "}
            <h5>{symptoms}</h5>
          </Col>{" "}
          <Col md={2} style={{ maxHeight: "3em", overflow: "hidden" }}>
            {" "}
            <h5>
              {exercise}
            </h5>
          </Col>
          <Col className="d-flex align-items-end justify-content-end " md={4}>
            {" "}
            <Image src="images/info.png" style={{ maxWidth: "2em" }} />{" "}
          </Col>
        </Row>
      </Card>
    </Link>
  );
};

export default PatientCard;

import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Row, Col, Card, Image, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PatientInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { patient } = location.state;
  console.log(location.state);
  if (!patient) {
    return <p>Error.</p>;
  }
  const handleButtonClick = () => {
    navigate(`/therapist/${patient.patientId}/exercise-overview`, {
      state: { patient },
    });
  };

  return (
    <div
      className="bg-black vh-100 pt-4 px-4"
      style={{
        background: "linear-gradient(to top, #000000, #999292)",
      }}
    >
      <Card
        style={{ maxHeight: "20em" }}
        className="border-0 mb-3 d-flex flex-column justify-content-center align-items-start px-4 py-4"
      >
        {" "}
        <div className="d-flex flex-row justify-content-center align-items-center my-3">
          {" "}
          <Image
            src={`/images/${patient.patientImg}`}
            roundedCircle
            style={{ maxWidth: "6em" }}
          />
          <h4 className="mx-4">
            {patient.patientName},{patient.patientAge} years old
          </h4>
        </div>
        <div className="text-start mb-3">
          {" "}
          <h6 className="my-4">Symptoms : {patient.patientSymptoms} </h6>
          <h6>Speech condition: {patient.patientSymptoms} </h6>
        </div>
      </Card>
      <Row>
        <Col>
          {" "}
          <Card
            style={{ height: "15em" }}
            className="border-0 mb-3 d-flex flex-column justify-content-start align-items-start px-4 py-4"
          >
            <h4>Progress</h4>
          </Card>
        </Col>{" "}
        <Col>
          {" "}
          <Card
            style={{ height: "15em" }}
            className="border-0 mb-3 d-flex flex-column justify-content-start align-items-start px-4 py-4"
          ></Card>
        </Col>{" "}
        <Col>
          {" "}
          <Card
            style={{ height: "15em" }}
            className="border-0 mb-3 d-flex flex-column justify-content-start align-items-start px-4 py-4"
          ></Card>
        </Col>{" "}
      </Row>

      <Button
        className="d-block w-100 mt-3"
        style={{ height: "3.5em" }}
        onClick={handleButtonClick}
      >
        Click here to view exercises
      </Button>
    </div>
  );
};

export default PatientInfo;
import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import PatientCard from "../components/cards/PatientCard";

const PatientListPage = () => {
  const patientData1 = [
    {
      id: 1,
      name: "John Doe",
      description: "description",
      symptoms: "Lorem ipsum dolor sit amet,t dolore magna ",
      exercise: "Hypertension",
      img: "profile1.png",
      age: "13",
    },
  ];

  const patientData2 = [
    {
      id: 5,
      name: "Jane Smith",
      description: "description",
      symptoms:
        " consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore e",
      exercise: "Diabetes",
      img: "profile3.png",
      age: "15",
    },
  ];

  const patientData3 = [
    {
      id: 9,
      name: "Bob Johnson",
      symptoms:
        " consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore e",
      exercise: "Arthritis",
      img: "profile2.png",
      age: "10",
    },
  ];

  const patientData5 = [
    {
      id: 17,
      name: "Charlie Wilson",
      description: "description",
      symptoms: "Lorem ipsum dolor sit amet,t dolore magna ",
      exercise: "Migraine",
      img: "profile1.png",
      age: "12",
    },
  ];

  const allPatients = [
    ...patientData1,
    ...patientData2,
    ...patientData3,
    ...patientData5,
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPatients, setFilteredPatients] = useState(allPatients);

  const handleSearch = () => {
    const filtered = allPatients.filter((patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPatients(filtered);
  };

  const handleReset = () => {
    setSearchTerm("");
    setFilteredPatients(allPatients);
  };

  return (
    <div
      className="bg-black vh-100 pt-5"
      style={{
        background: "linear-gradient(to top, #000000, #999292)",
      }}
    >
      <Container>
        <Row className="mb-3 d-flex align-items-center">
          <Col md={9} className="position-relative">
            <Form.Control
              type="text"
              placeholder="Search by name"
              className="mr-sm-2 pr-5 mb-3"
              value={searchTerm}
              style={{ height: "3em", borderRadius: "16px" }}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
              variant="link"
              className="position-absolute top-50 end-0 translate-middle-y "
              onClick={handleSearch}
            >
              <Image
                src="images/searchIcon.png"
                style={{ maxWidth: "2em" }}
                className="mb-3 mx-2"
              />
            </Button>
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
            >
              Add Patient
            </Button>
          </Col>
        </Row>

        <Row>
          {filteredPatients.map((patient) => (
            <Col key={patient.id} md={12} className="mb-3 therapist-font">
              <PatientCard {...patient} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default PatientListPage;

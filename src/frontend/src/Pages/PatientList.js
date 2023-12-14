import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import PatientCard from "../components/cards/PatientCard";

const PatientListPage = () => {
  const patientData1 = [
    {
      id: 1,
      name: "John Doe",
      condition: "Social Anxiety",
      symptoms: "Difficulty pronouncing words, slurred speech",
      img: "profile1.png",
      age: "13",
    },
  ];

  const patientData2 = [
    {
      id: 5,
      name: "Jane Smith",
      condition: "Diagnosed with CAS",
      symptoms:
        "Can't pronounce words with the 's' sound, voicing errors",
      img: "profile3.png",
      age: "15",
    },
  ];

  const patientData3 = [
    {
      id: 9,
      name: "Bob Johnson",
      condition: "Slight stuttering",
      symptoms:
        "Difficulty stressing words",
      img: "profile2.png",
      age: "10",
    },
  ];

  const patientData4 = [
    {
      id: 17,
      name: "Charlie Wilson",
      condition: "Diagnosed with CAS",
      symptoms:
        "Vowel distortions, trouble moving from syllable to syllable",
      img: "profile1.png",
      age: "12",
    },
  ];
  
  const allPatients = [
    ...patientData1,
    ...patientData2,
    ...patientData3,
    ...patientData4,
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPatients, setFilteredPatients] = useState(allPatients);

  const handleSearch = (e) => {
    e.preventDefault();
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
      className="bg-dark vh-100 pt-5"

    >
      <Container>
        <Row className="mb-3 d-flex align-items-center">
          <Col md={9} className="position-relative">
            <Form onSubmit={handleSearch}>
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

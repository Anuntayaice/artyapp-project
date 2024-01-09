import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import PatientCard from "../components/cards/PatientCard";
import { useNavigate } from "react-router-dom";

const PatientListPage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/therapist/add-patient`);
  };
  
  const [allPatients, setAllPatients] = useState(undefined);

  useEffect(() => {
    fetch("http://localhost:5000/patients")
      .then((response) => response.json())
      .then((data) => {
        setAllPatients(data["patients"]);
        setFilteredPatients(data["patients"]);
        console.log(data)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

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
      className="pt-5 bg-dark"
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
              onClick={handleClick}
            >
              Add Patient
            </Button>
          </Col>
        </Row>

        <Row>
          {filteredPatients && filteredPatients.map((patient) => (
            <Col key={patient._id} md={12} className="mb-3 therapist-font">
              {console.log(patient)}
              <PatientCard {...patient} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default PatientListPage;

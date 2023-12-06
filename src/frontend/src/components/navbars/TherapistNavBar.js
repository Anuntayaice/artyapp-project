import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useState } from "react";
import { Image } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { FaUser } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import "../../css/navbar.css";

const TherapistNavBar = () => {
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();
  const handleNavClick = (section) => {
    setActiveSection(section);
  };
  return (
    <div>
      <Navbar
        className="bg-black custom-font "
        style={{
          height: "8em",
          background: "linear-gradient(to top,#999292, #999292)",
        }}
      >
        <Container>
          <Navbar.Brand href="/">
            <Image
              src="/images/artyIcon.png"
              style={{ maxWidth: "9em" }}
              className="my-0 mx-5"
            />
          </Navbar.Brand>{" "}
          <Navbar.Brand
            href="/therapist-patientlist"
            active={
              activeSection === "therapist-patientlist" ||
              location.pathname === "/therapist-patientlist"
            }
            onClick={() => handleNavClick("therapist-patientlist")}
            style={{
              color: "white",
              fontSize: "1.5em",
              borderBottom:
                activeSection === "therapist-patientlist" ||
                location.pathname === "/therapist-patientlist"
                  ? "5px solid white"
                  : "none",
              borderRadius: "7px",
              transition: "border-bottom 0.4s ease-in-out",
            }}
            className="mx-5"
          >
            Patients
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end navbar-icons">
            <Nav.Link
                className="d-flex align-items-center m-3"
                //href="/login"
                active={activeSection === "login"}
                onClick={() => handleNavClick("login")}
              >
              <FaGear />
            </Nav.Link>
            <Nav.Link
              className="d-flex align-items-center m-3"
              href="/login"
              active={activeSection === "login"}
              onClick={() => handleNavClick("login")}
            >
              <FaUser />
            </Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default TherapistNavBar;

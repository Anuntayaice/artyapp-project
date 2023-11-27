import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useState } from "react";
import Progress from "../../Pages/Progress";
import Exercises from "../../Pages/Exercises";
const MainNavBar = () => {
  const [activeSection, setActiveSection] = useState("home");

  const handleNavClick = (section) => {
    setActiveSection(section);
  };
  return (
    <div>
      <Navbar
        className="bg-secondary custom-font h-20 d-flex "
        expand="lg"
        style={{ height: "6.5em" }} // Adjust the height as needed
      >
        <Navbar.Brand href="/" style={{ color: "white", fontSize: "1.5em" }}>
          Your App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link
              href="/exercises"
              active={activeSection === "exercises"}
              onClick={() => handleNavClick("exercises")}
              style={{ color: "white", fontSize: "1.5em" }}
            >
              Exercises
            </Nav.Link>
            <Nav.Link
              href="/progress"
              active={activeSection === "progress"}
              onClick={() => handleNavClick("progress")}
              style={{ color: "white", fontSize: "1.5em" }}
            >
              Progress{" "}
            </Nav.Link>
            <Nav.Link
              href="/progress"
              active={activeSection === "progress"}
              onClick={() => handleNavClick("progress")}
              style={{ color: "white", fontSize: "1.5em" }}
            >
              Badges{" "}
            </Nav.Link>
            <Nav.Link
              href="/progress"
              active={activeSection === "progress"}
              onClick={() => handleNavClick("progress")}
              style={{ color: "white", fontSize: "1.5em" }}
            >
              Lorem{" "}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {activeSection === "exercises" && <Exercises />}
      {activeSection === "ptogress" && <Progress />}
    </div>
  );
};

export default MainNavBar;

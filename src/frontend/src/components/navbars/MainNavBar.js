import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useState } from "react";
import { Image } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";

const MainNavBar = () => {
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();
  const handleNavClick = (section) => {
    setActiveSection(section);
  };
  return (
    <div>
      <Navbar className="bg-secondary custom-font " style={{ height: "6.5em" }}>
        <Container>
          <Navbar.Brand href="/"><Image src='artyIcon.png' style={{maxWidth : '9em'}} className='mb-3'/></Navbar.Brand>{" "}
          <Navbar.Brand
            href="/exerciselist"
            active={
              activeSection === "exerciselist" ||
              location.pathname === "/exerciselist"
            }
            onClick={() => handleNavClick("exerciselist")}
            style={{
              color: "white",
              fontSize: "1.5em",
              borderBottom:
                activeSection === "exerciselist" ||
                location.pathname === "/exerciselist"
                  ? "5px solid white"
                  : "none",
              borderRadius: "7px",
              transition: "border-bottom 0.4s ease-in-out", // Add a smooth transition
            }}
            className="mx-5"
          >
            Exercise
          </Navbar.Brand>
          <Navbar.Brand
            href="/progress"
            active={
              activeSection === "progress" || location.pathname === "/progress"
            }
            onClick={() => handleNavClick("progress")}
            style={{
              color: "white",
              fontSize: "1.5em",
              borderBottom:
                activeSection === "progress" ||
                location.pathname === "/progress"
                  ? "5px solid white"
                  : "none",
              borderRadius: "7px",
              transition: "border-bottom 0.4s ease-in-out", // Add a smooth transition
            }}
            className="mx-5"
          >
            Progress
          </Navbar.Brand>
          <Navbar.Brand
            href="/"
            style={{
              color: "white",
              fontSize: "1.5em",
            }}
            className="mx-5"
          >
            Badges
          </Navbar.Brand>
          <Navbar.Brand
            href="/"
            style={{
              color: "white",
              fontSize: "1.5em",
            }}
            className="mx-5"
          >
            Lorem
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Image src="settingicon.png" className="mx-5" />{" "}
            <Nav.Link
              href="/login"
              active={activeSection === "login"}
              onClick={() => handleNavClick("login")}
            >
              <Image src="usericon.png" />
            </Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default MainNavBar;

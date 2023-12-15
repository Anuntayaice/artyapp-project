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

const MainNavBar = () => {
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();
  const handleNavClick = (section) => {
    setActiveSection(section);
  };
  const isHomePage = window.location.pathname === "/";

  return (
    <div>
      <Navbar
        className={`custom-font ${isHomePage ? "" : "bg-secondary"}`}
        style={{
          height: "8em",
          //backgroundImage: isHomePage ? 'url("/images/mainbg.png")' : "none",
        }}
      >
        <Container>
          <Navbar.Brand 
            href="/exerciselist"
            onClick={() => handleNavClick("exerciselist")}
          >
            <Image
              src="/images/artyIcon.png"
              style={{ maxWidth: "9em" }}
              className=" mx-5"
            />
          </Navbar.Brand>{" "}
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

export default MainNavBar;

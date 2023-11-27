import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useState } from "react";
import Progress from "../../Pages/Progress";
import Exercises from "../../Pages/Exercises";
import { Image } from "react-bootstrap";
import { Login } from "../../Pages/Login";
import { useLocation } from "react-router-dom";
const MainNavBar = () => {
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();
  const handleNavClick = (section) => {
    setActiveSection(section);
  };
  return (
    <div>
      <Navbar
        className="bg-secondary custom-font h-20 d-flex justify-content-around"
        expand="lg"
        style={{ height: "6.5em" }}
      >
        <Navbar.Brand
          href="/"
          style={{ color: "white", fontSize: "1.5em", marginLeft: "1rem" }}
          className="mx-5"
        >
          Your App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link
              href="/exercises"
              active={
                activeSection === "exercises" ||
                location.pathname === "/exercises"
              }
              onClick={() => handleNavClick("exercises")}
              style={{
                color: "white",
                fontSize: "1.5em",
                borderBottom:
                  activeSection === "exercises" ||
                  location.pathname === "/exercises"
                    ? "5px solid white"
                    : "none",
                borderRadius: "7px",
                transition: "border-bottom 0.4s ease-in-out", // Add a smooth transition
              }}
              className="mx-5"
            >
              Exercises
            </Nav.Link>
            <Nav.Link
              href="/progress"
              active={
                activeSection === "progress" ||
                location.pathname === "/progress"
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
                transition: "border-bottom 0.4s ease-in-out",
              }}
              className="mx-5"
            >
              Progress{" "}
            </Nav.Link>
            <Nav.Link
              href="/progress"
              active={activeSection === "progress"}
              onClick={() => handleNavClick("progress")}
              style={{ color: "white", fontSize: "1.5em" }}
              className="mx-5"
            >
              Badges{" "}
            </Nav.Link>
            <Nav.Link
              href="/progress"
              active={activeSection === "progress"}
              onClick={() => handleNavClick("progress")}
              style={{ color: "white", fontSize: "1.5em" }}
              className="mx-5"
            >
              Lorem{" "}
            </Nav.Link>{" "}
            <Nav.Link
              href="/progress"
              active={activeSection === "progress"}
              onClick={() => handleNavClick("progress")}
              style={{ color: "white", fontSize: "1.5em" }}
              className="mx-5"
            >
              <Image src="settingicon.png" />
            </Nav.Link>
            <Nav.Link
              href="/login"
              active={activeSection === "login"}
              onClick={() => handleNavClick("login")}
              style={{ color: "white", fontSize: "1.5em" }}
              className="mx-5"
            >
              <Image src="usericon.png" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {activeSection === "exercises" && <Exercises />}
      {activeSection === "login" && <Login />}
      {activeSection === "ptogress" && <Progress />}
    </div>
  );
};

export default MainNavBar;

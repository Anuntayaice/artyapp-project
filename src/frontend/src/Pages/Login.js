import React from "react";
import LoginCard from "../components/cards/LoginCard";
import { Image } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
export const Login = () => {
  return (
    <div className="bg-secondary d-flex flex-column align-items-center justify-content-center vh-100">
      <Nav.Link
        className="d-flex align-items-center m-3"
        href="/"
        >
            <Image
              src="/images/artyIcon.png"
              fluid
              style={{
              maxWidth: "12em",
              //marginBottom: "-3em",
              position: "relative",
              zIndex: 1,
              }}
      />
      </Nav.Link>
      <LoginCard />
    </div>
  );
};

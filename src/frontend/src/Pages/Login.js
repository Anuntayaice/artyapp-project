import React from "react";
import LoginCard from "../components/cards/LoginCard";
import { Image } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
export const Login = () => {
  return (
    <div className="bg-secondary d-flex flex-column align-items-center justify-content-center vh-100">
      <Image
        src="/images/artynotext.png"
        fluid
        style={{
          maxWidth: "12em",
          marginBottom: "-0.5em",
          position: "relative",
          zIndex: 1,
        }}
      />

      <LoginCard />
    </div>
  );
};

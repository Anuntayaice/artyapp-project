import React from "react";
import LoginCard from "../components/cards/LoginCard";
import { Image } from "react-bootstrap";
export const Login = () => {
  return (
    <div className="bg-secondary d-flex flex-column align-items-center justify-content-center vh-100">
      <Image
        src="/images/artyIcon.png"
        fluid
        style={{
          maxWidth: "12em",
          marginBottom: "-3em",
          position: "relative",
          zIndex: 1,
        }}
      />
      <LoginCard />
    </div>
  );
};

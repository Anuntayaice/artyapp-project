import React from "react";
import SignUpCard from "../components/cards/PatientSignupCard";
import { Image } from "react-bootstrap";
const Signup = () => {
  return (
    <div className="bg-secondary d-flex flex-column align-items-center justify-content-start  vh-100">
      <Image
        src="/images/artyIcon.png"
        fluid
        style={{
          maxWidth: "12em",
          position: "relative",
          zIndex: 1,
          marginBottom: "-50px",
        }}
      />
      <SignUpCard />{" "}
    </div>
  );
};

export default Signup;

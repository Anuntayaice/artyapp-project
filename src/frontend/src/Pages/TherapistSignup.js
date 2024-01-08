import React from "react";
import TherapistSignupCard from "../components/cards/TherapistSignupCard";
import { Image } from "react-bootstrap";
const TherapistSignup = () => {
  return (
    <div className="bg-dark d-flex flex-column align-items-center justify-content-start min-height-bg">
      <Image
        src="/images/artyIcon.png"
        fluid
        style={{
          maxWidth: "12em",
          position: "relative",
          zIndex: 1,
          marginBottom : '-50px',
        }}
      />
      <TherapistSignupCard />
    </div>
  );
};

export default TherapistSignup;

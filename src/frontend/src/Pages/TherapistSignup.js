import React from "react";
import TherapistSignupCard from "../components/cards/TherapistSignupCard";
import { Image } from "react-bootstrap";
const TherapistSignup = () => {
  return (
    <div
      className="bg-black vh-100  text-white d-flex flex-column justify-content-center align-items-center"
      style={{ background: "linear-gradient(to top, #000000, #999292)" }}
    >
      {" "}
      <Image
        src="/images/artyIcon.png"
        fluid
        style={{
          maxWidth: "12em",
          position: "relative",
          zIndex: 1,
        }}
      />
      <TherapistSignupCard />{" "}
    </div>
  );
};

export default TherapistSignup;

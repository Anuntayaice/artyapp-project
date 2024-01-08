import React, { useEffect } from "react";
import LoginCard from "../components/cards/LoginCard";
import PatientPageCard from "../components/cards/PatientPageCard";
import TherapistPageCard from "../components/cards/TherapistPageCard";
import { Image } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
export const Login = ({ user, setUser }) => {

  const [role, _setRole] = React.useState(user ? user.role : null);

  return (
    <div className={`${role === 'therapist' ? 'bg-dark' : 'bg-secondary'} d-flex flex-column align-items-center justify-content-center vh-100`}>
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

      {!role && <LoginCard setUser={setUser}/>}
      {role === 'therapist' && (
        <TherapistPageCard user={user} setUser={setUser}/>
      )}
      {role === 'patient' && (
        <PatientPageCard user={user} setUser={setUser}/>
      )}
    </div>
  );
};

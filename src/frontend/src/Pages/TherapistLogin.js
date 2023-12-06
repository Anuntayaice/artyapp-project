
import React from 'react'
import TherapistLoginCard from '../components/cards/TherapistLoginCard';

 const TherapistLogin = () => {
  return (
    <div
      className="bg-black vh-100  d-flex flex-column align-items-center justify-content-start pt-5"
      style={{
        background: "linear-gradient(to top, #000000, #999292)",
      }}
    >
      {" "}
      <TherapistLoginCard />
    </div>
  );
}
export default TherapistLogin;


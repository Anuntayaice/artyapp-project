import React from 'react';
import SignupCard1 from '../components/cards/SignupCard1';

const TherapistSignup = () => {
  return (
    <div className='bg-black vh-100' style={{
      background: "linear-gradient(to top, #000000, #999292)",
      position: "relative", // Add this to make positioning relative
      overflow: "hidden",     // Add this to prevent overflow issues
      color: "white"
    }}>
      <SignupCard1 />
      <img
        src="/ArtyIcon.png"
        style={{
          maxWidth: '10em',
          position: "absolute",  // Use absolute positioning
          top: "-3.4%",            // Center vertically
          left: "50%",           // Center horizontally
          transform: "translate(-50%, -50%)", // Center precisely
        }}
        className='mb-3'
        alt="Arty Icon" // Don't forget to add alt text for accessibility
      />
    </div>  
  );
}

export default TherapistSignup;
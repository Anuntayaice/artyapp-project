import React from 'react'
import SignUpCard from '../components/cards/SignupCard';

const Signup = () => {
  return (
    <div className='bg-secondary vh-100'><SignUpCard/>
    <img
        src="/ArtyIcon.png"
        style={{
          maxWidth: '10em',
          position: "absolute",  // Use absolute positioning
          top: "10%",            // Center vertically
          left: "50%",           // Center horizontally
          transform: "translate(-50%, -50%)" // Center precisely
        }}
        className='mb-3'
        alt="Arty Icon" // Don't forget to add alt text for accessibility
      />
    </div>
  )
}

export default Signup;
import React from "react";
import ExCard from "../components/cards/ExCard";
const Exercises = () => {
  return (
    <div className="bg-secondary d-flex align-items-center justify-content-center vh-100">
      <ExCard
        imageSrc="expic.png"
        text="Once upon a time, in a magical garden filled with the most
              enchanting flowers, there lived a kind squirrel named Sam. Sam
              loved spending his days on a cozy wooden bench nestled amidst the
              blossoms. One sunny morning, as Sam sat on his favorite spot, he
              noticed a charismatic butterfly gracefully gliding through the
              air. Mesmerized by its colorful wings, Sam couldn't help but feel
              a sense of wonder. Little did he know that this encounter would
              turn into an extraordinary friendship, filled with exciting
              adventures and heartwarming moments."
        progressValue={40}
      />
    </div>
  );
};

export default Exercises;

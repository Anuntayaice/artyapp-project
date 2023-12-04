import React, { useEffect, useState } from "react";
import ExCard from "../components/cards/ExCard";
const Exercises = () => {
  const exercise_id = 1;

  const [exercise, setExercise] = useState([]);
  const [imageSrc, setImageSrc] = useState(undefined);
  
  useEffect(() => {
    if (exercise.length !== 0 || imageSrc !== undefined)
      return;

    fetch("http://localhost:5000/get_exercise?exercise_id=" + exercise_id, {
      method: "GET",
    }).then((response) => response.json())
      .then((data) => {
        setExercise(data['exercise']);
      });

    fetch("http://localhost:5000/get_exercise_image?exercise_id=" + exercise_id, {
      method: "GET",
    }).then((response) => response.blob())
      .then((data) => {
        setImageSrc(URL.createObjectURL(data));
      });
    
  }, [exercise, imageSrc]);

  console.log(exercise)

  return (
    <div className="bg-secondary d-flex align-items-start justify-content-center vh-100">
      {exercise.length !== 0 && (
        <ExCard imageSrc={imageSrc} exerciseId={exercise_id} exercise={exercise} />
      )}
    </div>
  );
};

export default Exercises;

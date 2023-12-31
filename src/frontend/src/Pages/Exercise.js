import React, { useEffect, useState } from "react";
import ExCard from "../components/cards/ExCard";
import { useParams } from "react-router-dom";

const Exercise = ({ user }) => {
  const { id: exercise_id } = useParams();
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

  return (
    <div className="bg-secondary d-flex align-items-start justify-content-center">
      {exercise.length !== 0 && (
        <ExCard imageSrc={imageSrc} exerciseId={exercise_id} exercise={exercise} userId={user._id} />
      )}
    </div>
  );
};

export default Exercise;

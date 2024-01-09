import React from "react";
import { useLocation } from "react-router-dom";
import { Row, Col, Card, Image, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";

const PatientInfo = () => {
  const location = useLocation();

  const { patient } = location.state;

  const [availableExerciseIds, setAvailableExerciseIds] = useState([]);
  const [selectedExerciseIds, setSelectedExerciseIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/get_exercise_ids", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAvailableExerciseIds(data);
      });
    console.log("http://localhost:5000/profile?_id=" + patient.patientId)
    fetch("http://localhost:5000/get_profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({profile_id: patient.patientId}),
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setSelectedExerciseIds(data['profile']['exercises'] || []);
      });
  }, [patient.patientId]);

  if (!patient) {
    return <p>Error.</p>;
  }

  const getErrorWords = () => {
    const mistake_colors = {
      'Mispronunciation': 'red',
      'Omission': 'gray',
      'Insertion': '#40E0D0',
      'None': 'green',
    }
    if (!patient.patientErrors) {
      return <p>Not enough data yet.</p>
    }

    return patient.patientErrors.map((mistake) => {
      return <>
        <h6 style={{margin: 0}}>{mistake.word} <span style={{color: '#808080', margin: 0}}>({mistake.accuracy_score}%)</span></h6>
        <p style={{color: mistake_colors[mistake.error_type], margin: 0}}>{mistake.error_type}</p>
      </>
    });
  }

  const getPhonemeErrors = () => {

    if (!patient.patientErrors) {
      return <p>Not enough data yet.</p>
    }

    const phonemes = {}
    patient.patientErrors.forEach((mistake) => {
      mistake.phonemes.forEach((phoneme) => {
        const accuracy = phoneme['PronunciationAssessment']['AccuracyScore']
        if (accuracy < 60) {
          if (phoneme['Phoneme'] in phonemes) {
            phonemes[phoneme['Phoneme']].push(accuracy)
          } else {
            phonemes[phoneme['Phoneme']] = [accuracy]
          }
        }
      })
    })
    
    for (const phoneme in phonemes) {
      phonemes[phoneme] = phonemes[phoneme].reduce((a, b) => a + b, 0) / phonemes[phoneme].length
    }

    return Object.keys(phonemes).map((phoneme) => {
      return <h6 style={{margin: 0}}>{phoneme} <span style={{color: '#808080', margin: 0}}>({phonemes[phoneme]}%)</span></h6>
    });
  }

  const selectExercise = (exerciseId) => {
    if (isLoading)
      return;
    setIsLoading(true);
    fetch("http://localhost:5000/toggle_exercise", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({profile_id: patient.patientId, exercise_id: exerciseId}),
    }).then((response) => {
        setIsLoading(false);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
    }).then((data) => {
        console.log(data);
        if (data.error)
          return;
        setSelectedExerciseIds(data['profile']['exercises'])
        patient.patientExercises = data['profile']['exercises']
      });
  }

  const listExercises = () => {
    
    return availableExerciseIds.map((exerciseId) => {
      return <div className="d-flex flex-row justify-content-between align-items-center w-100">
        <h6 style={{fontSize: '1.2em'}}>Exercise {exerciseId}</h6>
        {selectedExerciseIds.includes(exerciseId) ? <FaCheckCircle style={{color: 'green'}} size={20} onClick={() => selectExercise(exerciseId)}/> : <FaRegCircle style={{color: 'gray'}} size={20} value={exerciseId} onClick={() => selectExercise(exerciseId)}/>}
      </div>
    })
  }

  return (
    
    <div
      className="bg-dark py-4 px-4 h-75"
    >
      <Container className="h-100">
        <Row className="h-100">
          <Col lg={4} className="h-100">
            <Card
              className="border-0 mb-3 d-flex flex-column justify-content-start align-items-center px-4 py-4 h-100"
            >
              {" "}
              <Image
                  src={`/images/${patient.patientImg}`}
                  roundedCircle
                  style={{ maxWidth: "6em" }}
                />
              <h4 className="mx-4">
                {patient.patientName}
              </h4>
              <h6 style={{color: '#808080'}}>
                {patient.patientAge} years old
              </h6>
              <div className="text-start my-3">
                {" "}
                <h5 style={{color: '#4c627c'}}>Speech condition:</h5>
                <h6>{patient.patientCondition} </h6>
                <h5 className="mt-4" style={{color: '#4c627c'}}>Symptoms:</h5>
                {patient.patientSymptoms.map((symptom) => (
                  <h6>{symptom}</h6>
                ))}
              </div>
            </Card>
          </Col>
      
          <Col lg={4} className="d-flex justify-content-between flex-column">
            <Card
              className="border-0 mb-1 d-flex flex-column justify-content-start align-items-center px-3 py-3"
              style={{minHeight: "14em"}}
            >
              {" "}
              <h4>Mistaken Words</h4>
              {getErrorWords()}
            </Card>
            <Card
              className="border-0 mt-1 d-flex flex-column justify-content-start align-items-center px-4 py-4"
              style={{minHeight: "14em"}}
            >
              {" "}
              <h4>Phoneme Errors</h4>
              <div className="d-flex flex-column">
                {getPhonemeErrors()}
              </div>
            </Card>
          </Col>

          <Col lg={4} className="h-100">
            <Card
              className="border-0 mb-3 d-flex flex-column justify-content-start align-items-center px-4 py-4 h-100"
            >
              <h4 className="mb-3">Allowed Exercises</h4>
              {listExercises()}
              <button className="btn bg-black text-white border-0 my-3">See Exercise List</button>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PatientInfo;

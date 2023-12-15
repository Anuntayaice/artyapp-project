import React from "react";
import { Card, Button, Row, Col, Image } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import { ColorRing } from  'react-loader-spinner'
import {useLocation, useNavigate} from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import ContentEditable from 'react-contenteditable';

const ExerciseCreation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state)
  const exercise = location.state.exercise.content;
  const [story, setStory] = React.useState(exercise.story);
  const [compoundNouns, setCompoundNouns] = React.useState(exercise.compound_nouns);
  const [phrases, setPhrases] = React.useState(exercise.phrases);
  const [loading, setLoading] = React.useState(false);

  const goBack = () => {
    window.history.back();
  }
  
  function getText(html){
    var divContainer= document.createElement("div");
    divContainer.innerHTML = html;
    return divContainer.textContent || divContainer.innerText || "";
  }

  const saveExercise = () => {
    setLoading(true);
    const formData = new FormData();
    let parsedCompoundNouns = compoundNouns.map((noun) => getText(noun));
    let parsedPhrase = phrases.map((phrase) => getText(phrase));
    // convert the parsedPhrases to a string seperated by newlines
    parsedPhrase = parsedPhrase.join("\n");
    parsedCompoundNouns = parsedCompoundNouns.join("\n");

    formData.append("story", getText(story));
    formData.append("compound_nouns", parsedCompoundNouns);
    formData.append("phrases", parsedPhrase);
    formData.append("image_url", exercise.image_url);
    formData.append("description", exercise.description);
    console.log(formData);
    fetch("http://localhost:5000/save_exercise", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(Object.fromEntries(formData.entries())),
    }).then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
    }).then((data) => {
        console.log(data);
        setLoading(false);
        // navigate to the exercise page
        navigate(`/therapist-patientlist`);
      });
  }

  const onStoryChange = React.useCallback(evt => {
    setStory(evt.currentTarget.innerHTML)
  }, []);

  const onCompoundNounChange = (index) => (evt) => {
    setCompoundNouns((old) => {
      old[index] = evt.currentTarget.innerHTML;
      return old;
    });
  }

  const onPhraseChange = (index) => (evt) => {
    setPhrases((old) => {
      old[index] = evt.currentTarget.innerHTML;
      return old;
      });
  }

  console.log(story, compoundNouns, phrases)

  if (loading) {
    return (
      <>
        <div
          className="bg-dark pt-4 px-4 text-white d-flex flex-column justify-content-start align-items-center h-100"
        >
          <p className="exercise-gen-text">The exercise is being saved...</p>
          <ColorRing
            visible={loading}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#6b89b2', '#9ac5ff', '#6b89b2', '#9ac5ff', '#6b89b2']}
          />
        </div>
      </>
    )
  }

  return (
    <div
      className="bg-dark pt-4 px-4 text-white d-flex justify-content-center align-items-center"
    >
      <Card
        className="text-center mb-5 pt-4 mt-3"
        style={{
          width: "80rem",
          minWidth: "75em",
          maxHeight: "42rem",
          marginBottom: "0",
          borderRadius: "16px",
          backgroundColor: "rgba(232, 230, 230, 0.2)",
        }}
      >
        <Card.Body>
          <Row>
            <Col>
              {" "}
              <Image
                src={exercise.image_url}
                fluid
                style={{ maxHeight: "90%" }}
              />
            </Col>
            <Col className="d-flex flex-column justify-content-center align-items-center ">
              {" "}
              <div className="px-4 text-start py-4 mb-3 border-0 w-100 h-100 text-white"
                  style={{
                    borderRadius: "20px",
                    backgroundColor: "rgba(32, 32, 32, 0.8)",
                  }}>
                <Carousel data-bs-theme="light" indicators={false} className="d-flex" interval={null} wrap={false}>
                    <Carousel.Item key={1}>
                      <div className="text-content-therapist">
                        <div className="text-content-inner-therapist">
                        <div className="text-content-therapist-title">
                            <h2>Story</h2>
                          </div>
                          <ContentEditable
                            spellCheck="false"
                            onChange={onStoryChange}
                            onBlur={onStoryChange}
                            html={story} />
                        </div>
                      </div>
                    </Carousel.Item>
                    <Carousel.Item key={2}>
                      <div className="text-content-therapist">
                        <div className="text-content-inner-therapist">
                        <div className="text-content-therapist-title">
                            <h2>Phrases</h2>
                          </div>
                          <div className="input-boxes-exercise">
                            {phrases.map((phrase, index) => (
                              <ContentEditable
                                spellCheck="false"
                                onChange={onPhraseChange(index)}
                                onBlur={onPhraseChange(index)}
                                html={phrase} 
                                key={index}
                                />
                            ))}
                          </div>
                        </div>
                      </div>
                    </Carousel.Item>
                    <Carousel.Item key={3}>
                      <div className="text-content-therapist">
                        <div className="text-content-inner-therapist">
                          <div className="text-content-therapist-title">
                            <h2>Tongue Twisters</h2>
                          </div>
                          <div className="input-boxes-exercise">
                            {compoundNouns.map((noun, index) => (
                              <ContentEditable
                                spellCheck="false"
                                onChange={onCompoundNounChange(index)}
                                onBlur={onCompoundNounChange(index)}
                                html={noun} 
                                key={index}
                                />
                            ))}
                          </div>
                        </div>
                      </div>
                    </Carousel.Item>
                </Carousel>
                <div className="edit-wrapper">
                  <div className="edit-content">
                    Click on the text to edit!
                  </div>
                </div>
              </div>
              <div
                className="d-flex justify-content-between mt-auto mb-5"
                style={{ width: "100%" }}
              >
                <Button
                  className="btn-success"
                  style={{ width: "49%", height: "3em" }}
                  onClick={saveExercise}
                >
                  Add to list
                </Button>
                <Button className="btn-danger" style={{ width: "49%" }}
                  onClick={goBack}
                >
                  Go back{" "}
                </Button>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ExerciseCreation;

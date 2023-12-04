import React, { useEffect } from "react";
import { Card, Button, Row, Col, Image } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useState } from "react";
import "../../css/ExCard.css";
//import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import { useReactMediaRecorder } from "react-media-recorder";
import { ColorRing } from  'react-loader-spinner'

const ExCard = ({ imageSrc, exerciseId, exercise }) => {
  const [audio, setAudio] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [canAdvance, setCanAdvance] = useState(false);
  const [isSpeechExercise, setIsSpeechExercise] = useState(false);
  //const [blob, setBlob] = useState(undefined);
  const [loadingAssessment, setLoadingAssessment] = useState(false);
  const [text, setText] = useState(undefined);
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ audio: true, video: false });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progressValue, setProgressValue] = useState(0);
  const [showCongratulations, setShowCongratulations] = useState(false);

  const handleClick = () => {
    window.location.href = "/exerciselist";
  };
  
  //console.log(exercise[currentIndex])

  const handleNextClick = () => {
    const newIndex = (currentIndex + 1) % exercise.length;
    const newProgressValue = (newIndex + 1) * (100 / exercise.length);
    
    if (newProgressValue === 100) {
      setShowCongratulations(true);
    } else {
      setLoading(true);
      setAudio(undefined);
    }

    setCurrentIndex(newIndex);
    setIsSpeechExercise(exercise[newIndex]['type'] !== "story" && exercise[newIndex]['type'] !== "phase");
    setCanAdvance(false);
    setProgressValue(newProgressValue);
  };

  const getAssessment = async (blobURL) => {
    const formData = new FormData();
    let blob = await fetch(blobURL).then(r => r.blob());
    console.log('in getAssessment', blobURL)

    formData.append("audio", blob, 'audio.wav');
    formData.append("text", exercise[currentIndex]['content']);
    let response = await fetch("http://localhost:5000/gen_audio_assessment", {
      method: "POST",
      body: formData,
    })
    
    let data = await response.json();
    console.log(data);

    const assessment = data['content']['NBest'][0]['PronunciationAssessment'];
    const words = data['content']['NBest'][0]['Words'];
    const accuracy = assessment['AccuracyScore']
    const fluency = assessment['FluencyScore']
    const completeness = assessment['CompletenessScore']
    const pronunciation = assessment['PronScore']

    console.log('words: ',words)
    console.log('accuracy: ',accuracy)
    console.log('fluency: ',fluency)
    console.log('completeness: ',completeness)
    console.log('pronunciation: ',pronunciation)

    let hasFailed = accuracy < 60 || fluency < 60 || completeness < 60 || pronunciation < 60;
    // change word color of text based on assessment
    // new_text is a string with html tags
    let new_text = exercise[currentIndex]['content'].split(' ');
    for (let i = 0; i < words.length; i++) {
      if (words[i]['PronunciationAssessment']['AccuracyScore'] < 75) {
        new_text[i] =`<span style="color:red; cursor:pointer" title="${words[i]['PronunciationAssessment']['ErrorType'] || 'Mispronounciation'}">${new_text[i]}</span>`;
        hasFailed = true;
      } else {
        new_text[i] =`<span style="color:green" title="">${new_text[i]}</span>`;
      }
    }
    setText(new_text.join(' '));
    setCanAdvance(!hasFailed);
    setLoadingAssessment(false);
  };

  useEffect(() => {
    if (!mediaBlobUrl) return;

    setLoadingAssessment(true);
    getAssessment(mediaBlobUrl);
  }, [mediaBlobUrl]);

  useEffect(() => {
    if (!loading) return;
    fetch(`http://localhost:5000/get_exercise_audio?exercise_id=${exerciseId}&type_of_audio=${exercise[currentIndex]['type']}&audio_name=${exercise[currentIndex]['audio_name']}`, {
      method: "GET",
      }).then(response => response.blob())
      .then(blob => {
        setAudio(URL.createObjectURL(blob));
        setText(exercise[currentIndex]['content']);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  }, [exercise, loading, currentIndex, exerciseId]);
  

  return (
    <Card
      className="text-center "
      style={{
        width: "80rem",
        minWidth: "75em",
        borderRadius: "16px",
        backgroundColor: "rgba(232, 230, 230, 0.2)",
      }}
    >
      <Card.Header
        className="border-0 d-flex justify-content-center align-items-center"
        style={{ height: "4em" }}
      >
        <Row className="w-100 align-content-center align-items-center flex-fill">
          <Col xs={1} className="text-start px-3">
            <Button
              variant="link"
              className="text-white text-decoration-none "
              style={{ fontSize: "2em" }}
              onClick={handleClick}
            >
              X
            </Button>
          </Col>
          <Col xs={10} className="">
            <ProgressBar
              striped
              now={progressValue}
              className="w-100"
              style={{ height: "30px", borderRadius: "20px" }}
            />
          </Col>
          <Col xs={1} className="px-3">
            <Image src="medal.png" />
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        {showCongratulations ? (
          <div className="d-flex flex-column justify-content-center align-items-center custom-font">
            <Image
              src="bigmedal.png"
              className="my-5"
              style={{ maxWidth: "13em" }}
            />
            <div className="w-50">
              {" "}
              <h4 style={{ lineHeight: "2em" }}>
                Congratulations! You have just received your first badge! Click
                here to see all your badges or move on to the next exersize
              </h4>
            </div>
            <Button
              className="my-4"
              style={{ width: "15em", fontSize: "1.5em" }}
            >
              Next Exercise
            </Button>
          </div>
        ) : (
          <Row>
            <Col>
              {" "}
              <Image src={imageSrc} fluid style={{ maxHeight: "90%" }} />
            </Col>
            <Col className="content-col">
              {" "}
              <div className="align-self-center text-block">
                <div className="text-wrapper px-5 text-start pt-3 pb-5 border-0 mb-2">
                  <div className="text-content" dangerouslySetInnerHTML={{ __html: text }}>
                  </div>
                </div>
              </div>
              {audio && (
                    <audio autoPlay controls>
                      <source src={audio} type="audio/mpeg" />
                    </audio>
                  )}
              <div className="audio-display-wrapper audio-controls d-flex justify-content-center align-items-center">
                { isSpeechExercise && !loadingAssessment && (
                  <div>
                    <p>{status}</p>
                    <button onClick={startRecording}>Start Recording</button>
                    <button onClick={stopRecording}>Stop Recording</button>
                  </div>
                )}
                <ColorRing
                  visible={loadingAssessment}
                  height="80"
                  width="80"
                  ariaLabel="blocks-loading"
                  wrapperStyle={{}}
                  wrapperClass="blocks-wrapper"
                  colors={['bg-primary', 'bg-secondary', 'bg-success', 'bg-danger', 'bg-warning', 'bg-info']}
                />
                </div>
              <Button
                className="align-self-end"
                style={{ width: "9em" }}
                onClick={handleNextClick}
                disabled={isSpeechExercise && !canAdvance}
              >
                Next
              </Button>
            </Col>
          </Row>
        )}
      </Card.Body>
    </Card>
  );
};

export default ExCard;

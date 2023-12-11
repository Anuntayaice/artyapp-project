import React, { useEffect } from "react";
import { Card, Button, Row, Col, Image } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useState } from "react";
import "../../css/ExCard.css";
//import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import { useReactMediaRecorder } from "react-media-recorder";
import { ColorRing } from  'react-loader-spinner'
import { FaMicrophone, FaStop, FaPlay } from "react-icons/fa";
import { useGlobalAudioPlayer } from 'react-use-audio-player';
import Carousel from 'react-bootstrap/Carousel';
import Modal from 'react-bootstrap/Modal';
import { Tick } from 'react-crude-animated-tick';
import { Tooltip } from 'react-tooltip';

const SampleExCard = ({ imageSrc, exerciseId, exercise }) => {
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
  const { load, play, pause, stop, isReady, playing, stopped, paused } = useGlobalAudioPlayer();
  
  const [show, setShow] = useState(false);
  const [pronouncedWords, setPronouncedWords] = useState([]);

  const handleCloseModal = () => setShow(false);
  const handleShowModal = () => setShow(true);

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

    if (data['content']['NBest'] === undefined) {
      console.log('no assessment')
      setLoadingAssessment(false);
      return;
    }

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
    let pronouncedWordsList = [];
    for (let i = 0; i < words.length; i++) {
      if (words[i]['PronunciationAssessment']['ErrorType'] !== 'None') {
        //new_text[i] =`<span class="span-mistake" style="color:red; cursor:pointer;" title="${words[i]['PronunciationAssessment']['ErrorType'] || 'Mispronounciation'}">${new_text[i]}</span>`;
        hasFailed = true;
      }
      pronouncedWordsList.push({word: words[i]['Word'], errorType: words[i]['PronunciationAssessment']['ErrorType']});
    }
    setPronouncedWords(pronouncedWordsList);
    setCanAdvance(!hasFailed);
    setLoadingAssessment(false);
    if (hasFailed) {
      handleShowModal();
    }
  };

  const getAnchorsAndTooltips = () => {
    const mistake_colors = {
      'Mispronunciation': 'red',
      'Omission': 'gray',
      'Insertion': '#40E0D0',
      'None': 'green',
    }

    return pronouncedWords.map((word, index) => {
      if (index === 0) {
        // capitalize first word
        word.word = word.word.charAt(0).toUpperCase() + word.word.slice(1);
      }

      if (word.errorType === 'None') {
        return (
          <>
            <a className='tooltip-mistake' style={{color: mistake_colors[word.errorType]}}>{`${word.word}${index === pronouncedWords.length - 1 ? '.' : ' '}`}</a>
          </>
          
        );
      } else {
        return (
          <>
            <a className='tooltip-mistake' style={{color: mistake_colors[word.errorType], cursor: 'pointer'}} data-tooltip-id={`${index}-anchor`} data-tooltip-content={word.errorType}>
            {`${word.word}${index === pronouncedWords.length - 1 ? '.' : ' '}`} 
            </a>
            <Tooltip id={`${index}-anchor`} />
          </>
        );
      }
    });
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
        load(URL.createObjectURL(blob), {
          autoplay: true,
          format: 'wav',
        });
        setText(exercise[currentIndex]['content']);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  }, [exercise, loading, currentIndex, exerciseId, load]);
  
  const genSentencePairs = (fullBodyText) => {
    // Split the full body text into individual sentences
    const sentences = fullBodyText.match(/[^.!?]+[.!?]+/g);

    // Create pairs of sentences
    const sentencePairs = [];
    for (let i = 0; i < sentences.length - 1; i += 2) {
      const pair = `${sentences[i].trim()} ${sentences[i + 1].trim()}`;
      sentencePairs.push(pair);
    }

    return sentencePairs;
  }

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
            <Image src="/images/medal.png" />
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        {showCongratulations ? (
          <div className="d-flex flex-column justify-content-center align-items-center custom-font">
            <Image
              src="/images/bigmedal.png"
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
              <Image src={imageSrc} fluid style={{ maxHeight: "90%"}} />
            </Col>
            <Col className="content-col custom-font ">
              {" "}
              <div className="align-self-center text-block">
                <div className="text-wrapper px-5 text-start pt-3 pb-3 border-0 mb-2">
                  { currentIndex === 0 && text ? (
                    <Carousel data-bs-theme="dark" indicators={false} className="d-flex" interval={1000000} wrap={false}>
                      {text && genSentencePairs(text).map((pair, index) => {
                        return (
                          <Carousel.Item key={index}>
                            <div className="text-content">
                              <div className="text-content-inner">
                                <div className="index-story">
                                  <div className="index-story-inner">{index + 1}</div>
                                </div>
                                <p>{pair}</p>
                              </div>
                            </div>
                          </Carousel.Item>
                        );
                      })}
                      </Carousel>
                  ) : ( text && 
                    <div className="text-content-normal" dangerouslySetInnerHTML={{ __html: text }}>
                    </div>
                  )}
              </div>
              { isReady && (
                    <div className="audio-wrapper">
                      {(stopped || paused) && (
                        <FaPlay onClick={play} />
                      )}
                      {playing && (
                        <FaStop onClick={stop} />
                      )}
                    </div>
                  )}
              </div>
              <div className="d-flex justify-content-center align-items-center">
                { isSpeechExercise && !loadingAssessment && (
                  <div className="microphone-wrapper">
                    {canAdvance ? (<Tick size={70} />) : (
                    (status === "idle" || status === "stopped") ? <FaMicrophone onClick={startRecording}/> : 
                    (status === "recording" && <FaStop onClick={stopRecording}/>))}
                  </div>
                )}
                { isSpeechExercise && loadingAssessment && (
                  <div className="microphone-wrapper">
                    <ColorRing
                      visible={loadingAssessment}
                      height="80"
                      width="80"
                      ariaLabel="blocks-loading"
                      wrapperStyle={{}}
                      wrapperClass="blocks-wrapper"
                      colors={['#bba5c2', '#ffcdf9', '#b095b9', '#f2cdff', '#bba5c2']}
                    />
                  </div>
                )}

                
                </div>
              <Button
                className="align-self-end button-next"
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
      <Modal
        show={show}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
        size='xl'
      >
        <Modal.Body className="mistake-body">
          <div className="mistake-info">Whoops! Seems you made a mistake! Hover the words to see what you did wrong!</div>
          <div className="text-content-normal mistake-text">
            {getAnchorsAndTooltips()}
          </div>
        </Modal.Body>
        <Modal.Footer className="mistake-footer">
          <Button variant="primary" onClick={handleCloseModal}>Understood</Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default SampleExCard;

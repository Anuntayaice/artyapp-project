import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const backgroundStyle = {
    backgroundImage: 'url("/images/mainbg.png")',
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "calc(100vh - 3em)", 
    display: "flex",
    justifyContent: "start",
    alignItems: "start",
    color: "white",
  };
  const navigate = useNavigate();
   const handleClick = () => {
     navigate(`/exerciselist`);
   };

  return (
    <div className="text-start flex-column px-5 pt-5" style={backgroundStyle}>
      <h1 className="w-50 mb-4 pt-5" style={{ lineHeight: "1.5em" , fontSize :'2em'}}>
        Embark on an exciting journey and explore a world of fun and playful
        speech exercises – Dive In and Let the Adventure Begin!
      </h1>
      <Button className="d-block my-2" onClick={handleClick} style={{height : '2.5em' ,width : '22%', fontSize : '1.5em'}}>Get Started</Button>
    </div>
  );
};
export default Home;

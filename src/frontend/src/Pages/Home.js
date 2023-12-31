import React from "react";
import { Button } from "react-bootstrap";
import { Image } from "react-bootstrap";

const Home = () => {
  const backgroundStyle = {
    display: "flex",
    justifyContent: "start",
    alignItems: "start",
    color: "white",
  };
   const handleClick = () => {
     window.location.href = "/login";
   };

  return (
    <div className="text-start flex-column px-5 pt-5" style={backgroundStyle}>
      <div className="d-flex" style={{width: '40em', alignSelf: "center", justifyContent: 'center'}}>
        <Image
          src="/images/artyIcon.png"
          style={{ maxWidth: "18em"}}
          className=" mx-5"
        />
      </div>
      <h1 className="w-50 mb-4 pt-5" style={{ lineHeight: "1.5em" , fontSize :'2em', textAlign: 'center', alignSelf:'center'}}>
        Embark on an exciting journey and explore a world of fun and playful
        speech exercises – Dive In and Let the Adventure Begin!
      </h1>
      <Button className="d-block my-2" onClick={handleClick} style={{height : '2.5em' ,width : '22%', fontSize : '1.5em', alignSelf: 'center'}}>Get Started</Button>
    </div>
  );
};
export default Home;

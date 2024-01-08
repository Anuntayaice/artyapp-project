import React from "react";
import {
  Card,
  Button,
  Col,
  Row,
  Image,
} from "react-bootstrap";
import "../../css/LoginCard.css";
const PatientPageCard = ({user, setUser}) => {
  const handleLogout = () => {
    window.location.href = "/login";
    setUser(null);
  }
   
  return (
    <div>
      <Card className="" style={{ maxWidth: "64rem", borderRadius: "16px" }}>
        <Row className="">
          <Col>
            <Image src="/images/loginpic.png" fluid style={{ borderRadius: "16px" }} />
          </Col>
          <Col>
            <div className="px-5 py-5 d-flex flex-column justify-content-center h-100">
              <h1>{user.name}</h1>
              <h4>{user.email}</h4>
              <h5>{user.condition}</h5>
              {user.symptoms.map((symptom) => (
                <h6>{symptom}</h6>
              ))}
              <div className="d-grid gap-2">
                <Button
                  variant="primary"
                  size="lg"
                  className="login-bt my-4"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default PatientPageCard;

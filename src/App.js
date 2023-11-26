import logo from "./logo.svg";
import "./App.css";
import { Button } from "react-bootstrap";
import "../node_modules/bootstrap/scss/bootstrap.scss";
import LoginCard from "./components/cards/LoginCard";
function App() {
  return (
    <div className="App">
  <LoginCard/>

    </div>
  );
}

export default App;

import "./App.css";
import "../src/css/custom.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./Pages/Login";
import Home from "./Pages/Home";
import Exercises from "./Pages/Exercises";
import MainNavBar from "./components/navbars/MainNavBar";
import Progress from "./Pages/Progress";
import ExerciseList from "./Pages/ExerciseList";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MainNavBar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/exercises" element={<Exercises />}></Route>
          <Route path="/exerciselist" element={<ExerciseList />}></Route>
          <Route path="/progress" element={<Progress />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

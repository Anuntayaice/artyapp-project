import "./App.css";
import "../src/css/custom.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./Pages/Login";
import Home from "./Pages/Home";
import MainNavBar from "./components/navbars/MainNavBar";
import ExerciseList from "./Pages/ExerciseList";
import MainExercise from "./Pages/MainExercise";
import SampleExercise from "./Pages/SampleExercise";

function App() {
  const isLoginPage = window.location.pathname === "/login";

  return (
    <div className="App">
      <BrowserRouter>
        {isLoginPage ? null : <MainNavBar />}

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/mainexercise" element={<MainExercise />}></Route>
          <Route path="/sampleexercise" element={<SampleExercise />}></Route>
          <Route path="/exerciselist" element={<ExerciseList />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;

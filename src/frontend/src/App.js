import "./App.css";
import "../src/css/custom.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./Pages/Login";
import Home from "./Pages/Home";
import MainNavBar from "./components/navbars/MainNavBar";
import ExerciseList from "./Pages/ExerciseList";
import MainExercise from "./Pages/MainExercise";
import SampleExercise from "./Pages/SampleExercise";
import TherapistLogin from "./Pages/TherapistLogin";
import TherapistNavBar from "./components/navbars/TherapistNavBar";
import PatientList from "./Pages/PatientList";
import PatientInfo from "./Pages/PatientInfo";
import ExerciseOverviewforTherapist from "./Pages/ExerciseOverviewforTherapist";
import ExerciseCreation from "./Pages/ExerciseCreation";
import TherapistSignup from "./Pages/TherapistSignup";

function App() {
  const isLoginPage = window.location.pathname === "/login";
  const isTherapistPage = window.location.pathname.startsWith("/therapist");
  // const isPatientList =
  //   window.location.pathname.startsWith("/therapist-patientlist");

  return (
    <div className="App">
      <BrowserRouter>
        {isLoginPage || isTherapistPage ? null : <MainNavBar />}
        {isTherapistPage ? <TherapistNavBar /> : null}
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mainexercise" element={<MainExercise />} />
          <Route path="/sampleexercise" element={<SampleExercise />} />
          <Route path="/exerciselist" element={<ExerciseList />} />
          <Route path="/therapist-login" element={<TherapistLogin />} />{" "}
          <Route path="/therapist-patientlist" element={<PatientList />} />
          <Route path="/therapist/:id" element={<PatientInfo />} />
          <Route
            path="/therapist/:id/exercise-overview"
            element={<ExerciseOverviewforTherapist />}
          />          
          <Route path="/therapist-signup" element={<TherapistSignup/>}></Route>

          <Route
            path="/therapist/create-exercise"
            element={<ExerciseCreation />}
          />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

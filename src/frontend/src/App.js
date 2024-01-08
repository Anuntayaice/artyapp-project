import "./App.css";
import "../src/css/custom.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./Pages/Login";
import PatientSignup from "./Pages/PatientSignup";
import Home from "./Pages/Home";
import MainNavBar from "./components/navbars/MainNavBar";
import ExerciseList from "./Pages/ExerciseList";
import Exercise from "./Pages/Exercise";
import TherapistNavBar from "./components/navbars/TherapistNavBar";
import PatientList from "./Pages/PatientList";
import PatientInfo from "./Pages/PatientInfo";
import ExerciseOverviewforTherapist from "./Pages/ExerciseOverviewforTherapist";
import ExerciseCreation from "./Pages/ExerciseCreation";
import TherapistSignup from "./Pages/TherapistSignup";
import AddPatient from "./Pages/AddPatient";
import ExerciseListOverview from "./Pages/ExerciseListOverview";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useState } from "react";

function App() {
  const isHomePage = window.location.pathname === "/";

  const [user, setUser] = useLocalStorage("user", null);
  const [role, _setRole] = useState(user ? user.role : null);

  return (
      <div style={{
        backgroundImage: isHomePage ? 'url("/images/mainbg.png")' : "none",
        height: "100vh",
        backgroundSize: '100% auto'
      }} className={`App ${role && role === 'therapist' ? 'bg-dark' : 'bg-secondary'}`}>
        <BrowserRouter>
          {!role || role === 'therapist' || isHomePage ? null : <MainNavBar />}
          {role && role === 'therapist' && !isHomePage ? <TherapistNavBar /> : null}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login user={user} setUser={setUser}/>} />
            {/*<Route path="/mainexercise" element={<MainExercise />} />*/}
            <Route path="/exercise/:id" element={<Exercise />} />
            {/*<Route path="/sampleexercise" element={<SampleExercise />} */}
            <Route path="/signup" element={<PatientSignup />} />
            <Route
              path="/therapist-signup"
              element={<TherapistSignup />}
            ></Route>
            <Route path="/exerciselist" element={<ExerciseList />} />
            <Route path="/therapist-patientlist" element={<PatientList />} />
            <Route path="/exercises" element={<ExerciseListOverview />} />
            <Route path="/therapist/:id" element={<PatientInfo />} />
            <Route
              path="/therapist/new-exercise-overview"
              element={<ExerciseOverviewforTherapist />}
            />
            <Route
              path="/therapist/create-exercise"
              element={<ExerciseCreation />}
            />
            <Route path ='/therapist/add-patient'
            element = {<AddPatient/>}/>
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;

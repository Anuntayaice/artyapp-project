import "./App.css";
import "../src/css/custom.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./Pages/Login";
import Home from "./Pages/Home";
import Exercises from "./Pages/Exercises";
import Signup from "./Pages/Signup";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/exercises" element={<Exercises />}></Route>
          <Route path="/signup" element={<Signup />}></Route>


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

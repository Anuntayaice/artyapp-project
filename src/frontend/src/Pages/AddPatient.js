import React from "react";
import AddPatientCard from "../components/cards/AddPatientCard";
import { Image } from "react-bootstrap";
const AddPatient = () => {
  return (
    <div className="bg-dark d-flex flex-column align-items-center justify-content-start  vh-100 px-5 pt-4">
      <AddPatientCard />
    </div>
  );
};

export default AddPatient;

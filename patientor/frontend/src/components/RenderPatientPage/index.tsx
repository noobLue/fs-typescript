import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Patient } from "../../types";
import patientService from "../../services/patients";


const RenderPatientPage = ( ) => {
  const { id } = useParams(); 
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    if(!id) return;
    
    const fetchPatient = async () => {
      const patient = await patientService.getOne(id);
      setPatient(patient);
    };
    void fetchPatient();
  }, [id]);

  if(!patient) return <div>loading</div>;

  return (<div>
    <h1>{patient.name} ({patient.gender})</h1>
    <p>ssn: {patient.ssn}</p>
    <p>occupation: {patient.occupation}</p>
    <p>date of birth: {patient.dateOfBirth}</p>
  </div>);
};

export default RenderPatientPage;

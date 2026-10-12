import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Entry, Patient } from "../../types";
import patientService from "../../services/patients";


const PatientEntries = ({patientEntries}: {patientEntries: Entry[]}) => {
    return (<div>Here are the entries {patientEntries.map(e => {
        return <div key={e.id}>
            {e.date} <i>{e.description}</i>
            {e.diagnosisCodes ? <ul>{e.diagnosisCodes.map(d => {
                return <li key={d}>{d}</li>;
            })}</ul> : <div></div>}
            
        </div>;
    })}</div>);
};


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

    <h2>Entries</h2>
    <p>{patient.entries ? <PatientEntries patientEntries={patient.entries}></PatientEntries> : <div></div>}</p>
  </div>);
};

export default RenderPatientPage;

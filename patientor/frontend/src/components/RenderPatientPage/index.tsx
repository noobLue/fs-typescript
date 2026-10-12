import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Diagnosis, Entry, Patient } from "../../types";
import patientService from "../../services/patients";


const DiagnosisComponent = ({code, diagnoses}: {code: string, diagnoses: Diagnosis[]}) => {
    return <li key={code}>{code} {diagnoses.find(d => d.code === code)?.name}</li>;
};

const DiagnosesComponent = ({codes, diagnoses}: {codes: string[], diagnoses: Diagnosis[]}) => {
    return <ul>{codes.map(d => {
        return <DiagnosisComponent code={d} diagnoses={diagnoses} key={d}/>;
    })}</ul>;
};

const PatientEntry = ({entry, diagnoses}: {entry: Entry, diagnoses: Diagnosis[]}) => {
    return <div>
        {entry.date} <i>{entry.description}</i>
        {entry.diagnosisCodes ? <DiagnosesComponent codes={entry.diagnosisCodes} diagnoses={diagnoses}/> : <div></div>}
    </div>;
};

const PatientEntries = ({patientEntries, diagnoses}: {patientEntries: Entry[], diagnoses: Diagnosis[]}) => {
    return <div>{patientEntries.map(e => {
        return <PatientEntry key={e.id} entry={e} diagnoses={diagnoses}/>;
    })}</div>;
};


const RenderPatientPage = ({diagnoses}: {diagnoses: Diagnosis[]}) => {
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
    {<PatientEntries patientEntries={patient.entries} diagnoses={diagnoses}></PatientEntries>}
  </div>);
};

export default RenderPatientPage;

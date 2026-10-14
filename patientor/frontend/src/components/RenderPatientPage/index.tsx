import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Diagnosis, Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry, Patient, HealthCheckRating, EntryWithoutId } from "../../types";
import patientService from "../../services/patients";
import EntryForm from "./EntryForm";
import axios from "axios";


const assertNever = (value: never): never => {
  throw new Error(
    `Invalid option: ${JSON.stringify(value)}`
  );
};

const HealthRatingBar = ({healthCheckRating}: {healthCheckRating: HealthCheckRating}) => {
    switch(healthCheckRating) {
        case HealthCheckRating.Healthy: 
            return <div style={{color: "green"}}>Health is good!</div>;
        case HealthCheckRating.LowRisk: 
            return <div style={{color: "yellow"}}>Low health risk!</div>;
        case HealthCheckRating.HighRisk: 
            return <div style={{color: "orange"}}>High health risk!</div>;
        case HealthCheckRating.CriticalRisk: 
            return <div style={{color: "red"}}>Critical health risk!</div>;
        default: 
            return assertNever(healthCheckRating);
    };
};

const HealthCheckComponent = ({entry}:{entry: HealthCheckEntry}) => {
    return (<div>
        <p>{entry.date} [HealthCheck]</p>
        <HealthRatingBar healthCheckRating={entry.healthCheckRating}/>
    </div>);
};

const OccupationalComponent = ({entry}: {entry: OccupationalHealthcareEntry}) => {
    return (<div>
        <p>{entry.date} [Occupational visit]</p>
        <p>Employer: {entry.employerName}</p>
        {entry.sickLeave && <p>Sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}</p>}
    </div>);
};

const HospitalComponent = ({entry}: {entry: HospitalEntry}) => {
    return (<div>
        <p>{entry.date} [Hospital visit]</p>
        <p>discharge criteria: {entry.discharge.criteria} ({entry.discharge.date})</p>
    </div>);
};

const EntryDetails = ({entry}: {entry: Entry}) => {
    switch(entry.type){
        case "HealthCheck":
            return <HealthCheckComponent entry={entry}/>;
        case "OccupationalHealthcare":
            return <OccupationalComponent entry={entry}/>;
        case "Hospital":
            return <HospitalComponent entry={entry}/>;
        default:
            return assertNever(entry);
    }
};

const DiagnosisComponent = ({code, diagnoses}: {code: string, diagnoses: Diagnosis[]}) => {
    return <li>{code} {diagnoses.find(d => d.code === code)?.name}</li>;
};

const DiagnosesComponent = ({codes, diagnoses}: {codes: string[], diagnoses: Diagnosis[]}) => {
    return <ul>{codes.map(d => {
        return <DiagnosisComponent code={d} diagnoses={diagnoses} key={d}/>;
    })}</ul>;
};

const PatientEntry = ({entry, diagnoses}: {entry: Entry, diagnoses: Diagnosis[]}) => {
    return <div style={{border: "1px solid black", margin: "5px"}}>
        <EntryDetails entry={entry}/>
        <i>{entry.description}</i>
        {entry.diagnosisCodes && <DiagnosesComponent codes={entry.diagnosisCodes} diagnoses={diagnoses}/>}
        Diagnosed by {entry.specialist}
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
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if(!id) return;
    
    const fetchPatient = async () => {
      const patient = await patientService.getOne(id);
      setPatient(patient);
    };
    void fetchPatient();
  }, [id]);

  const submitEntry = async (newEntry: EntryWithoutId) => {
    if(!patient) return;

    try {
        const entry = await patientService.createEntry(patient.id, newEntry);
        setPatient({...patient, entries: patient.entries.concat(entry)});

    } catch (error) {
        if(axios.isAxiosError(error))
        {
            const data = error.response?.data;
            if(data && Array.isArray(data.error))
            {
                setErrors(data.error.map((e: {message: string}) => e.message));
            }
        }
        else 
        {
            setErrors(["Unknown Error"]);
        }
    }
  };

  if(!patient) return <div>loading</div>;

  return (<div>
    {errors.length>0 && <div style={{background:"pink" }}>{errors.map(em => `${em}, `)}</div>}
    <h1>{patient.name} ({patient.gender})</h1>
    <p>ssn: {patient.ssn}</p>
    <p>occupation: {patient.occupation}</p>
    <p>date of birth: {patient.dateOfBirth}</p>

    <h2>Entries</h2>
    {<PatientEntries patientEntries={patient.entries} diagnoses={diagnoses}></PatientEntries>}
    {<EntryForm diagnoses={diagnoses} submitEntry={submitEntry}/>}
  </div>);
};

export default RenderPatientPage;

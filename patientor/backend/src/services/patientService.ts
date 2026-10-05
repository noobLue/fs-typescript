import patientData from "../../data/patients.ts" with {type: "json"};
import type { NewPatientEntry, Patient, PatientSafe } from "../types.ts";
import {v1 as uuid} from "uuid";

const patients = patientData as Patient[];

const getEntries = (): PatientSafe[] => {
    return patients.map(({id, name, dateOfBirth,gender, occupation }) => ({ id, name, dateOfBirth,gender, occupation }));
};

const addEntry = (newPatient: NewPatientEntry): PatientSafe => {

    const patient: Patient = { 
        id: uuid(), 
        ...newPatient
        //name: newPatient.name,
        //dateOfBirth: newPatient.dateOfBirth,
        //gender: newPatient.gender,
        //occupation: newPatient.occupation,
    };

    patients.push(patient);

    return {
        id: patient.id,
        name: patient.name,
        dateOfBirth: patient.dateOfBirth,
        gender: patient.gender,
        occupation: patient.occupation
    };
};

export default {
    getEntries,
    addEntry
};
import patientData from "../../data/patients.ts" with {type: "json"};
import type { NewPatientEntry, Patient, PatientSafe } from "../types.ts";
import {v1 as uuid} from "uuid";

const patients = patientData as Patient[];

const getEntries = (): PatientSafe[] => {
    return patients.map(({id, name, dateOfBirth,gender, occupation }) => ({ id, name, dateOfBirth,gender, occupation }));
};

const addEntry = (newPatient: NewPatientEntry): Patient => {

    const patient: Patient = { 
        id: uuid(), 
        ...newPatient
    };

    patients.push(patient);

    return patient;
};

export default {
    getEntries,
    addEntry
};
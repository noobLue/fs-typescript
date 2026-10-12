import patients from "../../data/patients.ts";
import type { NewPatientEntry, Patient, PatientSafe } from "../types.ts";
import {v1 as uuid} from "uuid";

const patientsData = patients;

const getEntries = (): PatientSafe[] => {
    return patientsData.map(({id, name, dateOfBirth,gender, occupation }) => ({ id, name, dateOfBirth,gender, occupation }));
};

const addEntry = (newPatient: NewPatientEntry): Patient => {

    const patient: Patient = { 
        id: uuid(),
        entries: [],
        ...newPatient
    };

    patientsData.push(patient);

    return patient;
};

const getEntry = (id: string): Patient | undefined => {
    return patientsData.find(p => p.id === id);
};

export default {
    getEntries,
    addEntry,
    getEntry
};
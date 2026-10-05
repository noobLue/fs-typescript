import patientData from "../../data/patients.ts" with {type: "json"};
import type { Patient, PatientSafe } from "../types.ts";

const patients = patientData as Patient[];

const getEntries = (): PatientSafe[] => {
    return patients.map(({id, name, dateOfBirth,gender, occupation }) => ({id, name, dateOfBirth,gender, occupation}));
};

export default {
    getEntries
};
export interface Diagnosis {
    code: string,
    name: string,
    latin?: string
}

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    gender: string,
    ssn: string,
    occupation: string
};


export type PatientSafe = Omit<Patient, 'ssn'>;


import { Gender } from "./types.ts";
import type { NewPatientEntry } from "./types.ts";


const isString = (obj: unknown): obj is string => {
    return typeof obj === 'string' || obj instanceof String;
};

const isDate = (obj: string): boolean => {
    return Boolean(Date.parse(obj));
};

const isGender = (obj: string): obj is Gender => {
    return (Object.values(Gender) as string[]).includes(obj);
};

const parseName = (obj: unknown): string => {
    if(!obj || !isString(obj)) throw new Error("Failed to parse name");

    return obj;
};

const parseDateOfBirth = (obj: unknown): string => {
    if(!obj || !isString(obj) || !isDate(obj)) throw new Error("Failed to parse dateofbirth");

    return obj;
};

const parseOccupation = (obj: unknown): string => {
    if(!obj || !isString(obj)) throw new Error("Failed to parse occupation");

    return obj;
};

const parseSsn = (obj: unknown): string => {
    if(!obj || !isString(obj)) throw new Error("Failed to parse ssn");

    return obj;
};

const parseGender = (obj: unknown): Gender => {
    if(!obj || !isString(obj) || !isGender(obj)) throw new Error("Failed to parse gender");

    return obj;
};

export const parseNewPatientEntry = (object :unknown): NewPatientEntry => {
    if(!object || typeof object !== 'object') throw new Error("Invalid input");

    if(!('name' in object) || !('dateOfBirth' in object) || !('gender' in object) || !('occupation' in object) || !('ssn' in object)) throw new Error("Some fields not found");
    
    const newPatient: NewPatientEntry = {
        name: parseName(object.name),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        ssn: parseSsn(object.ssn)
    };

    return newPatient;
};

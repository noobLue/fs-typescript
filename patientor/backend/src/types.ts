import z from "zod";

export interface Diagnosis {
    code: string,
    name: string,
    latin?: string
}

export const Gender = {
    Male: "male",
    Female: "female",
    Other: "other"
} as const;

export type Gender = typeof Gender[keyof typeof Gender];

export const NewPatientEntrySchema = z.object({
    name: z.string(),
    dateOfBirth: z.iso.date(),
    gender: z.enum(Gender),
    ssn: z.string(),
    occupation: z.string()
});

export type NewPatientEntry = z.infer<typeof NewPatientEntrySchema>;

export interface Patient extends NewPatientEntry {
    id: string
}

export type PatientSafe = Omit<Patient, 'ssn'>;

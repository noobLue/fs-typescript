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

export const BaseEntrySchema = z.object({
    id: z.string(),
    description: z.string(),
    date: z.iso.date(),
    specialist: z.string(),
    diagnosisCodes: z.array(z.string()).optional(),
});

export type BaseEntry = z.infer<typeof BaseEntrySchema>;

export const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;

export type HealthCheckRating = typeof HealthCheckRating[keyof typeof HealthCheckRating];

export const HealthCheckEntrySchema = BaseEntrySchema.extend({
    type: z.literal("HealthCheck"),
    healthCheckRating: z.union([
        z.literal(HealthCheckRating.Healthy),
        z.literal(HealthCheckRating.LowRisk),
        z.literal(HealthCheckRating.HighRisk),
        z.literal(HealthCheckRating.CriticalRisk),
    ])
});
export type HealthCheckEntry = z.infer<typeof HealthCheckEntrySchema>;

export const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
    type: z.literal("OccupationalHealthcare"),
    employerName: z.string(),
    sickLeave: z.object({
        startDate: z.iso.date(),
        endDate: z.iso.date(),
    }).optional(),
});
export type OccupationalHealthcareEntry = z.infer<typeof OccupationalHealthcareEntrySchema>;

export const HospitalEntrySchema = BaseEntrySchema.extend({
    type: z.literal("Hospital"),
    discharge: z.object({
        date: z.iso.date(),
        criteria: z.string(),
    }),
});
export type HospitalEntry = z.infer<typeof HospitalEntrySchema>;

export type Entry = HealthCheckEntry | OccupationalHealthcareEntry | HospitalEntry;

export const NewEntrySchema = z.union([
    HealthCheckEntrySchema.omit({id: true}),
    HospitalEntrySchema.omit({id: true}),
    OccupationalHealthcareEntrySchema.omit({id: true}),
]);

export type NewEntry = z.infer<typeof NewEntrySchema>;



export interface Patient extends NewPatientEntry {
    id: string;
    entries: Entry[];
}

export type PatientSafe = Omit<Patient, 'ssn' | 'entries'>;



export const assertNever = (value: never): never => {
  throw new Error(
    `Error: ${JSON.stringify(value)}`
  );
};
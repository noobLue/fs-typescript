import diagnosisData from "../../data/diagnoses.ts" with {type: "json"};
import type { Diagnosis } from "../types.ts";

const diagnoses = diagnosisData as Diagnosis[];

const getEntries = (): Diagnosis[] => {
    return diagnoses;
};

export default {
    getEntries
};
import express from "express";
//import type { Diagnosis } from  "../types.ts";
import patientService from "../services/patientService.ts";
import { parseNewPatientEntry } from "../utils.ts";

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getEntries());
});

router.post('/', (req, res) => {
    try {
        
    const newPatient = parseNewPatientEntry(req.body);

    const patient = patientService.addEntry(newPatient);
    res.json(patient);
    } catch (error) {
        console.log(error);
        res.status(400).send({ error: "Some error happened" });
    }
});

export default router;
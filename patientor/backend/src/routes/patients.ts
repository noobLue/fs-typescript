import express, { type Request, type Response } from "express";
import patientService from "../services/patientService.ts";
import type { Entry, NewEntry, NewPatientEntry, Patient } from "../types.ts";
import { ErrorMiddleware, NewPatientEntryParser, NewPatientParser } from "../middleware.ts";

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getEntries());
});

router.get('/:id', (req, res) => {
    const patient = patientService.getEntry(req.params.id);
    if(patient)
    {
        res.send(patient);
    }
    else 
    {
        res.status(404).send({error: "Patient not found"});
    }
});

router.post('/', NewPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient>) => {
    const patient = patientService.addEntry(req.body);
    res.json(patient);
});

router.post('/:id/entries', NewPatientEntryParser, (req: Request<{id: string}, unknown, NewEntry>, res: Response<Entry | {error: string}>) => {
    const patient = patientService.getEntry(req.params.id);
    if(patient)
    {
        const entry = patientService.addPatientEntry(patient.id, req.body);

        res.send(entry);
    }
    else 
    {
        res.status(404).send({error: "Patient not found"});
    }
});

router.use(ErrorMiddleware);

export default router;
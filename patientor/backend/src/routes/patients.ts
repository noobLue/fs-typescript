import express, { type Request, type Response } from "express";
import patientService from "../services/patientService.ts";
import type { NewPatientEntry, Patient } from "../types.ts";
import { ErrorMiddleware, NewPatientParser } from "../middleware.ts";

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

router.use(ErrorMiddleware);

export default router;
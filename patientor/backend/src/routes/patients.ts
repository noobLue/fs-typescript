import express from "express";
//import type { Diagnosis } from  "../types.ts";
import patientService from "../services/patientService.ts";

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getEntries());
});



export default router;
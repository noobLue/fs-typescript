import express from "express";
//import type { Diagnosis } from  "../types.ts";
import diagnosisService from "../services/diagnosisService.ts";

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(diagnosisService.getEntries());
});



export default router;
import { type Request, type Response, type NextFunction } from "express";
import { HealthCheckEntrySchema, HospitalEntrySchema, NewPatientEntrySchema, OccupationalHealthcareEntrySchema } from "./types.ts";
import z from "zod";

export const NewPatientParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        req.body = NewPatientEntrySchema.parse(req.body);
        next();
    } catch (error) {
        next(error);
    }
};




export const NewPatientEntryParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        const body: unknown = req.body;
        if(!body || typeof body !== "object" || !("type" in body)) throw new Error("Malformed request body");
        
        switch(body.type ){
            case "Hospital":
                req.body = HospitalEntrySchema.omit({id: true}).parse(body);
                break;
            case "HealthCheck":
                req.body = HealthCheckEntrySchema.omit({id: true}).parse(body);
                break;
            case "OccupationalHealthcare":
                req.body = OccupationalHealthcareEntrySchema.omit({id: true}).parse(body);
                break;
            default:
                throw new Error("Unknown entry type");
        }

        next();
    } catch (error) {
        next(error);
    }
};

export const ErrorMiddleware = (error:unknown, _req: Request, res: Response, next: NextFunction) => {
    if(error instanceof z.ZodError)
    {
        console.log(error);
        res.status(400).send({ error: error.issues });
    }
    else 
    {
        next(error);
    }
};
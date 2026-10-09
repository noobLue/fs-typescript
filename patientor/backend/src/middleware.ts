import { type Request, type Response, type NextFunction } from "express";
import { NewPatientEntrySchema } from "./types.ts";
import z from "zod";

export const NewPatientParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        req.body = NewPatientEntrySchema.parse(req.body);
        next();
    } catch (error) {
        next(error);
    }
};

export const ErrorMiddleware = (error:unknown, _req: Request, res: Response, next: NextFunction) => {
    if(error instanceof z.ZodError)
    {
        res.status(400).send({ error: error.issues });
    }
    else 
    {
        next(error);
    }
};
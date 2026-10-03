import express, { type Request, type Response } from "express";
import { isNumber } from "./validators.ts";
import { calculateBmi } from "./bmiCalculator.ts";
import { calculateExercises } from "./exerciseCalculator.ts";

const app = express();

app.use(express.json());

app.get('/hello', (_req: Request, res: Response) => {
    res.send("Hello Full Stack!");
});

app.get('/bmi', (req: Request, res: Response) => {
    const ws = req.query.weight;
    const hs = req.query.height;

    if(!isNumber(ws) || !isNumber(hs)){
        res.status(400).send({error: "malformatted parameters"});
        throw new Error("Missing or malformed params");
    }
    const weight = Number(ws);
    const height = Number(hs);
    const bmi = calculateBmi(height, weight);

    res.send({weight, height, bmi});
});

app.post('/exercises', (req: Request, res: Response) => {
    if(!Object.hasOwn(req.body as object, "daily_exercises") || !Object.hasOwn(req.body as object, "target")){
        
        res.status(400).send({error: "parameters missing"});
        throw new Error("Missing or malformed params");
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {daily_exercises, target} = req.body;

    if(!isNumber(target) || !Array.isArray(daily_exercises)){
        res.status(400).send({error: "malformatted parameters"});
        throw new Error("Missing or malformed params");
    }

    for(let i = 0; i < daily_exercises.length; i++){
        if(!isNumber(daily_exercises[i])){    
            res.status(400).send({error: "malformatted parameters"});
            throw new Error("Missing or malformed params");
        }
    }

    res.send(calculateExercises(daily_exercises as number[], target as number));
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log("Server is running at port", PORT);
});

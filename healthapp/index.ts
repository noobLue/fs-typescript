import express from "express";
import { isNumber } from "./validators.ts";
import { calculateBmi } from "./bmiCalculator.ts";

const app = express();

app.get('/hello', (_req, res) => {
    res.send("Hello Full Stack!");
});

app.get('/bmi', (req, res) => {
    const ws = req.query.weight;
    const hs = req.query.height;

    if(!isNumber(ws) || !isNumber(hs)){
        res.status(400).send({error: "Malformatted parameters"});
        throw new Error("Missing or malformed params");
    }
    const weight = Number(ws);
    const height = Number(hs);
    const bmi = calculateBmi(height, weight);

    res.send({weight, height, bmi});
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log("Server is running at port", PORT);
});

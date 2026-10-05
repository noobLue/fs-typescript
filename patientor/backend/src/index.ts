import express from "express";
import diagnosisRouter from "./routes/diagnosis.ts";
import patientsRouter from "./routes/patients.ts";
import cors from "cors";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
}));

app.use(express.json());
app.use('/api/diagnoses', diagnosisRouter);
app.use('/api/patients', patientsRouter);

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
    res.send('pong');
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
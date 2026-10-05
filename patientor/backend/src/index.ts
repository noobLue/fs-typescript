import express from "express";
import diagnosisRouter from "./routes/diagnosis.ts"

const app = express();

app.use(express.json());
app.use('/api/diagnoses', diagnosisRouter);

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
    res.send('pong');
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
import express from 'express';
const app = express();

import { calculateBmi, parseBMIParams } from './bmiCalculator';

app.get('/', (_req, res) => {
  res.send('Server is up and running!');
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { weight, height } = req.query;
  try {
    const { parsedHeight, parsedWeight } = parseBMIParams([height, weight])
    const bmi = calculateBmi(parsedHeight, parsedWeight );
    res.send({
      weight: Number(weight),
      height: Number(height),
      bmi: bmi,
    });
  } catch (error: unknown) {
    res.send({ error: 'malformatted parameters' });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import express from 'express';
const app = express();

import { calculateBmi } from './bmiCalculator';

app.get('/', (_req, res) => {
  res.send('Server is up and running!');
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { weight, height } = req.query;

  if (!isNaN(Number(weight)) && !isNaN(Number(height))) {
    const bmi = calculateBmi(Number(height), Number(weight));
    res.send({
      weight: Number(weight),
      height: Number(height),
      bmi: bmi,
    });
  } else {
    res.send({ error: 'malformatted parameters' });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

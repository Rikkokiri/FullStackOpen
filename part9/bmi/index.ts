import express from 'express';
import { calculateBmi, parseBMIParams } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import { parseNumberArray } from './utils';

const app = express();
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Server is up and running!');
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { weight, height } = req.query;
  try {
    const { parsedHeight, parsedWeight } = parseBMIParams([height, weight]);
    const bmi = calculateBmi(parsedHeight, parsedWeight);
    res.send({
      weight: Number(weight),
      height: Number(height),
      bmi: bmi,
    });
  } catch (error: unknown) {
    res.send({ error: 'malformatted parameters' });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (daily_exercises === undefined || target === undefined) {
    return res.send({ error: 'parameters missing' });
  }

  const parsedDays = Array.isArray(daily_exercises)
    ? parseNumberArray(daily_exercises)
    : undefined;

  if (parsedDays !== undefined && !isNaN(Number(target))) {
    console.log('Parsed days: ', parsedDays);
    const results = calculateExercises(parsedDays, Number(target));
    return res.send({ results });
  }
  return res.send({ error: 'malformatted parameters' });
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

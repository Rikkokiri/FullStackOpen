import express from 'express';
import cors from 'cors';
import diagnosesRouter from './routes/diagnoses';

const app = express();
app.use(express.json());

const corsOptions: cors.CorsOptions = {
  origin: ['http://localhost:3000', '*'],
};

app.use(cors(corsOptions));

app.get('/api/ping', (_req, res) => {
  console.log('Someone pinged the server');
  res.send('Pong!');
});

app.use('/api/diagnoses', diagnosesRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

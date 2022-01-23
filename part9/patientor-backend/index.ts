import express from 'express';
const app = express();

app.get('/ping', (_req, res) => {
  console.log('Someone pinged the server');
  res.send('Pong!');
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

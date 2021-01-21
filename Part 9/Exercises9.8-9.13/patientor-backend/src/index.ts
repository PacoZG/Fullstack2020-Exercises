import express from 'express';
import diagnoseRouter from './routes/diagnoses';
import patientRouter from './routes/patients';
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors());

app.get('/api/ping', (_request, response) => {
  console.log('someone pinged here');
  response.send('pong');
});

app.use('/', diagnoseRouter);
app.use('/', patientRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
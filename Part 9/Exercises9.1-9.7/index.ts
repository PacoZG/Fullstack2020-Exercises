import express from 'express';
const app = express();
app.use(express.json())
import { bmiCalculator } from './bmiCalculator'
import { exerciseCalculator } from './exerciseCalculator'

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight) {
    throw new Error('Missing parameters');
  }
  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    throw new Error('malformatted paramenters');
  }
  const bmi = bmiCalculator(Number(height), Number(weight));
  res.send(bmi);
});

app.post('/exercises', (req, res) => {
  const weeklyHours = req.body.daily_exercises;
  const target = req.body.target;

  if (!weeklyHours || !target || weeklyHours.length !== 7) {
    return res.status(400).json({error: 'parameters missing' });
  }

  const allNumbers = weeklyHours.every((num: number) => !isNaN(num));
  if (!allNumbers || isNaN(target)) {
    res.status(400).json({ error: 'malformatted parameters' })
  }

  const result = exerciseCalculator(target, weeklyHours)
  return res.json(result)
})

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
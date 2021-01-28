import express from 'express';
import patientServices from '../services/patientServices';
import toNewPatient, { toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_request, response) => {
  response.send(patientServices.getNonSensitivePatient());
})

router.get('/:id', (request, response) => {
  const patient = patientServices.findById(String(request.params.id));
  if (patient) {
    response.send(patient);
  } else {
    response.sendStatus(404);
  }
})

router.post('/', (request, response) => {
  try {
    const newPatient = toNewPatient(request.body);
    const addedPatient = patientServices.addPatient(newPatient);
    response.json(addedPatient);
  } catch (error) {
    response.status(400).send(error.message);
  }
})

router.post('/:id/entries', (request, response) => {
  try {
    const patient = patientServices.findById(String(request.params.id))
    if (patient) {
      const newEntry = toNewEntry(request.body);
      const updatedPatient = patientServices.addEntry(patient, newEntry);
      response.json(updatedPatient);
    } else {
      response.status(404).end()
    }
  } catch (error) {
    response.status(400).send(error.message)
  }
})

export default router;
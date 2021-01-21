import express from 'express';
import patientServices from '../services/patientServices';
import toNewPatient from '../utils';

const  router = express.Router();

router.get('/', (_request, response) => {
  response.send(patientServices.getNonSensitivePatient());
})

router.get('/:id', (request, response) => {
  const patient = patientServices.findById(String(request.params.id));
  if(patient){
    response.send(patient);
  } else {
    response.sendStatus(404);
  }
})

router.post('/api/patients', (request, response) => {
  try {
    const newPatient = toNewPatient(request.body);
    const addedPatient = patientServices.addPatient(newPatient);
    response.json(addedPatient);
  } catch (error) {
    response.status(400).send(error.message);
  }
})

export default router;
import express from 'express';
import diagnoseServices from '../services/diagnoseServices';

const router = express.Router();

router.get('/', (_request, response) => {
  response.send(diagnoseServices.getDiagnoses());
})

export default router;
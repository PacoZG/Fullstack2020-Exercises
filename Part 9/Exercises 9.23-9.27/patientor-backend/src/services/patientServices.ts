import patients from '../../data/patients';
import { v4 as uuidv4 } from 'uuid';
import { NonSensitivePatient, NewPatient, Patient, Entry } from '../types';
// , PublicPatient
const getNonSensitivePatient = (): Array<NonSensitivePatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries,
  }));
}

const findById = (id: string): Patient | undefined => {
  const patient = patients.find(p => p.id === id);
  return patient;
}

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuidv4(),
    ...patient
  }
  patients.push(newPatient);
  return newPatient;
};

const addEntry = (patient: Patient, entry: Entry): Patient => {
  entry.id = uuidv4();
  const updatedPatient = { ...patient, entries: patient.entries.concat(entry) }
  console.log('UPDATED PATIENT: ', updatedPatient)
  return updatedPatient;
}

export default { getNonSensitivePatient, findById, addPatient, addEntry };
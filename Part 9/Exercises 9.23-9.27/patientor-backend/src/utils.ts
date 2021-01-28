/* eslint-disable @typescript-eslint/no-explicit-any */

import { Gender, NewPatient, Entry, HealthCheckRating, Diagnosis } from './types'

const toNewPatient = (object: any): NewPatient => {
  const newPatient: NewPatient = {
    name: parseString(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseString(object.ssn),
    occupation: parseString(object.occupation),
    gender: parseGender(object.gender),
    entries: []
  }
  return newPatient;
}

// parsing string
const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};
const parseString = (text: any): string => {
  if (!text || !isString(text)) {
    throw new Error('Incorrect or missing info: ' + text);
  }
  return text;
};
// parsing date
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};
const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};
// parsing gender
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
}
const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
}

// Entry parsing
const isCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
}
const parseHealthCheckRating = (checkRating: any): HealthCheckRating => {
  if (!checkRating || !isCheckRating(checkRating)){
    throw new Error('Incorrect or missing rating: ' + checkRating);
  }
  return checkRating;
}

const parseDiagnosisCodes = (codes: any): Array<Diagnosis['code']> => {
  if(!Array.isArray(codes) || !codes.every(code => typeof code === "string")){
    throw new Error('Incorrect or missing codes');
  }
  return codes;
}

export const toNewEntry = (entry: any): Entry => {
  const entryType: string = parseString(entry.type);
  console.log('NEW ENTRY: ', entry)
  switch (entryType) {
    case "Hospital":
      const hospitalEntry: Entry = {
        id: "",
        description: parseString(entry.description),
        entryDate: parseDate(entry.entryDate),
        specialist: parseString(entry.specialist),
        type: entryType,
      };
      if (entry.diagnosisCodes){
        hospitalEntry.diagnosisCodes = parseDiagnosisCodes(entry.diagnosisCodes);
      };
      if (entry.sickLeave) {
        hospitalEntry.sickLeave = {
          startDate: parseDate(entry.sickLeave.startDate),
          endDate: parseDate(entry.sickLeave.endDate),
        };
      };
      if (entry.discharge) {
        hospitalEntry.discharge = {
          dischargeDate: parseDate(entry.discharge.startDate),
          criteria: parseString(entry.discharge.criteria),
        };
      };
      return hospitalEntry;
    case 'OccupationalHealthcare':
      const occoupationalHealthCareEntry: Entry = {
        id: "",
        description: parseString(entry.description),
        entryDate: parseDate(entry.entryDate),
        specialist: parseString(entry.specialist),
        employerName: parseString(entry.employerName),
        type: entryType
      };
      if (entry.diagnosisCodes){
        occoupationalHealthCareEntry.diagnosisCodes = parseDiagnosisCodes(entry.diagnosisCodes);
      }
      if (entry.sickLeave) {
        occoupationalHealthCareEntry.sickLeave = {
          startDate: parseDate(entry.sickLeave.startDate),
          endDate: parseDate(entry.sickLeave.endDate),
        };
      }
      return occoupationalHealthCareEntry;
    case 'HealthCheck':
      const healthCheckEntry: Entry = {
        id: "",
        description: parseString(entry.description),
        entryDate: parseDate(entry.entryDate),
        specialist: parseString(entry.specialist),
        type: entryType,
        healthCheckRating: parseHealthCheckRating(entry.healthCheckRating)
      };
      if (entry.diagnosisCodes){
        healthCheckEntry.diagnosisCodes = parseDiagnosisCodes(entry.diagnosisCodes);
      }
      return healthCheckEntry;
    default:
      throw new Error(
        `Unhandled entry type ${entryType}, object: ${JSON.stringify(entry)}`
      );
  }
}

export default toNewPatient;

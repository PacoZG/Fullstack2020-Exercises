// eslint-disable-next-line @typescript-eslint/no-empty-interface

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

interface SickLeave {
  startDate: string,
  endDate: string
}

interface Discharge {
  date: string,
  criteria: string
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  startDate?: SickLeave;
  discharge?: Discharge
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave
}
interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}

export type NonSensitivePatient = Omit<Patient, 'ssn'>;

export type NewPatient = Omit<Patient, 'id'>;
import { State } from "./state";
import { Diagnosis, Patient, PublicPatient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: PublicPatient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: PublicPatient;
    }
  | {
      type: "LOAD_PATIENT";
      payload: Patient;
    }
  | {
    type: "LOAD_DIAGNOSES_LIST";
    payload: Diagnosis[];
    }
  | {
    type: "UPDATE_PATIENT";
    payload: Patient;
  };

export const reducer = (state: State, action: Action): State => {
  
  switch (action.type) {
    case "SET_PATIENT_LIST":
      //console.log('STATE: ', state)
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
      case "LOAD_PATIENT":
        //console.log('STATE: ', state)
        return {
          ...state,
          patient: { ...action.payload}
        };
      case "LOAD_DIAGNOSES_LIST":
        return {
          ...state,
          diagnoses: {
            ...action.payload.reduce(
              (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
              {}
            ),
            ...state.diagnoses
          }
        };
      case "UPDATE_PATIENT":
        console.log('STATE: ', state)
        return {
          ...state,
          patient: { ...action.payload}
        }
    default:
      return state;
  }
};

export const setPatientList = (patients: PublicPatient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patients
  };
};

export const addPatient = (patient: PublicPatient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient
  }
}

export const loadPatient = (patient: Patient): Action => {
  return {
    type: "LOAD_PATIENT",
    payload: patient
  };
};

export const loadDiagnoses = (diagnoses: Diagnosis[]): Action => {
  return {
    type: "LOAD_DIAGNOSES_LIST",
    payload: diagnoses
  }
}

export const updatePatient = (patient: Patient): Action => {
  return {
    type: "UPDATE_PATIENT",
    payload: patient
  }
}
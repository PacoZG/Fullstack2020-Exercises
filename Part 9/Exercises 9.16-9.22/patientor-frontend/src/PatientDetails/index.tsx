import React from "react";
import axios from 'axios';
import { apiBaseUrl } from "../constants";
import { useParams } from "react-router-dom";
import { Icon, Header } from "semantic-ui-react";
import { useStateValue, loadPatient } from "../state";
import { Patient, Entry } from '../types';
import EntryDetails from '../PatientDetails/EntryDetails';

const setGenderIcon = (gender: any | undefined) => {
  switch (gender) {
    case "female":
      return "venus"
    case "male":
      return "mars"
    case "other":
      return "genderless"
  };
};

const PatientDetails: React.FC = () => {
  const [{ patient }, dispatch] = useStateValue(); // eslint-disable-line
  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    if (!patient || patient?.id !== id) {
      const fetchPatient = async () => {
        try {
          const { data: patientFromApi } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch(loadPatient(patientFromApi));
          //console.log('patient fetch: ', patient)
        } catch (error) {
          console.log(error)
        };
      };
      fetchPatient();
    };
  }, [patient, id, dispatch]);

  if (!patient) {
    return null;
  };

  return (
    <div className="App">
      <h1>{patient.name} <Icon name={setGenderIcon(patient.gender)} /></h1>
      <p><b>{'ssn: '}</b> {`${patient.ssn}`}</p>
      <p><b>{'occupation: '}</b> {`${patient.occupation}`}</p>
      <strong>{'entries'}</strong>
      {patient.entries.length >= 1 ?
        patient.entries.map((entry: Entry) => <EntryDetails key={entry.id} entry={entry} />)
        :
        <Header as='h3' color='red'>{'No entries'}</Header>}
    </div>
  );
};

export default PatientDetails;

import React from "react";
import { Entry } from "../types";
import HospitalForm from './TypeForms/HospitalForm';
import OccupationalHealthcareForm from './TypeForms/OccupationalForm';
import HealthCheckForm from './TypeForms/HealthCheckForm';
import { Dropdown } from 'semantic-ui-react'

export type EntryFormValues = Omit<Entry, 'id'>;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const options = [
  { value: 'hospital', text: 'Hospital' },
  { value: 'occupational', text: 'Occupational Healthcare' },
  { value: 'healthcheck', text: 'Health Check' }
]

const AddEntryForm: React.FC<Props>  = ({ onSubmit, onCancel }) => {
  const [selection, setSelection] = React.useState('Choose a type of entry');
  const state = { value: '' }
  const handleChange = (_event: any, { value }: any) => { setSelection(value) }
  const { value } = state

  return (
    <div>
      <Dropdown
        onChange={handleChange}
        options={options}
        placeholder={selection}
        selection
        value={value}
      />
      {selection === 'hospital' && <HospitalForm onSubmit={onSubmit} onCancel={onCancel} />}
      {selection === 'occupational' && <OccupationalHealthcareForm onSubmit={onSubmit} onCancel={onCancel} />}
      {selection === 'healthcheck' && <HealthCheckForm onSubmit={onSubmit} onCancel={onCancel} />}
    </div>
  );
};

export default AddEntryForm;
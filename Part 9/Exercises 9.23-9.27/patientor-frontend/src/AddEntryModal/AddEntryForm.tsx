import React from "react";
import { Entry } from "../types";
import HospitalForm from './TypeForms/HospitalForm';
import OccupationalHealthcareForm from './TypeForms/OccupationalForm';
import HealthCheckForm from './TypeForms/HealthCheckForm';

export type EntryFormValues = Omit<Entry, 'id'>;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [form, setForm] = React.useState('hospital')

  return (
    <div>
      <select onChange={e => setForm(e.target.value)} value={form}>
        <option value="hospital">{'Hospital'}</option>
        <option value="occupational">{'Occupational Healthcare'}</option>
        <option value="healthcheck">{' Health Check'}</option>
      </select>
      {form === 'hospital' && <HospitalForm onSubmit={onSubmit} onCancel={onCancel} />}
      {form === 'occupational' && <OccupationalHealthcareForm onSubmit={onSubmit} onCancel={onCancel} />}
      {form === 'healthcheck' && <HealthCheckForm onSubmit={onSubmit} onCancel={onCancel} />}
    </div>
  );
};

export default AddEntryForm;
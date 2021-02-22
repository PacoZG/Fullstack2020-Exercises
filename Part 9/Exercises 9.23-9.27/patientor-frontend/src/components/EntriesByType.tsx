import React from 'react';
import { Field } from "formik";
import { TextField, NumberField } from '../AddEntryModal/FormField';
import { Header } from "semantic-ui-react";
import { EntryTypesOptions } from '../types';

const EntriesbyType: React.FC<{ type: EntryTypesOptions}> = ({ type }) => {
  console.log('TYPE: ', type);
  return (
    <div>
      {type === 'Hospital' || type === 'OccupationalHealthcare' ?
        <div>
          <Header>{'Sick Leave'}</Header>
          <Field
            label="Start date"
            placeholder="YYYY-MM-DD"
            name="startDate"
            component={TextField}
          />
          < Field
            label="End date"
            placeholder="YYYY-MM-DD"
            name="endDate"
            component={TextField}
          />
        </div> : null}
      {type === 'Hospital' ?
        <div>
          <Header>{'Discharge'}</Header>
          <Field
            label="Date"
            placeholder="YYYY-MM-DD"
            name="dischargeDate"
            component={TextField}
          />
          <Field
            label="Criteria"
            placeholder="Criteria"
            name="criteria"
            component={TextField}
          />
        </div> : null}
      {type === 'OccupationalHealthcare' ?
        <Field
          label="Employer name"
          placeholder="Employer Name"
          name="employerName"
          component={TextField}
        /> : null}
      {type === "HealthCheck" ?
        <Field
          label="healthCheckRating"
          name="healthCheckRating"
          component={NumberField}
          min={0}
          max={3}
        /> : null}
    </div>
  );
};

export default EntriesbyType;
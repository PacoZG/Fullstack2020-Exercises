
import React from 'react';
import { Segment, Header, Icon, List } from 'semantic-ui-react';
import { Entry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from '../types';
import DiagnosisCodesDetails from './DiagnosisCodesDetails';
import SickLeaveDetails from './SickLeaveDetails';
import DischargeDetails from './DischargeDetails';
import RatingHeart from './RatingHeart';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const HospitalEntryDetails: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  //console.log('entry: ', entry)
  return (
    <Segment >
      <Header as='h1'>{entry.entryDate} <Icon name='hospital outline' /></Header>
      <List>
        <List.Item>{`Description: ${entry.description}`}</List.Item>
        <List.Item>{`Specialist: ${entry.specialist}`}</List.Item>
        <List.Item>{entry.sickLeave ? <SickLeaveDetails sickLeave={entry.sickLeave} /> : null}</List.Item>
        <List.Item>{entry.discharge ? <DischargeDetails discharge={entry.discharge} /> : null}</List.Item>
      </List>
      <DiagnosisCodesDetails codes={entry.diagnosisCodes} />
    </Segment>
  );
};

const OccupationalHealthcareEntryDetails: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
  //console.log('entry: ', entry)
  return (
    <Segment >
      <Header as='h1'>{entry.entryDate} <Icon name='stethoscope' /> </Header>
      <List>
        <List.Item><strong>{`Employer: ${entry.employerName}`}</strong></List.Item>
        <List.Item>{`Description: ${entry.description}`}</List.Item>
        <List.Item>{`Specialist: ${entry.specialist}`}</List.Item>
        <List.Item>{entry.sickLeave ? <SickLeaveDetails sickLeave={entry.sickLeave} /> : null}</List.Item>
      </List>
      <DiagnosisCodesDetails codes={entry.diagnosisCodes} />
    </Segment>
  );
};

const HealthCheckEntryDetails: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  //console.log('entry: ', entry.healthCheckRating)
  return (
    <Segment>
      <Header as='h1'>{entry.entryDate} <Icon name='user md' /></Header>
      <List>
        <List.Item>{`Description: ${entry.description}`}</List.Item>
        <List.Item>{`Specialist: ${entry.specialist}`}</List.Item>
        <List.Item>
          <RatingHeart rating={entry.healthCheckRating} />
        </List.Item>
      </List>
      <DiagnosisCodesDetails codes={entry.diagnosisCodes} />
    </Segment>
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryDetails entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryDetails entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
import React from 'react';
import { Header, Container } from 'semantic-ui-react';
import { Discharge } from '../types';


const DischargeDetails: React.FC<{ discharge: Discharge }> = ({ discharge }) => {
  return (
    <Container>
      <Header as='h3' color='blue'>{'Discharghed'}</Header>
      <p>{`Date: ${discharge.date}`}</p>
      <p>{`Criteria: ${discharge.criteria}`}</p>
    </Container>
  );
};

export default DischargeDetails;
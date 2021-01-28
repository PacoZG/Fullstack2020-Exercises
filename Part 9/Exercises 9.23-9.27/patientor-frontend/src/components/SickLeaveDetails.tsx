import React from 'react';
import { Header, Container } from 'semantic-ui-react';
import { SickLeave } from '../types';


const SickLeaveDetails: React.FC<{ sickLeave: SickLeave }> = ({ sickLeave }) => {
  // console.log(sickLeave)
  return (
    <Container>
      <Header as='h3' color='blue'>{'Sick leave'}</Header>
      {`Starting date: ${sickLeave.startDate} - End date ${sickLeave.endDate}`};
    </Container>
  );
};

export default SickLeaveDetails;
import React from 'react';
import { Container, List, Header } from 'semantic-ui-react';
import { useStateValue } from "../state";

const DiagnosisCodesDetails: React.FC<{ codes: Array<string> | undefined }> = ({ codes }) => {
  const [{ diagnoses }] = useStateValue();
  const diagnosesList = Object.values(diagnoses);

  return (
    <Container>
      {codes ?
        <List bulleted>
          <Header as='h3' color='red'>{'Diagnoses'}</Header>
          {codes?.map((code: string) =>
            <List.Item key={code}>
              {`${code} / ${diagnosesList.find(d => d.code === code)?.name}`}
              {diagnosesList.find(d => d.code === code)?.latin ? 
              ` / Latin: ${diagnosesList.find(d => d.code === code)?.latin}` :
              null}
            </List.Item>)}
        </List> :
        null}
    </Container>
  );
};

export default DiagnosisCodesDetails;
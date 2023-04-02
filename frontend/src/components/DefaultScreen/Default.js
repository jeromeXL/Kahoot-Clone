import React from 'react';
import Centre from '../General/Centre';
import Title from '../General/Title';
import LinkToPage from '../General/LinkToPage';
import SubmitButton from '../General/SubmitButton';
import Subtitle from '../General/Subtitle';
import FormContainer from '../General/FormContainer'

export default function Default () {
  return (
    <>
      <Centre color="#AAB8D4">
        <Title/>
        <FormContainer>
          <SubmitButton color="#475A81">
            <LinkToPage text="" page="./login" linkText="Click here to be an Admin" color="white" underline="false"/>
          </SubmitButton>
          <Subtitle>
            Or
          </Subtitle>
          <SubmitButton color="#005050">
            <LinkToPage text="" page="./join" linkText="Click here to be a Player" color="white" underline="false"/>
          </SubmitButton>
        </FormContainer>
      </Centre>
    </>
  );
}

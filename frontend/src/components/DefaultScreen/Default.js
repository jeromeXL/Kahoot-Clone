import React from 'react';
import Centre from '../General/Centre';
import Title from '../General/Title';
import LinkToPage from '../General/LinkToPage';
import Subtitle from '../General/Subtitle';
import FormContainer from '../General/FormContainer'

export default function Default () {
  return (
    <>
      <Centre color="#39548D">
        <Title/>
        <FormContainer color="#6178A8">
          <LinkToPage name='ToAdmin' text="" page="./login" linkText="Click here to be an Admin" color="white" fontSize='15pt'/>
          <Subtitle>
            Or
          </Subtitle>
          <LinkToPage name='ToPlayer' text="" page="./join" linkText="Click here to be a Player" color="white" fontSize='15pt'/>
        </FormContainer>
        <LinkToPage text="Enjoy using BigBrain? Give us a review " page="../review" linkText="here!" color='white'/>
      </Centre>
    </>
  );
}

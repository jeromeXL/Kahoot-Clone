import React from 'react';
import FunFacts from '../FunFacts/FunFacts';

import Centre from '../General/Centre';
import Title from '../General/Title';
import Subtitle from '../General/Subtitle';
import FormContainer from '../General/FormContainer';
import LinkToPage from '../General/LinkToPage';

export default function Lobby () {
  return (
    <>
      <Centre color="#136A6A">
        <Title/>
        <Subtitle> Waiting for admin to start game ..... </Subtitle>
        <br/>
        <FormContainer color="#9FCBCB">
          <FunFacts></FunFacts>
        </FormContainer>
        <LinkToPage text="Back to main menu " page="../" linkText="here!" color='white'/>
      </Centre>
    </>
  )
}

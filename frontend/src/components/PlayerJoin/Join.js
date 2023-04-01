import React from 'react';
import Centre from '../General/Centre';
import FormContainer from '../General/FormContainer';
import SubmitButton from '../General/SubmitButton';
import LinkToPage from '../General/LinkToPage';
import Subtitle from '../General/Subtitle';
import FloatingTextInput from '../General/FloatingTextInput';

export default function Join () {

  const Something = () => {
    return (<div>hi</div>);
  }

  return (
    <>
        <Centre color="#136A6A">
          <Title/>
          <Subtitle> Player Join </Subtitle>
          <FormContainer color="#9FCBCB">
            <Form>
              <FloatingTextInput controlId="formBasicEmail" labelControlId="floatingInput" label="Name" placeholder="Enter Name" onChange={Something}/>
              <FloatingTextInput controlId="formBasicPassword" labelControlId="floatingPassword" label="Session ID" placeholder="Enter Session ID" onChange={Something}/>
              <SubmitButton onClick={Something} color="#005050">
                Join Game
              </SubmitButton>
            </Form>
          </FormContainer>
          <LinkToPage text="Want to create your own game? " page="../login" linkText="Click here!"/>
        </Centre>
      </>
  );
}

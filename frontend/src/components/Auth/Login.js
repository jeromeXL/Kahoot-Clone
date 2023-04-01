import React from 'react';
import AuthSubmitButton from './AuthSubmitButton';
import Form from 'react-bootstrap/Form';
import AuthContainer from './AuthContainer';
import Centre from './Centre';
import AuthTextInput from './AuthTextInput';
import LinkToSignUp from './LinkToSignUp';
import Title from './Title';

export default function Login () {
  return (
      <>
        <Centre>
          <Title/>
          <AuthContainer>
            <Form>
              <AuthTextInput controlId="formBasicEmail" labelControlId="floatingInput" label="Email Address" placeholder="Enter email"/>
              <AuthTextInput controlId="formBasicPassword" labelControlId="floatingPassword" label="Password" placeholder="Enter password"/>
              <AuthSubmitButton login='true'>
                Log In
              </AuthSubmitButton>
            </Form>
          </AuthContainer>
          <LinkToSignUp/>
        </Centre>
      </>
  );
}

import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SubmitButton from '../General/SubmitButton';
import Form from 'react-bootstrap/Form';
import FormContainer from '../General/FormContainer';
import Centre from '../General/Centre';
import FloatingInput from '../General/FloatingInput';
import Title from '../General/Title';
import data from '../../config.json';
import Subtitle from '../General/Subtitle';
import LinkToPage from '../General/LinkToPage';

const BACKEND_PORT = data.BACKEND_PORT;
const url = `http://localhost:${BACKEND_PORT}`;
let token;

export default function Signup () {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const emailChange = (event) => {
    setEmail(event.target.value);
    console.log(`${email} : ${event.target.value}`);
  }
  const [name, setName] = useState('');
  const nameChange = (event) => {
    setName(event.target.value);
    console.log(`${name} : ${event.target.value}`);
  }

  const [password, setPassword] = useState('');
  const passwordChange = (event) => {
    setPassword(event.target.value);
    console.log(`${password} : ${event.target.value}`);
  }

  const [confirmPassword, setConfirmPassword] = useState('');
  const passwordConfirmChange = (event) => {
    setConfirmPassword(event.target.value);
    console.log(`${confirmPassword} : ${event.target.value}`);
  }

  const SignUpPress = async () => {
    console.log('Signed Up');
    console.log(`Email: ${email}. Name: ${name} Password: ${password}`);

    if (password !== confirmPassword) {
      console.log("ERROR: Passwords don't match");
      throw new Error("Passwords don't match")
    }

    // Fetch request
    fetch(url + '/admin/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name })
    }).then((response) => {
      if (!response.ok) {
        console.log('response error!!!!');
      }
      return response.json();
    }).then((data) => {
      console.log('Sign Up data ', data);
      // If authorized, change to dashboard page. Somehow use token
      token = data.token;
      if (data.token) {
        navigate('/dashboard');
      }
    }).catch((err) => {
      console.log(`ERROR: ${err}`);
    });
  }

  return (
    <>
      <Centre color="#39548D">
        <Title/>
        <Subtitle> Sign Up </Subtitle>
        <FormContainer color="#AAB8D4">
          <Form>
            <FloatingInput type="text" controlId="formBasicEmail" labelControlId="floatingEmail" label="Email Address" placeholder="Enter email" onChange={emailChange}/>
            <FloatingInput type="text" controlId="formBasicName" labelControlId="floatingName" label="Name" placeholder="Enter name" onChange={nameChange}/>
            <FloatingInput type="password" controlId="formBasicPassword" labelControlId="floatingPassword" label="Password" placeholder="Enter password" onChange={passwordChange}/>
            <FloatingInput type="password" controlId="formBasicConfirmPassword" labelControlId="floatingConfirmPassword" label="Confirm password" placeholder="Confirm password" onChange={passwordConfirmChange}/>
            <SubmitButton onClick={SignUpPress} color="#6178A8">
              Sign Up
            </SubmitButton>
          </Form>
        </FormContainer>
        <LinkToPage text="Already have an account? " page="../login" linkText="Log In!"/>
        <LinkToPage text="Want to join as a player? " page="../join" linkText="Click here!"/>
      </Centre>
    </>
  );
}

export { token };

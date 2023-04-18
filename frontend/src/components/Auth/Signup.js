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
import ErrorPopup from '../General/ErrorPopup';

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

  const [signupError, setSignupError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const SignUpPress = async () => {
    console.log('Signup Button Pressed');
    console.log(`Email: ${email}. Name: ${name} Password: ${password}`);
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setSignupError(false);

    if (email === '') {
      setSignupError(true);
      setErrorMessage('Email cannot be empty')
      throw new Error('Email cannot be empty');
    } else if (name === '') {
      setSignupError(true);
      setErrorMessage('Name cannot be empty')
      throw new Error('Name cannot be empty');
    } else if (!regex.test(email)) {
      setSignupError(true);
      setErrorMessage('Please use email format');
      throw new Error('Please use email format');
    } else if (password === '' || confirmPassword === '') {
      setSignupError(true);
      setErrorMessage('Password cannot be empty');
      throw new Error('Password cannot be empty');
    }

    if (password !== confirmPassword) {
      setSignupError(true);
      setErrorMessage("Passwords don't match");
      throw new Error("Passwords don't match");
    }

    // Fetch request
    fetch(url + '/admin/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name })
    }).then((response) => {
      if (!response.ok) {
        console.log('response error!!!!');
        setSignupError(true);
        setErrorMessage('Email address already registered');
      }
      return response.json();
    }).then((data) => {
      console.log('Sign Up data ', data);
      // If authorized, change to dashboard page. Somehow use token
      token = data.token;
      if (data.token) {
        navigate('/dashboard', {
          state: {
            token: data.token,
          }
        });
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
        {signupError && <ErrorPopup message={errorMessage} />}
        <FormContainer color="#AAB8D4">
          <Form>
            <FloatingInput name='SignUpEmail' type="text" controlId="formBasicEmail" labelControlId="floatingEmail" label="Email Address" placeholder="Enter email" onChange={emailChange}/>
            <FloatingInput name='SignUpName' type="text" controlId="formBasicName" labelControlId="floatingName" label="Name" placeholder="Enter name" onChange={nameChange}/>
            <FloatingInput name='SignUpPW1' type="password" controlId="formBasicPassword" labelControlId="floatingPassword" label="Password" placeholder="Enter password" onChange={passwordChange}/>
            <FloatingInput name='SignUpPW2' type="password" controlId="formBasicConfirmPassword" labelControlId="floatingConfirmPassword" label="Confirm password" placeholder="Confirm password" onChange={passwordConfirmChange}/>
            <SubmitButton name='SignUpButton' onClick={SignUpPress} color="#6178A8">
              Sign Up
            </SubmitButton>
          </Form>
        </FormContainer>
        <LinkToPage name='AdminToLogin' text="Already have an account? " page="../login" linkText="Log In!"/>
        <LinkToPage name='AdminSignUpToPlayer' text="Want to join as a player? " page="../join" linkText="Click here!"/>
      </Centre>
    </>
  );
}

export { token };

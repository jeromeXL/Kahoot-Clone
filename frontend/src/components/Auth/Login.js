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

export default function Login () {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const emailChange = (event) => {
    setEmail(event.target.value);
  }

  const [password, setPassword] = useState('');
  const passwordChange = (event) => {
    setPassword(event.target.value);
  }

  const [loginError, setLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const LoginPress = async () => {
    console.log('Login Button Pressed');
    console.log(`Email: ${email}. Password: ${password}`);
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setLoginError(false);

    if (email === '') {
      setLoginError(true);
      setErrorMessage('Email cannot be empty')
      throw new Error('Email cannot be empty');
    } else if (!regex.test(email)) {
      setLoginError(true);
      setErrorMessage('Please use email format');
      throw new Error('Please use email format');
    } else if (password === '') {
      setLoginError(true);
      setErrorMessage('Password cannot be empty');
      throw new Error('Password cannot be empty');
    }

    // Fetch request
    const response = await fetch(url + '/admin/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (data.error) {
      console.log(`ERROR: ${data.error}`);
      alert(`ERROR: ${data.error}`);
    } else {
      console.log('token is valid');
      navigate('/dashboard', {
        state: {
          token: data.token,
        }
      });
    }
  }

  return (
      <>
        <Centre color="#39548D">
          <Title/>
          <Subtitle> Admin Login </Subtitle>
          {loginError && <ErrorPopup message={errorMessage} />}
          <FormContainer color="#AAB8D4">
            <Form>
              <FloatingInput name='LogInEmail' type="text" controlId="formBasicEmail" labelControlId="floatingInput" label="Email Address" placeholder="Enter email" onChange={emailChange}/>
              <FloatingInput name='LogInPassword' type="password" controlId="formBasicPassword" labelControlId="floatingPassword" label="Password" placeholder="Enter password" onChange={passwordChange}/>
              <SubmitButton name='LogInButton' onClick={LoginPress} color="#475A81">
                Log In
              </SubmitButton>
            </Form>
          </FormContainer>
          <LinkToPage name='AdminToSignUp' text="Don't have an account? " page="../signup" linkText="Sign up!" color='white'/>
          <LinkToPage name='AdminLoginToPlayer' text="Want to join a game as a player? " page="../join" linkText="Click here!" color='white'/>
        </Centre>
      </>
  );
}

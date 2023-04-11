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
    fetch(url + '/admin/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    }).then((response) => {
      if (!response.ok) {
        console.log('response error!!!!');
        setLoginError(true);
        setErrorMessage(response.error);
      }
      return response.json();
    }).then((data) => {
      console.log('Log in data ', data);
      // If authorized, change to dashboard page. Somehow use token
      token = data.token;
      if (data.token) {
        console.log('token is valid');
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
          <Subtitle> Admin Login </Subtitle>
          {loginError && <ErrorPopup message={errorMessage} />}
          <FormContainer color="#AAB8D4">
            <Form>
              <FloatingInput type="text" controlId="formBasicEmail" labelControlId="floatingInput" label="Email Address" placeholder="Enter email" onChange={emailChange}/>
              <FloatingInput type="password" controlId="formBasicPassword" labelControlId="floatingPassword" label="Password" placeholder="Enter password" onChange={passwordChange}/>
              <SubmitButton onClick={LoginPress} color="#475A81">
                Log In
              </SubmitButton>
            </Form>
          </FormContainer>
          <LinkToPage text="Don't have an account? " page="../signup" linkText="Sign up!" color='white'/>
          <LinkToPage text="Want to join a game as a player? " page="../join" linkText="Click here!" color='white'/>
        </Centre>
      </>
  );
}

export { token };

import { React, useState } from 'react';
import AuthSubmitButton from './AuthSubmitButton';
import Form from 'react-bootstrap/Form';
import AuthContainer from './AuthContainer';
import Centre from './Centre';
import AuthTextInput from './AuthTextInput';
import Title from './Title';
import data from '../../config.json';
import AdminTitle from './AdminTitle';
import LinkToPage from './LinkToPage';

const BACKEND_PORT = data.BACKEND_PORT;
const url = `http://localhost:${BACKEND_PORT}`;
let token;

export default function Login () {
  const [email, setEmail] = useState('');
  const emailChange = (event) => {
    setEmail(event.target.value);
    console.log(`${email} : ${event.target.value}`);
  }

  const [password, setPassword] = useState('');
  const passwordChange = (event) => {
    setPassword(event.target.value);
    console.log(`${password} : ${event.target.value}`);
  }

  function LoginPress () {
    console.log('Logged in');
    console.log(`Email: ${email}. Password: ${password}`);
    // Fetch request
    fetch(url + '/admin/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    }).then((response) => {
      if (!response.ok) {
        console.log('response error!!!!');
      }
      return response.json();
    }).then((data) => {
      console.log('Log in data ', data);
      // If authorized, change to dashboard page. Somehow use token
      token = data.token;
    }).catch((err) => {
      console.log(`ERROR: ${err}`);
    });
  }

  return (
      <>
        <Centre>
          <Title/>
          <AdminTitle> Admin Login </AdminTitle>
          <AuthContainer>
            <Form>
              <AuthTextInput controlId="formBasicEmail" labelControlId="floatingInput" label="Email Address" placeholder="Enter email" onChange={emailChange}/>
              <AuthTextInput controlId="formBasicPassword" labelControlId="floatingPassword" label="Password" placeholder="Enter password" onChange={passwordChange}/>
              <AuthSubmitButton onClick={LoginPress}>
                Log In
              </AuthSubmitButton>
            </Form>
          </AuthContainer>
          <LinkToPage text="Don't have an account? " page="../signup" linkText="Sign up!"/>
          <LinkToPage text="Want to join as a player? " page="../join" linkText="Click here!"/>
        </Centre>
      </>
  );
}

export { token };

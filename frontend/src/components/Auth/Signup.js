import React from 'react';
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
      <Centre color="#39548D">
        <Title/>
        <Subtitle> Admin Login </Subtitle>
        <FormContainer color="#AAB8D4">
          <Form>
            <FloatingInput type="text" controlId="formBasicEmail" labelControlId="floatingInput" label="Email Address" placeholder="Enter email" onChange={emailChange}/>
            <FloatingInput type="password" controlId="formBasicPassword" labelControlId="floatingPassword" label="Password" placeholder="Enter password" onChange={passwordChange}/>
            <SubmitButton onClick={LoginPress} color="#6178A8">
              Log In
            </SubmitButton>
          </Form>
        </FormContainer>
        <LinkToPage text="Don't have an account? " page="../signup" linkText="Sign up!"/>
        <LinkToPage text="Want to join as a player? " page="../join" linkText="Click here!"/>
      </Centre>
    </>
  );
}

export { token };

import React from 'react';
import Button from 'react-bootstrap/Button';

export default function AuthSubmitButton (props) {
  return (
    <Button type="button" style={{ backgroundColor: '#6178A8', borderColor: '#6178A8', width: '100%' }} onClick={props.login ? Login : SignUp}>
      {props.children}
    </Button>
  );
}

function Login () {
  console.log('Logged in');
}

function SignUp () {
  console.log('Sign up');
}

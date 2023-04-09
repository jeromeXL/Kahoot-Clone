import React from 'react';
import Button from 'react-bootstrap/Button';
import data from '../../config.json';

const BACKEND_PORT = data.BACKEND_PORT;
const url = `http://localhost:${BACKEND_PORT}`;

export default function LogOutButton (props) {
  const token = props.token;
  const logOut = () => {
    console.log('Log out. Link to login page');
    // Fetch request
    fetch(url + '/admin/auth/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token })
    }).then((response) => {
      if (!response.ok) {
        console.log('response error!!!!');
      }
      return response.json();
    }).then((data) => {
      console.log('Log in data ', data);
      // If authorized, change to dashboard page. Somehow use token
      if (!data.error) {
        // navigate('/login');
      }
    }).catch((err) => {
      console.log(`ERROR: ${err}`);
    });
  }
  return (
    <Button type='button' style={{ backgroundColor: '#D9D9D9', borderColor: '#D9D9D9', color: 'black' }} onClick={logOut}>
      Log out
    </Button>
  );
}

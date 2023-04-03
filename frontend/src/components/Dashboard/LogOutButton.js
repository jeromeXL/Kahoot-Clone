import React from 'react';
import Button from 'react-bootstrap/Button';

export default function LogOutButton (props) {
  const logOut = () => {
    console.log('Log out. Link to login page');
  }
  return (
    <Button type='button' style={{ backgroundColor: '#D9D9D9', borderColor: '#D9D9D9', color: 'black' }} onClick={logOut}>
      Log out
    </Button>
  );
}

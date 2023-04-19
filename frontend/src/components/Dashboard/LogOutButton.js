import React from 'react';
import HeaderButton from '../General/HeaderButton';
import { useNavigate } from 'react-router-dom';

import data from '../../config.json';
const BACKEND_PORT = data.BACKEND_PORT;
const url = `http://localhost:${BACKEND_PORT}`;

export default function LogOutButton (props) {
  const navigate = useNavigate();
  const token = props.token
  const logOut = () => {
    console.log('Log out. Link to login page');
    // Fetch request
    fetch(url + '/admin/auth/logout', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
      if (!response.ok) {
        console.log('response error!!!!');
      }
      return response.json();
    }).then((data) => {
      if (data.error) {
        console.log(`ERROR: ${data.error}`);
      } else {
        navigate('../login');
      }
    }).catch((err) => {
      console.log(`ERROR: ${err}`);
    });
  }
  return (
    <HeaderButton name='LogOutButton' onClick={logOut}>
      Log out
    </HeaderButton>
  );
}

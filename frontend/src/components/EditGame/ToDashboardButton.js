import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderButton from '../General/HeaderButton';

export default function ToDashboardButton (props) {
  const navigate = useNavigate();
  const toDashboard = () => {
    console.log('Go back to dashboard');
    navigate('../../dashboard', {
      state: {
        token: props.token,
      }
    });
  };
  return (
    <HeaderButton onClick={toDashboard}>Return to Dashboard</HeaderButton>
  );
}

import React from 'react';
import DashboardTitle from '../Dashboard/DashboardTitle';
import LogOutButton from '../Dashboard/LogOutButton';
import ToDashboardButton from './ToDashboardButton';

export default function EditGameHeader (props) {
  return (
    <div className='d-flex justify-content-around align-items-center' style={{ backgroundColor: '#39548D' }}>
        <ToDashboardButton token={props.token}/>
        <DashboardTitle>Edit Game</DashboardTitle>
        <LogOutButton token={props.token}/>
    </div>
  );
}

import React from 'react';
import CreateNewGameButton from './CreateNewGameButton';
import DashboardTitle from './DashboardTitle';
import LogOutButton from './LogOutButton';

export default function DashboardHeader (props) {
  return (
    <div className='d-flex justify-content-around align-items-center' style={{ backgroundColor: '#39548D' }}>
        <CreateNewGameButton token={props.token} update={props.update}/>
        <DashboardTitle>Dashboard</DashboardTitle>
        <LogOutButton token={props.token}/>
    </div>
  );
}

import React from 'react';
// import '@fontsource/inter';

export default function DashboardTitle (props) {
  return (
    <h1 style={{ fontFamily: 'Inter', color: '#FFFFFF', fontWeight: 'bolder', letterSpacing: '12%', fontSize: '45pt' }}> {props.children} </h1>
  );
}

import React from 'react';

export default function Centre (props) {
  return (<div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100vh',
    flexDirection: 'column',
    backgroundColor: '#39548D'
  }}> {props.children} </div>)
}

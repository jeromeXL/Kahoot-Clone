import React from 'react';

export default function GameTitle (props) {
  return (
    <div style={{ color: 'black', fontSize: '20pt', fontWeight: 'bold', marginLeft: '50px' }}>
      {props.children}
    </div>
  );
}

import React from 'react';

export default function GameText (props) {
  return (
    <div style={{ color: 'black', fontSize: '12pt', marginLeft: '50px' }}>
      {props.children}
    </div>
  );
}

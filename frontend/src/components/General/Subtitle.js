import React from 'react';

export default function Subtitle (props) {
  return (
    <div style={{ color: 'white', padding: '10px', fontSize: '25pt', fontFamily: 'Space Grotesk', letterSpacing: '-3px' }}>{props.children}</div>
  );
}

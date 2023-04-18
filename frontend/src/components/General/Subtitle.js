import React from 'react';

export default function Subtitle (props) {
  return (
    <div data-cy='SubtitleText' style={{ color: 'white', padding: '10px', fontSize: '25pt', fontFamily: 'Space Grotesk', letterSpacing: '-3px', textAlign: 'center' }}>{props.children}</div>
  );
}

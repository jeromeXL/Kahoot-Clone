import React from 'react';

export default function GameButtonContainer (props) {
  return (
    <div className='d-flex justify-content-around align-items-center p-3' style={{ padding: '10px' }}>
      {props.children}
    </div>
  );
}

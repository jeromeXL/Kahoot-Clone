import React from 'react';

export default function GameTextDetailContainer (props) {
  return (
    <div className='d-flex flex-column justify-content-around align-items-start flex-grow-1 p-1'>
      {props.children}
    </div>
  );
}

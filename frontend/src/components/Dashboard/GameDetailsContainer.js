import React from 'react';

export default function GameDetailsContainer (props) {
  return (
    <div className='d-flex justify-content-around align-items-center p-2'>
      {props.children}
    </div>
  );
}

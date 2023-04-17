import React from 'react';

export default function TitleContainer (props) {
  return (
    <h3 className='p-2 flex-grow-1'>
      {props.children}
    </h3>
  );
}

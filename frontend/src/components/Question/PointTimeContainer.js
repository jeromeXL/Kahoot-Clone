import React from 'react';

export default function PointTimeContainer (props) {
  return (
    <h4 className='p-2' style={{ margin: '20px 0px' }}>
      {props.children}
    </h4>
  );
}

import React from 'react';

export default function GamesContainer (props) {
  return (
    <div className='d-flex justify-content-around align-items-center flex-wrap' style={{ margin: 'auto', padding: '20px', paddingTop: '60px' }}>
      {props.children}
    </div>
  );
}

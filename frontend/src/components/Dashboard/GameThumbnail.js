import React from 'react';

export default function GameThumbnail (props) {
  return (
    <img style={{ width: '135px', height: 'auto', marginLeft: '18px', marginTop: '10px', borderRadius: '9px' }} src={props.img === null ? require('./defaultGameImage.png') : props.img} className='p-1' alt={`thumbnail for quiz ${props.id}`}/>
  );
}

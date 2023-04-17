import React from 'react';
import { useMediaQuery } from 'react-responsive'

export default function GameThumbnail (props) {
  let width;
  let marginLeft;
  let marginTop;
  let borderRadius;
  const isSmallScreen = useMediaQuery({ query: '(max-width: 500px)' });
  const isMediumScreen = useMediaQuery({ query: '(max-width: 800px)' });
  if (isSmallScreen) {
    width = '85px';
    marginLeft = '12px';
    marginTop = '5px';
    borderRadius = '3px';
  } else if (isMediumScreen) {
    width = '110px';
    marginLeft = '15px';
    marginTop = '7px';
    borderRadius = '6px';
  } else {
    width = '135px'
    marginLeft = '18px';
    marginTop = '10px';
    borderRadius = '9px';
  }
  return (
    <img style={{ width, height: 'auto', marginLeft, marginTop, borderRadius }} src={props.img === null ? require('./defaultGameImage.png') : props.img} className='p-1' alt={`thumbnail for quiz ${props.id}`}/>
  );
}

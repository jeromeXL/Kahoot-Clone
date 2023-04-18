import React from 'react';
import { useMediaQuery } from 'react-responsive'

export default function GameTitle (props) {
  let size;
  let marginLeft;
  const isSmallScreen = useMediaQuery({ query: '(max-width: 500px)' });
  const isMediumScreen = useMediaQuery({ query: '(max-width: 800px)' });
  if (isSmallScreen) {
    size = '15pt';
    marginLeft = '20px';
  } else if (isMediumScreen) {
    size = '17pt';
    marginLeft = '30px';
  } else {
    size = '20pt';
    marginLeft = '50px';
  }

  return (
    <div name='GameTitle' style={{ color: 'black', fontSize: size, fontWeight: 'bold', marginLeft }}>
      {props.children}
    </div>
  );
}

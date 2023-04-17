import React from 'react';
import { useMediaQuery } from 'react-responsive'

export default function PointTimeContainer (props) {
  let margin;
  let fontSize;
  const isSmallScreen = useMediaQuery({ query: '(max-width: 500px)' });
  const isMediumScreen = useMediaQuery({ query: '(max-width: 800px)' });
  if (isSmallScreen) {
    margin = '10px 0px';
    fontSize = '14pt';
  } else if (isMediumScreen) {
    margin = '15px 0px';
    fontSize = '16pt';
  } else {
    margin = '20px 0px';
    fontSize = '18pt';
  }
  return (
    <h4 className='p-2' style={{ margin, fontSize, fontWeight: 'normal' }}>
      {props.children}
    </h4>
  );
}

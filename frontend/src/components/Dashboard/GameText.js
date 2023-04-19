import React from 'react';
import { useMediaQuery } from 'react-responsive'

export default function GameText (props) {
  let marginLeft;
  let fontSize;
  const isSmallScreen = useMediaQuery({ query: '(max-width: 500px)' });
  const isMediumScreen = useMediaQuery({ query: '(max-width: 800px)' });
  if (isSmallScreen) {
    marginLeft = '20px';
    fontSize = '9pt';
  } else if (isMediumScreen) {
    marginLeft = '30px';
    fontSize = '10pt';
  } else {
    marginLeft = '50px'
    fontSize = '12pt';
  }
  return (
    <div style={{ color: 'black', fontSize, marginLeft }}>
      {props.children}
    </div>
  );
}

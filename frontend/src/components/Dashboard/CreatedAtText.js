import React from 'react';
import { useMediaQuery } from 'react-responsive'

export default function CreatedAtText (props) {
  let marginLeft;
  let fontSize;
  const isSmallScreen = useMediaQuery({ query: '(max-width: 500px)' });
  const isMediumScreen = useMediaQuery({ query: '(max-width: 800px)' });
  if (isSmallScreen) {
    marginLeft = '20px';
    fontSize = '7pt';
  } else if (isMediumScreen) {
    marginLeft = '30px';
    fontSize = '9pt';
  } else {
    marginLeft = '50px'
    fontSize = '10pt';
  }
  return (
    <small className="text-muted" style={{ marginLeft, display: 'inline-block', fontWeight: 'normal', fontSize }}>
      {props.children}
    </small>
  );
}

import React from 'react';
import { useMediaQuery } from 'react-responsive'

export default function FormContainer (props) {
  let width;
  const isSmallScreen = useMediaQuery({ query: '(max-width: 500px)' });
  const isMediumScreen = useMediaQuery({ query: '(max-width: 800px)' });
  if (isSmallScreen) {
    width = '300px';
  } else if (isMediumScreen) {
    width = '350px';
  } else {
    width = '400px'
  }
  return (
    <div style={{ backgroundColor: props.color, padding: 25, borderRadius: '9px', width, fontFamily: 'Inter' }}>
      {props.children}
    </div>
  );
}

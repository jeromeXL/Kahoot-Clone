import React from 'react';
import { useMediaQuery } from 'react-responsive'

export default function DashboardTitle (props) {
  let size;
  let spacing;
  const isSmallScreen = useMediaQuery({ query: '(max-width: 500px)' });
  const isMediumScreen = useMediaQuery({ query: '(max-width: 800px)' });
  if (isSmallScreen) {
    size = '28pt';
    spacing = '5%'
  } else if (isMediumScreen) {
    size = '35pt'
    spacing = '9%'
  } else {
    size = '45pt'
    spacing = '12%'
  }

  return (
    <h1 data-cy="HeaderTitle" style={{ fontFamily: 'Inter', color: '#FFFFFF', fontWeight: 'bolder', letterSpacing: spacing, fontSize: size }}> {props.children} </h1>
  );
}

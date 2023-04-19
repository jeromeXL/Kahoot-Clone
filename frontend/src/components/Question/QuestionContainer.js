import React from 'react';
import { useMediaQuery } from 'react-responsive';

export default function QuestionContainer (props) {
  let width;
  let margin;
  let padding;
  const isSmallScreen = useMediaQuery({ query: '(max-width: 500px)' });
  const isMediumScreen = useMediaQuery({ query: '(max-width: 600px)' });
  const isSlightlyBiggerThanMedium = useMediaQuery({ query: '(max-width: 800px)' });
  if (isSmallScreen) {
    width = '300px';
    margin = '15px auto';
    padding = '5px'
  } else if (isMediumScreen) {
    width = '400px';
    margin = '15px auto';
    padding = '10px'
  } else if (isSlightlyBiggerThanMedium) {
    width = '500px';
    margin = '20px auto';
    padding = '10px'
  } else {
    width = '750px'
    margin = '40px auto';
    padding = '20px'
  }
  return (
    <div style={{ width, backgroundColor: '#AAB8D4', margin, padding }}>
      {props.children}
    </div>
  );
}

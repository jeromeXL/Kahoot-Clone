import React from 'react';

export default function QuestionImage (props) {
  return (
    <img src={props.image} alt={`image for question ${props.id}`} style={{ width: '500px', height: 'auto', margin: 'auto' }}/>
  );
}

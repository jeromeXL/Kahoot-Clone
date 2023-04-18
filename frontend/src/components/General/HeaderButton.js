import React from 'react';
import Button from 'react-bootstrap/Button';

export default function HeaderButton (props) {
  return (
    <Button aria-label={props.name} name={props.name} type='button' style={{ backgroundColor: '#D9D9D9', borderColor: '#D9D9D9', color: 'black' }} onClick={props.onClick}>
      {props.children}
    </Button>
  );
}

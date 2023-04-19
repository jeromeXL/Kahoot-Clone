import React from 'react';
import Button from 'react-bootstrap/Button';

export default function SubmitButton (props) {
  return (
    <Button type="button" aria-label={props.name} name={props.name} style={{ backgroundColor: props.color, borderColor: props.color, width: '100%' }} onClick={props.onClick}>
      {props.children}
    </Button>
  );
}

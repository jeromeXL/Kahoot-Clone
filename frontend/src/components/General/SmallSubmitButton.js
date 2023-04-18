import React from 'react';
import Button from 'react-bootstrap/Button';

export default function SmallSubmitButton (props) {
  return (
    <Button {...props} type="button" style={{ backgroundColor: props.color, borderColor: props.color }} onClick={props.onClick}>
      {props.children}
    </Button>
  );
}

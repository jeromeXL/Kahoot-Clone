import React from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

export default function AuthTextInput (props) {
  return (
    <Form.Group className="mb-3" controlId={props.controlId}>
      <FloatingLabel controlId={props.labelControlId} label={props.label} className="mb-3">
        <Form.Control type="text" placeholder={props.placeholder}/>
      </FloatingLabel>
    </Form.Group>
  );
}

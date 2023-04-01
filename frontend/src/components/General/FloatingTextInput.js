import { React } from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

export default function FloatingTextInput (props) {
  return (
    <Form.Group className="mb-3" controlId={props.controlId}>
      <FloatingLabel controlId={props.labelControlId} label={props.label} className="mb-3">
        <Form.Control type="text" placeholder={props.placeholder} onChange={props.onChange}/>
      </FloatingLabel>
    </Form.Group>
  );
}

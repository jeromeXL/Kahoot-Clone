import { React } from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

export default function FloatingInput (props) {
  return (
    <Form.Group className="mb-3" controlId={props.controlId}>
      <FloatingLabel controlId={props.labelControlId} label={props.label} className="mb-3">
        <Form.Control aria-label={props.label} type={props.type} placeholder={props.placeholder} onChange={props.onChange} name={props.name}/>
      </FloatingLabel>
    </Form.Group>
  );
}

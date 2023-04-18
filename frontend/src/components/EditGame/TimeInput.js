import React from 'react';
import Form from 'react-bootstrap/Form';

export default function TimeInput (props) {
  return (
    <>
      <Form.Label>Time Limit (s)</Form.Label>
      <Form.Control aria-label='Time input in seconds' data-cy='NewTimeInput' type="number" placeholder="Enter question time limit" required onChange={props.onChange} />
    </>
  );
}

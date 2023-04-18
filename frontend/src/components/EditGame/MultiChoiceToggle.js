import React from 'react';
import Form from 'react-bootstrap/Form';

export default function MultiChoiceToggle (props) {
  return (
    <Form.Check
      type="switch"
      label="multiple correct answers"
      className="mb-3"
      aria-label='single or multi answer switch'
      {...props}
    />
  );
}

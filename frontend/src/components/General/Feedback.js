import React from 'react';
import Form from 'react-bootstrap/Form';

export default function Feedback (props) {
  return (
    <Form.Text style={{ color: 'red' }}>
      {props.children}
    </Form.Text>
  );
}

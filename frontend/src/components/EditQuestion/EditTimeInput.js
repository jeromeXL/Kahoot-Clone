import React from 'react';
import Form from 'react-bootstrap/Form';

export default function EditTimeInput (props) {
  return (
  <>
    <Form.Control style={{ maxWidth: '50px', display: 'inline-block', textAlign: 'center' }} {...props} type="number"/> seconds
  </>
  );
}

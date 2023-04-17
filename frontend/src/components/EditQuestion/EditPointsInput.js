import React from 'react';
import Form from 'react-bootstrap/Form';

export default function EditPointsInput (props) {
  return (
  <>
    <Form.Control style={{ maxWidth: '75px', display: 'inline-block', textAlign: 'center', }} {...props} type="number"/> points
  </>
  );
}

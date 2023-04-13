import React from 'react';
import Form from 'react-bootstrap/Form';

export default function Option (props) {
  return (
    <div className='d-flex justify-content-start align-items-center p-2'>
      <Form.Check
        type={props.multi === true ? 'checkbox' : 'radio'}
        disabled
        {...(props.correct === true) ? { checked: 'success' } : { }}
        inline
      />
      <Form.Control
        value={props.option}
        disabled
      />
    </div>
  );
}

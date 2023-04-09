import React from 'react';
import Form from 'react-bootstrap/Form';

export default function Option (props) {
  return (
    <div className='d-flex justify-content-start align-items-center p-2'>
      {props.multi === true
        ? <Form.Check
        type='checkbox'
        disabled
        style={{ paddingRight: '20px' }}
        />
        : <Form.Check
        type='radio'
        disabled
        style={{ paddingRight: '20px' }}
        />
      }
      <Form.Control
        value="Insert question data..."
        disabled
      />
    </div>
  );
}

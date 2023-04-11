import React from 'react';
import Form from 'react-bootstrap/Form';

export default function EditOption (props) {
  return (
    <div className='d-flex justify-content-start align-items-center p-2'>
      {props.multi === true
        ? <Form.Check
        type='checkbox'
        style={{ paddingRight: '20px' }}
        />
        : <Form.Check
        type='radio'
        style={{ paddingRight: '20px' }}
        />
      }
      <Form.Control
        placeholder="Enter a potential answer"
        defaultValue={props.children ? props.children : ''}
      />
    </div>
  );
}
